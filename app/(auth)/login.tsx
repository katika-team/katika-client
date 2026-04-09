import { useTranslation } from "@/lib/i18n/I18nContext";
import { useAuthStore } from "@/store/authStore";
import * as Google from "expo-auth-session/providers/google";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID = "976625159463-jn3uqfcbvj5hsi6s82ekqfpovhi7ufmb.apps.googleusercontent.com";
const ANDROID_CLIENT_ID = "976625159463-on82bpr2kub0f3v415ls0lv8lqae57ig.apps.googleusercontent.com";

export default function Login() {
  const { t } = useTranslation();
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Montserrat-Regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
  });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const { signIn, signInWithGoogle } = useAuthStore();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: WEB_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: WEB_CLIENT_ID,
    redirectUri: 'https://auth.expo.io/@jimhilary/skibag',
  });

  useEffect(() => {
    if (response?.type === "success") {
      const auth = response.authentication;
      const id_token = auth?.idToken;
      const access_token = auth?.accessToken;
      if (id_token && access_token) {
        setLoading(true);
        signInWithGoogle(id_token, access_token)
          .then(() => router.replace("/(tabs)"))
          .catch((e: any) => Alert.alert(t("error"), e.message))
          .finally(() => setLoading(false));
      }
    }
  }, [response]);

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      Alert.alert("Coming Soon", "Apple sign in will be available soon");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to sign in with Apple");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert(t("error"), "Email and password required");
      return;
    }
    try {
      setLoginLoading(true);
      await signIn(email.trim(), password);
      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert(t("error"), e.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ImageBackground
        source={require("@/assets/images/zane.jpeg")}
        resizeMode="cover"
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0)",
            "rgba(37, 16, 104, 0.68)",
            "rgba(0, 0, 7, 0.99)",
          ] as const}
          start={{ x: 0.2, y: 0.3 }}
          end={{ x: 0.1, y: 1 }}
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              paddingHorizontal: 10,
              justifyContent: "center",
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "flex-end",
                }}
                keyboardShouldPersistTaps="handled"
              >
                <View
                  style={{
                    justifyContent: "flex-end",
                    paddingBottom: 80,
                    paddingHorizontal: 25,
                  }}
                >
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />

                  <Text style={[styles.label, { marginTop: 20 }]}>
                    {t("password")}
                  </Text>
                  <View
                    style={{
                      position: "relative",
                      width: "100%",
                      marginTop: 8,
                    }}
                  >
                    <TextInput
                      style={styles.textInput}
                      placeholder={t("password")}
                      placeholderTextColor="#999"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword((v) => !v)}
                      style={{ position: "absolute", right: 15, top: 15 }}
                    >
                      <Text style={{ color: "#555", fontSize: 13 }}>
                        {showPassword ? t("hide_password") : t("show_password")}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    disabled={loginLoading}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {loginLoading ? (
                        <ActivityIndicator
                          size="small"
                          color="#fff"
                          style={{ marginRight: 8 }}
                        />
                      ) : null}
                      <Text style={styles.loginButtonText}>{t("login")}</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}> OR </Text>
                    <View style={styles.line} />
                  </View>

                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={handleGoogleSignIn}
                    disabled={!request || loading}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {loading ? (
                        <ActivityIndicator
                          size="small"
                          color="#000"
                          style={{ marginRight: 10 }}
                        />
                      ) : (
                        <Image
                          source={require("@/assets/logos/google.png")}
                          style={styles.socialLogo}
                        />
                      )}
                      <Text style={styles.socialButtonText}>
                        {t("or_continue_with")} Google
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {Platform.OS === "ios" && (
                    <TouchableOpacity
                      style={[styles.socialButton, { marginTop: 10 }]}
                      onPress={handleAppleSignIn}
                      disabled={loading}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {loading ? (
                          <ActivityIndicator
                            size="small"
                            color="#000"
                            style={{ marginRight: 10 }}
                          />
                        ) : (
                          <Image
                            source={require("@/assets/logos/apple.png")}
                            style={styles.socialLogo}
                          />
                        )}
                        <Text style={styles.socialButtonText}>
                          {t("or_continue_with")} Apple
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}

                  <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>
                      {t("dont_have_account")}{" "}
                    </Text>
                    <TouchableOpacity onPress={() => router.push("/signup")}>
                      <Text style={styles.signupLink}>{t("sign_up")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#e0e0e0",
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 16,
    borderRadius: 12,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: "#000",
    width: "100%",
  },
  socialButton: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 100,
    width: "100%",
    alignItems: "center",
    marginTop: 12,
  },
  socialLogo: { width: 30, height: 30, marginRight: 10 },
  socialButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat-Regular",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  line: { flex: 1, height: 1, backgroundColor: "#5a5a8076" },
  orText: {
    color: "#b6b6b6d0",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  loginButton: {
    backgroundColor: "#5929d4",
    padding: 16,
    borderRadius: 100,
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  signupContainer: {
    alignItems: "center",
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#f0f0f0d0",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  signupLink: {
    color: "#454ef3",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Montserrat-Regular",
  },
});
