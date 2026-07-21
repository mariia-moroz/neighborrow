import BorrowRequestTable from "@/components/admin/BorrowRequestTable";
import NoItems from "@/components/NoItems";
import ItemsPagination from "@/components/Pagination";
import { db } from "@/database/drizzle";
import { borrowRecords, items, users } from "@/database/schema";
import { count, desc, eq } from "drizzle-orm";

const ITEMS_PER_PAGE = 10;

const Page = async ({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) => {
  const { page } = await searchParams;
  const pageValue = Array.isArray(page) ? page[0] : page;
  const requestedPage = Math.max(1, Number.parseInt(pageValue ?? "1", 10) || 1);

  const [{ totalRequests }] = await db.select({ totalRequests: count() }).from(borrowRecords);
  const totalPages = Math.max(1, Math.ceil(totalRequests / ITEMS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);

  const allRequests = (await db
    .select({
      id: borrowRecords.id,
      userId: borrowRecords.userId,
      itemId: borrowRecords.itemId,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
      createdAt: borrowRecords.createdAt,
      item: {
        image: items.image,
        title: items.title,
      },
      user: {
        fullName: users.fullName,
        email: users.email,
      },
    })
    .from(borrowRecords)
    .innerJoin(items, eq(borrowRecords.itemId, items.id))
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .orderBy(desc(borrowRecords.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset((currentPage - 1) * ITEMS_PER_PAGE)) as BorrowRequest[];

  return (
    <section className='admin-table-container'>
      <div className='admin-table-top'>
        <h2>Borrow Requests</h2>
      </div>

      <div className='mt-7 w-full overflow-hidden'>
        {allRequests?.length <= 0 ? (
          <NoItems title='No Users Found' text={`We couldn't find any users.\nPlease come back later.`} />
        ) : (
          <>
            <BorrowRequestTable requests={allRequests} />
            <ItemsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              route='/admin/users'
              className='mt-5'
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
