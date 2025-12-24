"use client";
import Section from "@/components/common/section";
import SkeletonCard from "@/components/common/skeleton-card";
import EmptyState from "@/components/common/empty-state";
import JobCardShort from "@/components/jobs/job-card-short";
import CompanyCardShort from "@/components/companies/company-card-short";
import { useSearch } from "../contexts/search-context";
import { fetchJobs, fetchCompanies } from "@/lib/data";
import { searchJobsAndCompanies } from "@/lib/search";
import { useState, useEffect, useMemo } from "react";
import type {
  Job,
  Company,
  EligibleStudentYear,
} from "@/types/schema";

export default function ClientJobResults() {
  const {
    isSearchActive,
    searchQuery,
    dateFilter,
    jobTypeFilter,
    eligibleYearFilter,
    majorFilter,
  } = useSearch();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load data once on mount
  useEffect(() => {
    if (!dataLoaded) {
      setLoading(true);
      Promise.all([fetchJobs(), fetchCompanies()])
        .then(([jobsData, companiesData]) => {
          setJobs(jobsData);
          setCompanies(companiesData);
          setDataLoaded(true);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [dataLoaded]);

  // Filter jobs and companies based on search and filters
  const { filteredJobs, filteredCompanies } = useMemo(() => {
    let jobsToFilter = jobs;
    let companiesToFilter = companies;

    // Apply search if there's a query
    if (searchQuery.trim()) {
      const { jobs: searchedJobs, companies: searchedCompanies } =
        searchJobsAndCompanies(searchQuery, jobs, companies);
      jobsToFilter = searchedJobs;
      companiesToFilter = searchedCompanies;
    } else {
      // If no search query, we don't show specific company results unless there's some filter that makes sense,
      // but typically "search results" implies explicit search.
      // However, if filters like "Date" are active, we might want to filter companies too?
      // The current logic only showed filtered jobs.
      // Let's assume for "All companies" we only show them if there's a text search or maybe just rely on job filtering context.
      // BUT: If the user filters by "Job Type", that applies to Jobs.
      // If the user filters by "Date", that can apply to Companies too.
      // Let's keep company filtering simple: Only filter by search query for now,
      // unless we want to apply the Date filter to companies too (which makes sense).
    }

    // Filter Companies based on Date Filter
    if (dateFilter && dateFilter !== "All" && dateFilter !== "") {
      companiesToFilter = companiesToFilter.filter((company) => {
        return (
          (dateFilter === "Day1" && company.boothDay1) ||
          (dateFilter === "Day2" && company.boothDay2)
        );
      });
    }

    // Filter Jobs based on filters
    const finalJobs = jobsToFilter.filter((job) => {
      // Get company for date filtering
      const company = companies.find((c) => c[""] === job.companyId);

      // Date filter - check booth strings (boothDay1/boothDay2), not day1/day2 booleans
      const matchesDate =
        !dateFilter ||
        dateFilter === "" ||
        dateFilter === "All" ||
        (dateFilter === "Day1" && company?.boothDay1) ||
        (dateFilter === "Day2" && company?.boothDay2);

      // Job type filter
      const matchesJobType =
        jobTypeFilter === "" ||
        jobTypeFilter === "All" ||
        job.field_of_work.includes(jobTypeFilter);

      // Eligible year filter
      const matchesEligibleYear =
        eligibleYearFilter === "" ||
        eligibleYearFilter === "All" ||
        job.eligibleStudentYear[
          eligibleYearFilter as keyof EligibleStudentYear
        ] === true;

      // Major filter
      const matchesMajor =
        majorFilter === "" ||
        majorFilter === "All" ||
        job.major[majorFilter as string] === true;

      return (
        matchesDate && matchesJobType && matchesEligibleYear && matchesMajor
      );
    });

    return { filteredJobs: finalJobs, filteredCompanies: companiesToFilter };
  }, [
    jobs,
    companies,
    searchQuery,
    dateFilter,
    jobTypeFilter,
    eligibleYearFilter,
    majorFilter,
  ]);

  // แสดงเฉพาะเมื่อมีการค้นหาหรือมีการใช้ filter
  if (
    !isSearchActive &&
    !dateFilter &&
    !jobTypeFilter &&
    !eligibleYearFilter &&
    !majorFilter
  ) {
    return null;
  }

  // Refined Logic for display:
  const shouldShowCompanies =
    (searchQuery.trim().length > 0 ||
      (dateFilter !== "" && dateFilter !== "All")) &&
    filteredCompanies.length > 0;

  return (
    <Section title="ผลการค้นหาทั้งหมด">
      {loading ? (
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Company Results Section */}
          {shouldShowCompanies && (
            <div className="flex flex-col gap-4">
              <h3 className="text-primary-blue text-base font-headTH">
                ผลการค้นหาบริษัท {filteredCompanies.length} รายการ
              </h3>
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCompanies.map((company) => {
                  const jobCount = jobs.filter(
                    (j) => j.companyId === company[""],
                  ).length;
                  return (
                    <CompanyCardShort
                      key={company[""]}
                      company={company}
                      jobCount={jobCount}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Job Results Section */}
          {filteredJobs.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-primary-blue text-base font-headTH">
                ผลการค้นหาตำแหน่งงาน {filteredJobs.length} รายการ
              </h3>
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => {
                  const company = companies.find(
                    (c) => c[""] === job.companyId,
                  );
                  return (
                    <JobCardShort
                      key={job.jobId}
                      job={job}
                      company={company || null}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {!loading &&
            !shouldShowCompanies &&
            filteredJobs.length === 0 && (
              <EmptyState
                title="ไม่พบข้อมูลที่ตรงกับคำค้นหา"
                titleClassName="body-th-2 text-primary-blue"
              />
            )}
        </div>
      )}
    </Section>
  );
}
