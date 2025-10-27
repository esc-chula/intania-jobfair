import type { Job, Company } from "@/types/schema";

// Search result with score for ranking
interface SearchResult {
  job: Job;
  company: Company | null;
  score: number;
  matchType: 'location' | 'job' | 'company' | 'mixed';
}

// Detect search intent based on query
function detectSearchIntent(query: string): 'location' | 'job' | 'company' | 'mixed' {
  const searchTerm = query.toLowerCase().trim();
  
  // Common location keywords
  const locationKeywords = [
    'กรุงเทพ', 'bangkok', 'เชียงใหม่', 'chiang mai', 'ขอนแก่น', 'khon kaen',
    'ระยอง', 'rayong', 'ชลบุรี', 'chonburi', 'นครราชสีมา', 'korat',
    'ภูเก็ต', 'phuket', 'สงขลา', 'songkhla', 'อุดรธานี', 'udon thani',
    'จังหวัด', 'province', 'อำเภอ', 'district', 'เขต', 'area'
  ];
  
  // Common job keywords
  const jobKeywords = [
    'engineer', 'วิศวกร', 'developer', 'โปรแกรมเมอร์', 'programmer',
    'analyst', 'นักวิเคราะห์', 'manager', 'ผู้จัดการ', 'intern', 'ฝึกงาน',
    'software', 'ซอฟต์แวร์', 'data', 'ข้อมูล', 'marketing', 'การตลาด',
    'sales', 'ขาย', 'hr', 'hrd', 'human resource', 'ทรัพยากรบุคคล'
  ];
  
  // Common company keywords
  const companyKeywords = [
    'บริษัท', 'company', 'corp', 'corporation', 'ltd', 'limited',
    'group', 'กรุ๊ป', 'holding', 'โฮลดิ้ง', 'international', 'อินเตอร์'
  ];
  
  const hasLocation = locationKeywords.some(keyword => searchTerm.includes(keyword));
  const hasJob = jobKeywords.some(keyword => searchTerm.includes(keyword));
  const hasCompany = companyKeywords.some(keyword => searchTerm.includes(keyword));
  
  if (hasLocation && !hasJob && !hasCompany) return 'location';
  if (hasJob && !hasLocation && !hasCompany) return 'job';
  if (hasCompany && !hasLocation && !hasJob) return 'company';
  return 'mixed';
}

// Calculate search score based on match priority and intent
function calculateSearchScore(
  query: string,
  job: Job,
  company: Company | null,
  intent: string
): number {
  const searchTerm = query.toLowerCase().trim();
  let score = 0;

  if (!company) return 0;

  // Location-based scoring (highest priority for location intent)
  const locationScore = 
    (company.officeLocation_province.toLowerCase().includes(searchTerm) ? 100 : 0) +
    (company.officeLocation_district.toLowerCase().includes(searchTerm) ? 80 : 0) +
    (company.officeLocation_full.toLowerCase().includes(searchTerm) ? 60 : 0);

  // Job-based scoring
  const jobScore = 
    (job.jobTitle.toLowerCase().includes(searchTerm) ? 70 : 0) +
    (job.field_of_work.toLowerCase().includes(searchTerm) ? 50 : 0);

  // Company-based scoring
  const companyScore = 
    (company.companyName_th.toLowerCase().includes(searchTerm) ? 60 : 0) +
    (company.companyName_en.toLowerCase().includes(searchTerm) ? 55 : 0) +
    (company.businessFocus.toLowerCase().includes(searchTerm) ? 40 : 0);

  // Intent-based scoring multiplier
  let intentMultiplier = 1;
  if (intent === 'location' && locationScore > 0) intentMultiplier = 2;
  if (intent === 'job' && jobScore > 0) intentMultiplier = 1.8;
  if (intent === 'company' && companyScore > 0) intentMultiplier = 1.5;

  // Calculate final score
  score = (locationScore + jobScore + companyScore) * intentMultiplier;

  // Exact match bonus
  if (company.officeLocation_province.toLowerCase() === searchTerm) score += 50;
  if (company.officeLocation_district.toLowerCase() === searchTerm) score += 30;
  if (job.jobTitle.toLowerCase() === searchTerm) score += 40;

  return score;
}

// Smart search with intent detection and intelligent ranking
export function searchJobsAndCompanies(
  query: string,
  jobs: Job[],
  companies: Company[]
): { jobs: Job[]; companies: Company[] } {
  if (!query.trim()) {
    return { jobs: [], companies: [] };
  }

  const searchTerm = query.toLowerCase().trim();
  const intent = detectSearchIntent(query);
  const results: SearchResult[] = [];

  // Search through all jobs and calculate scores
  jobs.forEach(job => {
    const company = companies.find(c => c[""] === job.companyId);
    if (!company) return;

    // Check if any field matches
    const hasMatch = (
      job.jobTitle.toLowerCase().includes(searchTerm) ||
      job.field_of_work.toLowerCase().includes(searchTerm) ||
      company.companyName_th.toLowerCase().includes(searchTerm) ||
      company.companyName_en.toLowerCase().includes(searchTerm) ||
      company.businessFocus.toLowerCase().includes(searchTerm) ||
      company.officeLocation_province.toLowerCase().includes(searchTerm) ||
      company.officeLocation_district.toLowerCase().includes(searchTerm) ||
      company.officeLocation_full.toLowerCase().includes(searchTerm)
    );

    if (hasMatch) {
      const score = calculateSearchScore(searchTerm, job, company, intent);
      const matchType = score > 100 ? 'location' : 
                       score > 50 ? 'job' : 
                       score > 30 ? 'company' : 'mixed';
      
      results.push({ job, company, score, matchType });
    }
  });

  // Sort by score (highest first) and return jobs
  const sortedResults = results
    .sort((a, b) => b.score - a.score)
    .map(result => result.job);

  // Search companies with intelligent ranking
  const companyResults = companies
    .filter(company => {
      return (
        company.companyName_th.toLowerCase().includes(searchTerm) ||
        company.companyName_en.toLowerCase().includes(searchTerm) ||
        company.businessFocus.toLowerCase().includes(searchTerm) ||
        company.officeLocation_province.toLowerCase().includes(searchTerm) ||
        company.officeLocation_district.toLowerCase().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      // Prioritize based on intent
      if (intent === 'location') {
        const aLocationMatch = a.officeLocation_province.toLowerCase().includes(searchTerm) ||
                             a.officeLocation_district.toLowerCase().includes(searchTerm);
        const bLocationMatch = b.officeLocation_province.toLowerCase().includes(searchTerm) ||
                             b.officeLocation_district.toLowerCase().includes(searchTerm);
        
        if (aLocationMatch && !bLocationMatch) return -1;
        if (!aLocationMatch && bLocationMatch) return 1;
      }
      
      if (intent === 'company') {
        const aNameMatch = a.companyName_th.toLowerCase().includes(searchTerm) ||
                         a.companyName_en.toLowerCase().includes(searchTerm);
        const bNameMatch = b.companyName_th.toLowerCase().includes(searchTerm) ||
                         b.companyName_en.toLowerCase().includes(searchTerm);
        
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
      }
      
      return 0;
    });

  return {
    jobs: sortedResults,
    companies: companyResults
  };
}
