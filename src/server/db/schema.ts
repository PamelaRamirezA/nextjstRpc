import { sql } from "drizzle-orm";
import { index, int, integer, sqliteTableCreator, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `nextjstRpc_${name}`);

export const publicPosts = sqliteTable(
  "publicpost",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    createdAt: int("created_at", { mode: "number" })
      .default(sql`(strftime('%s', 'now'))`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "number" }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').unique().notNull(),
});

// export const postsTable = sqliteTable('posts', {
//   id: integer('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: text('created_at')
//     .default(sql`(CURRENT_TIMESTAMP)`)
//     .notNull(),
//   updateAt: integer('updated_at', { mode: 'timestamp' }),
// });

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;

export type SelectPosts = typeof publicPosts.$inferSelect;

export type DatabaseSchema = {
  publicPosts: typeof publicPosts;
};