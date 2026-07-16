import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const ItemPagination = ({
  totalPages,
  currentPage,
  route,
}: {
  totalPages: number;
  currentPage: number;
  route: string;
}) => {
  return (
    <Pagination className='mt-10'>
      <PaginationContent className='gap-1.5!'>
        <PaginationItem className='pagination-item'>
          <PaginationPrevious
            href={`${route}?page=${Math.max(1, currentPage - 1)}`}
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
              <PaginationLink href={`${route}?page=${pageNumber}`} isActive={pageNumber === currentPage}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem className='pagination-item'>
          <PaginationNext
            href={`${route}?page=${Math.min(totalPages, currentPage + 1)}`}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ItemPagination;
