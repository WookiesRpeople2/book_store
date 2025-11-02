import "../assets/globals.css";
import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import { NAV_THEME } from "@/lib/theme";
import { Platform, useColorScheme } from "react-native";
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
import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";
import { ThemeProvider } from "@/context/themeContext";
import { useTheme } from "@/hooks/useTheme";
import { PersistGate } from "@/components/loaders/persistGate";

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: STORAGE_KEY,
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
      networkMode: "offlineFirst"
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

const Content = () => (
  <>
    <StatusBar style={useColorScheme() === 'dark' ? 'light' : 'dark'} />
    <ToastManager config={toastProvider} />
    <ErrorBoundary FallbackComponent={({ error }) => (
      <ErrorAlert message={error.message} />
    )}>
      <BackArrow />
      <Stack screenOptions={{ headerShown: false, }} />
    </ErrorBoundary>
    <PortalHost />
  </>
);


const Providers = () => {
  const { colorScheme } = useTheme();
  useEffect(() => {
    if (Platform.OS == "web") return;
    const unsubscribe = setupNetworkListener();
    return () => unsubscribe();
  }, []);


  return (
    <NavThemeProvider value={NAV_THEME[colorScheme]}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{
        persister: asyncStoragePersister, dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            return query.state.status !== 'success';
          },
        },
      }}>
        <PersistGate>
          <Content />
        </PersistGate>
      </PersistQueryClientProvider>
    </NavThemeProvider >
  );
};


export default function RootLayout() {
  return (
    <ThemeProvider>
      <Providers />
    </ThemeProvider>
  );
}
