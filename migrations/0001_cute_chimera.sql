CREATE TABLE "items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(255) NOT NULL,
	"rating" integer NOT NULL,
	"total_items" integer DEFAULT 1 NOT NULL,
	"available_items" integer DEFAULT 1 NOT NULL,
	"available" boolean NOT NULL,
	"summary" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"condition" varchar(255) NOT NULL,
	"included" text NOT NULL,
	"brand" varchar(255) NOT NULL,
	"borrow_duration" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "items_id_unique" UNIQUE("id")
);
