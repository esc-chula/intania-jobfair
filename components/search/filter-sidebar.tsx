"use client";

import { useState } from "react";
import { SearchFilters } from "@/hooks/use-search-engine";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterSidebarProps {
  filters: SearchFilters;
  updateFilter: (key: keyof SearchFilters, value: string | string[]) => void;
  uniqueMajors: string[];
}

const FilterSection = ({
  title,
  isOpenDefault = false,
  children,
}: {
  title: string;
  isOpenDefault?: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  return (
    <div className="border-b border-gray-100 py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm font-semibold text-gray-900 mb-2 hover:text-pink-600"
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="space-y-2 mt-2">{children}</div>}
    </div>
  );
};

export const FilterSidebar = ({
  filters,
  updateFilter,
  uniqueMajors,
}: FilterSidebarProps) => {
  const handleCheckboxChange = (
    category: "selectedMajors" | "selectedYears" | "selectedTypes",
    value: string,
  ) => {
    const currentlist = filters[category] as string[];
    let newList;
    if (currentlist.includes(value)) {
      newList = currentlist.filter((item) => item !== value);
    } else {
      newList = [...currentlist, value];
    }
    updateFilter(category, newList);
  };

  const studentYears = [
    "Bachelor's Freshmen",
    "Bachelor's Sophmore",
    "Bachelor's Junior",
    "Bachelor's Senior",
    "Master's",
    "Doctorate",
  ];

  const types = ["Internship", "Part-Time", "Full-Time"];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>

        <FilterSection title="Position Type" isOpenDefault>
          {types.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.selectedTypes.includes(type)}
                onChange={() => handleCheckboxChange("selectedTypes", type)}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">
                {type}
              </span>
            </label>
          ))}
        </FilterSection>

        <FilterSection title="Student Year">
          {studentYears.map((year) => (
            <label
              key={year}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.selectedYears.includes(year)}
                onChange={() => handleCheckboxChange("selectedYears", year)}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">
                {year}
              </span>
            </label>
          ))}
        </FilterSection>

        <FilterSection title="Majors">
          <div className="max-h-60 overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-gray-200">
            {uniqueMajors.map((major) => (
              <label
                key={major}
                className="flex items-start gap-2 cursor-pointer group hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={filters.selectedMajors.includes(major)}
                  onChange={() => handleCheckboxChange("selectedMajors", major)}
                  className="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <span className="text-xs text-gray-600 group-hover:text-gray-900 leading-tight">
                  {major}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
};
