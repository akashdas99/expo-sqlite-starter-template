// import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// export const usersTable = sqliteTable("users_table", {
//   id: int().primaryKey({ autoIncrement: true }),
//   name: text().notNull(),
//   age: int().notNull(),
//   email: text().notNull().unique(),
// });
// import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   name: varchar("name", { length: 100 }).notNull(),
//   userName: varchar("user_name", { length: 32 }).notNull(),
//   email: varchar("email", { length: 255 }).notNull().unique(),
// });
