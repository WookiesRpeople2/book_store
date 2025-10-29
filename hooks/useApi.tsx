import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { ApiService } from '@/lib/service/ApiService';
import { ApiHookConfig, ApiResponse } from '@/types';
import { API } from '@/constants';

const apiService = new ApiService(API);

export const useApi = <TData, TVariables>({
  endpoint,
  method,
  params,
  data,
  mutationOptions,
}: ApiHookConfig<TData, TVariables>) => {
  const httpMethod = method.toUpperCase();

  if (httpMethod == "DELETE" || httpMethod == "GET") {
    return useQuery<TData>({
      queryKey: [endpoint, params],
      queryFn: async () => {
        const res: ApiResponse<TData> = await apiService.request<TData>({
          endpoint,
          method: httpMethod,
          params,
        });
        
        return res.data;
      },
    });
  }

  return useMutation<ApiResponse<TData>, Error, TVariables>({
    mutationFn: (variables: TVariables) =>
      apiService.request<TData>({
        endpoint,
        method: httpMethod,
        params,
        data: variables || data,
      }),
    ...mutationOptions,
  });
}



