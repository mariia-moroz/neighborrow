import UsersTable from "@/components/admin/UsersTable";
import NoItems from "@/components/NoItems";
import ItemsPagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { SelectUser, users } from "@/database/schema";
import { count, desc } from "drizzle-orm";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

const Page = async ({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) => {
  const { page } = await searchParams;
  const pageValue = Array.isArray(page) ? page[0] : page;
  const requestedPage = Math.max(1, Number.parseInt(pageValue ?? "1", 10) || 1);

  const [{ totalUsers }] = await db.select({ totalUsers: count() }).from(users);
  const totalPages = Math.max(1, Math.ceil(totalUsers / ITEMS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);

  const allUsers = (await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset((currentPage - 1) * ITEMS_PER_PAGE)) as SelectUser[];

  return (
    <section className='admin-table-container'>
      <div className='admin-table-top'>
        <h2>All Users</h2>
      </div>

      <div className='mt-7 w-full overflow-hidden'>
        {allUsers?.length <= 0 ? (
          <NoItems title='No Users Found' text={`We couldn't find any users.\nPlease come back later.`} />
        ) : (
          <>
            <UsersTable users={allUsers} />
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
