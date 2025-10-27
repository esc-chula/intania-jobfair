import Section from "@/components/common/section";
import SkeletonCard from "@/components/common/skeleton-card";
import JobCardShort from "@/components/jobs/job-card-short";
import { fetchJobs, fetchCompanies } from "@/lib/data";
import { pickFeaturedJobs } from "../services/home.service";
import Link from "next/link";

export default async function FeaturedJobs() {
  try {
    const [jobs, companies] = await Promise.all([
      fetchJobs(),
      fetchCompanies()
    ]);
    
    const featuredJobs = pickFeaturedJobs(jobs, 6);
    
    return (
      <Section
        title="ตำแหน่งงานที่น่าสนใจ"
        actionLabel="ดูทั้งหมด"
        actionHref="/jobs"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => {
            const company = companies.find(c => c[""] === job.companyId) ?? null;
            return (
              <Link
                key={job.jobId}
                href={`/jobs/${job.jobId}`}
                className="w-full"
              >
                <JobCardShort 
                  job={job} 
                  company={company} 
                />
              </Link>
            );
          })}
        </div>
      </Section>
    );
  } catch (error) {
    console.error("Failed to load featured jobs:", error);
    return (
      <Section
        title="ตำแหน่งงานที่น่าสนใจ"
        actionLabel="ดูทั้งหมด"
        actionHref="/jobs"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </Section>
    );
  }
}