import { fetchCompanies, fetchJobs } from "@/lib/data";
import { Company } from "@/types/schema";
import CompanyListClient from "@/components/companies/company-list";

export default async function CompaniesPage() {
    const companies = await fetchCompanies();
    const jobs = await fetchJobs();
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4 font-headTH text-primary-blue">
                บริษัททั้งหมด
            </h1>

            <div className="flex flex-col gap-4">
                <CompanyListClient
                    initialJobs={jobs}
                    initialCompanies={companies}
                />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
                รายการ {companies.length} บริษัท
            </p>
        </div>
    );
}
