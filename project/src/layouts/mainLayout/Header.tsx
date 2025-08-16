import clsx from "clsx";

import styles from "./Header.module.css";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";

import Icon from "@/components/Icon";
import Avatar from "@/components/Avatar";

import { supabase } from "@/api/supabase";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const refProfile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded && refProfile.current) {
      const firstFocusable = refProfile.current.querySelector(
        "#profile-options button"
      );

      (firstFocusable as HTMLElement)?.focus();
    }
  }, [isExpanded]);

  useKeyboardShortcut("h", () => navigate("/"), ["alt"]);
  useKeyboardShortcut("m", () => navigate("/movies"), []);
  useKeyboardShortcut("t", () => navigate("/tv"), ["alt"]);
  useKeyboardShortcut("b", () => navigate("/bookmarks"), ["alt"]);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    window.location.reload();
  };

  const toggleOptions = () => {
    setIsExpanded((prev) => !prev);
  };

  const classNameLink = clsx(
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white hover:text-red-500",
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
              isActive && "text-white hover:text-white",
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
              isActive && "text-white hover:text-white",
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
              isActive && "text-white hover:text-white",
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
              isActive && "text-white hover:text-white",
              !isActive && "text-blue-500"
            )
          }
          to="/bookmarks"
          aria-label="Bookmark"
        >
          <Icon className="h-[20px] w-[20px]" name="navBookmark" />
        </NavLink>
      </nav>

      <div
        className={clsx(
          styles["header__profile"],
          {
            [styles.expanded]: isExpanded,
          },
          "flex justify-center items-center lg:mt-auto"
        )}
        ref={refProfile}
      >
        <button
          className="w-fit h-fit"
          onClick={toggleOptions}
          aria-haspopup="true"
          aria-expanded={isExpanded}
          aria-controls="profile-options"
        >
          <Avatar className={clsx(styles["header__avatar"])} />
        </button>
        <div
          id="profile-options"
          className={clsx(styles["header__options"])}
          aria-label="Profile Options"
          role="group"
          aria-expanded={isExpanded}
        >
          <button
            className={clsx(
              styles["header__logout"],
              "header__profile--logout text-preset-4"
            )}
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
