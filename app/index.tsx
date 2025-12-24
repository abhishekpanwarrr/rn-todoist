import { Colors } from "@/constants/colors";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { startOAuthFlow: googleOauth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: appleOauth } = useOAuth({
    strategy: "oauth_apple",
  });

  const handleAppleOAuth = async () => {
    try {
      const { setActive, createdSessionId } = await appleOauth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
      console.log(
        "🚀 ~ handleAppleOAuth ~ createdSessionId:",
        createdSessionId
      );
    } catch (error) {
      console.log("🚀 ~ handleAppleOAuth ~ error:", error);
    }
  };
  const handleGoogleOAuth = async () => {
    try {
      const { setActive, createdSessionId } = await googleOauth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
      console.log(
        "🚀 ~ handleGoogleOAuth ~ createdSessionId:",
        createdSessionId
      );
    } catch (error) {
      console.log("🚀 ~ handleGoogleOAuth ~ error:", error);
    }
  };
  const openLink = async () => {
    WebBrowser.openBrowserAsync("https://google.com");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 20,
        }}
      >
        <Image
          source={require("@/assets/images/todoist-logo.png")}
          style={styles.image}
        />
        <Image
          source={require("@/assets/images/login.png")}
          style={styles.bannerImage}
        />

        <View
          style={{
            justifyContent: "center",
            paddingHorizontal: 20,
            gap: 8,
          }}
        >
          <TouchableOpacity onPress={handleAppleOAuth} style={styles.button}>
            <Ionicons name="logo-apple" size={24} />
            <Text style={styles.buttonText}>Continue with apple</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoogleOAuth} style={styles.button}>
            <Ionicons name="logo-google" size={24} />
            <Text style={styles.buttonText}>Continue with google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="mail" size={24} />
            <Text style={styles.buttonText}>Continue with email</Text>
          </TouchableOpacity>
          <Text style={styles.extraText}>
            By continuing, you agree to todoist's{" "}
            <Text className="font-bold text-black underline" onPress={openLink}>
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text className="font-bold text-black underline">
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
  },
  bannerImage: {
    resizeMode: "contain",
    height: 250,
    alignSelf: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
    borderRadius: 10,
    backgroundColor: Colors.lightText,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#000",
  },
  extraText: {
    textAlign: "center",
    fontSize: 12,
    color: "#6b7280",
  },
});
