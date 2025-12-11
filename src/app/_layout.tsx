import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { AuthProvider } from '../Contex/AuthContext/authContext';

function RootStack() {
  return (
    <Stack>
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false, animation: 'none' }} />
      <Stack.Screen name="settings" options={{ headerShown: false, animation: 'none' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootStack />
      </AuthProvider>
    </QueryClientProvider>
  );
}
