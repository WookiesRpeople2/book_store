import { useApi } from "@/hooks/useApi";
import { BOOKS_API_BOOK_ENDPOINT } from "@/constants";
import { Book } from "@/types";
import { createApiHook } from "@/lib/utils";

export const useBooks = createApiHook<Book[], Book>(BOOKS_API_BOOK_ENDPOINT);

