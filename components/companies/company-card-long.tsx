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
    LucideUserRound,
    LucideLink,
    LucideLinkedin,
    LucideFacebook,
    LucideInstagram,
} from "lucide-react";
import { countJobs } from "@/lib/helper";
import CompanyTags from "@/components/companies/company-tags";
import { Separator } from "@radix-ui/react-select";
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
        <div>
            <Card className="p-4">
                <CardHeader>
                    <div className="flex items-start gap-4">
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

                        <div className="flex flex-col gap-2">
                            <CardTitle className="text-base font-headTH text-primary-blue font-bold">
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
                            <div className="flex gap-4 items-center">
                                <div className="relative shrink-0 w-4 h-4">
                                    <LucideMapPin
                                        className="text-primary-blue self-center"
                                        width={16}
                                        height={16}
                                    />
                                </div>
                                <p className="text-xs font-bodyTH text-primary-blue">
                                    {company?.officeLocation_full ?? "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <Separator className="my-1 border stroke-1" />
                <CardContent className="gap-4">
                    <CardTitle className="mb-3">
                        <p className="font-headTH font-bold text-base">
                            เกี่ยวกับบริษัท
                        </p>
                    </CardTitle>
                    <p className="text-xs font-bodyEN2 text-primary-blue">
                        {company?.fullDescription ?? "N/A"}
                    </p>
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
                    <Separator className="my-5 border stroke-1" />
                    <CardTitle className="mb-3">
                        <p className="font-headTH font-bold text-base">
                            ข้อมูลการติดต่อ
                        </p>
                    </CardTitle>
                    <div className="flex flex-col text-primary-blue text-xs font-bodyTH">
                        <div className="flex gap-1">
                            <LucideUserRound
                                width="16"
                                height="16"
                            ></LucideUserRound>
                            <div className="flex flex-col mx-1">
                                <p>{company.hrContactName} (HR)</p>
                                <p>{company.hrContactEmail}</p>
                                <p>{company.hrContactPhone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-primary-blue text-xs font-bodyTH my-2">
                        <div className="flex gap-1">
                            <LucideLink width="16" height="16"></LucideLink>
                            <div className="flex justify-center flex-col mx-1 underline">
                                <Link href={company.websiteUrl ?? ""}>
                                    {company.websiteUrl ?? "N/A"}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-primary-blue text-xs font-bodyTH my-2">
                        <div className="flex gap-1">
                            <LucideLinkedin
                                width="16"
                                height="16"
                            ></LucideLinkedin>
                            <div className="flex justify-center flex-col mx-1 underline">
                                <Link
                                    href={
                                        company.socialMediaLinks?.linkedin ?? ""
                                    }
                                >
                                    {extractSocialHandle(
                                        company.socialMediaLinks?.linkedin
                                    )}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-primary-blue text-xs font-bodyTH my-2">
                        <div className="flex gap-1">
                            <LucideFacebook
                                width="16"
                                height="16"
                            ></LucideFacebook>
                            <div className="flex justify-center flex-col mx-1 underline">
                                <Link
                                    href={
                                        company.socialMediaLinks?.facebook ?? ""
                                    }
                                >
                                    {extractSocialHandle(
                                        company.socialMediaLinks?.facebook
                                    )}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-primary-blue text-xs font-bodyTH my-2">
                        <div className="flex gap-1">
                            <LucideInstagram
                                width="16"
                                height="16"
                            ></LucideInstagram>
                            <div className="flex justify-center flex-col mx-1 underline">
                                <Link
                                    href={
                                        company.socialMediaLinks?.instagram ??
                                        ""
                                    }
                                >
                                    {company.companyName_en}
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col text-primary-blue text-xs font-bodyTH my-2">
                    <div className="flex gap-1">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 10L10 6"
                                stroke="#102E50"
                                strokeWidth="1.33"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7.33325 4L7.64192 3.64267C7.95146 3.33305 8.31896 3.08744 8.72344 2.91986C9.12791 2.75229 9.56144 2.66605 9.99925 2.66605C10.4371 2.66605 10.8706 2.75229 11.2751 2.91986C11.6795 3.08744 12.047 3.33305 12.3566 3.64267C12.6667 3.95194 12.9128 4.31938 13.0806 4.72392C13.2485 5.12846 13.3349 5.56215 13.3348 6.00014C13.3348 6.43813 13.2483 6.8718 13.0803 7.27629C12.9123 7.68078 12.6661 8.04815 12.3559 8.35733"
                                stroke="#102E50"
                                strokeWidth="1.33"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.40193 12.356C7.76926 12.9811 6.91569 13.3317 6.02627 13.3317C5.13685 13.3317 4.28327 12.9811 3.6506 12.356C3.33884 12.0477 3.09133 11.6807 2.92241 11.2761C2.75348 10.8715 2.6665 10.4374 2.6665 9.99901C2.6665 9.56058 2.75348 9.1265 2.92241 8.72191C3.09133 8.31733 3.33884 7.95028 3.6506 7.64201L3.99993 7.33334"
                                stroke="#102E50"
                                strokeWidth="1.33"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10.6667 12.6667H14.6667"
                                stroke="#102E50"
                                strokeWidth="1.33"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12.6667 10.6667V14.6667"
                                stroke="#102E50"
                                strokeWidth="1.33"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <div className="flex justify-center flex-col mx-1">
                          <div>
                            Tiktok - &nbsp;
                            <Link className="underline"
                                href={company.socialMediaLinks?.tiktok ?? ""}
                            >
                                {company.socialMediaLinks?.youtube ?? "N/A"}
                            </Link>
                          </div>
                          <div>
                            Youtube - &nbsp;
                            <Link className="underline"
                                href={company.socialMediaLinks?.youtube ?? ""}
                            >
                                {company.socialMediaLinks?.youtube ?? "N/A"}
                            </Link>
                          </div>
                        </div>
                    </div>
                </div> */}
                </CardContent>
            </Card>
        </div>
    );
}
