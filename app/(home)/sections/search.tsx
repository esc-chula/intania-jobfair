"use client";
import { SlidersHorizontal, Search as SearchIcon } from "lucide-react";
import { useSearch } from "../contexts/search-context";
import { useState } from "react";

export default function Search() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  return (
    <div className="flex items-center gap-3">
      <label className="flex-1 relative">
        <span className="sr-only">ค้นหา</span>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <SearchIcon className="text-[#B7B7B7]" size={16} />
        </span>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหาบริษัท ตำแหน่งงาน หรือที่ตั้ง"
          className="h-9 w-full rounded-md border border-border bg-white pl-9 pr-3 text-sm font-bodyTH placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </label>
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-label="ตัวกรอง"
        className={`w-9 h-9 ${
          isFilterOpen ? "bg-[#D9A94C]" : "bg-[#F5C45E]"
        } transition rounded-md shadow flex items-center justify-center cursor-pointer`}
      >
        <SlidersHorizontal className="text-[#102E50]" height={16} width={16} />
      </button>
    </div>
  );
}
