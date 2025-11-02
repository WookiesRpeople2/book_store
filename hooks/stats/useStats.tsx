import { API, BOOKS_API_STATS_ENDPOINT } from "@/constants";
import { createApiHook } from "@/lib/utils";
import { ApiHookConfig, Stats } from "@/types";


export const useStats = <TData = Stats, TVariables = void>(
  config?: ApiHookConfig<TData, TVariables>
) => {
  return createApiHook<TData, TVariables>(API, BOOKS_API_STATS_ENDPOINT)(config);
};

