import ItemList from "@/components/ItemList";
import { db } from "@/database/drizzle";
import { items } from "@/database/schema";
import { count, desc } from "drizzle-orm";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
      <Pagination className='mt-10'>
        <PaginationContent className='gap-1.5!'>
          <PaginationItem className='pagination-item'>
            <PaginationPrevious
              href={`/collection?page=${Math.max(1, currentPage - 1)}`}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <PaginationItem
                key={pageNumber}
                className={pageNumber === currentPage ? "pagination-item--active" : "pagination-item"}
              >
                <PaginationLink href={`/collection?page=${pageNumber}`} isActive={pageNumber === currentPage}>
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem className='pagination-item'>
            <PaginationNext
              href={`/collection?page=${Math.min(totalPages, currentPage + 1)}`}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : undefined}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default Page;
