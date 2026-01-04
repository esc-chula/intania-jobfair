import { fetchCompanies, fetchJobs } from "@/lib/data";
import { Booth, Company } from "@/types/schema";
import BoothListClient from "@/components/booths/booths-list";
import { Suspense } from "react";
import BoothMap from "@/components/booths/booth-map";

const createBooths = (companies: Company[]): Booth[] => {
  const booths: Booth[] = [];
  let count = 0;
  for (const company of companies) {
    if (!company.boothDay1 && !company.boothDay2) {
      // skip online
      continue;
    }
    if (company.boothDay1 == company.boothDay2) {
      booths.push({
        boothId: ++count,
        companyId: company[""],
        companyName_th: company.companyName_th,
        companyName_en: company.companyName_en,
        companyLogo: company.companyLogo,
        businessFocus: company.businessFocus,
        boothNumber: company.boothDay1,
        day1: true,
        day2: true,
        description: "7-8 ม.ค.",
      });
      continue;
    }
    if (company.boothDay1) {
      booths.push({
        boothId: ++count,
        companyId: company[""],
        companyName_th: company.companyName_th,
        companyName_en: company.companyName_en,
        companyLogo: company.companyLogo,
        businessFocus: company.businessFocus,
        boothNumber: company.boothDay1,
        day1: true,
        day2: false,
        description: "7 ม.ค. " + (company.boothDay2 == "" ? "เท่านั้น" : ""),
      });
    }
    if (company.boothDay2) {
      booths.push({
        boothId: ++count,
        companyId: company[""],
        companyName_th: company.companyName_th,
        companyName_en: company.companyName_en,
        companyLogo: company.companyLogo,
        businessFocus: company.businessFocus,
        boothNumber: company.boothDay2,
        day1: false,
        day2: true,
        description: "8 ม.ค. " + (company.boothDay1 == "" ? "เท่านั้น" : ""),
      });
    }
  }

  return booths;
};
export default async function CompaniesPage() {
  const companies = await fetchCompanies();
  const booths = createBooths(companies);
  return (
    <div className="px-4 py-6">
      <BoothMap></BoothMap>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <BoothListClient initialBooths={booths} />
        </Suspense>
      </div>
    </div>
  );
}
