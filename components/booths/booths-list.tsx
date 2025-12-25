"use client";

import { useState, useMemo } from "react";
import PaginationControls from "@/components/jobs/pagination";
import SearchBar from "@/components/booths/search-bar";
import BoothCard from "@/components/booths/booth-card";
import FilterSelector from "@/components/jobs/filter-select";
import type { Booth } from "@/types/schema";
import { BUSINESS_FOCUS_OPTIONS } from "@/types/schema";

export default function BoothListClient({
    initialBooths,
    cardsPerPage = 10,
}: {
    initialBooths: Booth[];
    cardsPerPage?: number;
}) {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter states
    const [businessFocusFilter, setBusinessFocusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

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
            date: [
                { value: "All", label: "ทั้งหมด" },
                { value: "1", label: "7 ม.ค. 69" },
                { value: "2", label: "8 ม.ค. 69" },
            ],
        };
    }, []);

    const searchedCompanies = useMemo(() => {
        return initialBooths.filter((booth) => {
            const matchesQuery =
                booth.companyName_en
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                booth.companyName_th.includes(query) ||
                booth.boothNumber.toLowerCase().includes(query.toLowerCase());

            // Apply business focus filter
            const matchesBusinessFocus =
                businessFocusFilter === "" ||
                businessFocusFilter === "All" ||
                booth.businessFocus === businessFocusFilter;

            // Apply booth date filter
            const matchesDate =
                dateFilter === "" ||
                dateFilter === "All" ||
                (dateFilter == "1" && booth.day1) ||
                (dateFilter == "2" && booth.day2);

            return matchesQuery && matchesBusinessFocus && matchesDate;
        });
    }, [initialBooths, query, businessFocusFilter, dateFilter]);

    // Sorting logic
    const sortedCompanies = useMemo(() => {
        const arr = [...searchedCompanies];

        const parseBoothNumber = (boothNumber: string) => {
            const match = boothNumber.match(/^([A-Za-z]+)(\d+)$/);
            if (match) {
                return {
                    letter: match[1].toUpperCase(),
                    number: parseInt(match[2], 10),
                };
            }
            return { letter: boothNumber, number: 0 };
        };

        return arr.sort((a, b) => {
            const aBoothParsed = parseBoothNumber(a.boothNumber);
            const bBoothParsed = parseBoothNumber(b.boothNumber);

            // 1. Sort by letter part
            if (aBoothParsed.letter !== bBoothParsed.letter) {
                return aBoothParsed.letter.localeCompare(bBoothParsed.letter);
            }

            // 2. Sort by number part
            if (aBoothParsed.number !== bBoothParsed.number) {
                return aBoothParsed.number - bBoothParsed.number;
            }

            // 3. Sort by day
            const aHasDay1Only = a.day1 && !a.day2;
            const bHasDay1Only = b.day1 && !b.day2;
            const aHasDay2Only = !a.day1 && a.day2;
            const bHasDay2Only = !b.day1 && b.day2;

            if (aHasDay1Only && bHasDay2Only) return -1;
            if (aHasDay2Only && bHasDay1Only) return 1;

            return 0;
        });
    }, [searchedCompanies]);

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
                        filterOption={dateFilter}
                        setFilterOption={(v) => {
                            setDateFilter(v);
                            setPage(1);
                        }}
                        placeholder="เลือกวันที่เข้าร่วมงาน"
                        options={filterOptions.date}
                    />
                    <FilterSelector
                        filterOption={businessFocusFilter}
                        setFilterOption={(v) => {
                            setBusinessFocusFilter(v);
                            setPage(1);
                        }}
                        placeholder="เลือกสายงานของบริษัท"
                        options={filterOptions.businessFocus}
                    />

                    {/* Reset filters button */}
                    <button
                        onClick={() => {
                            setBusinessFocusFilter("");
                            setDateFilter("");
                            setPage(1);
                        }}
                        className="w-full h-9 shadow bg-primary-yellow hover:bg-gray-200 rounded-md text-sm font-bodyTH text-primary-blue transition"
                    >
                        ล้างตัวกรอง
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-6">
                <h2 className="heading-th-2 text-primary-blue">
                    {query == "" ? "บริษัททั้งหมด" : "ผลการค้นหา"}
                </h2>
            </div>

            <div className="flex flex-col gap-4 items-center">
                {paginatedCompanies.map((booth) => {
                    return (
                        <div key={booth.boothId} className="w-full">
                            <BoothCard booth={booth} />
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
