import Image from "next/image";
import type { Company } from "@/types/schema";
import {
    LucideMapPin,
    LucideBriefcaseBusiness,
    LucideUserRound,
    LucideLink,
    LucideLinkedin,
    LucideFacebook,
    LucideInstagram,
} from "lucide-react";
import CompanyTags from "@/components/companies/company-tags";
import Link from "next/link";

function extractSocialHandle(url: string | undefined): string {
    if (!url) return "N/A";

    try {
        const cleanUrl = url.replace(/\/$/, "");
        const parts = cleanUrl.split("/");
        return parts[parts.length - 1] || url;
    } catch {
        return url;
    }
}

export default function CompanyCardLong({
    company,
    jobCount,
}: {
    company: Company;
    jobCount: number;
}) {
    return (
        <div className="long-card">
            <div className="flex items-start gap-4 mb-4">
                <div className="relative shrink-0 w-16 h-16">
                    <Image
                        src={
                            company?.companyLogo || "/default-logo.png"
                        }
                        alt={company?.companyName_en ?? "Company Logo"}
                        fill
                        className="object-cover rounded-md"
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
                        <p className="body-th-3 text-primary-blue truncate">
                            {jobCount + " ตำแหน่งงาน"}
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <LucideMapPin
                            className="text-primary-blue shrink-0"
                            width={16}
                            height={16}
                        />
                        <p className="body-th-3 text-primary-blue truncate">
                            {company?.officeLocation_full ?? "N/A"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="space-y-4">
                <div>
                    <h4 className="heading-th-3 text-primary-blue mb-3">
                        เกี่ยวกับบริษัท
                    </h4>
                    <p className="body-th-3 text-primary-blue line-clamp-3">
                        {company?.fullDescription ?? "N/A"}
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="relative shrink-0 w-64 h-64 m-4">
                        <Image
                            src={
                                company?.promoMaterials ||
                                "/default-banner.png"
                            }
                            alt={
                                company?.companyName_en ??
                                "Company Promo Banner"
                            }
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div>
                    <h4 className="heading-th-3 text-primary-blue mb-3">
                        ข้อมูลการติดต่อ
                    </h4>
                    <div className="space-y-2">
                        <div className="flex gap-2 items-start">
                            <LucideUserRound
                                width="16"
                                height="16"
                                className="text-primary-blue shrink-0 mt-0.5"
                            />
                            <div className="flex flex-col text-primary-blue body-th-3">
                                <p className="truncate">{company.hrContactName} (HR)</p>
                                <p className="truncate">{company.hrContactEmail}</p>
                                <p className="truncate">{company.hrContactPhone}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <LucideLink width="16" height="16" className="text-primary-blue shrink-0" />
                            <Link href={company.websiteUrl ?? ""} className="text-primary-blue body-th-3 underline truncate">
                                {company.websiteUrl ?? "N/A"}
                            </Link>
                        </div>
                        <div className="flex gap-2 items-center">
                            <LucideLinkedin width="16" height={16} className="text-primary-blue shrink-0" />
                            <Link
                                href={company.socialMediaLinks?.linkedin ?? ""}
                                className="text-primary-blue body-th-3 underline truncate"
                            >
                                {extractSocialHandle(company.socialMediaLinks?.linkedin)}
                            </Link>
                        </div>
                        <div className="flex gap-2 items-center">
                            <LucideFacebook width="16" height={16} className="text-primary-blue shrink-0" />
                            <Link
                                href={company.socialMediaLinks?.facebook ?? ""}
                                className="text-primary-blue body-th-3 underline truncate"
                            >
                                {extractSocialHandle(company.socialMediaLinks?.facebook)}
                            </Link>
                        </div>
                        <div className="flex gap-2 items-center">
                            <LucideInstagram width="16" height={16} className="text-primary-blue shrink-0" />
                            <Link
                                href={company.socialMediaLinks?.instagram ?? ""}
                                className="text-primary-blue body-th-3 underline truncate"
                            >
                                {company.companyName_en}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
