"use client";
import Image from "next/image";
import type { Job, Company } from "@/types/schema";
import {
  LucideClock,
  LucideCalendarRange,
  LucideMapPin,
} from "lucide-react";
import { formatThaiDate } from "@/lib/helper";
import { useEffect, useState } from "react";

export default function JobCardShort({ 
  job, 
  company 
}: { 
  job: Job; 
  company: Company | null 
}) {
  const [logoUrl, setLogoUrl] = useState<string>("/placeholder-company.svg");

  useEffect(() => {
    const key = company?.companyLogo;
    if (!key) {
      setLogoUrl("/placeholder-company.svg");
      return;
    }
    const controller = new AbortController();
    const run = async () => {
      try {
        const res = await fetch(`/api/logo?key=${encodeURIComponent(key)}`, { signal: controller.signal });
        if (!res.ok) throw new Error("bad response");
        const data = (await res.json()) as { url?: string };
        setLogoUrl(data?.url || "/placeholder-company.svg");
      } catch {
        setLogoUrl("/placeholder-company.svg");
      }
    };
    run();
    return () => controller.abort();
  }, [company?.companyLogo]);
  return (
    <div className="short-card">
      <div className="flex items-start gap-3">
        <div className="relative shrink-0 w-12 h-12">
          <Image
            src={logoUrl}
            alt={company?.companyName_th ?? "Company Logo"}
            fill
            className="object-contain rounded-md bg-white p-1"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h3 className="body-th-1 font-bold text-primary-blue line-clamp-2">
            {job.jobTitle}
          </h3>
          <p className="body-th-1 text-primary-blue line-clamp-2">
            {company?.companyName_th ?? "N/A"}
          </p>

          <div className="flex gap-2 items-center">
            <LucideClock width={14} height={14} className="text-primary-blue shrink-0" />
            <p className="body-th-3 text-primary-blue truncate">
              {{
                "Full-time": "Full Time",
                "Part-time": "Part Time", 
                "Internship": "Internship",
              }[job.positionType as string] ?? job.positionType ?? "ไม่ระบุ"}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <LucideCalendarRange width={14} height={14} className="text-primary-blue shrink-0" />
            <p className="body-th-3 text-primary-blue line-clamp-2">
              {formatThaiDate(job.application_start || "")} - {formatThaiDate(job.application_end || "")}
            </p>
          </div>

          <div className="flex gap-2 items-center">
                        <LucideMapPin
                            className="text-primary-blue shrink-0"
                            width={14}
                            height={14}
                        />
                        <p className="body-th-3 text-primary-blue line-clamp-2">
                            {(company?.officeLocation_district ?? "N/A") + " " + 
                                (company?.officeLocation_province ?? "N/A")}
                        </p>
                    </div>
        </div>
      </div>
    </div>
  );
}
