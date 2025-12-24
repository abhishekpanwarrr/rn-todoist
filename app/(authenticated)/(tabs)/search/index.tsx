import Fab from "@/components/Fab";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Page = () => {
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View className="flex-1">
          <Text>Page</Text>
        </View>
      </ScrollView>
      <Fab />
    </>
  );
};

export default Page;
