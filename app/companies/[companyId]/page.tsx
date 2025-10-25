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
        <div className="flex flex-col gap-4 items-center">
            <CompanyCardLong company={company} jobCount={companyJobs.length} />
            <div className="flex w-auto max-w-[320px] w-full">
                <div className="heading-th-2 my-4 text-primary-blue">
                    ตำแหน่งงาน
                </div>
                <div className="justify-end ml-auto mr-5 my-4">
                    <Link href="/" className="body-th-2 text-[#4A5565] hover:opacity-80 flex items-center gap-1">
                        ดูทั้งหมด <span>&gt;</span>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
                {jobs.slice(0,4).map((job) => (
                    <JobCard
                        key={job.jobId}
                        job={job}
                        company={company}
                    ></JobCard>
                ))}
            </div>
        </div>
    );
}
