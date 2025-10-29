import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { Key } from "react";

export type ApiRequestConfig = {
  endpoint: string;
  method: string;
  params?: Record<string, any>;
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
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Record<string, any>;
  data?: TVariables;
  mutationOptions?: UseMutationOptions<ApiResponse<TData>, Error, TVariables>;
};

export type Err = {
  status: number;
  statusText: string;
  data: any;
  message: string;
};


//ApiResponse
export type Book = {
  id: Key,
  name: string,
  aurthor: string,
  editor: string,
  year: Number,
  read: Boolean,
  favorite: Boolean,
  rateing: Number,
  cover: string,
  theme: string;
};
