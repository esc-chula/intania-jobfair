import { Booth, Company } from "@/types/schema";
import React from "react";
import { Badge } from "@/components/ui/badge";

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "Banking, Finance & Investment": { bg: "bg-[#FBF6DF]", text: "text-[#102E50]" },
  "Computer systems, IT & Communications Technology": { bg: "bg-[#D9E3ED]", text: "text-[#102E50]" },
  "Manufacturing, Logistics & Industrial": { bg: "bg-[#F9DD9E]", text: "text-[#102E50]" },
  "Research, Academia & Government agencies": { bg: "bg-[#F5C45E]", text: "text-[#102E50]" },
  "Mining & Geology": { bg: "bg-[#E88069]", text: "text-white" },
  "Energy & Sustainability": { bg: "bg-[#DB3D1F]", text: "text-white" },
  Construction: { bg: "bg-[#305379]", text: "text-white" },
  Business: { bg: "bg-[#EFD0CB]", text: "text-[#102E50]" },
  "Consulting & Strategy": { bg: "bg-[#0E2E4F]", text: "text-white" },
  "Entrepreneurship & Startups": { bg: "bg-[#98ABC3]", text: "text-[#102E50]" },
  Others: { bg: "bg-[#E0E0E080]", text: "text-[#102E50]" },
};

export default function CompanyTags({ company }: { company: Company | Booth }) {
  const tag = company.businessFocus || "Others";
  const colors = TAG_COLORS[tag] || { bg: "bg-gray-100", text: "text-gray-800" };

  return (
    <div
      className={`inline-flex flex-wrap max-w-[160px] py-0.5 px-2.5 rounded-lg ${colors.bg}`}
    >
      <p className={`text-xs font-bodyEN2 ${colors.text}`}>{tag}</p>
    </div>
  );
}
