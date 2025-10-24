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
        <div>
            <CompanyCardLong company={company} jobCount={companyJobs.length} />
            <div className="flex w-auto">
                <div className="text-xl my-4 font-bold font-headTH">
                    ตำแหน่งงาน
                </div>
                <div className="justify-end text-l ml-auto mr-5 my-4 font-light font-headTH text-gray-500">
                    <Link href="/">ดูทั้งหมด {">"}</Link>
                </div>
            </div>
            <div className="flex flex-col gap-4">
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
