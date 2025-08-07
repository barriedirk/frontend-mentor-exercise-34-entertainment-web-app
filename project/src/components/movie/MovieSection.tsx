// components/MovieSection.tsx

import clsx from "clsx";
import Movie from "@/components/movie/Movie";
import type { MediaItem } from "@/types/media";

interface MovieSectionProps {
  title: string;
  items: MediaItem[];
  sectionType: "trending" | "regular";
  ariaLabel: string;
  showWhenEmpty?: boolean;
  emptyMessage?: string;
}

export default function MovieSection({
  title,
  items,
  sectionType,
  ariaLabel,
  showWhenEmpty = false,
  emptyMessage = "No results found.",
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
          "grid gap-5",
          sectionType === "trending"
            ? "grid-result grid-result--trending"
            : "grid-result grid-result--regular"
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
    </div>
  );
}
