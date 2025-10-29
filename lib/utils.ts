import { useApi } from "@/hooks/useApi";
import { ApiHookConfig } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createApiHook = <TData, TVariables = void>(endpoint: string) => {
  return ({
    method = "GET",
    params,
    data,
    mutationOptions,
  }: ApiHookConfig<TData, TVariables> = {} as ApiHookConfig<TData, TVariables>) => {
    return useApi<TData, TVariables>({
      endpoint,
      method,
      params,
      data,
      mutationOptions,
    }) as UseQueryResult<TData>;
  };
};

