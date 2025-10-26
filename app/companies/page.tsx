import { fetchCompanies, fetchJobs } from "@/lib/data";
import { Company } from "@/types/schema";
import CompanyListClient from "@/components/companies/company-list";

export default async function CompaniesPage() {
    const companies = await fetchCompanies();
    const jobs = await fetchJobs();
    return (
        <div className="px-4 py-6">
            <div className="flex flex-col gap-4">
                <CompanyListClient
                    initialJobs={jobs}
                    initialCompanies={companies}
                />
            </div>
        </div>
    );
}
