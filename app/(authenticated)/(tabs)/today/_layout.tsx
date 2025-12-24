import MoreButton from "@/components/MoreButton";
import { Colors } from "@/constants/colors";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack
    // screenOptions={{
    //   headerShadowVisible: false,
    //   contentStyle: {
    //     backgroundColor: Colors.background,
    //   },
    // }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Today",
          // headerLargeTitleEnabled: true,
          headerShadowVisible: false,
          headerRight: () => <MoreButton pageName="Today" />,
        }}
      />
    </Stack>
  );
};

export default Layout;
