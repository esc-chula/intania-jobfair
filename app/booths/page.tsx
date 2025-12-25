import { fetchCompanies, fetchJobs } from "@/lib/data";
import { Company } from "@/types/schema";
import BoothListClient from "@/components/booths/booths-list";
import BoothMap from "@/components/booths/booth-map";

export default async function CompaniesPage() {
  const companies = await fetchCompanies();
  const jobs = await fetchJobs();
  return (
    <div className="px-4 py-6">
      <BoothMap></BoothMap>
      <div className="flex flex-col gap-4">
        <BoothListClient initialJobs={jobs} initialCompanies={companies} />
      </div>
    </div>
  );
}
