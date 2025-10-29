
class ApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number = 30000;
  private defaultRetries: number = 3;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  async request<T = any>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const {
      endpoint,
      method,
      params,
      data,
      headers = {},
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
    } = config;

    // Intelligent method detection
    const httpMethod = this.determineMethod(method, data, params);

    // Execute request with retry logic
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.executeRequest<T>(
          endpoint,
          httpMethod,
          params,
          data,
          headers,
          timeout
        );

        return response;
      } catch (error: any) {
        lastError = error;

        // Check if should retry
        if (attempt < retries && this.isRetriableError(error)) {
          const delay = this.calculateBackoff(attempt + 1);
          console.log(`[API] Retry ${attempt + 1}/${retries} after ${delay}ms`);
          await this.sleep(delay);
          continue;
        }

        break;
      }
    }

    throw lastError || new Error('Request failed');
  }

  /**
   * Execute the actual fetch request
   */
  private async executeRequest<T>(
    endpoint: string,
    method: string,
    params?: Record<string, any>,
    data?: any,
    headers: Record<string, string> = {},
    timeout: number = this.defaultTimeout
  ): Promise<ApiResponse<T>> {
    // Build URL with query parameters
    const url = this.buildURL(endpoint, this.isBodyMethod(method) ? params : params || data);

    // Build request options
    const options: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
    };

    // Add body for POST, PUT, PATCH
    if (this.isBodyMethod(method) && (data || (params && data))) {
      options.body = JSON.stringify(data || params);
    }

    console.log(`[API] ${method} ${url}`);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    options.signal = controller.signal;

    try {
      const response = await fetch(url, options);
      clearTimeout(timeoutId);

      // Parse response
      const responseData = await this.parseResponse<T>(response);

      // Handle non-2xx responses
      if (!response.ok) {
        throw new Error(
          `API Error ${response.status} (${response.statusText}): ${JSON.stringify(responseData)}`
        );
      }

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: this.parseHeaders(response.headers),
        timestamp: Date.now(),
      };
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }

      throw this.handleError(error);
    }
  }

  /**
   * Build full URL with query parameters
   */
  private buildURL(endpoint: string, params?: Record<string, any>): string {
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseURL}${path}`;

    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  /**
   * Parse response based on content type
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return response.json();
    }

    if (contentType?.includes('text/')) {
      return response.text() as any;
    }

    if (contentType?.includes('application/octet-stream') || contentType?.includes('image/')) {
      return response.blob() as any;
    }

    // Try to parse as JSON, fallback to text
    try {
      return await response.json();
    } catch {
      return response.text() as any;
    }
  }

  /**
   * Parse headers from Response
   */
  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  /**
   * Intelligently determine HTTP method based on context
   */
  private determineMethod(
    method?: string,
    data?: any,
    params?: Record<string, any>
  ): string {
    if (method) return method.toUpperCase();

    // If data is provided, likely a mutation
    if (data) {
      // Check if data has an ID field (update operation)
      if (data.id || data._id) {
        return 'PUT';
      }
      return 'POST';
    }

    // If only params and certain keywords suggest deletion
    if (params?.action === 'delete' || params?.delete) {
      return 'DELETE';
    }

    // Default to GET for read operations
    return 'GET';
  }

  /**
   * Check if method uses request body
   */
  private isBodyMethod(method: string): boolean {
    return ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());
  }

  /**
   * Determine if error is retriable
   */
  private isRetriableError(error: any): boolean {
    // Network errors are retriable
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return true;
    }

    // Timeout errors are retriable
    if (error.message?.includes('timeout')) {
      return true;
    }

    // Parse status from error message if available
    const statusMatch = error.message?.match(/API Error (\d+)/);
    if (statusMatch) {
      const status = parseInt(statusMatch[1]);
      return status === 408 || status === 429 || (status >= 500 && status < 600);
    }

    return false;
  }

  /**
   * Calculate exponential backoff delay
   */
  private calculateBackoff(retryCount: number): number {
    return Math.min(1000 * Math.pow(2, retryCount), 10000);
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Enhanced error handling
   */
  private handleError(error: any): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error(`Request failed: ${error}`);
  }

  /**
   * Convenience methods
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'GET', params });
  }

  async post<T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'POST', data });
  }

  async put<T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'PUT', data });
  }

  async patch<T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'PATCH', data });
  }

  async delete<T = any>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'DELETE', params });
  }
}
