import { notFound } from "next/navigation";
import { fetchCompanies, fetchJobs } from "@/lib/data";
import CompanyCardLong from "@/components/companies/company-card-long";
import JobCardShort from "@/components/jobs/job-card-short";
import BackButton from "@/components/common/back";

export default async function CompanyDetailPage({
    params,
}: {
    params: Promise<{ companyId: string }>;
}) {
    const { companyId } = await params;
    const idNum = Number(companyId);

    const companies = await fetchCompanies();
    const company = companies.find((c) => c[""] === idNum);

    if (!company) {
        notFound();
    }

    const jobs = await fetchJobs();
    const companyJobs = jobs.filter((j) => j.companyId === idNum);

    return (
        <div className="w-full px-4 py-6 md:py-8">
            <div className="w-full max-w-4xl mx-auto">
                {/* Company Information */}
                <BackButton />
                <div className="mb-8 mt-4">
                    <CompanyCardLong
                        company={company}
                        jobCount={companyJobs.length}
                    />
                </div>

                {/* Job Positions Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="heading-th-2 text-primary-blue">
                            ตำแหน่งงาน
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                        {companyJobs.map((job) => (
                            <JobCardShort
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
