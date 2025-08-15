import clsx from "clsx";

import styles from "./Header.module.css";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

import Icon from "@/components/Icon";
import Avatar from "@/components/Avatar";

import { supabase } from "@/api/supabase";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const navigate = useNavigate();

  useKeyboardShortcut("h", () => navigate("/"), ["alt"]);
  useKeyboardShortcut("m", () => navigate("/movies"), []);
  useKeyboardShortcut("t", () => navigate("/tv"), ["alt"]);
  useKeyboardShortcut("b", () => navigate("/bookmarks"), ["alt"]);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    window.location.reload();
  };

  const classNameLink = clsx(
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
    styles["header__link"]
  );

  return (
    <header
      className={clsx(
        className,
        "flex flex-row justify-between items-center lg:flex-col lg:h-[90dvh] lg:max-h-[800px] lg:w-[96px] lg:justify-start lg:gap-16",
        styles["header"]
      )}
    >
      <Link className="" to="/" aria-label="Home">
        <Icon name="logo" />
      </Link>

      <nav
        className={clsx(
          "flex flex-row justify-center items-center gap-8 lg:flex-col",
          styles["header__nav"]
        )}
        aria-label="Primary navigation"
      >
        <NavLink
          to="/"
          aria-label="Home"
          className={({ isActive }) =>
            clsx(
              "h-[20px] w-[20px]",
              classNameLink,
              isActive && "text-white",
              !isActive && "text-blue-500"
            )
          }
        >
          <Icon className="h-[20px] w-[20px]" name="navHome" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(
              "h-[20px] w-[20px]",
              classNameLink,
              isActive && "text-white",
              !isActive && "text-blue-500"
            )
          }
          to="/movies"
          aria-label="Category: Movies"
        >
          <Icon className="h-[20px] w-[20px]" name="navMovies" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(
              "h-[20px] w-[20px]",
              classNameLink,
              isActive && "text-white",
              !isActive && "text-blue-500"
            )
          }
          to="/tv-series"
          aria-label="Category: TV"
        >
          <Icon className="h-[20px] w-[20px]" name="navTVSeries" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(
              "h-[20px] w-[20px]",
              classNameLink,
              isActive && "text-white",
              !isActive && "text-blue-500"
            )
          }
          to="/bookmarks"
          aria-label="Bookmark"
        >
          <Icon className="h-[20px] w-[20px]" name="navBookmark" />
        </NavLink>
      </nav>

      <div className={clsx(styles["header__profile"], "lg:mt-auto")}>
        <Avatar className={clsx(styles["header__avatar"])} />

        <button
          className="header__profile--logout text-preset-4"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
