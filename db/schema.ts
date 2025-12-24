import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Example table schema - customize for your application
export const exampleTable = sqliteTable("example_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  createdAt: int({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
