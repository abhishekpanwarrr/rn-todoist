import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { toast } from "sonner-native";
import * as Heptics from "expo-haptics";

const Fab = () => {
  const router = useRouter();
  const onPress = () => {
    toast.success("Fab pressed!");
    Heptics.impactAsync(Heptics.ImpactFeedbackStyle.Light);
    router.push("/task/newTask");
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        bottom: 80,
        height: 50,
        width: 50,
        right: 40,
        zIndex: 1000,
        backgroundColor: "#dc2626",
        borderRadius: 60,
        shadowOffset: {
          width: 3,
          height: 3,
        },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="add" size={24} color={"white"} />
    </TouchableOpacity>
  );
};

export default Fab;
