import { useMutation, UseMutationResult, useQuery, UseQueryResult, useSuspenseQuery } from '@tanstack/react-query';
import { ApiService } from '@/lib/service/ApiService';
import { ApiHookConfig, ApiResponse } from '@/types';

export const useApi = <TData, TVariables>({
  api,
  endpoint,
  method,
  params,
  enabled,
  mutationOptions,
}: ApiHookConfig<TData, TVariables>) => {
  const apiService = new ApiService(api ?? "");
  const httpMethod = method!.toUpperCase();
  
  if (httpMethod == "GET") {
    return useQuery<TData>({
      queryKey: [endpoint, params],
      queryFn: async () => {
        const res: ApiResponse<TData> = await apiService.request<TData>({
          endpoint: endpoint ?? "",
          method: httpMethod,
          params,
        });
        return (res.data ?? res) as TData;
      },
      enabled,
    });
  }

  return useMutation<ApiResponse<TData>, Error, TVariables>({
    mutationFn: (variables: TVariables) => {
      const requestData = variables;
      return apiService.request<TData>({
        endpoint: endpoint ?? "",
        method: httpMethod,
        params,
        data: requestData,
      });
    },
    ...mutationOptions,
  });
}



