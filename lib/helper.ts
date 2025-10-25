import { Job } from "@/types/schema";
import { fetchJobs } from "@/lib/data";

export async function countJobs(companyId: number): Promise<number> {
    const jobs = await fetchJobs();
    return jobs.filter((job: Job) => job.companyId === companyId).length;
}

// Thai month abbreviations
const thaiMonths = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];

export function formatThaiDate(dateString: string): string {
    try {
        // Handle empty or invalid date strings
        if (!dateString || dateString.trim() === "" || dateString === "undefined" || dateString === "null") {
            return "ไม่ระบุ";
        }
        
        const date = new Date(dateString);
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return "ไม่ระบุ";
        }
        
        const day = date.getDate();
        const month = date.getMonth();
        const year = (date.getFullYear() + 543) % 100; // Convert to Buddhist era and get last 2 digits
        
        return `${day} ${thaiMonths[month]} ${year.toString().padStart(2, '0')}`;
    } catch (error) {
        console.error("Error formatting Thai date:", error);
        return "ไม่ระบุ";
    }
}
