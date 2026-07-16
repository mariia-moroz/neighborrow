ALTER TABLE "users" ADD COLUMN "rating" double precision;
--> statement-breakpoint
UPDATE "users" SET "rating" = 5 WHERE "rating" IS NULL;
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "rating" SET NOT NULL;