import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator, Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
export const DATABASE_NAME = "users";

const expoDb = openDatabaseSync(DATABASE_NAME);
export default function RootLayout() {
  const db = drizzle(expoDb);
  useDrizzleStudio(expoDb);
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <SafeAreaProvider
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            backgroundColor: "grey",
          }}
        >
          <Stack>
            <Stack.Screen
              name="index"
              options={{ title: "Users", headerShown: false }}
            />
          </Stack>
        </SafeAreaProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
