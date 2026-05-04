import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: "",
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="control" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="checkers" />
      <Stack.Screen name="TTT" />
      <Stack.Screen name="connect4" />
      <Stack.Screen name="chkobe" />
    </Stack>
  );
}
