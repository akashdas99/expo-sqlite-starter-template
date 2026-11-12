import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "rn-toastie";
import CongratulationsSheet from "../components/congratulationsSheet";

const toastExamples = [
  { message: "Success", onPress: () => toast.success("Success") },
  { message: "Error", onPress: () => toast.error("Error") },
  {
    message: "Undo",
    onPress: () =>
      toast("Undo", {
        action: { label: "Undo", onPress: () => toast.success("Restored") },
      }),
  },
  {
    message: "Promise",
    onPress: () =>
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1200)), {
        loading: "Promise",
        success: "Success",
        error: "Error",
      }),
  },
];

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="mb-4 text-3xl font-bold text-gray-900">
          Welcome to Your App
        </Text>
        <Text className="mb-8 text-center text-base text-gray-600">
          Start building your amazing React Native application
        </Text>

        <Pressable
          onPress={handleOpenSheet}
          className="rounded-lg bg-black px-8 py-4"
        >
          <Text className="text-base font-semibold text-white">
            See Time Saved 🎉
          </Text>
        </Pressable>

        <View className="mt-10 w-full max-w-xs gap-3">
          <Text className="text-center text-sm font-medium text-gray-500">
            Toast examples
          </Text>
          {toastExamples.map((example) => (
            <Pressable
              key={example.message}
              onPress={example.onPress}
              className="rounded-lg border border-gray-300 px-4 py-3"
            >
              <Text className="text-center text-base font-medium text-gray-900">
                {example.message}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <CongratulationsSheet ref={bottomSheetRef} />
    </SafeAreaView>
  );
}
