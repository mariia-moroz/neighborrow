import ItemList from "@/components/ItemList";
import { db } from "@/database/drizzle";
import { items } from "@/database/schema";
import { count, desc } from "drizzle-orm";
import ItemPagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 12;

const Page = async ({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) => {
  const { page } = await searchParams;
  const pageValue = Array.isArray(page) ? page[0] : page;
  const requestedPage = Math.max(1, Number.parseInt(pageValue ?? "1", 10) || 1);

  const [{ totalItems }] = await db.select({ totalItems: count() }).from(items);
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);

  const collectionItems = (await db
    .select()
    .from(items)
    .orderBy(desc(items.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset((currentPage - 1) * ITEMS_PER_PAGE)) as Item[];

  return (
    <>
      <ItemList title='Search Results' items={collectionItems} />
      <ItemPagination currentPage={currentPage} totalPages={totalPages} route='/collection' />
    </>
  );
};

export default Page;
