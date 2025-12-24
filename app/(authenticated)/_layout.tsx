import { Stack } from "expo-router";

const AuthenticatedLayout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="task/newTask" options={{ presentation: "modal" }} />
      <Stack.Screen name="task/[id]" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default AuthenticatedLayout;
