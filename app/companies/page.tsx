import { fetchCompanies, fetchJobs } from "@/lib/data";
import { Company } from "@/types/schema";
import CompanyListClient from "@/components/companies/company-list";
import { Suspense } from "react";

export default async function CompaniesPage() {
  const companies = await fetchCompanies();
  const jobs = await fetchJobs();
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <CompanyListClient initialJobs={jobs} initialCompanies={companies} />
        </Suspense>
      </div>
    </div>
  );
}
