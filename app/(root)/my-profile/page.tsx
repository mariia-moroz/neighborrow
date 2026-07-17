import { auth } from "@/auth";
import ItemListProfile from "@/components/ItemListProfile";
import ItemPagination from "@/components/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfileCard from "@/components/UserProfileCard";
import { db } from "@/database/drizzle";
import { borrowRecords, items, users } from "@/database/schema";
import { getCurrentTimestamp } from "@/lib/utils";
import { count, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 4;

const Page = async ({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) => {
  const session = await auth();
  const currentTimestamp = getCurrentTimestamp();
  const { page } = await searchParams;
  const pageValue = Array.isArray(page) ? page[0] : page;
  const requestedPage = Math.max(1, Number.parseInt(pageValue ?? "1", 10) || 1);

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const [userDetails] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);

  const [{ totalRecords }] = await db
    .select({ totalRecords: count() })
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session.user.id));
  const totalPages = Math.max(1, Math.ceil(totalRecords / ITEMS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);

  const allBorrowRecords = (await db
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
    .orderBy(desc(items.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset((currentPage - 1) * ITEMS_PER_PAGE)) as BorrowedItem[];

  return (
    <div className='my-profile'>
      <UserProfileCard {...userDetails} />
      <div>
        <Tabs defaultValue='borrowed'>
          <TabsList>
            <TabsTrigger value='borrowed'>Borrowed</TabsTrigger>
            <TabsTrigger value='pending'>Pending</TabsTrigger>
            <TabsTrigger value='returned'>Returned</TabsTrigger>
          </TabsList>
          <TabsContent value='borrowed'>
            <ItemListProfile title='' items={[...allBorrowRecords]} currentTimestamp={currentTimestamp} />
            <ItemPagination currentPage={currentPage} totalPages={totalPages} route='/my-profile' />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
