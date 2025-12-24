import { getSynonyms } from "@/constants/search-synonyms";
import { transliterate } from "@/lib/transliteration";
import type { Job, Company } from "@/types/schema";

// Search result with score for ranking
interface SearchResult {
  job: Job;
  company: Company | null;
  score: number;
  matchType: "location" | "job" | "company" | "mixed";
}

// Smart search with intent detection and intelligent ranking
export function searchJobsAndCompanies(
  query: string,
  jobs: Job[],
  companies: Company[],
): { jobs: Job[]; companies: Company[] } {
  if (!query.trim()) {
    return { jobs: [], companies: [] };
  }

  const rawSearchTerm = query.toLowerCase().trim();
  
  // 1. Query Expansion
  // Generate variations using transliteration and synonyms
  const transliteratedTerms = transliterate(rawSearchTerm);
  const searchTerms = new Set<string>();
  
  transliteratedTerms.forEach(term => {
    searchTerms.add(term);
    const synonyms = getSynonyms(term);
    synonyms.forEach(syn => searchTerms.add(syn));
  });

  const searchTokens = Array.from(searchTerms);

  // Booth intent detection (e.g., "A1", "Hall 1", "Booth A")
  const boothRegex = /([a-z])\s*(\d{1,3})/i;
  const boothMatch = rawSearchTerm.match(boothRegex);
  const isBoothSearch = boothMatch || 
    rawSearchTerm.includes("booth") || 
    rawSearchTerm.includes("บูธ") || 
    rawSearchTerm.includes("hall") || 
    rawSearchTerm.includes("ฮอลล์");

  const results: SearchResult[] = [];

  // Helper to parse booth codes into Comparable objects
  // Supports: "A1", "A01", "A 1", "B3-B4", "B3, B4"
  const parseBoothCodes = (text: string) => {
    if (!text) return [];
    // Normalize: remove generic words
    const clean = text.toLowerCase().replace(/(booth|บูธ|hall|ฮอลล์)\s*/g, "");
    
    // Find all patterns like "A1", "B-02" (unlikely), "C 03"
    // Also handle ranges if connected by -? 
    // Simplest approach: extract all letter-number pairs
    // But "B3-B4" might be split. 
    
    const codes: { zone: string; number: number }[] = [];
    
    // Regex for "Letter + Number"
    const singleBoothRegex = /([a-z])\s*(\d+)/gi;
    let match;
    while ((match = singleBoothRegex.exec(clean)) !== null) {
      codes.push({
        zone: match[1].toLowerCase(),
        number: parseInt(match[2], 10)
      });
    }
    
    return codes;
  };
  
  const queryBooths = parseBoothCodes(rawSearchTerm);

  // Helper to check token matches
  const checkMatch = (text: string, tokens: string[]) => {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return tokens.some(token => lowerText.includes(token));
  };

  const getMatchScore = (text: string, tokens: string[], exactScore: number, partialScore: number) => {
    if (!text) return 0;
    const lowerText = text.toLowerCase();
    
    // Exact match check (against any token)
    if (tokens.some(token => lowerText === token)) return exactScore;
    
    // Partial match
    if (tokens.some(token => lowerText.includes(token))) return partialScore;
    
    return 0;
  };
  
  // Helper to check precise booth match
  const checkBoothMatch = (company: Company) => {
    if (queryBooths.length === 0) return false; // No booth in query
    
    const companyBooths = [
      ...parseBoothCodes(company.boothDay1),
      ...parseBoothCodes(company.boothDay2)
    ];
    
    // Check if ANY query booth matches ANY company booth
    return queryBooths.some(q => 
      companyBooths.some(c => c.zone === q.zone && c.number === q.number)
    );
  };

  // Search through all jobs and calculate scores
  jobs.forEach((job) => {
    const company = companies.find((c) => c[""] === job.companyId);
    if (!company) return;

    let totalScore = 0;
    
    // Job Title Matches
    totalScore += getMatchScore(job.jobTitle, searchTokens, 100, 80);
    
    // Field of Work Matches
    totalScore += getMatchScore(job.field_of_work, searchTokens, 60, 40);

    // Company matches (for job)
    const companyNameScore = 
      getMatchScore(company.companyName_th, searchTokens, 50, 30) +
      getMatchScore(company.companyName_en, searchTokens, 50, 30);
    totalScore += companyNameScore;
    
    // Booth / Location Matches
    let locationScore = 0;
    if (checkMatch(company.officeLocation_province, searchTokens) || 
        checkMatch(company.officeLocation_district, searchTokens)) {
      locationScore += 40;
    }
    
    if (isBoothSearch) {
       // Strict booth check if we found a booth code in query
       if (queryBooths.length > 0) {
         if (checkBoothMatch(company)) {
           locationScore += 200;
         }
       } else {
         // Fallback loose check (e.g. for "Hall 1" if parser missed it)
         // Only strip "booth" words, keep "hall" as it is significant
         const cleanQuery = rawSearchTerm.replace(/(booth|บูธ)\s*/g, "").replace(/\s+/g, "");
         const booth1 = String(company.boothDay1 || "").toLowerCase().replace(/\s+/g, "");
         const booth2 = String(company.boothDay2 || "").toLowerCase().replace(/\s+/g, "");

         if (cleanQuery.length > 0 && 
             ((booth1 && booth1.includes(cleanQuery)) || 
              (booth2 && booth2.includes(cleanQuery)))) {
           locationScore += 50; // Lower score for partial/loose match
         }
       }
    }

    totalScore += locationScore;

    if (totalScore > 0) {
      const matchType =
        locationScore > 100
          ? "location"
          : totalScore > 80 // High score implies good job/company match
            ? "mixed" 
            : "mixed";

      results.push({ job, company, score: totalScore, matchType: matchType as any });
    }
  });

  // Sort by score (highest first) and return jobs
  const sortedJobResults = results
    .sort((a, b) => b.score - a.score)
    .map((result) => result.job);

  // Search companies with intelligent ranking
  const companyResults = companies
    .map((company) => {
      let score = 0;
      
      // Name matches
      score += getMatchScore(company.companyName_th, searchTokens, 100, 80);
      score += getMatchScore(company.companyName_en, searchTokens, 100, 80);
      
      // Business Focus
      score += getMatchScore(company.businessFocus, searchTokens, 50, 30);
      
      // Location
      score += getMatchScore(company.officeLocation_province, searchTokens, 60, 40);
      score += getMatchScore(company.officeLocation_district, searchTokens, 50, 30);

      // Booth Match
      if (isBoothSearch) {
         if (queryBooths.length > 0) {
            if (checkBoothMatch(company)) {
              score += 200;
            }
         } else {
           // Fallback loose check
           const cleanQuery = rawSearchTerm.replace(/(booth|บูธ)\s*/g, "").replace(/\s+/g, "");
           const booth1 = String(company.boothDay1 || "").toLowerCase().replace(/\s+/g, "");
           const booth2 = String(company.boothDay2 || "").toLowerCase().replace(/\s+/g, "");

           if (cleanQuery.length > 0 && 
               ((booth1 && booth1.includes(cleanQuery)) || 
                (booth2 && booth2.includes(cleanQuery)))) {
             score += 50;
           }
         }
      }

      return { company, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.company);

  return {
    jobs: sortedJobResults,
    companies: companyResults,
  };
}
