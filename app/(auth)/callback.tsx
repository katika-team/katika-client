import { supabase } from "@/lib/supabase/client";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        const url = Linking.parse(initialUrl || "");
        const params = url.queryParams;

        if (params?.access_token) {
          const accessToken = params.access_token as string;
          const refreshToken = (params.refresh_token as string) || "";
          const { data, error: authError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (authError) {
            setError(authError.message);
            return;
          }

          if (data.session) {
            router.replace("/(tabs)");
          } else {
            router.replace("/(auth)/login");
          }
        } else {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            router.replace("/(tabs)");
          } else {
            router.replace("/(auth)/login");
          }
        }
      } catch (e: any) {
        setError(e.message || "Authentication failed");
      }
    };

    handleCallback();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Authentication Error</Text>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#5929d4" />
      <Text style={styles.loadingText}>Completing sign in...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    marginTop: 16,
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "#f44336",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  errorMessage: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
