import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const waitlist = pgTable("waitlist", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  person_name: text("person_name").notNull(),
  company_name: text("company_name").notNull(),
  gst_number: text("gst_number"),
  website: text("website"),
  email: text("email").notNull(),
  platforms: text("platforms").array().default([]),
  resolved: boolean("resolved").default(false).notNull(),
});

export type WaitlistEntry = typeof waitlist.$inferSelect;
export type NewWaitlistEntry = typeof waitlist.$inferInsert;
