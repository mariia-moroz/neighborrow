import { pgEnum, pgTable, text, timestamp, uuid, varchar, date, integer, boolean } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REGECTED"]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrrow_status", ["BORROWED", "RETURNED"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", {
    length: 255,
  }).notNull(),
  email: text("email").notNull().unique(),
  address: text("address").notNull(),
  password: text("password").notNull(),
  idConfirmation: text("id_confirmation").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const items = pgTable("items", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", {
    length: 255,
  }).notNull(),
  category: varchar("category", {
    length: 255,
  }).notNull(),
  rating: integer("rating").notNull(),
  totalItems: integer("total_items").notNull().default(1),
  availableItems: integer("available_items").notNull().default(1),
  available: boolean("available").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  condition: varchar("condition", {
    length: 255,
  }).notNull(),
  included: text("included").notNull(),
  brand: varchar("brand", {
    length: 255,
  }).notNull(),
  borrowDuration: integer("borrow_duration").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
