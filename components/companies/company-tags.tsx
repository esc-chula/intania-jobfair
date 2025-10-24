import { Company } from "@/types/schema";
import React from "react";
import { Badge } from "@/components/ui/badge";

const TAG_COLORS: Record<string, string> = {
    "Banking, Finance & Investment": "bg-[#67ABA380]",
    "Computer systems, IT & Communications Technology": "bg-[#A1A1A680]",
    "Manufacturing, Logistics & Industrial": "bg-[#78909C80]",
    "Research, Academia & Government agencies": "bg-[#7B6A9C80]",
    "Mining & Geology": "bg-[#BA784680]",
    "Energy & Sustainability": "bg-[#879F6780]",
    Construction: "bg-[#B4406080]",
    Business: "bg-[#78BAD180]",
    "Consulting & Strategy": "bg-[#9E9E9E80]",
    "Entrepreneurship & Startups": "bg-[#EB7EA680]",
    Others: "bg-[#E0E0E080]",
};

export default function CompanyTags({ company }: { company: Company }) {
    // const tag = company.businessFocus || "Others";
    const tag = "Construction"; // mock wait p'tawan clean data

    const colorClass = TAG_COLORS[tag] || "bg-gray-100 text-gray-800";

    return (
        <div
            className={`inline-flex flex-wrap max-w-[160px] py-0.5 px-2.5 rounded-lg ${colorClass}`}
        >
            <p className="text-xs font-bodyEN2 text-secondary-foreground">{tag}</p>
        </div>
    );
}
