import Search from "@/components/forms/search/Search";
import { useDebouncedSignal } from "@/hooks/useDebouncedSignal";
import { useComputed, useSignal, useSignalEffect } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

// import type { MediaItem } from "@/types/media";

export default function Home() {
  useSignals();

  const searchTerm = useSignal<string>("");
  const debouncedSearchTerm = useDebouncedSignal(searchTerm, 500);

  const searchValue = useComputed(() => {
    console.log("useComputed", searchTerm.value);

    return searchTerm.value;
  });

  useSignalEffect(() => {
    console.log("Home", searchTerm.value);
  });

  return (
    <div className="home mt-[24px] ml-[16px] mr-[16px]">
      <Search placeholder={"Home"} searchTerm={searchTerm} />
      <div className="home__results mt-[24px] ">
        <h1>
          Home - {searchValue.value} | {searchTerm.value}
        </h1>
        <h1>Home - {debouncedSearchTerm.value}</h1>
      </div>
    </div>
  );
}
