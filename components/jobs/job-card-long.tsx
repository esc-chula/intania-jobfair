import Image from "next/image";
import type { Job, Company } from "@/types/schema";
import {
  LucideClock,
  LucideCalendarRange,
  LucideMapPin,
  LucideUserRound,
  LucideLink,
  LucideBriefcaseBusiness,
} from "lucide-react";
import { formatThaiDate } from "@/lib/helper";

export default function JobCardLong({
  job,
  company,
}: {
  job: Job;
  company: Company | null;
}) {
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
          <h3 className="body-th-1 font-bold text-primary-blue line-clamp-2">
            {job.jobTitle}
          </h3>
          <p className="body-th-1 line-clamp-2">
            {company?.companyName_th ?? "N/A"}
          </p>

          <div className="flex gap-2 items-center">
            <LucideClock
              width={16}
              height={16}
              className="text-primary-blue shrink-0"
            />
            <p className="body-th-3 text-primary-blue truncate">
              {(job.positionType as string) ?? job.positionType ?? "ไม่ระบุ"}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <LucideBriefcaseBusiness
              width={16}
              height={16}
              className="text-primary-blue shrink-0"
            />
            <p className="body-th-3 text-primary-blue truncate">
              {(job.openingsCount as string) ?? job.openingsCount ?? "N/A"}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <LucideCalendarRange
              width={16}
              height={16}
              className="text-primary-blue shrink-0"
            />
            <p className="body-th-3 text-primary-blue truncate">
              {formatThaiDate(job.application_start || "")} -{" "}
              {formatThaiDate(job.application_end || "")}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <LucideMapPin
              width={16}
              height={16}
              className="text-primary-blue shrink-0"
            />
            <p className="body-th-3 text-primary-blue truncate">
              {company?.officeLocation_full ?? "ไม่ระบุ"}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>
      <div>
        <div>
          <h4 className="heading-th-3 leading-7 text-primary-blue mb-3">เกี่ยวกับตำแหน่งงาน</h4>
          <p className="body-th-3 text-primary-blue leading-relaxed whitespace-pre-wrap break-words">
            {job.jobDescription ?? "ไม่มีรายละเอียด"}
          </p>
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
                <p className="truncate">
                  {company?.hrContactName ?? "N/A"} (HR)
                </p>
                <p className="truncate">{company?.hrContactEmail ?? "N/A"}</p>
                <p className="truncate">{company?.hrContactPhone ?? "N/A"}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <LucideLink
                width="16"
                height={16}
                className="text-primary-blue shrink-0"
              />
              <a
                href={company?.websiteUrl ?? ""}
                className="text-primary-blue body-th-3 underline truncate"
              >
                {company?.websiteUrl ?? "N/A"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
