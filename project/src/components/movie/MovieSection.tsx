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

  isPaginated?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export default function MovieSection({
  title,
  items,
  sectionType,
  ariaLabel,
  showWhenEmpty = false,
  emptyMessage = "No results found.",
  isPaginated = false,
  onLoadMore,
  hasMore = false,
  loading = false,
}: MovieSectionProps) {
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
        <p className="text-center text-blue-500 mt-4 text-preset-3">
          Loading more...
        </p>
      )}
    </div>
  );
}
