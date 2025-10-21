"use client";
import { useState } from "react";
import { SlidersHorizontal, Search as SearchIcon } from "lucide-react";

export default function Search() {
  const [q, setQ] = useState("");
  return (
    <div className="flex items-center gap-2">
      <label className="flex-1 relative">
        <span className="sr-only">ค้นหา</span>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <SearchIcon className="size-4 text-foreground/50" strokeWidth={2} />
        </span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ค้นหาบริษัท ตำแหน่งงาน หรือที่ตั้ง"
          className="w-full rounded-[14px] border border-border bg-card
                     pl-9 pr-3 py-2 text-[14px] font-bodyTH
                     shadow-[var(--shadow-light)] outline-none
                     placeholder:text-foreground/40"
        />
      </label>
      <button
        aria-label="ตัวกรอง"
        className="inline-flex items-center justify-center
                   size-9 rounded-lg bg-[color:var(--color-primary-yellow)]
                   text-primary-blue shadow-[var(--shadow-light)] active:opacity-90"
      >
        <SlidersHorizontal className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}
