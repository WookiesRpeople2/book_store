import "../assets/globals.css";
import { Stack } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorAlert } from "@/components/alert/errorAlert";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toastProvider } from "@/components/providers/toastProvider";
import ToastManager from 'toastify-react-native'


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme() || 'light';

  return (
    <ThemeProvider value={NAV_THEME[colorScheme]}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <ToastManager config={toastProvider} />
        <ErrorBoundary FallbackComponent={({ error }) => (
          <ErrorAlert message={error.message} />
        )}>
          <Stack screenOptions={{ headerShown: false }} />
        </ErrorBoundary>
        <PortalHost />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
