"use client";

import { useState, useMemo } from "react";
import PaginationControls from "@/components/jobs/pagination";
import SearchBar from "@/components/companies/search-bar";
import SortSelector from "@/components/companies/sort-select";
import CompanyCard from "@/components/companies/company-card";
import FilterSelector from "@/components/jobs/filter-select";
import type { Job, Company } from "@/types/schema";
import { BUSINESS_FOCUS_OPTIONS } from "@/types/schema";
import Link from "next/link";

export default function CompanyListClient({
    initialCompanies,
    initialJobs,
    cardsPerPage = 10,
}: {
    initialCompanies: Company[];
    initialJobs: Job[];
    cardsPerPage?: number;
}) {
    const [sortOption, setSortOption] = useState<
        "name" | "job-count" | "open-date" | "close-date"
    >("name");
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter states
    const [businessFocusFilter, setBusinessFocusFilter] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("");

    // Generate filter options
    const filterOptions = useMemo(() => {
        return {
            businessFocus: [
                { value: "All", label: "ทั้งหมด" },
                ...BUSINESS_FOCUS_OPTIONS.map((focus) => ({
                    value: focus,
                    label: focus,
                })),
            ],
            availability: [
                { value: "All", label: "ทั้งหมด" },
                { value: "available", label: "เปิดรับสมัครอยู่" },
                { value: "closed", label: "ปิดรับสมัครแล้ว" },
            ],
        };
    }, []);

    // Helper to check if company has open jobs
    const hasOpenJobs = useMemo(() => {
        const map = new Map<number, boolean>();
        const now = Date.now();

        initialJobs.forEach((job) => {
            const endTime = job.application_end
                ? new Date(job.application_end).getTime()
                : Infinity;

            if (endTime >= now) {
                map.set(job.companyId, true);
            }
        });

        return map;
    }, [initialJobs]);

    const searchedCompanies = useMemo(() => {
        return initialCompanies.filter((company: Company) => {
            const matchesQuery =
                company.companyName_en
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                company.companyName_th.includes(query);

            // Apply business focus filter
            const matchesBusinessFocus =
                businessFocusFilter === "" ||
                businessFocusFilter === "All" ||
                company.businessFocus === businessFocusFilter;

            // Apply availability filter
            const hasOpen = hasOpenJobs.get(company[""]) ?? false;
            const matchesAvailability =
                availabilityFilter === "" ||
                availabilityFilter === "All" ||
                (availabilityFilter === "available" && hasOpen) ||
                (availabilityFilter === "closed" && !hasOpen);

            return matchesQuery && matchesBusinessFocus && matchesAvailability;
        });
    }, [
        initialCompanies,
        query,
        businessFocusFilter,
        availabilityFilter,
        hasOpenJobs,
    ]);

    // pre compute job dates by company (for sorting)
    const companyJobDates = useMemo(() => {
        const map = new Map<
            number,
            { earliestStart: number; latestEnd: number }
        >();

        initialJobs.forEach((job) => {
            const existing = map.get(job.companyId) || {
                earliestStart: Infinity,
                latestEnd: -Infinity,
            };

            const startTime = job.application_start
                ? new Date(job.application_start).getTime()
                : Infinity;
            const endTime = job.application_end
                ? new Date(job.application_end).getTime()
                : -Infinity;

            map.set(job.companyId, {
                earliestStart: Math.min(existing.earliestStart, startTime),
                latestEnd: Math.max(existing.latestEnd, endTime),
            });
        });

        return map;
    }, [initialJobs]);

    // pre compute job count by company (for <CompanyCard>)
    const jobCountMap = useMemo(() => {
        const m = new Map<number, number>();
        initialJobs.forEach((j) => {
            m.set(j.companyId, (m.get(j.companyId) ?? 0) + 1);
        });
        return m;
    }, [initialJobs]);

    // Sorting logic
    const sortedCompanies = useMemo(() => {
        const arr = [...searchedCompanies];
        if (sortOption === "name")
            return arr.sort((a, b) =>
                a.companyName_th.localeCompare(b.companyName_th)
            );

        if (sortOption === "open-date")
            return arr.sort((a, b) => {
                const openA =
                    companyJobDates.get(a[""])?.earliestStart ?? Infinity;
                const openB =
                    companyJobDates.get(b[""])?.earliestStart ?? Infinity;
                return openA - openB;
            });

        if (sortOption === "close-date")
            return arr.sort((a, b) => {
                const closeA =
                    companyJobDates.get(a[""])?.latestEnd ?? -Infinity;
                const closeB =
                    companyJobDates.get(b[""])?.latestEnd ?? -Infinity;
                return closeB - closeA; // Latest first
            });
        if (sortOption === "job-count")
            return arr.sort(
                (a, b) =>
                    -(
                        (jobCountMap.get(a[""]) ?? 0) -
                        (jobCountMap.get(b[""]) ?? 0)
                    )
            );

        return arr;
    }, [searchedCompanies, sortOption, companyJobDates, jobCountMap]);

    // Pagination logic
    const totalPages = Math.max(
        1,
        Math.ceil(sortedCompanies.length / cardsPerPage)
    );
    if (page > totalPages && totalPages > 0) setPage(totalPages);
    const paginatedCompanies = useMemo(() => {
        const startIndex = (page - 1) * cardsPerPage;
        return sortedCompanies.slice(startIndex, startIndex + cardsPerPage);
    }, [sortedCompanies, page, cardsPerPage]);

    return (
        <div className="flex flex-col gap-6">
            <SearchBar
                query={query}
                setQuery={setQuery}
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                setPage={setPage}
            />

            {/* Filter Panel */}
            {isFilterOpen && (
                <div className="space-y-3">
                    <FilterSelector
                        filterOption={businessFocusFilter}
                        setFilterOption={(v) => {
                            setBusinessFocusFilter(v);
                            setPage(1);
                        }}
                        placeholder="เลือกสายงานของบริษัท"
                        options={filterOptions.businessFocus}
                    />

                    <FilterSelector
                        filterOption={availabilityFilter}
                        setFilterOption={(v) => {
                            setAvailabilityFilter(v);
                            setPage(1);
                        }}
                        placeholder="เลือกสถานะรับสมัคร"
                        options={filterOptions.availability}
                    />

                    {/* Reset filters button */}
                    <button
                        onClick={() => {
                            setBusinessFocusFilter("");
                            setAvailabilityFilter("");
                            setPage(1);
                        }}
                        className="w-full h-9 shadow bg-primary-yellow hover:bg-gray-200 rounded-md text-sm font-bodyTH text-primary-blue transition"
                    >
                        ล้างตัวกรอง
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-6">
                <SortSelector
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />
                <h2 className="heading-th-2 text-primary-blue">
                    {query == "" ? "บริษัททั้งหมด" : "ผลการค้นหา"}
                </h2>
            </div>

            <div className="flex flex-col gap-4 items-center">
                {paginatedCompanies.map((company) => {
                    const count = jobCountMap.get(company[""]) ?? 0;
                    return (
                        <Link
                            key={company[""]}
                            href={`/companies/${company[""]}`}
                            className="w-full"
                        >
                            <CompanyCard company={company} jobCount={count} />
                        </Link>
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
