import clsx from "clsx";

import Movie from "@/components/movie/Movie";
import type { MediaItem } from "@/models/media";

interface MovieSectionProps {
  title: string;
  items: MediaItem[];
  sectionType: "trending" | "regular";
  ariaLabel: string;
  showWhenEmpty?: boolean;
  emptyMessage?: string;

  loading?: boolean;
  loadingMessage?: string;
  error?: boolean;
  errorMessage?: string;

  isPaginated?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;

  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function MovieSection({
  title,
  items,
  sectionType,
  ariaLabel,
  showWhenEmpty = false,
  emptyMessage = "No results found.",
  isPaginated = false,

  hasMore = false,
  onLoadMore = () => {},

  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},

  loading = false,
  loadingMessage = "Loading ...",
  error = false,
  errorMessage = "Loading Error",
}: MovieSectionProps) {
  const getPageNumbers = () => {
    const pages = [];

    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);
    const start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxPagesToShow - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="my-6">
      <h2 className="my-[24px] text-white-custom text-preset-1-mobile lg:text-preset-1">
        {title}
      </h2>
      <section
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
        className={clsx(
          "gap-5",
          sectionType === "trending"
            ? "grid-result grid-result--trending"
            : "grid grid-result grid-result--regular"
        )}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.length === 0 && showWhenEmpty ? (
          <p className="text-blue-500 text-preset-3 my-[24px]">
            {emptyMessage}
          </p>
        ) : (
          items.map((item) => (
            <Movie
              key={item.title ?? item.title}
              item={item}
              type={sectionType}
            />
          ))
        )}
      </section>

      {isPaginated && !hasMore && totalPages > 1 && !loading && (
        <div className="mt-6 flex justify-center items-center gap-2 flex-wrap text-white-custom">
          <button
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Prev
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={clsx(
                "px-3 py-1 rounded",
                page === currentPage
                  ? "bg-white text-black"
                  : "bg-gray-700 hover:bg-gray-600"
              )}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {isPaginated && hasMore && !loading && (
        <div className="mt-6 flex justify-center text-preset-3">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 rounded bg-white text-black hover:bg-gray-200 transition"
          >
            Load More
          </button>
        </div>
      )}

      {loading && (
        <p className="text-center text-white-custom mt-4 text-preset-3">
          {loadingMessage}
        </p>
      )}

      {!loading && error && (
        <p className="text-center text-red-500 mt-4 text-preset-3">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
