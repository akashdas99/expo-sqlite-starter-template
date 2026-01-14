import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DATABASE_NAME, useDatabaseMigrations, useStudio } from "../db/client";
import "../global.css";
import { QueryProvider } from "../providers/QueryProvider";

export default function RootLayout() {
  const { success, error } = useDatabaseMigrations();
  useStudio();
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-red-50">
        <Text className="mb-2 text-lg font-bold text-red-600">
          Database Error
        </Text>
        <Text className="text-red-500">{error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600">Initializing database...</Text>
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <Suspense fallback={<ActivityIndicator size="large" />}>
          <SQLiteProvider
            databaseName={DATABASE_NAME}
            options={{ enableChangeListener: true }}
            useSuspense
          >
            <SafeAreaProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaProvider>
          </SQLiteProvider>
        </Suspense>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
