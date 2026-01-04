import { Job, Company } from "@/types/schema";

export interface SearchableJob extends Job {
  company: Company | null;
  // Computed fields for Fuse.js indexing
  _searchable_company_name_en: string;
  _searchable_company_name_th: string;
  _searchable_booth_codes: string[]; // ["A01", "Hall 1", "B03"]
  _searchable_majors: string[]; // List of true major keys
}

/**
 * Parses booth strings into a list of searchable codes.
 * E.g. "Hall 1 B05" -> ["Hall 1", "B05"]
 * E.g. "B03-B04" -> ["B03", "B04", "B3", "B4"] (Including simplified forms)
 */
function parseBoothCodes(boothStr: string = ""): string[] {
  if (!boothStr) return [];
  const normalized = boothStr.trim();
  const codes = new Set<string>();

  // Add exact string
  codes.add(normalized);

  // Extract letter-digit pairs (e.g. "A01", "B5")
  const matches = normalized.match(/[A-Z]+\s*\d+/gi);
  if (matches) {
    matches.forEach((m) => {
      codes.add(m.replace(/\s+/g, "").toUpperCase()); // "B 05" -> "B05"
      codes.add(m.toUpperCase()); // "B 05"
    });
  }

  // Handle ranges (basic support)
  if (normalized.includes("-") || normalized.includes(",")) {
    // Split by common delimiters
    const parts = normalized.split(/[-,\/]/).map((s) => s.trim());
    parts.forEach((p) => {
      if (p) codes.add(p);
      // Recursively extract from parts if needed, but simple add is usually enough for "B03"
      const subMatches = p.match(/[A-Z]+\s*\d+/gi);
      if (subMatches) {
        subMatches.forEach((sm) =>
          codes.add(sm.replace(/\s+/g, "").toUpperCase()),
        );
      }
    });
  }

  return Array.from(codes);
}

/**
 * Flattens Jobs and Companies into a single searchable structure.
 */
export function flattenJobs(
  jobs: Job[],
  companies: Company[],
): SearchableJob[] {
  // Create a map for O(1) company lookup
  const companyMap = new Map<number, Company>();
  companies.forEach((c) => {
    // Check if company has an ID field (it seems to be the first key usually, or mapped via index)
    // The schema says companyId is used. In raw JSON, it might be the "" key or "id".
    // Based on user data inspection: {"": 1, ...}
    const id = c[""] || (c as Record<string, unknown>).id;
    if (id) companyMap.set(Number(id), c);
  });

  return jobs.map((job) => {
    const company = companyMap.get(job.companyId) || null;

    // Extract true majors
    const activeMajors = Object.entries(job.major || {})
      .filter(([, isActive]) => isActive)
      .map(([majorName]) => majorName);

    const boothCodes = new Set<string>();
    if (company) {
      parseBoothCodes(company.boothDay1).forEach((c) => boothCodes.add(c));
      parseBoothCodes(company.boothDay2).forEach((c) => boothCodes.add(c));
    }

    return {
      ...job,
      company,
      _searchable_company_name_en: company?.companyName_en || "",
      _searchable_company_name_th: company?.companyName_th || "",
      _searchable_booth_codes: Array.from(boothCodes),
      _searchable_majors: activeMajors,
    };
  });
}

/**
 * Extracts all unique major keys from the jobs array.
 */
export function extractUniqueMajors(jobs: Job[]): string[] {
  const majorsSet = new Set<string>();
  jobs.forEach((job) => {
    if (job.major) {
      Object.keys(job.major).forEach((k) => majorsSet.add(k));
    }
  });
  return Array.from(majorsSet).sort();
}
