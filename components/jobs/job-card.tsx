import Image from "next/image";
import {
  LucideClock,
  LucideCalendarRange,
  LucideMapPin,
} from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import type { Job, Company } from "@/types/schema";

export default function JobCard({ job, company }: { job: Job; company: Company | null }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative shrink-0 w-16 h-16">
            <Image
              src={company?.companyLogo || "/default-logo.png"}
              alt={company?.companyName ?? "Company Logo"}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <CardTitle className="text-sm">{job.jobTitle}</CardTitle>
            <CardDescription className="text-xs">
              {company?.companyName ?? "N/A"}
            </CardDescription>

            <div className="flex gap-2 items-center">
              <LucideClock width={16} height={16} />
              <p className="text-xs leading-none">
                {{
                  "full-time": "Full Time",
                  "part-time": "Part Time",
                  internship: "Internship",
                }[job.positionType as string] ?? "N/A"}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <LucideCalendarRange width={16} height={16} />
              <p className="text-xs">
                {job.applicationStartDate} - {job.applicationEndDate}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <LucideMapPin width={16} height={16} />
              <p className="text-xs">{company?.officeLocation ?? "N/A"}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-xs line-clamp-3">{job.jobDescription}</p>
      </CardContent>
    </Card>
  );
}
