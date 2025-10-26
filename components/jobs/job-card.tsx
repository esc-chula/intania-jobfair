import Image from "next/image";
import {
  LucideClock,
  LucideCalendarRange,
  LucideMapPin,
} from "lucide-react";

import type { Job, Company } from "@/types/schema";
import { formatThaiDate } from "@/lib/helper";

export default function JobCard({ job, company }: { job: Job; company: Company | null }) {
  return (
    <div className="long-card">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0 w-16 h-16">
          <Image
            src={company?.companyLogo || "/default-logo.png"}
            alt={company?.companyName_th ?? "Company Logo"}
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h3 className="body-th-1 font-bold text-primary-blue line-clamp-2">{job.jobTitle}</h3>
          <p className="body-th-3 line-clamp-2">
            {company?.companyName_th ?? "N/A"}
          </p>

          <div className="flex gap-2 items-center">
            <LucideClock width={16} height={16} className="shrink-0" />
            <p className="body-th-3 leading-none truncate">
              {{
                "Full-time": "Full Time",
                "Part-time": "Part Time", 
                "Internship": "Internship",
              }[job.positionType as string] ?? job.positionType ?? "ไม่ระบุ"}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <LucideCalendarRange width={16} height={16} className="shrink-0" />
            <p className="body-th-3 text-[color:var(--color-primary-blue)] line-clamp-2">
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

      <div className="px-0">
                <p className="body-th-3 line-clamp-2">
                    {job?.["JD & REQ"]?? "N/A"}
                </p>
            </div>
    </div>
  );
}
