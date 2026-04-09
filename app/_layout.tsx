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

    const inLoginGroup = segments[0] === 'login';
    const isRoot = !segments[0] || (segments as string[]).length === 0;
    
    setTimeout(() => {
      if (!isAuthenticated && !inLoginGroup) {
        router.replace('/login');
      } else if (isAuthenticated) {
        if (inLoginGroup || isRoot) {
          router.replace('/(tabs)');
        }
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
