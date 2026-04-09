import { RootState, store } from '@/src/store';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';

function ProtectedLayout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(tabs)';
    const inLoginGroup = segments[0] === 'login';
    
    setTimeout(() => {
      if (!isAuthenticated && !inLoginGroup) {
        router.replace('/login');
      } else if (isAuthenticated && !inAuthGroup) {
        router.replace('/(tabs)');
      }
    }, 1);
  }, [isAuthenticated, segments, navigationState?.key]);

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
