import { Colors } from "@/constants/colors";
import "@/global.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { addDummyData } from "@/utils/addDummyData";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;
    const isAuthGroup = segments[0] === "(authenticated)";
    if (isSignedIn && !isAuthGroup) {
      router.replace("/(authenticated)/(tabs)/today");
    } else if (!isSignedIn && pathname !== "/") {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        {/* <ActivityIndicator size={"large"} color={Colors.primary} /> */}
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};

const RootLayout = () => {
  const expoDB = openDatabaseSync("todos");
  const db = drizzle(expoDB);
  const { success, error } = useMigrations(db, migrations);
  console.log("🚀 ~ RootLayout ~ error:", error);
  useEffect(() => {
    if (!success) return;
    addDummyData(db);
  }, [success]);
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Suspense fallback={<Loading />}>
          <SQLiteProvider
            databaseName="todos"
            useSuspense
            options={{
              enableChangeListener: true,
            }}
          >
            <Toaster />
            <InitialLayout />
          </SQLiteProvider>
        </Suspense>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
};

function Loading() {
  return <ActivityIndicator size="large" color={Colors.primary} />;
}
export default RootLayout;
