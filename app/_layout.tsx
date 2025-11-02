import "../assets/globals.css";
import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorAlert } from "@/components/alert/errorAlert";
import { toastProvider } from "@/components/providers/toastProvider";
import ToastManager from 'toastify-react-native';
import { BackArrow } from "@/components/backArrow";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "@/constants";
import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import NetInfo from "@react-native-community/netinfo";

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: STORAGE_KEY,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
      networkMode: "online"
    },
    mutations: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      networkMode: 'offlineFirst',
    },
  },
});

const setupNetworkListener = () => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      console.log('[NETWORK] Back online - resuming mutations');
      queryClient.resumePausedMutations();
    } else {
      console.log('[NETWORK] Offline - mutations will be queued');
    }
  });

  return unsubscribe;
};

const Content = () => {
  useEffect(() => {
    const unsubscribe = setupNetworkListener();
    return () => unsubscribe();
  }, []);

  return (
    <>
      <StatusBar style={useColorScheme() === 'dark' ? 'light' : 'dark'} />
      <ToastManager config={toastProvider} />
      <ErrorBoundary FallbackComponent={({ error }) => (
        <ErrorAlert message={error.message} />
      )}>
        <BackArrow />
        <Stack screenOptions={{ headerShown: false }} />
      </ErrorBoundary>
      <PortalHost />
    </>
  );
};


export default function RootLayout() {
  const colorScheme = useColorScheme() || 'light';
  const [isHydrated, setIsHydrated] = useState(false);

  return (
    <ThemeProvider value={NAV_THEME[colorScheme]}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{
        persister: asyncStoragePersister, dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            return query.state.status !== 'pending';
          },
        },
      }} onSuccess={() => setIsHydrated(true)}>
        {isHydrated ? <Content /> : null}
      </PersistQueryClientProvider>
    </ThemeProvider >
  );
}
