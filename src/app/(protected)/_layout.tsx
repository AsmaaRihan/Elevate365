import { useAuth } from '@/src/Contex/AuthContext/authContext';
import { Redirect, Stack } from 'expo-router';
import { t } from 'i18next';

export default function ProtectedLayout() {
  const { isLoggedIn, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: t('home') }} />
      <Stack.Screen name="product" options={{ headerShown: false, title: t('products') }} />
    </Stack>
  );
}
