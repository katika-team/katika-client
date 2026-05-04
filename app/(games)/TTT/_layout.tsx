import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack 
    screenOptions={{
      headerShown: false,
      headerBlurEffect: "light",
      headerBackVisible: false,
      headerTintColor: "#000",
      headerTransparent: true,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerShadowVisible: false,
    }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="stake" />
    <Stack.Screen name="home" />
    <Stack.Screen name="gameinfo" />
    <Stack.Screen name="policy" />
    <Stack.Screen name="loading" />
    <Stack.Screen name="main" />
    {/* <Stack.Screen name="bet" /> */}
  </Stack>);
}
