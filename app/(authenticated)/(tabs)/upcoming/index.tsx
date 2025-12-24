import Fab from "@/components/Fab";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Text>Page</Text>
        <Fab />
      </View>
    </SafeAreaView>
  );
};

export default Page;
