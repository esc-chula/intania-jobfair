"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationControls from "./pagination";
import SearchBar from "./search-bar";
import SortSelector from "./sort-select";
import JobCard from "./job-card";
import type {
  Job,
  Company,
  EligibleStudentYear,
  MajorEligibility,
  PositionType,
} from "@/types/schema";
import FilterSelector from "./filter-select";
import GroupedFilterSelector from "./group-filter-select";
import { RefreshCw } from "lucide-react";

// 👇 import options ที่เราแยกออกมา
import {
  positionTypeOptions,
  dateOptions,
  jobTypeOptions,
  eligibleYearOptions,
  groupedMajorOptions,
} from "@/constants/job-filter-options";

export default function JobsListClient({
  initialJobs,
  initialCompanies,
  cardsPerPage = 10,
}: {
  initialJobs: Job[];
  initialCompanies: Company[];
  cardsPerPage?: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortOption, setSortOption] = useState(
    () => (searchParams.get("sort") as any) || "position",
  );
  const [page, setPage] = useState(() => {
    const p = searchParams.get("page");
    return p ? parseInt(p, 10) : 1;
  });
  const [query, setQuery] = useState(() => searchParams.get("query") || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [positionTypeFilter, setPositionTypeFilter] = useState(
    () => searchParams.get("positionType") || "",
  );
  const [jobTypeFilter, setJobTypeFilter] = useState(
    () => searchParams.get("jobType") || "",
  );
  const [eligibleYearFilter, setEligibleYearFilter] = useState(
    () => searchParams.get("eligibleYear") || "",
  );
  const [majorFilter, setMajorFilter] = useState(
    () => searchParams.get("major") || "",
  );
  const [dateFilter, setDateFilter] = useState(
    () => searchParams.get("date") || "",
  );
  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (sortOption && sortOption !== "position") params.set("sort", sortOption);
    if (page > 1) params.set("page", String(page));
    if (query) params.set("query", query);
    if (positionTypeFilter) params.set("positionType", positionTypeFilter);
    if (jobTypeFilter) params.set("jobType", jobTypeFilter);
    if (eligibleYearFilter) params.set("eligibleYear", eligibleYearFilter);
    if (majorFilter) params.set("major", majorFilter);
    if (dateFilter) params.set("date", dateFilter);
    router.replace("?" + params.toString(), { scroll: false });
  }, [
    sortOption,
    page,
    query,
    positionTypeFilter,
    jobTypeFilter,
    eligibleYearFilter,
    majorFilter,
    dateFilter,
    router,
  ]);

  const searchedJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const company =
        initialCompanies.find((c) => c[""] === job.companyId) ?? null;

      // 1. Search query
      const matchesQuery =
        job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
        (company &&
          company.companyName_th.toLowerCase().includes(query.toLowerCase()));

      // 2. Position type filter
      const matchesPositionType =
        positionTypeFilter === "" ||
        positionTypeFilter === "All" ||
        job.positionType === positionTypeFilter;

      // 3. Job type filter
      const matchesJobType =
        jobTypeFilter === "" ||
        jobTypeFilter === "All" ||
        job.field_of_work.includes(jobTypeFilter);

      // 4. Eligible year filter
      const matchesEligibleYear =
        eligibleYearFilter === "" ||
        eligibleYearFilter === "All" ||
        job.eligibleStudentYear[
          eligibleYearFilter as keyof EligibleStudentYear
        ] == true;

      // 5. Major filter
      const matchesMajor =
        majorFilter === "" ||
        majorFilter === "All" ||
        job.major[majorFilter as string] === true;

      // Apply booth date filter
      const matchesDate =
        dateFilter === "" ||
        dateFilter === "All" ||
        (dateFilter == "1" && company!.boothDay1 != "") ||
        (dateFilter == "2" && company!.boothDay2 != "");

      // combine all
      return (
        matchesQuery &&
        matchesPositionType &&
        matchesJobType &&
        matchesEligibleYear &&
        matchesMajor &&
        matchesDate
      );
    });
  }, [
    initialJobs,
    initialCompanies,
    query,
    positionTypeFilter,
    jobTypeFilter,
    eligibleYearFilter,
    majorFilter,
    dateFilter,
  ]);

  const sortedJobs = useMemo(() => {
    const arr = [...searchedJobs];
    if (sortOption === "position")
      return arr.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));

    if (sortOption === "open-date")
      return arr.sort(
        (a, b) =>
          new Date(a.application_start || "").getTime() -
          new Date(b.application_start || "").getTime(),
      );

    if (sortOption === "close-date")
      return arr.sort(
        (a, b) =>
          new Date(a.application_end || "").getTime() -
          new Date(b.application_end || "").getTime(),
      );

    return arr;
  }, [searchedJobs, sortOption]);

  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / cardsPerPage));
  if (page > totalPages) setPage(totalPages);

  const paginatedJobs = useMemo(() => {
    const startIndex = (page - 1) * cardsPerPage;
    return sortedJobs.slice(startIndex, startIndex + cardsPerPage);
  }, [sortedJobs, page, cardsPerPage]);

  return (
    <div className="flex flex-col gap-6">
      <SearchBar
        query={query}
        setQuery={(v) => {
          setQuery(v);
          setPage(1);
        }}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        setPage={setPage}
      />
      {isFilterOpen && (
        <>
          <FilterSelector
            filterOption={dateFilter}
            setFilterOption={(v) => {
              setDateFilter(v);
              setPage(1);
            }}
            options={dateOptions}
            placeholder="เลือกวันที่เข้าร่วมงาน"
          />
          <FilterSelector
            filterOption={positionTypeFilter}
            setFilterOption={(v) => {
              setPositionTypeFilter(v);
              setPage(1);
            }}
            options={positionTypeOptions}
            placeholder="เลือกรูปแบบการทำงาน"
          />
          <FilterSelector
            filterOption={jobTypeFilter}
            setFilterOption={(v) => {
              setJobTypeFilter(v);
              setPage(1);
            }}
            options={jobTypeOptions}
            placeholder="เลือกสายงานของตำแหน่ง"
          />
          <FilterSelector
            filterOption={eligibleYearFilter}
            setFilterOption={(v) => {
              setEligibleYearFilter(v);
              setPage(1);
            }}
            options={eligibleYearOptions}
            placeholder="เลือกระดับการศึกษา"
          />
          <GroupedFilterSelector
            filterOption={majorFilter}
            setFilterOption={(v) => {
              setMajorFilter(v);
              setPage(1);
            }}
            groupedOptions={groupedMajorOptions}
            placeholder="เลือกสาขาวิชา"
          />
          {/* Reset filters button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setPositionTypeFilter("");
                setJobTypeFilter("");
                setEligibleYearFilter("");
                setMajorFilter("");
                setDateFilter("");
                setPage(1);
              }}
              className="text-sm flex gap-2 font-bodyTH text-[#D9A94C]"
            >
              <RefreshCw /> ล้างตัวกรอง
            </button>
          </div>
        </>
      )}

      <SortSelector sortOption={sortOption} setSortOption={setSortOption} />
      <h2 className="heading-th-2 text-primary-blue">ตำแหน่งงานทั้งหมด</h2>

      <div className="flex flex-col gap-4 items-center">
        {paginatedJobs.map((job) => {
          const company =
            initialCompanies.find((c) => c[""] === job.companyId) ?? null;
          return (
            <div key={job.jobId} className="w-full">
              <JobCard job={job} company={company} />
            </div>
          );
        })}
      </div>

      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
