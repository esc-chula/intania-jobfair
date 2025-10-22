import type { Company, Job } from "@/types/schema";

const GIST_RAW_BASE = process.env.NEXT_PUBLIC_GIST_RAW_BASE;

async function fetchJson<T>(path: string, revalidate = 3600): Promise<T> {
  if (!GIST_RAW_BASE) {
    console.warn(`NEXT_PUBLIC_GIST_RAW_BASE not set, returning empty data for ${path}`);
    return [] as unknown as T;
  }
  const res = await fetch(`${GIST_RAW_BASE}/${path}`, { 
    next: { revalidate },
    headers: {
      'Accept': 'application/json',
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchCompanies(): Promise<Company[]> {
  return fetchJson<Company[]>("companies.json");
}

export async function fetchJobs(): Promise<Job[]> {
  return fetchJson<Job[]>("jobs.json");
}
