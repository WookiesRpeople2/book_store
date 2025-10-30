import { useApi } from "@/hooks/useApi";
import { ApiHookConfig } from "@/types";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createApiHook = <TData, TVariables = void>(endpoint: string) => {
  return ({
    method = "GET",
    params,
    mutationOptions,
  }: ApiHookConfig<TData, TVariables> = {} as ApiHookConfig<TData, TVariables>) => {
    return useApi<TData, TVariables>({
      endpoint,
      method,
      params,
      mutationOptions,
    }) as UseQueryResult<TData> & UseMutationResult;
  };
};

