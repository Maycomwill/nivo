import {
  boolean,
  numeric,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const operationEnum = pgEnum("operation", ["income", "expense"]);
export const categoriesEnum = pgEnum("category", [
  "salário",
  "contas",
  "investimentos",
  "cartão",
  "alimentação",
  "compras",
  "carro",
  "moto",
  "outros",
  "financiamento",
]);

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp({ withTimezone: true }).defaultNow(),
  updated_at: timestamp({ withTimezone: true }).defaultNow(),
});

export const transactionTable = pgTable("transactions", {
  id: text()
    .$defaultFn(() => createId())
    .primaryKey(),
  amount: real(),
  category: categoriesEnum("category").notNull(),
  owner_id: uuid().notNull(),
  description: text(),
  date: timestamp({ withTimezone: true }),
  operation: operationEnum("operation").notNull(),
  fixed: boolean().default(false),
});

const transactionsRelations = defineRelations(
  { usersTable, transactionTable },
  (r) => ({
    usersTable: {
      transactions: r.many.transactionTable({
        from: r.usersTable.id,
        to: r.transactionTable.owner_id,
      }),
    },
    transactionTable: {
      owner: r.one.usersTable({
        from: r.transactionTable.owner_id,
        to: r.usersTable.id,
      }),
    },
  }),
);
