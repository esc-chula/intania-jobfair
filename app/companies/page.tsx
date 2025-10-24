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
