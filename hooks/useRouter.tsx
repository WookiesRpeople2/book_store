import { queryClient } from '@/app/_layout';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter as useExpoRouter, useFocusEffect } from 'expo-router';
import { useCallback, useEffect } from 'react';

export const useRouter = () => {
  const router = useExpoRouter();
  const queryClient = useQueryClient();
  

  const goBackAndReload = useCallback(() => {
    if (router.canGoBack()) {
      router.back()
    }
  }, [router, queryClient]);

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries();
    }, [queryClient])
  );

  return { ...router, goBackAndReload };
}
