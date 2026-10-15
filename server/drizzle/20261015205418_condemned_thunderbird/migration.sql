ALTER TABLE "transactions" ALTER COLUMN "amount" SET DATA TYPE real USING "amount"::real;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "amount" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "operation" SET NOT NULL;