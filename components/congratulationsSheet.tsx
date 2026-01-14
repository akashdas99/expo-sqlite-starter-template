import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useState } from "react";
import { Dimensions, LayoutChangeEvent, Text, View } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

const CongratulationsSheet = forwardRef<BottomSheet>((_props, ref) => {
  const [bottomInset, setBottomInset] = useState(0);

  const handleContentLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setBottomInset((windowHeight - layout.height) / 2);
    },
    [],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: "#000000" }}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={true}
      detached={true}
      style={{ marginHorizontal: 24, alignSelf: "center" }}
      bottomInset={bottomInset}
      enableContentPanningGesture={false}
    >
      <BottomSheetView
        onLayout={handleContentLayout}
        className="items-center px-6 py-6"
      >
        <Text className="mb-4 text-6xl">🚀</Text>
        <Text className="mb-4 text-center text-3xl font-bold text-white">
          All Set
        </Text>
        <Text className="mb-8 text-center text-lg text-gray-300">
          25+ hours of configuration already done for you.
        </Text>

        <View className="w-full rounded-lg bg-white p-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-base font-semibold text-gray-700">
              Initial Setup
            </Text>
            <Text className="text-base font-bold text-gray-900">8-12 hrs</Text>
          </View>

          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-base font-semibold text-gray-700">
              Testing & Linting Setup
            </Text>
            <Text className="text-base font-bold text-gray-900">4-6 hrs</Text>
          </View>

          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-base font-semibold text-gray-700">
              Project Structure
            </Text>
            <Text className="text-base font-bold text-gray-900">3-5 hrs</Text>
          </View>

          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-base font-semibold text-gray-700">
              Configuration Debugging
            </Text>
            <Text className="text-base font-bold text-gray-900">5-10 hrs</Text>
          </View>

          <View className="border-t border-gray-300 pt-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-bold text-gray-900">
                Total Saved
              </Text>
              <Text className="text-2xl font-bold text-green-600">
                ~25 hours
              </Text>
            </View>
          </View>
        </View>

        <Text className="mt-6 text-center text-sm text-gray-400">
          Start building features immediately instead of configuration
        </Text>

        <View className="mt-6 w-full">
          <Text className="mb-3 text-center text-sm font-semibold text-gray-400">
            KEY LIBRARIES INCLUDED
          </Text>
          <View className="flex-row flex-wrap justify-center gap-2">
            <View className="rounded-full bg-gray-800 px-3 py-1.5">
              <Text className="text-xs font-medium text-white">
                SQLite + Drizzle
              </Text>
            </View>
            <View className="rounded-full bg-gray-800 px-3 py-1.5">
              <Text className="text-xs font-medium text-white">TypeScript</Text>
            </View>
            <View className="rounded-full bg-gray-800 px-3 py-1.5">
              <Text className="text-xs font-medium text-white">NativeWind</Text>
            </View>
            <View className="rounded-full bg-gray-800 px-3 py-1.5">
              <Text className="text-xs font-medium text-white">
                Zustand + React Query
              </Text>
            </View>
            <View className="rounded-full bg-gray-800 px-3 py-1.5">
              <Text className="text-xs font-medium text-white">
                Expo Router
              </Text>
            </View>
            <View className="rounded-full bg-gray-800 px-3 py-1.5">
              <Text className="text-xs font-medium text-white">
                Bottom Sheet
              </Text>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

CongratulationsSheet.displayName = "CongratulationsSheet";

export default CongratulationsSheet;
