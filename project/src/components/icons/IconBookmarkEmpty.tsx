import clsx from "clsx";

import styles from "./Icons.module.css";

export default function IconBookmarkEmpty({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      width="12"
      height="14"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(styles["icon-bookmark-empty"], className)}
      aria-hidden="true"
      strokeWidth="1.5"
    >
      <path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" />
    </svg>
  );
}
