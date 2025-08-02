interface IconProps {
  name:
    | "logo"
    | "bookmarkEmpty"
    | "bookmarkFull"
    | "categoryMovie"
    | "categoryTV"
    | "navBookmark"
    | "navHome"
    | "navMovies"
    | "navTVSeries"
    | "play"
    | "search";
  className?: string;
  alt?: string;
}

const iconMap = {
  logo: new URL("../assets/logo.svg", import.meta.url).href,
  bookmarkEmpty: new URL(
    "../assets/icons/icon-bookmark-empty.svg",
    import.meta.url
  ).href,
  bookmarkFull: new URL(
    "../assets/icons/icon-bookmark-full.svg",
    import.meta.url
  ).href,
  categoryMovie: new URL(
    "../assets/icons/icon-category-movie.svg",
    import.meta.url
  ).href,
  categoryTV: new URL("../assets/icons/icon-category-tv.svg", import.meta.url)
    .href,
  navBookmark: new URL("../assets/icons/icon-nav-bookmark.svg", import.meta.url)
    .href,
  navHome: new URL("../assets/icons/icon-nav-home.svg", import.meta.url).href,
  navMovies: new URL("../assets/icons/icon-nav-movies.svg", import.meta.url)
    .href,
  navTVSeries: new URL(
    "../assets/icons/icon-nav-tv-series.svg",
    import.meta.url
  ).href,
  play: new URL("../assets/icons/icon-play.svg", import.meta.url).href,
  search: new URL("../assets/icons/icon-search.svg", import.meta.url).href,
};

export default function Icon({ name, className, alt }: IconProps) {
  const src = iconMap[name];

  return <img src={src} className={className} alt={alt || name} />;
}
