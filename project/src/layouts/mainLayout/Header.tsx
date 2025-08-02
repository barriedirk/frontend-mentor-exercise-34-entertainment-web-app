import clsx from "clsx";

import styles from "./Header.module.css";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

import Icon from "@/components/Icon";
import Avatar from "@/components/Avatar";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const navigate = useNavigate();

  useKeyboardShortcut("h", () => navigate("/"));
  useKeyboardShortcut("m", () => navigate("/movies"));
  useKeyboardShortcut("t", () => navigate("/tv"));
  useKeyboardShortcut("b", () => navigate("/bookmarks"));

  const classNameLink = clsx(
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
    styles["header__link"]
  );

  return (
    <header
      className={clsx(
        className,
        "flex flex-row justify-between items-center",
        styles["header"]
      )}
    >
      <Link className="" to="/" aria-label="Home">
        <Icon name="logo" />
      </Link>

      <nav
        className={clsx(
          "flex flex-row justify-center items-center gap-8",
          styles["header__nav"]
        )}
        aria-label="Primary navigation"
      >
        <NavLink
          to="/"
          aria-label="Home"
          className={({ isActive }) =>
            clsx(classNameLink, isActive && "text-white", "text-neutral-400")
          }
        >
          <Icon name="navHome" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(classNameLink, isActive && "text-white", "text-neutral-400")
          }
          to="/movies"
          aria-label="Category: Movies"
        >
          <Icon name="categoryMovie" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(classNameLink, isActive && "text-white", "text-neutral-400")
          }
          to="/tv-series"
          aria-label="Category: TV"
        >
          <Icon name="categoryTV" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(classNameLink, isActive && "text-white", "text-neutral-400")
          }
          to="/bookmarks"
          aria-label="Bookmark Empty"
        >
          <Icon name="bookmarkEmpty" />
        </NavLink>
      </nav>

      <div className={clsx(styles["header__profile"])}>
        <Avatar className={clsx(styles["header__avatar"])} />
      </div>
    </header>
  );
}
