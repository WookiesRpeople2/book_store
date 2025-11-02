import { QueryObserverResult } from '@tanstack/react-query';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

type UseRefreshOptions = {
  onRefresh: () => Promise<QueryObserverResult> | Promise<void>;
  refetchOnFocus: boolean;
};

export const useRefreshOnFocus = ({
  onRefresh,
  refetchOnFocus = true,
}: UseRefreshOptions) => {
  const router = useRouter();
  const trigger = useCallback(async () => {
    await onRefresh();
  }, [onRefresh]);

  useFocusEffect(
    useCallback(() => {
      if (refetchOnFocus) {
        onRefresh();
      }
    }, [onRefresh, refetchOnFocus])
  );

  return {
    trigger,
    refresh: trigger,
  };
};
