"use client";
// ...existing code...
import { useMemo, useState } from "react";
import * as Select from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { LucideCalendarRange, LucideClock, LucideMapPin } from "lucide-react";
import type { Job, Company } from "@/types/schema";

export default function JobsListClient({
  initialJobs,
  initialCompanies,
}: {
  initialJobs: Job[];
  initialCompanies: Company[];
}) {
  const [sortOption, setSortOption] = useState<
    "position" | "open-date" | "close-date"
  >("position");

  const sortedJobs = useMemo(() => {
    const arr = [...initialJobs];
    if (sortOption === "position") {
      return arr.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
    }
    if (sortOption === "open-date") {
      return arr.sort(
        (a, b) =>
          new Date(a.applicationStartDate).getTime() -
          new Date(b.applicationStartDate).getTime()
      );
    }
    if (sortOption === "close-date") {
      return arr.sort(
        (a, b) =>
          new Date(a.applicationEndDate).getTime() -
          new Date(b.applicationEndDate).getTime()
      );
    }
    return arr;
  }, [initialJobs, sortOption]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end items-center flex-row gap-2">
        <p>เรียงตาม</p>
        <Select.Select value={sortOption} onValueChange={(v) => setSortOption(v as "position" | "open-date" | "close-date")}>
          <Select.SelectTrigger>
            <Select.SelectValue placeholder="ชื่อตำแหน่งงาน" />
          </Select.SelectTrigger>
          <Select.SelectContent>
            <Select.SelectItem
              value="position"
            >
              ชื่อตำแหน่งงาน
            </Select.SelectItem>
            <Select.SelectItem
              value="open-date"
            >
              วันเปิดรับสมัคร
            </Select.SelectItem>
            <Select.SelectItem
              value="close-date"
            >
              วันปิดรับสมัคร
            </Select.SelectItem>
          </Select.SelectContent>
        </Select.Select>
      </div>

      <h2 className="text-xl font-bold">ตำแหน่งงานทั้งหมด</h2>

      {sortedJobs.map((job) => {
        const company =
          initialCompanies.find((c) => c.companyId === job.companyId) ?? null;

        return (
          <Card key={job.jobId}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="relative shrink-0 w-16 h-16">
                  <Image
                    src={company?.companyLogo || "/default-logo.png"}
                    alt={company?.companyName ?? "Company Logo"}
                    fill
                    className="object-cover shrink-0 rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <CardTitle className="text-sm">
                    <p>{job.jobTitle}</p>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {company?.companyName ?? "N/A"}
                  </CardDescription>

                  <div className="flex gap-2 items-center">
                    <LucideClock className="shrink-0" width={16} height={16} />
                    <p className="text-xs leading-none">
                      {{
                        "full-time": "Full Time",
                        "part-time": "Part Time",
                        internship: "Internship",
                      }[job.positionType as string] ?? "N/A"}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <LucideCalendarRange
                      className="shrink-0"
                      width={16}
                      height={16}
                    />
                    <p className="text-xs">
                      {job.applicationStartDate} - {job.applicationEndDate}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <LucideMapPin className="shrink-0" width={16} height={16} />
                    <p className="text-xs">
                      {company?.officeLocation ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-xs line-clamp-3">{job.jobDescription}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
