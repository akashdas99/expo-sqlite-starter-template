import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DATABASE_NAME, expoDb } from "../db/db";
import "../global.css";
import { QueryProvider } from "../providers/QueryProvider";

export default function RootLayout() {
  useDrizzleStudio(expoDb);
  return (
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
  );
}
