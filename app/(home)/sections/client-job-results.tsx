"use client";
import Section from "@/components/common/section";
import SkeletonCard from "@/components/common/skeleton-card";
import EmptyState from "@/components/common/empty-state";
import JobCardShort from "@/components/jobs/job-card-short";
import { useSearch } from "../contexts/search-context";
import { fetchJobs, fetchCompanies } from "@/lib/data";
import { searchJobsAndCompanies } from "@/lib/search";
import { useState, useEffect, useMemo } from "react";
import type { Job, Company, EligibleStudentYear, MajorEligibility } from "@/types/schema";

export default function ClientJobResults() {
  const { 
    isSearchActive, 
    searchQuery,
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

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    let jobsToFilter = jobs;

    // Apply search if there's a query
    if (searchQuery.trim()) {
      const { jobs: searchedJobs } = searchJobsAndCompanies(
        searchQuery,
        jobs,
        companies
      );
      jobsToFilter = searchedJobs;
    }

    // Then apply filters
    return jobsToFilter.filter((job) => {
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

      return matchesJobType && matchesEligibleYear && matchesMajor;
    });
  }, [jobs, companies, searchQuery, jobTypeFilter, eligibleYearFilter, majorFilter]);

  // แสดงเฉพาะเมื่อมีการค้นหาหรือมีการใช้ filter
  if (!isSearchActive && !jobTypeFilter && !eligibleYearFilter && !majorFilter) {
    return null;
  }

  return (
    <Section title="ผลการค้นหา" description="ตำแหน่งงานล่าสุด">
      {loading ? (
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => {
            const company = companies.find(c => c[""] === job.companyId);
            return (
              <JobCardShort
                key={job.jobId}
                job={job}
                company={company || null}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="ไม่พบตำแหน่งงานที่ตรงกับคำค้นหา"
        
        />
      )}
    </Section>
  );
}
