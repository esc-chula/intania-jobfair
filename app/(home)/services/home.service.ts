import type { Company, Job } from "@/types/schema";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function pickFeaturedCompanies(
  companies: Company[],
  limit = 6,
): Company[] {
  const shuffled = shuffleArray(companies);
  return shuffled.slice(0, limit);
}

export function pickFeaturedJobs(jobs: Job[], limit = 6): Job[] {
  const shuffled = shuffleArray(jobs);
  return shuffled.slice(0, limit);
}
