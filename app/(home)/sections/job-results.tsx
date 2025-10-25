"use client";
import Section from "@/components/common/section";
import SkeletonCard from "@/components/common/skeleton-card";
import EmptyState from "@/components/common/empty-state";
import JobCardShort from "@/components/jobs/job-card-short";
import { useSearch } from "../contexts/search-context";
import { fetchJobs, fetchCompanies } from "@/lib/data";
import { useState, useEffect } from "react";
import type { Job, Company } from "@/types/schema";

export default function JobResults() {
  const { isSearchActive, searchQuery } = useSearch();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSearchActive && searchQuery.trim()) {
      setLoading(true);
      Promise.all([fetchJobs(), fetchCompanies()])
        .then(([jobsData, companiesData]) => {
          setJobs(jobsData);
          setCompanies(companiesData);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isSearchActive, searchQuery]);

  // แสดงเฉพาะเมื่อมีการค้นหา
  if (!isSearchActive) {
    return null;
  }

  const filteredJobs = jobs.filter(job => {
    const company = companies.find(c => c[""] === job.companyId);
    return job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (company && company.companyName_th.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <Section title="ผลการค้นหา" description="ตำแหน่งงานล่าสุด">
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.slice(0, 6).map((job) => {
            const company = companies.find(c => c[""] === job.companyId) ?? null;
            return (
              <JobCardShort 
                key={job.jobId} 
                job={job} 
                company={company} 
              />
            );
          })}
        </div>
      ) : (
        <EmptyState title="ไม่พบผลการค้นหา" hint="ลองใช้คำค้นหาอื่น หรือเลือกตัวกรองใหม่" />
      )}
    </Section>
  );
}