ALTER TYPE "public"."borrrow_status" ADD VALUE IF NOT EXISTS 'PENDING' BEFORE 'BORROWED';--> statement-breakpoint
ALTER TABLE "borrow_records" ALTER COLUMN "status" SET DEFAULT 'PENDING';
