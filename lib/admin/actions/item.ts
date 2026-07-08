"use server";

import { db } from "@/database/drizzle";
import { items } from "@/database/schema";

export const createItem = async (params: ItemParams) => {
  try {
    const newItem = await db
      .insert(items)
      .values({ ...params, availableItems: params.totalItems, available: true })
      .returning();
    return { success: true, data: JSON.parse(JSON.stringify(newItem[0])) };
  } catch (error) {
    console.log(error, "Sign in error");
    return { success: false, error: "An error occured while creating an item" };
  }
};
