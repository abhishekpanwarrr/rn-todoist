import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const Profile = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  console.log("🚀 ~ Profile ~ user:", user);
  console.log("🚀 ~ Profile ~ isSignedIn:", isSignedIn);
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Profile</Text>
      <Text>Email {user?.primaryEmailAddress?.emailAddress}</Text>
      {isSignedIn && (
        <Button title="Sign out" onPress={async () => await signOut()} />
      )}
      <Button title="Go Back" onPress={() => router.push("/")} />
    </View>
  );
};

export default Profile;
