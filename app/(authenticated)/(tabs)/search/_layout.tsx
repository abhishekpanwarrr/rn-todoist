import { Colors } from "@/constants/colors";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Search",
          headerLargeTitleEnabled: true,
          headerSearchBarOptions: {
            placeholder: "Tasks, projects and more...",
            tintColor: Colors.primary,
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
