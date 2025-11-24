import { Pressable, StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { usersTable } from "../db/schema";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";

const expo = SQLite.openDatabaseSync("db.db");

const db = drizzle(expo);

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  const [items, setItems] = useState<(typeof usersTable.$inferSelect)[] | null>(
    null
  );
  const insertUser = async () => {
    await db.insert(usersTable).values([
      {
        name: "John",
        age: 30,
        email: "john@example.com",
      },
    ]);

    const users = await db.select().from(usersTable);
    setItems(users);
  };
  useEffect(() => {
    if (!success) return;

    (async () => {
      await db.delete(usersTable);

      await db.insert(usersTable).values([
        {
          name: "John",
          age: 30,
          email: "john@example.com",
        },
      ]);

      const users = await db.select().from(usersTable);
      setItems(users);
    })();
  }, [success]);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  if (items === null || items.length === 0) {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {items.map((item) => (
        <Text key={item.id}>{item.email}</Text>
      ))}
      <Pressable style={styles.btn} onPress={insertUser}>
        <Text style={styles.btnText}>Add</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  btnText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
});
