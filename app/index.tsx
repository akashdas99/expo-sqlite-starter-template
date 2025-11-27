import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
      <View style={{ flex: 1, backgroundColor: "blue" }} />
    </SafeAreaView>
  );
}
