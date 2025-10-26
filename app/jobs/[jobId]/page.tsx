import { notFound } from "next/navigation";
import { fetchCompanies, fetchJobs } from "@/lib/data";
import JobCardLong from "@/components/jobs/job-card-long";
import Link from "next/link";
import { Company } from "@/types/schema";
import CompanyCard from "@/components/companies/company-card";

export default async function jobDetailPage({
  params,
}: {
  params: { jobId: string };
}) {
  const jobs = await fetchJobs();
  const job = jobs.find((j) => j["jobId"] === Number(params.jobId));

  if (!job) {
    notFound();
  }

  const companies = await fetchCompanies();
  const company = companies.find((c) => c[""] === Number(job.companyId));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        {/* job Information */}
        <div className="mb-8">
          <JobCardLong job={job} company={company as Company | null} />
        </div>

        {/* Job Positions Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-th-2 text-primary-blue">เกี่ยวกับบริษัท</h2>
          </div>
          <CompanyCard
            jobCount={
              jobs.filter((j) => j.companyId === Number(company?.[""])).length
            }
            company={company as Company}
          />
        </div>
      </div>
    </div>
  );
}
