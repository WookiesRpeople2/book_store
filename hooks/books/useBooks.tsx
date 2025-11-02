import { useApi } from "@/hooks/useApi";
import { API, BOOKS_API_BOOK_ENDPOINT } from "@/constants";
import { ApiHookConfig, Book } from "@/types";
import { createApiHook } from "@/lib/utils";

export const useBooks = <TData = Book, TVariables = void>(
  config?: ApiHookConfig<TData, TVariables>
) => {
  return createApiHook<TData, TVariables>(API, BOOKS_API_BOOK_ENDPOINT)(config);
};

