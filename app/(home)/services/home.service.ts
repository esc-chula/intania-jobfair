import type { Company, Job } from "@/types/schema";

export function pickFeaturedCompanies(companies: Company[], limit = 6): Company[] {
  // TODO: จะ implement ใน branch ถัดไป
  return companies.slice(0, limit);
}

export function pickFeaturedJobs(jobs: Job[], limit = 6): Job[] {
  // TODO: จะ implement ใน branch ถัดไป
  return jobs.slice(0, limit);
}