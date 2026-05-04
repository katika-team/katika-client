import { Stack } from "expo-router";

export default function Connect4Layout() {
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
      <Stack.Screen name="home" />
      <Stack.Screen name="bet" />
      <Stack.Screen name="info" />
      <Stack.Screen name="main" />
    </Stack>
  );
}