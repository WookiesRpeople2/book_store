import { OPEN_LIB_API, OPEN_LIB_STATS_ENDPOINT } from "@/constants";
import { createApiHook } from "@/lib/utils";
import { ApiHookConfig, OpenLib } from "@/types";




export const useOpenLib = <TData = OpenLib, TVariables = void>(
  config?: ApiHookConfig<TData, TVariables>
) => {
  return createApiHook<TData, TVariables>(OPEN_LIB_API, OPEN_LIB_STATS_ENDPOINT)(config);
};

