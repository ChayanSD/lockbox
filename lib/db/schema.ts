import {
  pgTable,
  uuid,
  integer,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import path from "path";
import { create } from "domain";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  size: integer("size").notNull(),
  type: text("type").notNull(),

  fileUrl: text("file_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  userId: text("user_id").notNull(),
  parentId: uuid("parent_id"), // parent folder null for root item
  isFolder: boolean("is_folder").default(false).notNull(),
  isStarred: boolean("is_starred").default(false).notNull(),
  isTrashed: boolean("is_trashed").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fileRelatiosn = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),
  children: many(files),
}));

//this will gives me proper types
export const File = typeof files.$inferSelect;
export const NEwFile = typeof files.$inferSelect;
