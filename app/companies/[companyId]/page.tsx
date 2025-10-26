import { notFound } from "next/navigation";
import { fetchCompanies, fetchJobs } from "@/lib/data";
import CompanyCardLong from "@/components/companies/company-card-long";
import Link from "next/link";
import JobCard from "@/components/jobs/job-card";

export default async function CompanyDetailPage({
    params,
}: {
    params: { companyId: string };
}) {
    const companies = await fetchCompanies();
    const company = companies.find((c) => c[""] === Number(params.companyId));

    if (!company) {
        notFound();
    }

    const jobs = await fetchJobs();
    const companyJobs = jobs.filter(
        (j) => j.companyId === Number(params.companyId)
    );

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
            <div className="max-w-4xl mx-auto">
                {/* Company Information */}
                <div className="mb-8">
                    <CompanyCardLong company={company} jobCount={companyJobs.length} />
                </div>

                {/* Job Positions Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="heading-th-2 text-primary-blue">
                            ตำแหน่งงาน
                        </h2>
                        <Link 
                            href="/" 
                            className="body-th-2 text-[#4A5565] hover:opacity-80 flex items-center gap-1 transition-opacity"
                        >
                            ดูทั้งหมด <span>&gt;</span>
                        </Link>
                    </div>

                    {/* Job Cards Grid */}
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {companyJobs.map((job) => (
                            <JobCard
                                key={job.jobId}
                                job={job}
                                company={company}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
