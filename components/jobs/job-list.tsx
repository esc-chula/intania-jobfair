"use client";

import { useState, useMemo } from "react";
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

// 👇 import options ที่เราแยกออกมา
import {
    positionTypeOptions,
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
    const [sortOption, setSortOption] = useState<
        "position" | "open-date" | "close-date"
    >("position");
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [positionTypeFilter, setPositionTypeFilter] = useState<string>("");
    const [jobTypeFilter, setJobTypeFilter] = useState<string>("");
    const [eligibleYearFilter, setEligibleYearFilter] = useState<string>("");
    const [majorFilter, setMajorFilter] = useState<string>("");

    const searchedJobs = useMemo(() => {
        return initialJobs.filter((job) => {
            const company =
                initialCompanies.find((c) => c[""] === job.companyId) ?? null;

            // 1. Search query
            const matchesQuery =
                job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
                (company &&
                    company.companyName_th
                        .toLowerCase()
                        .includes(query.toLowerCase()));

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

            // combine all
            return (
                matchesQuery &&
                matchesPositionType &&
                matchesJobType &&
                matchesEligibleYear &&
                matchesMajor
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
    ]);

    const sortedJobs = useMemo(() => {
        const arr = [...searchedJobs];
        if (sortOption === "position")
            return arr.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));

        if (sortOption === "open-date")
            return arr.sort(
                (a, b) =>
                    new Date(a.application_start || "").getTime() -
                    new Date(b.application_start || "").getTime()
            );

        if (sortOption === "close-date")
            return arr.sort(
                (a, b) =>
                    new Date(a.application_end || "").getTime() -
                    new Date(b.application_end || "").getTime()
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
                setQuery={setQuery}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                setPage={setPage}
            />
            {isFilterOpen && (
                <>
                    <FilterSelector
                        filterOption={positionTypeFilter}
                        setFilterOption={(v) => {
                            setPositionTypeFilter(v), setPage(1);
                        }}
                        options={positionTypeOptions}
                        placeholder="เลือกรูปแบบการทำงาน"
                    />
                    <FilterSelector
                        filterOption={jobTypeFilter}
                        setFilterOption={setJobTypeFilter}
                        options={jobTypeOptions}
                        placeholder="เลือกสายงานของตำแหน่ง"
                    />
                    <FilterSelector
                        filterOption={eligibleYearFilter}
                        setFilterOption={setEligibleYearFilter}
                        options={eligibleYearOptions}
                        placeholder="เลือกระดับการศึกษา"
                    />
                    <GroupedFilterSelector
                        filterOption={majorFilter}
                        setFilterOption={setMajorFilter}
                        groupedOptions={groupedMajorOptions}
                        placeholder="เลือกสาขาวิชา"
                    />
                    {/* Reset filters button */}
                    <button
                        onClick={() => {
                            setPositionTypeFilter("");
                            setJobTypeFilter("");
                            setEligibleYearFilter("");
                            setMajorFilter("");
                            setPage(1);
                        }}
                        className="w-full h-9 shadow bg-primary-yellow hover:bg-gray-200 rounded-md text-sm font-bodyTH text-primary-blue transition"
                    >
                        ล้างตัวกรอง
                    </button>
                </>
            )}

            <SortSelector
                sortOption={sortOption}
                setSortOption={setSortOption}
            />
            <h2 className="heading-th-2 text-primary-blue">
                ตำแหน่งงานทั้งหมด
            </h2>

            <div className="flex flex-col gap-4 items-center">
                {paginatedJobs.map((job) => {
                    const company =
                        initialCompanies.find((c) => c[""] === job.companyId) ??
                        null;
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
