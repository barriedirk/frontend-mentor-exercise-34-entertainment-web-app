import React from "react";

import IconNavBookmark from "./icons/IconNavBookmark";
import IconNavTVSeries from "./icons/IconNavTVSeries";
import IconNavHome from "./icons/IconNavHome";
import IconNavMovies from "./icons/IconNavMovies";
import IconBookmarkEmpty from "./icons/IconBookmarkEmpty";
import IconBookmarkFull from "./icons/IconBookmarkFull";

interface IconProps {
  name:
    | "logo"
    | "bookmarkEmpty"
    | "bookmarkFull"
    | "categoryMovie"
    | "categoryTV"
    | "play"
    | "search"
    | "navHome"
    | "navMovies"
    | "navTVSeries"
    | "navBookmark";
  className?: string;
  alt?: string;
}

const spriteIcons = [
  "navBookmark",
  "navHome",
  "navMovies",
  "navTVSeries",
  "bookmarkEmpty",
  "bookmarkFull",
];

const iconMap = {
  logo: new URL("../assets/logo.svg", import.meta.url).href,
  categoryMovie: new URL(
    "../assets/icons/icon-category-movie.svg",
    import.meta.url
  ).href,
  categoryTV: new URL("../assets/icons/icon-category-tv.svg", import.meta.url)
    .href,
  play: new URL("../assets/icons/icon-play.svg", import.meta.url).href,
  search: new URL("../assets/icons/icon-search.svg", import.meta.url).href,
  bookmarkEmpty: IconBookmarkEmpty,
  bookmarkFull: IconBookmarkFull,
  navHome: IconNavHome,
  navMovies: IconNavMovies,
  navTVSeries: IconNavTVSeries,
  navBookmark: IconNavBookmark,
};

export default function Icon({ name, className, alt }: IconProps) {
  const src = iconMap[name];

  if (spriteIcons.includes(name) && typeof src !== "string") {
    const Component = iconMap[name] as React.FC<React.SVGProps<SVGSVGElement>>;

    return <Component className={className} aria-label={alt || name} />;
  }

  return <img src={src as string} className={className} alt={alt || name} />;
}
