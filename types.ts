import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export type Params = (string | number)[] | Record<string, string>;

export type ApiRequestConfig = {
  endpoint: string;
  method: string;
  params?: Params;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  timestamp: number;
};


export type ApiHookConfig<TData, TVariables> = {
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Params;
  enabled?: boolean;
  mutationOptions?: UseMutationOptions<ApiResponse<TData>, Error, TVariables>;
};

export type Err = {
  status: number;
  statusText: string;
  data: any;
  message: string;
};


export type FilterType = "all" | "read" | "unread" | "favorite";
export type SortType = "title" | "author" | "theme";

//ApiResponse
export type Book = {
  id: number,
  name: string,
  author: string,
  editor: string,
  year: number,
  read: boolean,
  favorite: boolean,
  rating: number,
  cover: string,
  theme: string;
};

export type Notes = {
  bookId: number;
  content: string;
  dateISO: Date;
};

export type Stats = {
  totalBooks: number;
  readCount: number;
  unreadCount: number;
  favoritesCount: number;
  averageRating: number;
};
