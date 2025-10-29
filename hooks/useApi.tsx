import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiService } from '@/lib/service/ApiService';
import { ApiHookConfig, ApiResponse } from '@/types';
import { API } from '@/constants';

const apiService = new ApiService(API);

export const useApi = <TData, TVariables>({
  endpoint,
  method = "GET",
  params,
  data,
  queryOptions,
  mutationOptions,
}: ApiHookConfig<TData, TVariables>) => {
  const httpMethod = method ? method.toUpperCase() : undefined;

  if (httpMethod === 'GET' || (!httpMethod && !data)) {
    return useQuery({
      queryKey: [endpoint, params],
      queryFn: () => apiService.request<TData>({ endpoint, method: 'GET', params }),
      ...queryOptions,
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

