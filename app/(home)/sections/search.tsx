"use client";
import { SlidersHorizontal, Search as SearchIcon, X, RefreshCw } from "lucide-react";
import { useSearch } from "../contexts/search-context";
import { useState } from "react";
import FilterSelector from "@/components/jobs/filter-select";
import GroupedFilterSelector from "@/components/jobs/group-filter-select";
import {
  jobTypeOptions,
  eligibleYearOptions,
  groupedMajorOptions,
} from "@/constants/job-filter-options";
import { eventDateOptions } from "@/constants/event-date-filter-options";

export default function Search() {
  const {
    searchQuery,
    setSearchQuery,
    dateFilter,
    setDateFilter,
    jobTypeFilter,
    setJobTypeFilter,
    eligibleYearFilter,
    setEligibleYearFilter,
    majorFilter,
    setMajorFilter,
  } = useSearch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="flex-1 relative">
          <span className="sr-only">ค้นหา</span>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon className="text-[#B7B7B7]" size={16} />
          </span>
          <input
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="ค้นหาตำแหน่งบูธ บริษัท ตำแหน่งงาน หรือที่ตั้ง"
            className="h-9 w-full rounded-md border border-border bg-white pl-9 pr-9 text-sm font-bodyTH placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B7B7B7] hover:text-gray-600"
              aria-label="ล้างการค้นหา"
            >
              <X size={16} />
            </button>
          )}
        </label>

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          aria-label="ตัวกรอง"
          className={`w-9 h-9 ${
            isFilterOpen ? "bg-[#D9A94C]" : "bg-[#F5C45E]"
          } transition rounded-md shadow flex items-center justify-center cursor-pointer`}
        >
          <SlidersHorizontal
            className="text-[#102E50]"
            height={16}
            width={16}
          />
        </button>
      </div>

      {isFilterOpen && (
        <div className="flex flex-col gap-3">
          <FilterSelector
            filterOption={dateFilter}
            setFilterOption={setDateFilter}
            options={eventDateOptions}
            placeholder="เลือกวันที่เข้าร่วมงาน"
          />
          <FilterSelector
            filterOption={jobTypeFilter}
            setFilterOption={setJobTypeFilter}
            options={jobTypeOptions}
            placeholder="เลือกสายงาน"
          />
          <FilterSelector
            filterOption={eligibleYearFilter}
            setFilterOption={setEligibleYearFilter}
            options={eligibleYearOptions}
            placeholder="เลือกระดับชั้นปีที่เปิดรับ"
          />
          <GroupedFilterSelector
            filterOption={majorFilter}
            setFilterOption={setMajorFilter}
            groupedOptions={groupedMajorOptions}
            placeholder="เลือกสาขาที่เปิดรับ"
          />
          <div className="flex justify-center">
            <button
              onClick={() => {
                setDateFilter("");
                setJobTypeFilter("");
                setEligibleYearFilter("");
                setMajorFilter("");
              }}
              className="text-sm flex gap-2 font-bodyTH text-[#D9A94C]"
            >
              <RefreshCw /> ล้างตัวกรอง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
