"use client";

import { useState, useMemo } from "react";
import PaginationControls from "./pagination";
import SearchBar from "./search-bar";
import SortSelector from "./sort-select";
import JobCard from "./job-card";
import type { Job, Company } from "@/types/schema";

export default function JobsListClient({
  initialJobs,
  initialCompanies,
  cardsPerPage = 10,
}: {
  initialJobs: Job[];
  initialCompanies: Company[];
  cardsPerPage?: number;
}) {
  const [sortOption, setSortOption] = useState<
    "position" | "open-date" | "close-date"
  >("position");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const searchedJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const company =
        initialCompanies.find((c) => c.companyId === job.companyId) ?? null;
      const matchesQuery =
        job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
        (company &&
          company.companyName.toLowerCase().includes(query.toLowerCase()));
      // Add more filter conditions here if needed
      return matchesQuery;
    });
  }, [initialJobs, initialCompanies, query]);

  // Sorting logic
  const sortedJobs = useMemo(() => {
    const arr = [...searchedJobs];
    if (sortOption === "position")
      return arr.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
    if (sortOption === "open-date")
      return arr.sort(
        (a, b) =>
          new Date(a.applicationStartDate).getTime() -
          new Date(b.applicationStartDate).getTime()
      );
    if (sortOption === "close-date")
      return arr.sort(
        (a, b) =>
          new Date(a.applicationEndDate).getTime() -
          new Date(b.applicationEndDate).getTime()
      );
    return arr;
  }, [searchedJobs, sortOption]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / cardsPerPage));
  if (page > totalPages) setPage(totalPages);
  const paginatedJobs = useMemo(() => {
    const startIndex = (page - 1) * cardsPerPage;
    return sortedJobs.slice(startIndex, startIndex + cardsPerPage);
  }, [sortedJobs, page, cardsPerPage]);

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        query={query}
        setQuery={setQuery}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        setPage={setPage}
      />
      <SortSelector sortOption={sortOption} setSortOption={setSortOption} />
      <h2 className="text-xl font-bold">ตำแหน่งงานทั้งหมด</h2>

      {paginatedJobs.map((job) => {
        const company =
          initialCompanies.find((c) => c.companyId === job.companyId) ?? null;
        return <JobCard key={job.jobId} job={job} company={company} />;
      })}

      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
