import { useApi } from "@/hooks/useApi";
import { BOOKS_API_BOOK_ENDPOINT } from "@/constants";
import { ApiHookConfig, Book } from "@/types";
import { createApiHook } from "@/lib/utils";

export const useBooks = <TData = Book, TVariables = void>(
  config?: ApiHookConfig<TData, TVariables>
) => {
  return createApiHook<TData, TVariables>(BOOKS_API_BOOK_ENDPOINT)(config);
};

