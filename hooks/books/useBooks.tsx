import { useApi } from "@/hooks/useApi";
import { BOOKS_API_BOOK_ENDPOINT } from "@/constants";
import { ApiHookConfig } from "@/types";

export const useBooks = <TData, TVariables>({
  method,
  params,
  data,
  queryOptions,
  mutationOptions,
}: ApiHookConfig<TData, TVariables>) => {
  return useApi<TData, TVariables>({
    endpoint: BOOKS_API_BOOK_ENDPOINT,
    method,
    params,
    data,
    queryOptions,
    mutationOptions,
  });
};

