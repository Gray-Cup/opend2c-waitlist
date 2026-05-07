import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const waitlist = pgTable("waitlist", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  personName: text("person_name").notNull(),
  companyName: text("company_name").notNull(),
  gstNumber: text("gst_number"),
  website: text("website"),
  email: text("email").notNull(),
  platforms: text("platforms").array().default([]),
  resolved: boolean("resolved").default(false).notNull(),
});

export type WaitlistEntry = typeof waitlist.$inferSelect;
export type NewWaitlistEntry = typeof waitlist.$inferInsert;
