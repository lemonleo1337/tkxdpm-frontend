// import { CustomLink } from "assets/data/types";
import { PageType, PaginationType } from "contains/type";
import { FC } from "react";
import Button from "shared/Button/Button";
import twFocusClass from "utils/twFocusClass";

export interface PaginationProps {
  className?: string;
  pagination?: PaginationType;
  filter?: PageType;
  handlePageChange?: (value: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  className = "",
  pagination = { itemCount: 0, pageCount: 1, hasPreviousPage: false, hasNextPage: false },
  filter,
  handlePageChange,
}) => {
  const MAX_DISPLAY_PAGES = 4
  const renderItem = (index: number) => {
    if (index === (filter?.page ?? 0) + 1) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {index}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <Button
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={() => handlePageChange?.(index - 1)}
      >
        {index}
      </Button>
    );
  };

  const renderEllipsis = () => (
    <span className="inline-flex w-11 h-11 items-center justify-center">...</span>
  );

  const renderPaginationItems = () => {
    const currentPage = filter?.page ?? 0;
    const lastPage = pagination.pageCount - 1;

    const start = Math.max(0, currentPage - Math.floor(MAX_DISPLAY_PAGES / 2));
    const end = Math.min(lastPage, start + MAX_DISPLAY_PAGES - 1);

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    const paginationItems = pages.map((pageIndex) => renderItem(pageIndex + 1));

    if (start > 0) {
      paginationItems.unshift(renderEllipsis());
    }

    if (end < lastPage) {
      paginationItems.push(renderEllipsis());
    }

    return paginationItems;
  };
  if (pagination.itemCount === 0) {
    return null; // Không có bản ghi nào, không cần hiển thị phân trang
  }
  return (
    <nav className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}>
      {pagination?.hasPreviousPage ? (
        <Button
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
          onClick={() => handlePageChange?.((filter?.page ?? 0) - 1)}
        >
          {"<"}
        </Button>
      ) : (
        <span className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 ${twFocusClass()}`}>
          {"<"}
        </span>
      )}
      {renderPaginationItems()}
      {pagination?.hasNextPage ? (
        <Button
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
          onClick={() => handlePageChange?.((filter?.page ?? 0) + 1)}
        >
          {">"}
        </Button>
      ) : (
        <span className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 ${twFocusClass()}`}>
          {">"}
        </span>
      )}
    </nav>
  );
};

export default Pagination;
