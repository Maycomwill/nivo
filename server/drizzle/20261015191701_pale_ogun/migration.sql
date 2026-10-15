CREATE TYPE "operation" AS ENUM('income', 'expense');--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY,
	"amount" numeric NOT NULL,
	"category" text NOT NULL,
	"owner_id" uuid NOT NULL,
	"description" text,
	"date" timestamp with time zone,
	"operation" "operation",
	"fixed" boolean DEFAULT false
);
