import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="mb-4 text-3xl font-bold text-gray-900">
          Welcome to Your App
        </Text>
        <Text className="text-center text-base text-gray-600">
          Start building your amazing React Native application
        </Text>
      </View>
    </SafeAreaView>
  );
}
