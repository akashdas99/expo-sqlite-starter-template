import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import * as schema from "./schema";
import { openDatabaseSync } from "expo-sqlite";
import migrations from "../drizzle/migrations";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

export const DATABASE_NAME = "users";
const expoDb = openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expoDb, { schema });

export function useDatabaseMigrations() {
  return useMigrations(db, migrations);
}
export function useStudio() {
  return useDrizzleStudio(expoDb);
}
