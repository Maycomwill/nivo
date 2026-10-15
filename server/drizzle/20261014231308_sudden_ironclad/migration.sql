CREATE TABLE "users" (
	"id" uuid PRIMARY KEY UNIQUE,
	"name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
