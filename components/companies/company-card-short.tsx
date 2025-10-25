import Image from "next/image";
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Company } from "@/types/schema";
import {
    LucideMapPin,
    LucideBriefcaseBusiness,
} from "lucide-react";
import CompanyTags from "@/components/companies/company-tags";

export default function CompanyCardShort({
    company,
    jobCount,
}: {
    company: Company;
    jobCount: number;
}) {
    return (
        <div className="short-card">
            <div className="flex items-start gap-3">
                <div className="relative shrink-0 w-12 h-12">
                    <Image
                        src={company?.companyLogo || "/default-logo.png"}
                        alt={company?.companyName_en ?? "Company Logo"}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>

                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <h3 className="text-sm font-headTH text-primary-blue font-bold truncate">
                        {company?.companyName_th}
                    </h3>
                    <div className="flex gap-1 flex-wrap">
                        <CompanyTags company={company}></CompanyTags>
                    </div>
                    <div className="flex gap-2 items-center">
                        <LucideBriefcaseBusiness
                            className="text-primary-blue shrink-0"
                            width={14}
                            height={14}
                        />
                        <p className="text-xs text-primary-blue font-bodyTH truncate">
                            {jobCount + " ตำแหน่งงาน"}
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <LucideMapPin
                            className="text-primary-blue shrink-0"
                            width={14}
                            height={14}
                        />
                        <p className="text-xs font-bodyTH text-primary-blue truncate">
                            {(company?.officeLocation_district ?? "N/A") + " " + 
                                (company?.officeLocation_province ?? "N/A")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
