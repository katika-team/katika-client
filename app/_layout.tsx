import { I18nProvider } from "@/lib/i18n/I18nContext";
import { initializeNotifications } from "@/lib/notifications/notifications";
import { useAuthStore } from "@/store/authStore";
import { Stack, router } from "expo-router";
import { useEffect } from "react";

function RootNavigator() {
  const { user, loading, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace("/(tabs)");
      initializeNotifications().catch(console.error);
    } else {
      router.replace("/(auth)/login");
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
