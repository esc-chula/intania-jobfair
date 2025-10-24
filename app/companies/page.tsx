import { fetchCompanies } from "@/lib/data";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardAction,
} from "@/components/ui/card";
import { Company } from "@/types/schema";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { countJobs } from "@/lib/helper";
import CompanyCard from "@/components/companies/company-card";

export default async function CompaniesPage() {
    const companies = await fetchCompanies();

    const jobCounts = await Promise.all(companies.map((c) => countJobs(c[""])));

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4 font-headTH text-primary-blue">
                บริษัททั้งหมด
            </h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {companies.map((c: Company, index: number) => (
                    <CompanyCard key={c[""]} company={c}/>
                ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
                รายการ {companies.length} บริษัท
            </p>
        </div>
    );
}
