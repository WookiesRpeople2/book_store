import { ApiRequestConfig, ApiResponse, Params } from "@/types";

export class ApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  async request<T>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
    const {
      endpoint,
      method,
      params,
      data,
      headers = {},
    } = config;

    try {
      const response = await this.executeRequest<T>(
        endpoint,
        method,
        params,
        data,
        headers,
      );

      return response;
    } catch (error) {
      const err = error as {message: string};
      throw new Error(err.message);
    }
  }

  private async executeRequest<T>(
    endpoint: string,
    method: string,
    params?: Params,
    data?: any,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, params ? params : undefined);

    const options: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || `HTTP ${response.status}`);
      }

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: this.parseHeaders(response.headers),
        timestamp: Date.now(),
      };
    } catch (error) {
      const err = error as {message: string};
      throw new Error(err.message);
    }
  }

  private buildURL(endpoint: string, params?: (string | number)[] | Record<string, any>): string {
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let url = `${this.baseURL}${path}`;

    if (!params) {
      return url;
    }

    if (Array.isArray(params)) {
      const joined = params
        .filter((p) => p !== undefined && p !== null)
        .map((p) => encodeURIComponent(String(p)))
        .join('/');
      return url.endsWith('/') ? `${url}${joined}` : `${url}/${joined}`;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, encodeURIComponent(value));
      }
    });

    const query = searchParams.toString();
    return query ? `${url}?${query}` : url;
  }

  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  private isBodyMethod(method: string): boolean {
    return ['POST'].includes(method.toUpperCase());
  }


  //methods for explicit use cases
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'GET', params });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'POST', data });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'PUT', data });
  }

  async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'PATCH', data });
  }

  async delete<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>({ endpoint, method: 'DELETE', params });
  }
}

