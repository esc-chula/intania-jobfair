"use client";
import Image from "next/image";
import type { Company } from "@/types/schema";
import {
    LucideMapPin,
    LucideBriefcaseBusiness,
} from "lucide-react";
import CompanyTags from "@/components/companies/company-tags";
import { useEffect, useState } from "react";

export default function CompanyCard({
    company,
    jobCount,
}: {
    company: Company;
    jobCount: number;
}) {
    const [logoUrl, setLogoUrl] = useState<string>("/placeholder-company.svg");
    useEffect(() => {
        const key = company?.companyLogo;
        if (!key) { setLogoUrl("/placeholder-company.svg"); return; }
        const controller = new AbortController();
        (async () => {
            try {
                const res = await fetch(`/api/logo?key=${encodeURIComponent(key)}`, { signal: controller.signal });
                const data = await res.json();
                setLogoUrl(data?.url || "/placeholder-company.svg");
            } catch {
                setLogoUrl("/placeholder-company.svg");
            }
        })();
        return () => controller.abort();
    }, [company?.companyLogo]);
    return (
        <div className="long-card">
            <div className="flex items-start gap-4">
                <div className="relative shrink-0 w-16 h-16">
                    <Image
                        src={logoUrl}
                        alt={company?.companyName_en ?? "Company Logo"}
                        fill
                        className="object-contain rounded-md bg-white p-1"
                    />
                </div>

                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <h3 className="body-th-1 font-bold text-primary-blue line-clamp-2">
                        {company?.companyName_th}
                    </h3>
                    <div className="flex gap-2 items-center flex-wrap">
                        <CompanyTags company={company}></CompanyTags>
                    </div>
                    <div className="flex gap-2 items-center">
                        <LucideBriefcaseBusiness
                            className="text-primary-blue shrink-0"
                            width={16}
                            height={16}
                        />
                        <p className="body-th-3 text-primary-blue line-clamp-2">
                            {jobCount + " ตำแหน่งงาน"}
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <LucideMapPin
                            className="text-primary-blue shrink-0"
                            width={16}
                            height={16}
                        />
                        <p className="body-th-3 text-primary-blue line-clamp-2">
                            {(company?.officeLocation_district ?? "N/A") + " " + 
                                (company?.officeLocation_province ?? "N/A")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-0">
                <p className="body-th-3 line-clamp-2">
                    {company?.shortDescription }
                </p>
            </div>
        </div>
    );
}
