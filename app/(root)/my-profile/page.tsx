import { auth } from "@/auth";
import ItemListProfile from "@/components/ItemListProfile";
import NoItems from "@/components/NoItems";
import ItemPagination from "@/components/Pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfileCard from "@/components/UserProfileCard";
import { db } from "@/database/drizzle";
import { borrowRecords, items, users } from "@/database/schema";
import { getCurrentTimestamp } from "@/lib/utils";
import { and, count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 4;

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; status?: string | string[] }>;
}) => {
  const session = await auth();
  const currentTimestamp = getCurrentTimestamp();
  const { page, status } = await searchParams;
  const pageValue = Array.isArray(page) ? page[0] : page;
  const statusValue = Array.isArray(status) ? status[0] : status;
  const requestedStatus = statusValue?.toUpperCase();
  const selectedStatus =
    requestedStatus === "PENDING" || requestedStatus === "RETURNED" ? requestedStatus : "BORROWED";
  const selectedTab = selectedStatus.toLowerCase();
  const requestedPage = Math.max(1, Number.parseInt(pageValue ?? "1", 10) || 1);

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const [userDetails] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);

  const [{ totalRecords }] = await db
    .select({ totalRecords: count() })
    .from(borrowRecords)
    .where(and(eq(borrowRecords.userId, session.user.id), eq(borrowRecords.status, selectedStatus)));
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
    .where(and(eq(borrowRecords.userId, session.user.id), eq(borrowRecords.status, selectedStatus)))
    .orderBy(desc(items.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset((currentPage - 1) * ITEMS_PER_PAGE)) as BorrowedItem[];

  return (
    <div className='my-profile'>
      <UserProfileCard {...userDetails} />
      <div className='w-full'>
        <Tabs value={selectedTab} className='user-tabs'>
          <TabsList className='user-tabs-list'>
            <TabsTrigger value='pending' className='user-tabs-trigger' asChild>
              <Link href='/my-profile?status=pending'>Pending</Link>
            </TabsTrigger>
            <TabsTrigger value='borrowed' className='user-tabs-trigger' asChild>
              <Link href='/my-profile?status=borrowed'>Borrowed</Link>
            </TabsTrigger>
            <TabsTrigger value='returned' className='user-tabs-trigger' asChild>
              <Link href='/my-profile?status=returned'>Returned</Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={selectedTab} className={"w-full"}>
            {allBorrowRecords?.length <= 0 ? (
              <NoItems title='No Items Here Yet' text={`We couldn't find any items.`} className='mx-auto' />
            ) : (
              <>
                <ItemListProfile title='' items={[...allBorrowRecords]} currentTimestamp={currentTimestamp} />
                <ItemPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  route={`/my-profile?status=${selectedTab}`}
                  className='mt-10'
                />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
