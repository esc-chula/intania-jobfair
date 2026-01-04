"use client";

import { SearchableJob } from "@/lib/search-engine/transformer";
import Image from "next/image";

interface JobResultCardProps {
  job: SearchableJob;
}

export const JobResultCard = ({ job }: JobResultCardProps) => {
  const { company } = job;
  // Determine relevant booth to show (checking logic)
  const booth1 = company?.boothDay1 || "-";
  const booth2 = company?.boothDay2 || "-";

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-pink-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white relative">
            {company?.companyLogo ? (
              <Image
                src={company.companyLogo}
                alt={company.companyName_en}
                fill
                className="object-contain p-1"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xs text-gray-400">
                N/A
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#102E50] group-hover:text-pink-600 transition-colors">
              {job.jobTitle}
            </h3>
            <p className="text-sm font-semibold text-gray-600">
              {company?.companyName_en || company?.companyName_th}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="inline-flex items-center rounded-full bg-pink-50 px-2.5 py-0.5 text-xs font-medium text-pink-700">
            {job.positionType}
          </span>
          {/* Booth Badge */}
          {(booth1 || booth2) && (
            <div className="flex gap-1 text-[10px] text-gray-400 font-mono mt-1">
              {booth1 && (
                <span title="Day 1 Booth">
                  D1: <strong className="text-gray-700">{booth1}</strong>
                </span>
              )}
              {booth2 && (
                <span title="Day 2 Booth">
                  D2: <strong className="text-gray-700">{booth2}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 border-t border-gray-50 pt-3">
        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
          {job.field_of_work}
        </span>
        {/* Show 1 major as example if space permits, simplified */}
        {job._searchable_majors.length > 0 && (
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded truncate max-w-[150px]">
            {job._searchable_majors[0]}{" "}
            {job._searchable_majors.length > 1 &&
              `+${job._searchable_majors.length - 1}`}
          </span>
        )}
      </div>
    </div>
  );
};
