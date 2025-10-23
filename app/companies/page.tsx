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

    // Fetch all job counts in parallel
    const jobCounts = await Promise.all(companies.map((c) => countJobs(c[""])));

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4 font-headTH text-primary-blue">
                บริษัททั้งหมด
            </h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {companies.map((c: Company, index: number) => (
                    <Card
                        key={c[""]}
                        className="gap-0.5 max-h-[212px] min-h-[148px] rounded-md p-[17px]"
                    >
                        <CardHeader className="p-0">
                            <div className="flex items-start gap-2">
                                <Image
                                    src={c.companyLogo}
                                    alt="No Image"
                                    width={64}
                                    height={64}
                                    className="rounded-md bg-white object-contain"
                                />
                                <div className="min-w-0">
                                    <CardTitle className="text-lg line-clamp-2 text-primary-blue font-headTH font-bold">
                                        {c.companyName_th}
                                    </CardTitle>
                                    <CardDescription className="flex flex-col gap-2">
                                        <Badge className="w-20 h-5"></Badge>
                                        <div className="flex gap-1 items-center">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <mask
                                                    id="mask0_420_9"
                                                    maskUnits="userSpaceOnUse"
                                                    x="0"
                                                    y="0"
                                                    width="16"
                                                    height="16"
                                                >
                                                    <rect
                                                        width="16"
                                                        height="16"
                                                        fill="#D9D9D9"
                                                    />
                                                </mask>
                                                <g mask="url(#mask0_420_9)">
                                                    <path
                                                        d="M2.66671 13.8333C2.30004 13.8333 1.98615 13.7027 1.72504 13.4416C1.46393 13.1805 1.33337 12.8666 1.33337 12.5V5.16663C1.33337 4.79996 1.46393 4.48607 1.72504 4.22496C1.98615 3.96385 2.30004 3.83329 2.66671 3.83329H5.33337V2.49996C5.33337 2.13329 5.46393 1.8194 5.72504 1.55829C5.98615 1.29718 6.30004 1.16663 6.66671 1.16663H9.33337C9.70004 1.16663 10.0139 1.29718 10.275 1.55829C10.5362 1.8194 10.6667 2.13329 10.6667 2.49996V3.83329H13.3334C13.7 3.83329 14.0139 3.96385 14.275 4.22496C14.5362 4.48607 14.6667 4.79996 14.6667 5.16663V12.5C14.6667 12.8666 14.5362 13.1805 14.275 13.4416C14.0139 13.7027 13.7 13.8333 13.3334 13.8333H2.66671ZM6.66671 3.83329H9.33337V2.49996H6.66671V3.83329ZM13.3334 9.83329H10V10.5C10 10.6888 9.93615 10.8472 9.80837 10.975C9.6806 11.1027 9.52226 11.1666 9.33337 11.1666H6.66671C6.47782 11.1666 6.31949 11.1027 6.19171 10.975C6.06393 10.8472 6.00004 10.6888 6.00004 10.5V9.83329H2.66671V12.5H13.3334V9.83329ZM7.33337 9.83329H8.66671V8.49996H7.33337V9.83329ZM2.66671 8.49996H6.00004V7.83329C6.00004 7.6444 6.06393 7.48607 6.19171 7.35829C6.31949 7.23052 6.47782 7.16663 6.66671 7.16663H9.33337C9.52226 7.16663 9.6806 7.23052 9.80837 7.35829C9.93615 7.48607 10 7.6444 10 7.83329V8.49996H13.3334V5.16663H2.66671V8.49996Z"
                                                        fill="#102E50"
                                                    />
                                                </g>
                                            </svg>
                                            <p className="text-sm text-primary-blue font-bodyTH">
                                                {jobCounts[index]} ตำแหน่งงาน
                                            </p>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <mask
                                                    id="mask0_420_15"
                                                    maskUnits="userSpaceOnUse"
                                                    x="0"
                                                    y="0"
                                                    width="16"
                                                    height="16"
                                                >
                                                    <rect
                                                        width="16"
                                                        height="16"
                                                        fill="#D9D9D9"
                                                    />
                                                </mask>
                                                <g mask="url(#mask0_420_15)">
                                                    <path
                                                        d="M7.99996 12.8999C9.35552 11.6555 10.3611 10.5249 11.0166 9.50825C11.6722 8.49159 12 7.58881 12 6.79992C12 5.58881 11.6138 4.59714 10.8416 3.82492C10.0694 3.0527 9.12218 2.66659 7.99996 2.66659C6.87774 2.66659 5.93051 3.0527 5.15829 3.82492C4.38607 4.59714 3.99996 5.58881 3.99996 6.79992C3.99996 7.58881 4.32774 8.49159 4.98329 9.50825C5.63885 10.5249 6.6444 11.6555 7.99996 12.8999ZM7.99996 14.2166C7.8444 14.2166 7.68885 14.1888 7.53329 14.1333C7.37774 14.0777 7.23885 13.9944 7.11663 13.8833C6.3944 13.2166 5.75551 12.5666 5.19996 11.9333C4.6444 11.2999 4.18051 10.686 3.80829 10.0916C3.43607 9.49714 3.15274 8.92492 2.95829 8.37492C2.76385 7.82492 2.66663 7.29992 2.66663 6.79992C2.66663 5.13325 3.20274 3.80547 4.27496 2.81659C5.34718 1.8277 6.58885 1.33325 7.99996 1.33325C9.41107 1.33325 10.6527 1.8277 11.725 2.81659C12.7972 3.80547 13.3333 5.13325 13.3333 6.79992C13.3333 7.29992 13.2361 7.82492 13.0416 8.37492C12.8472 8.92492 12.5638 9.49714 12.1916 10.0916C11.8194 10.686 11.3555 11.2999 10.8 11.9333C10.2444 12.5666 9.60552 13.2166 8.88329 13.8833C8.76107 13.9944 8.62218 14.0777 8.46663 14.1333C8.31107 14.1888 8.15552 14.2166 7.99996 14.2166ZM7.99996 7.99992C8.36663 7.99992 8.68052 7.86936 8.94163 7.60825C9.20274 7.34714 9.33329 7.03325 9.33329 6.66659C9.33329 6.29992 9.20274 5.98603 8.94163 5.72492C8.68052 5.46381 8.36663 5.33325 7.99996 5.33325C7.63329 5.33325 7.3194 5.46381 7.05829 5.72492C6.79718 5.98603 6.66663 6.29992 6.66663 6.66659C6.66663 7.03325 6.79718 7.34714 7.05829 7.60825C7.3194 7.86936 7.63329 7.99992 7.99996 7.99992Z"
                                                        fill="#102E50"
                                                    />
                                                </g>
                                            </svg>
                                            <p className="text-sm text-primary-blue font-bodyTH">
                                                {c.officeLocation_district +
                                                    " " +
                                                    c.officeLocation_province}
                                            </p>
                                        </div>
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0 overflow-hidden px-0">
                            <p className="text-sm text-primary-blue font-bodyTH text-muted-foreground line-clamp-3">
                                {c.shortDescription}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <p className="text-sm text-muted-foreground mt-4">
                รายการ {companies.length} บริษัท
            </p>
        </div>
    );
}
