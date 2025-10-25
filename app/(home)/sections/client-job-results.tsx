"use client";
import Section from "@/components/common/section";
import SkeletonCard from "@/components/common/skeleton-card";
import EmptyState from "@/components/common/empty-state";
import JobCardShort from "@/components/jobs/job-card-short";
import { useSearch } from "../contexts/search-context";
import { fetchJobs, fetchCompanies } from "@/lib/data";
import { searchJobsAndCompanies } from "@/lib/search";
import { useState, useEffect } from "react";
import type { Job, Company } from "@/types/schema";

export default function ClientJobResults() {
  const { isSearchActive, searchQuery } = useSearch();
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

  // แสดงเฉพาะเมื่อมีการค้นหา
  if (!isSearchActive) {
    return null;
  }

  // Use simple search
  const { jobs: filteredJobs } = searchJobsAndCompanies(
    searchQuery,
    jobs,
    companies
  );

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
          description="ลองใช้คำค้นหาอื่น หรือดูตำแหน่งงานที่แนะนำ"
        />
      )}
    </Section>
  );
}
