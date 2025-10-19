import type { Company, Job } from "@/types/schema";

const GIST_RAW_BASE = process.env.NEXT_PUBLIC_GIST_RAW_BASE;

async function fetchJson<T>(path: string, revalidate = 86400): Promise<T> {
  if (!GIST_RAW_BASE) {
    // For test purpose
    return [] as unknown as T;
  }
  const res = await fetch(`${GIST_RAW_BASE}/${path}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

export async function fetchCompanies(): Promise<Company[]> {
  return fetchJson<Company[]>("companies.json");
}

export async function fetchJobs(): Promise<Job[]> {
  return fetchJson<Job[]>("jobs.json");
}
