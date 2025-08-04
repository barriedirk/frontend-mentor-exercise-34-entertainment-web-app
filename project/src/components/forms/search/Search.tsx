import { useRef } from "react";

import Icon from "@/components/Icon";
import clsx from "clsx";
import { type signal } from "@preact/signals-react";
import { bindInput } from "@/signals/bindInput";

export interface SearchProps {
  placeholder?: string;
  className?: string;
  searchTerm: ReturnType<typeof signal>;
}

export default function Search({
  placeholder,
  className,
  searchTerm,
}: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={clsx(
        className,
        "flex flex-row gap-4 justify-center items-center text-white-custom text-preset-2-mobile"
      )}
    >
      <Icon
        name="search"
        className={clsx("w-[24px] h-[24px] lg:w-[32px] lg:h-[32px]")}
      />
      <input
        ref={inputRef}
        className="grow-1 shrink-1 p-1"
        type="text"
        placeholder={placeholder || ""}
        onFocus={() => inputRef.current?.select()}
        {...bindInput(searchTerm)}
      />
    </div>
  );
}
