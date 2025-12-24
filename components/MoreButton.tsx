import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import * as Clipboard from "expo-clipboard";
import { toast } from "sonner-native";

const MoreButton = ({ pageName }: { pageName: string }) => {
  const [open, setOpen] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(open ? 1 : 0.95, { duration: 150 }) }],
    opacity: withTiming(open ? 1 : 0, { duration: 120 }),
  }));
  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <Pressable
        onPress={() => setOpen((prev) => !prev)}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
      >
        <Ionicons name="ellipsis-horizontal" size={30} color={Colors.primary} />
      </Pressable>
      {open && (
        <Animated.View
          style={[
            animatedStyle,
            { position: "absolute", top: 48, right: 0, zIndex: 1000 },
          ]}
          entering={FadeIn.duration(120)}
          exiting={FadeOut.duration(100)}
        >
          <Animated.View
            entering={ZoomIn.duration(150)}
            exiting={ZoomOut.duration(120)}
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: 8,
              overflow: "hidden",
              paddingTop: 8,
              width: 200,
            }}
          >
            <Pressable
              onPress={() => {
                setOpen(false);
                Clipboard.setStringAsync(
                  `todoist://(authenticated)/tabs/${pageName.toLowerCase()}`
                );
                toast.success("Link copied to clipboard");
              }}
              style={{
                marginTop: 4,
                paddingHorizontal: 16,
                paddingVertical: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomWidth: 1,
                borderColor: "#d1d5db",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Copy
              </Text>
              <Ionicons name="copy-outline" size={18} color={Colors.dark} />
            </Pressable>

            <Pressable
              onPress={() => setOpen(false)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: "#f3f4f6",
                borderBottomWidth: 1,
                borderColor: "#d1d5db",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Item 2
              </Text>
            </Pressable>

            <View className="h-px bg-gray-200" />

            <Pressable
              onPress={() => setOpen(false)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: "#f3f4f6",
                borderBottomWidth: 1,
                borderColor: "#d1d5db",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Item 3
              </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

export default MoreButton;
