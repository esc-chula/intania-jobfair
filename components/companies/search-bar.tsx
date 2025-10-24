import { LucideSearch, LucideSlidersHorizontal } from "lucide-react";

export default function SearchBar({
  query,
  setQuery,
  isFilterOpen,
  setIsFilterOpen,
  setPage,
}: {
  query: string;
  setQuery: (v: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (v: boolean) => void;
  setPage: (page: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 relative">
        <LucideSearch
          className="absolute left-3 top-1/2 -translate-y-1/2"
          color="#B7B7B7"
          size={16}
        />
        <input
          id="jobs-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="ค้นหาบริษัท"
          className="h-9 w-full rounded-md border border-border pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className={`w-9 h-9 ${
          isFilterOpen ? "bg-[#D9A94C]" : "bg-[#F5C45E]"
        } transition rounded-md shadow flex items-center justify-center cursor-pointer`}
      >
        <LucideSlidersHorizontal height={16} width={16} color={"#102E50"} />
      </button>
    </div>
  );
}
