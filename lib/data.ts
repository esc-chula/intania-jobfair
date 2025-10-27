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
  // Use specific gist URL for jobs data
  const GIST_JOBS_URL = "https://gist.githubusercontent.com/tawanorkchiengtai/68fb4aebea0b5ec95229e9ba60685d36/raw/jobs.json";
  
  try {
    const res = await fetch(GIST_JOBS_URL, { 
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("Failed to fetch jobs from specific gist:", error);
    // Fallback to original method if specific gist fails
    return fetchJson<Job[]>("jobs.json");
  }
}
