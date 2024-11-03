import { sql } from "drizzle-orm";
import { mysqlTable, varchar, serial, timestamp, bigint, unique } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),

  full_name: varchar("full_name", { length: 100 }).notNull(),
  username: varchar("username", { length: 100 }).unique().notNull(),
  password: varchar("password", { length: 100 }).notNull(),

  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export const volunteerCategories = mysqlTable("volunteer_categories", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export const volunteers = mysqlTable(
  "volunteers",
  {
    id: serial("id").primaryKey(),

    user_id: bigint("user_id", { unsigned: true, mode: "bigint" })
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    volunteer_category_id: bigint("volunteer_category_id", { unsigned: true, mode: "bigint" })
      .references(() => volunteerCategories.id, { onDelete: "cascade" })
      .notNull(),

    created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updated_at: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow(),
  },
  (t) => ({
    unique: unique().on(t.user_id, t.volunteer_category_id),
  })
);

export const voters = mysqlTable("voters", {
  id: serial("id").primaryKey(),

  user_id: bigint("user_id", { unsigned: true, mode: "bigint" })
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  voted: bigint("voted", { unsigned: true, mode: "bigint" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export const roles = mysqlTable("roles", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 255 }),

  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export const userRoles = mysqlTable("user_roles", {
  id: serial("id").primaryKey(),

  user_id: bigint("user_id", { unsigned: true, mode: "bigint" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  role_id: bigint("role_id", { unsigned: true, mode: "bigint" })
    .references(() => roles.id, { onDelete: "cascade" })
    .notNull(),

  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export type Users = typeof users.$inferSelect;
export type VolunteerCategories = typeof volunteerCategories.$inferSelect;
export type Volunteers = typeof volunteers.$inferSelect;
export type Voters = typeof voters.$inferSelect;
export type Roles = typeof roles.$inferSelect;
export type UserRoles = typeof userRoles.$inferSelect;

export type UsersInsert = typeof users.$inferInsert;
export type VolunteerCategoriesInsert = typeof volunteerCategories.$inferInsert;
export type VolunteersInsert = typeof volunteers.$inferInsert;
export type VotersInsert = typeof voters.$inferInsert;
export type RolesInsert = typeof roles.$inferInsert;
export type UserRolesInsert = typeof userRoles.$inferInsert;
