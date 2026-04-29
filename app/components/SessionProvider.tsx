import React from "react";
import { BetaGamerProvider } from "@beta-gamer/react-native";
import { useLocalSearchParams } from "expo-router";

interface SessionProviderProps {
  children: React.ReactNode;
  fallbackToken?: string;
}

export default function SessionProvider({ 
  children, 
  fallbackToken = "bg_test_demo_token_for_checkers" 
}: SessionProviderProps) {
  const { token } = useLocalSearchParams();
  
  return (
    <BetaGamerProvider 
      serverUrl="https://beta-gamer.onrender.com"
      socketPath="/api/socket/io"
      token={token as string || fallbackToken}
    >
      {children}
    </BetaGamerProvider>
  );
}