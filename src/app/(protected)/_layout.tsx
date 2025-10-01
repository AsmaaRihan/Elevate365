import { AuthContext } from '@/src/Contex/AuthContext/authContext';
import { Redirect, Stack } from 'expo-router';
import { t } from 'i18next';
import { useContext } from 'react';

export default function ProtectedLayout() {
  const authContext = useContext(AuthContext);

  if (!authContext.isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: t('home') }} />
      <Stack.Screen name="product" options={{ headerShown: false, title: t('products') }} />
    </Stack>
  );
}
