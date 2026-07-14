import { auth } from "@/auth";
import ItemListProfile from "@/components/ItemListProfile";
import { db } from "@/database/drizzle";
import { borrowRecords, items } from "@/database/schema";
import { getCurrentTimestamp } from "@/lib/utils";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async ({}) => {
  const session = await auth();
  const currentTimestamp = getCurrentTimestamp();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const allBorrowRecords = await db
    .select({
      // Borrow record fields
      id: borrowRecords.id,
      userId: borrowRecords.userId,
      itemId: borrowRecords.itemId,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
      createdAt: borrowRecords.createdAt,
      // Item fields
      item: {
        id: items.id,
        title: items.title,
        category: items.category,
        rating: items.rating,
        totalItems: items.totalItems,
        availableItems: items.availableItems,
        available: items.available,
        summary: items.summary,
        description: items.description,
        image: items.image,
        condition: items.condition,
        included: items.included,
        brand: items.brand,
        borrowDuration: items.borrowDuration,
        createdAt: items.createdAt,
      },
    })
    .from(borrowRecords)
    .innerJoin(items, eq(borrowRecords.itemId, items.id))
    .where(eq(borrowRecords.userId, session.user.id))
    .orderBy(desc(borrowRecords.createdAt));

  return (
    <>
      <ItemListProfile
        title='Borrowed Items'
        items={[...allBorrowRecords]}
        currentTimestamp={currentTimestamp}
      />
    </>
  );
};

export default Page;
