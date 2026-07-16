ALTER TABLE "borrow_records" DROP CONSTRAINT "borrow_records_item_id_items_id_fk";
--> statement-breakpoint
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;