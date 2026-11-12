import { drizzle, type ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import {
  openDatabaseAsync,
  openDatabaseSync,
  type SQLiteDatabase,
} from "expo-sqlite";
import { useEffect, useState } from "react";
import migrations from "../drizzle/migrations";
import * as schema from "./schema";

export const DATABASE_NAME = "app.db";

type AppDatabase = ExpoSQLiteDatabase<typeof schema> & {
  $client: SQLiteDatabase;
};

type Client = {
  expoDb: SQLiteDatabase;
  db: AppDatabase;
};

let clientPromise: Promise<Client> | null = null;

/**
 * The sync API waits on the web worker without yielding. On web that worker
 * is still compiling WASM on the first call, so the wait times out. An async
 * open lets the worker finish, and the sync connection after that is fast.
 */
export function prepareDatabase(): Promise<Client> {
  if (!clientPromise) {
    clientPromise = (async () => {
      const memory = await openDatabaseAsync(":memory:");
      await memory.closeAsync();
      const expoDb = openDatabaseSync(DATABASE_NAME);
      const db = drizzle(expoDb, { schema });
      return { expoDb, db };
    })().catch((error: unknown) => {
      clientPromise = null;
      throw error;
    });
  }
  return clientPromise;
}

export function useDatabase() {
  const [client, setClient] = useState<Client | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    prepareDatabase().then(
      (next) => {
        if (!cancelled) setClient(next);
      },
      (cause: unknown) => {
        if (!cancelled) {
          setError(cause instanceof Error ? cause : new Error(String(cause)));
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return { client, error };
}

export function useDatabaseMigrations(db: AppDatabase) {
  return useMigrations(db, migrations);
}

export function useStudio(expoDb: SQLiteDatabase) {
  return useDrizzleStudio(expoDb);
}
