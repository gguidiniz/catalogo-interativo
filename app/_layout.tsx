import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/src/store';
import { StatusBar } from 'expo-status-bar';

function ProtectedLayout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';
    
    if (isAuthenticated && !inAuthGroup) {
      router.replace('/(tabs)');
    } else if (!isAuthenticated && inAuthGroup) {
      router.replace('/login');
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ProtectedLayout />
      <StatusBar style="auto" />
    </Provider>
  );
}
