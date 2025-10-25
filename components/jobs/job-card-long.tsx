import Image from "next/image";
import type { Job, Company } from "@/types/schema";
import {
  LucideClock,
  LucideCalendarRange,
  LucideMapPin,
  LucideUserRound,
  LucideLink,
} from "lucide-react";
import { formatThaiDate } from "@/lib/helper";

export default function JobCardLong({ 
  job, 
  company 
}: { 
  job: Job; 
  company: Company | null 
}) {
  return (
    <div className="long-card">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative shrink-0 w-16 h-16">
          <Image
            src={company?.companyLogo || "/default-logo.png"}
            alt={company?.companyName_th ?? "Company Logo"}
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h3 className="text-base font-headTH text-primary-blue font-bold truncate">
            {job.jobTitle}
          </h3>
          <p className="text-sm text-primary-blue font-bodyTH truncate">
            {company?.companyName_th ?? "N/A"}
          </p>

          <div className="flex gap-2 items-center">
            <LucideClock width={16} height={16} className="text-primary-blue shrink-0" />
            <p className="text-xs text-primary-blue font-bodyTH truncate">
              {{
                "Full-time": "Full Time",
                "Part-time": "Part Time", 
                "Internship": "Internship",
              }[job.positionType as string] ?? job.positionType ?? "ไม่ระบุ"}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <LucideCalendarRange width={16} height={16} className="text-primary-blue shrink-0" />
            <p className="text-xs text-primary-blue font-bodyTH truncate">
              {formatThaiDate(job.application_start || "")} - {formatThaiDate(job.application_end || "")}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <LucideMapPin width={16} height={16} className="text-primary-blue shrink-0" />
            <p className="text-xs text-primary-blue font-bodyTH truncate">
              {company?.officeLocation_full ?? "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>
      <div className="space-y-4">
        <div>
          <h4 className="font-headTH font-bold text-base mb-3">
            รายละเอียดงาน
          </h4>
          <p className="text-xs font-bodyTH text-primary-blue line-clamp-4">
            {job.jobDescription ?? "ไม่มีรายละเอียด"}
          </p>
        </div>

        <div className="border-t border-gray-200 my-4"></div>
        <div>
          <h4 className="font-headTH font-bold text-base mb-3">
            ข้อมูลการติดต่อ
          </h4>
          <div className="space-y-2">
            <div className="flex gap-2 items-start">
              <LucideUserRound
                width="16"
                height="16"
                className="text-primary-blue shrink-0 mt-0.5"
              />
              <div className="flex flex-col text-primary-blue text-xs font-bodyTH">
                <p className="truncate">{company?.hrContactName ?? "N/A"} (HR)</p>
                <p className="truncate">{company?.hrContactEmail ?? "N/A"}</p>
                <p className="truncate">{company?.hrContactPhone ?? "N/A"}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <LucideLink width="16" height="16" className="text-primary-blue shrink-0" />
              <a href={company?.websiteUrl ?? ""} className="text-primary-blue text-xs font-bodyTH underline truncate">
                {company?.websiteUrl ?? "N/A"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
