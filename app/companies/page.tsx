import { fetchCompanies } from "@/lib/data";

export default async function CompaniesPage() {
  const companies = await fetchCompanies();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">บริษัททั้งหมด</h1>
      <p className="text-sm text-muted-foreground">
        รายการ {companies.length} บริษัท
      </p>
    </div>
  );
}
