import { useOAuth, useUser } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Button, Text, View } from "react-native";

// export const useWarmUpBrowser = () => {
//   useEffect(() => {
//     if (Platform.OS !== "android") return;
//     void WebBrowser.warmUpAsync();
//     return () => {
//       // Cleanup: closes browser when component unmounts
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };
WebBrowser.maybeCompleteAuthSession();
// Handle any pending authentication sessions
// WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const onPress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "todoist",
          path: "oauth-native-callback",
        }),
      });

      if (createdSessionId) {
        if (setActive) {
          await setActive({ session: createdSessionId });
        }
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text- xl text-red-500">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text className="text-green-500">Abhishek</Text>
      {!isSignedIn && <Button title="Sign in with Google" onPress={onPress} />}
      <Button title="Profile" onPress={() => router.push("/profile")} />
    </View>
  );
}
