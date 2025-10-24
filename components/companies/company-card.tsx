import Image from "next/image";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import type { Job, Company } from "@/types/schema";
import {
    LucideCalendarRange,
    LucideMapPin,
    LucideBriefcaseBusiness,
} from "lucide-react";
import { countJobs } from "@/lib/helper";
import CompanyTags from "@/components/companies/company-tags";

export default function CompanyCard({
    company,
    jobCount,
}: {
    company: Company;
    jobCount: number;
}) {
    return (
        <Card className="p-4">
            <CardHeader>
                <div className="flex items-start gap-4">
                    <div className="relative shrink-0 w-16 h-16">
                        <Image
                            src={company?.companyLogo || "/default-logo.png"}
                            alt={company?.companyName_en ?? "Company Logo"}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <CardTitle className="text-sm font-headTH text-primary-blue font-bold">
                            {company?.companyName_th}
                        </CardTitle>
                        <div className="flex gap-2 items-center">
                            <CompanyTags company={company}></CompanyTags>
                        </div>
                        <div className="flex gap-2 items-center">
                            <LucideBriefcaseBusiness
                                className="text-primary-blue"
                                width={16}
                                height={16}
                            />
                            <p className="text-xs text-primary-blue font-bodyTH">
                                {jobCount + " ตำแหน่งงาน"}
                            </p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <LucideMapPin
                                className="text-primary-blue"
                                width={16}
                                height={16}
                            />
                            <p className="text-xs font-bodyTH text-primary-blue">
                                {(company?.officeLocation_district ?? "N/A") +
                                    (company?.officeLocation_province ?? "N/A")}
                            </p>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-xs line-clamp-3 font-bodyEN2 text-primary-blue">
                    {company?.shortDescription ?? "N/A"}
                </p>
            </CardContent>
        </Card>
    );
}
