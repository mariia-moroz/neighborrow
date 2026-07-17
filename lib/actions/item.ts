"use server";

import { db } from "@/database/drizzle";
import { borrowRecords, items } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowItem = async (params: BorrowItemParams) => {
  const { userId, itemId } = params;

  try {
    const item = await db
      .select({ availableItems: items.availableItems, borrowDuration: items.borrowDuration })
      .from(items)
      .where(eq(items.id, itemId))
      .limit(1);

    if (!item.length || item[0].availableItems <= 0) {
      return {
        success: false,
        error: "Item is not avilable for borrowing",
      };
    }

    const dueDate = dayjs().add(item[0].borrowDuration, "day").toDate();

    const record = await db.insert(borrowRecords).values({ userId, itemId, dueDate });

    const availableItems = item[0].availableItems - 1;
    const updateRecordValues = { availableItems: availableItems, available: availableItems > 0 };

    await db.update(items).set(updateRecordValues).where(eq(items.id, itemId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occured while borrowing the item",
    };
  }
};
