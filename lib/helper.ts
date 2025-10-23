import { Job } from "@/types/schema";
import { fetchJobs } from "@/lib/data";

export async function countJobs(companyId: number): Promise<number> {
    const jobs = await fetchJobs();
    return jobs.filter((job: Job) => job.companyId === companyId).length;
}
