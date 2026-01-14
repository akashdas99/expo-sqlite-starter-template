import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CongratulationsSheet from "../components/congratulationsSheet";

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
      </View>

      <CongratulationsSheet ref={bottomSheetRef} />
    </SafeAreaView>
  );
}
