import { ApiRequestConfig, ApiResponse, Err } from "@/types";

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

    const httpMethod = this.determineMethod(method, data, params);

    try {
      const response = await this.executeRequest<T>(
        endpoint,
        httpMethod,
        params,
        data,
        headers,
      );

      return response;
    } catch (error) {
      const err = error as Err
      throw new Error(err.message);
    }
  }

  private async executeRequest<T>(
    endpoint: string,
    method: string,
    params?: Record<string, any>,
    data?: any,
    headers: Record<string, string> = {},
  ): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, this.isBodyMethod(method) ? params : params || data);

    const options: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
    };
    
    if (this.isBodyMethod(method) && (data || (params && data))) {
      options.body = JSON.stringify(data || params);
    }

    try {
      const response = await fetch(url, options);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: this.parseHeaders(response.headers),
        timestamp: Date.now(),
      };
    } catch (error) {
      const err = error as Err;
      throw new Error(err.message);
    }
  }

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


  private parseHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  private determineMethod(
    method?: string,
    data?: any,
    params?: Record<string, any>
  ): string {
    if (method) return method.toUpperCase();

    if (data) {
      if (data.id || data._id) {
        return 'PUT';
      }
      return 'POST';
    }

    if (params?.action === 'delete' || params?.delete) {
      return 'DELETE';
    }

    return 'GET';
  }

  private isBodyMethod(method: string): boolean {
    return ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());
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

