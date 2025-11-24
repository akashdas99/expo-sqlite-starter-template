import { Stack } from "expo-router";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
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
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Users", headerShown: false }}
          />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
