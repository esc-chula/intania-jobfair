import Image from "next/image";
import type { Job, Company } from "@/types/schema";
import {
  LucideClock,
  LucideCalendarRange,
  LucideMapPin,
} from "lucide-react";
import { formatThaiDate } from "@/lib/helper";

export default function JobCardShort({ 
  job, 
  company 
}: { 
  job: Job; 
  company: Company | null 
}) {
  return (
    <div className="short-card">
      <div className="flex items-start gap-3">
        <div className="relative shrink-0 w-12 h-12">
          <Image
            src={company?.companyLogo || "/default-logo.png"}
            alt={company?.companyName_th ?? "Company Logo"}
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h3 className="text-sm font-headTH text-primary-blue font-bold truncate">
            {job.jobTitle}
          </h3>
          <p className="text-xs text-primary-blue font-bodyTH truncate">
            {company?.companyName_th ?? "N/A"}
          </p>

          <div className="flex gap-2 items-center">
            <LucideClock width={14} height={14} className="text-primary-blue shrink-0" />
            <p className="text-xs text-primary-blue font-bodyTH truncate">
              {{
                "Full-time": "Full Time",
                "Part-time": "Part Time", 
                "Internship": "Internship",
              }[job.positionType as string] ?? job.positionType ?? "ไม่ระบุ"}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <LucideCalendarRange width={14} height={14} className="text-primary-blue shrink-0" />
            <p className="text-xs text-primary-blue font-bodyTH truncate">
              {formatThaiDate(job.application_start || "")} - {formatThaiDate(job.application_end || "")}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <LucideMapPin width={14} height={14} className="text-primary-blue shrink-0" />
            <p className="text-xs text-primary-blue font-bodyTH truncate">
              {company?.officeLocation_full ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
