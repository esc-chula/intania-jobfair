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
        <div className="w-full max-w-4xl mx-auto">
            <div className="card-base p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                    <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                        <Image
                            src={
                                company?.companyLogo || "/default-logo.png"
                            }
                            alt={company?.companyName_en ?? "Company Logo"}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col gap-3 flex-1 min-w-0">
                        <h3 className="heading-th-2 sm:heading-th-1 font-bold text-primary-blue line-clamp-2">
                            {company?.companyName_th}
                        </h3>
                        <div className="flex gap-2 items-center flex-wrap">
                            <CompanyTags company={company}></CompanyTags>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                            <div className="flex gap-2 items-center">
                                <LucideBriefcaseBusiness
                                    className="text-primary-blue shrink-0"
                                    width={16}
                                    height={16}
                                />
                                <p className="body-th-3 text-primary-blue">
                                    {jobCount + " ตำแหน่งงาน"}
                                </p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <LucideMapPin
                                    className="text-primary-blue shrink-0"
                                    width={16}
                                    height={16}
                                />
                                <p className="body-th-3 text-primary-blue line-clamp-1">
                                    {company?.officeLocation_full ?? "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 my-6"></div>
                
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Company Description */}
                    <div>
                        <h4 className="heading-th-3 text-primary-blue mb-4">
                            เกี่ยวกับบริษัท
                        </h4>
                        <p className="body-th-3 text-primary-blue leading-relaxed">
                            {company?.fullDescription ?? "N/A"}
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="heading-th-3 text-primary-blue mb-4">
                            ข้อมูลการติดต่อ
                        </h4>
                        <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                                <LucideUserRound
                                    width="16"
                                    height="16"
                                    className="text-primary-blue shrink-0 mt-0.5"
                                />
                                <div className="flex flex-col text-primary-blue body-th-3 space-y-1">
                                    <p className="font-medium">{company.hrContactName} (HR)</p>
                                    <p className="break-all">{company.hrContactEmail}</p>
                                    <p>{company.hrContactPhone}</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 items-center">
                                <LucideLink width="16" height="16" className="text-primary-blue shrink-0" />
                                <Link 
                                    href={company.websiteUrl ?? ""} 
                                    className="text-primary-blue body-th-3 underline break-all hover:opacity-80"
                                >
                                    {company.websiteUrl ?? "N/A"}
                                </Link>
                            </div>
                            
                            <div className="flex gap-3 items-center">
                                <LucideLinkedin width="16" height={16} className="text-primary-blue shrink-0" />
                                <Link
                                    href={company.socialMediaLinks?.linkedin ?? ""}
                                    className="text-primary-blue body-th-3 underline hover:opacity-80"
                                >
                                    {extractSocialHandle(company.socialMediaLinks?.linkedin)}
                                </Link>
                            </div>
                            
                            <div className="flex gap-3 items-center">
                                <LucideFacebook width="16" height={16} className="text-primary-blue shrink-0" />
                                <Link
                                    href={company.socialMediaLinks?.facebook ?? ""}
                                    className="text-primary-blue body-th-3 underline hover:opacity-80"
                                >
                                    {extractSocialHandle(company.socialMediaLinks?.facebook)}
                                </Link>
                            </div>
                            
                            <div className="flex gap-3 items-center">
                                <LucideInstagram width="16" height={16} className="text-primary-blue shrink-0" />
                                <Link
                                    href={company.socialMediaLinks?.instagram ?? ""}
                                    className="text-primary-blue body-th-3 underline hover:opacity-80"
                                >
                                    {company.companyName_en}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promo Materials */}
                {company?.promoMaterials && (
                    <div className="mt-6">
                        <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden">
                            <Image
                                src={company.promoMaterials}
                                alt={company.companyName_en ?? "Company Promo Banner"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
