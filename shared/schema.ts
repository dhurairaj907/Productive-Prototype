import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  bankName: text("bank_name"),
  accountNumber: text("account_number"),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  name: text("name").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  date: timestamp("date").defaultNow().notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(), // 'income' | 'expense'
  icon: text("icon"),
});

export const budgets = pgTable("budgets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  category: text("category").notNull(),
  limit: numeric("limit", { precision: 12, scale: 2 }).notNull(),
  period: text("period").default("monthly").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  bankName: true,
  accountNumber: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  date: true,
});

export const insertBudgetSchema = createInsertSchema(budgets).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Budget = typeof budgets.$inferSelect;
export type InsertBudget = z.infer<typeof insertBudgetSchema>;
