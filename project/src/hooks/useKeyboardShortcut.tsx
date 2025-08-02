import { useEffect } from "react";

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  modifier?: "ctrl" | "alt" | "meta"
) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const match =
        event.key.toLowerCase() === key.toLowerCase() &&
        (!modifier ||
          (modifier === "ctrl" && event.ctrlKey) ||
          (modifier === "alt" && event.altKey) ||
          (modifier === "meta" && event.metaKey));

      if (match) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [key, callback, modifier]);
}
