"use client";
import Image from "next/image";
import Link from "next/link";
import type { Booth } from "@/types/schema";
import CompanyTags from "@/components/companies/company-tags";
import { useEffect, useState } from "react";
import { BoothDisplay } from "../common/boothDisplay";

// This is actually the long company card in Figma

export default function BoothCard({ booth }: { booth: Booth }) {
    const [logoUrl, setLogoUrl] = useState<string>("/placeholder-company.svg");
    useEffect(() => {
        const key = booth?.companyLogo;
        if (!key) {
            setLogoUrl("/placeholder-company.svg");
            return;
        }
        const controller = new AbortController();
        (async () => {
            try {
                const res = await fetch(
                    `/api/logo?key=${encodeURIComponent(key)}`,
                    {
                        signal: controller.signal,
                    }
                );
                const data = await res.json();
                setLogoUrl(data?.url || "/placeholder-company.svg");
            } catch {
                setLogoUrl("/placeholder-company.svg");
            }
        })();
        return () => controller.abort();
    }, [booth?.companyLogo]);
    const companyId = booth?.companyId as number | undefined;
    const href =
        typeof companyId === "number" ? `/companies/${companyId}` : undefined;

    return (
        <Link
            href={href || "#"}
            aria-label={`ดูรายละเอียดบริษัท ${
                booth?.companyName_th ?? booth?.companyName_en ?? ""
            }`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue rounded-md"
            onClick={(e) => {
                if (!href) e.preventDefault();
            }}
        >
            <div className="long-card">
                <div className="flex items-start gap-4">
                    <div className="relative shrink-0 w-16 h-16">
                        <Image
                            src={logoUrl}
                            alt={booth?.companyName_en ?? "Company Logo"}
                            fill
                            sizes="64px"
                            className="object-contain rounded-md bg-white p-1"
                        />
                    </div>

                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                        <div className="flex flex-row justify-between">
                            <h3 className="body-th-1 font-bold text-primary-blue line-clamp-2">
                                {booth?.companyName_th}
                            </h3>
                            <div className="flex gap-2 flex-col items-end text-[#E78B48] pl-2">
                                <h3 className="font-bodyEN font-bold">
                                    {booth.boothNumber}
                                </h3>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center flex-wrap">
                            <CompanyTags company={booth}></CompanyTags>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="body-th-3 text-primary-blue line-clamp-2">
                                {booth?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
