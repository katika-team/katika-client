import { I18nProvider } from "@/lib/i18n/I18nContext";
import { initializeNotifications } from "@/lib/notifications/notifications";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";

function RootNavigator() {
  const [isReady, setIsReady] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  // Wait for splash screen time to display
  useEffect(() => {
    // Give splash screen time to display (2 seconds minimum)
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Navigate once ready
  useEffect(() => {
    if (!isReady || hasNavigated) return;

    // For now, navigate to main tabs
    setHasNavigated(true);
    router.replace("/(tabs)");
    initializeNotifications().catch(console.error);
  }, [isReady, hasNavigated]);

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
