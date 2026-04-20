import { I18nProvider } from "@/lib/i18n/I18nContext";
import { initializeNotifications } from "@/lib/notifications/notifications";
import { useAuthStore } from "@/store/authStore";
import * as Linking from 'expo-linking';
import { Stack, router } from "expo-router";
import { useEffect, useRef } from "react";

function RootNavigator() {
  const { user, loading, initialize } = useAuthStore();
  const pendingRefCode = useRef<string | null>(null);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        const parsed = Linking.parse(url);
        const ref = parsed.queryParams?.ref;
        if (ref && typeof ref === 'string') {
          pendingRefCode.current = ref.toUpperCase();
        }
      }
    });
    const subscription = Linking.addEventListener('url', (event) => {
      const parsed = Linking.parse(event.url);
      const ref = parsed.queryParams?.ref;
      if (ref && typeof ref === 'string') {
        pendingRefCode.current = ref.toUpperCase();
        if (!useAuthStore.getState().user) {
          router.push({ pathname: '/(auth)/signup', params: { ref: ref.toUpperCase() } });
        }
      }
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace("/(tabs)");
      initializeNotifications().catch(console.error);
    } else {
      if (pendingRefCode.current) {
        router.replace({ pathname: '/(auth)/signup', params: { ref: pendingRefCode.current } });
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [user, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="all-games" />
      <Stack.Screen name="language" />
      <Stack.Screen name="language-selection" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="transactions" />
      <Stack.Screen name="game/[id]" />
      <Stack.Screen name="(onboardScreen)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="splashscreen" />
      <Stack.Screen name="(passkey)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <I18nProvider>
      <RootNavigator />
    </I18nProvider>
  );
}
