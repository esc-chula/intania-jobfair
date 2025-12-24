import { flattenJobs, SearchableJob } from "./transformer";
import Fuse from "fuse.js";
import { Job, Company } from "@/types/schema";
import fs from "fs";
import path from "path";

// Load Real Data
const companiesPath = path.join(process.cwd(), "src/companies.json");
const jobsPath = path.join(process.cwd(), "src/jobs.json");

const companies: Company[] = JSON.parse(fs.readFileSync(companiesPath, "utf-8"));
const jobs: Job[] = JSON.parse(fs.readFileSync(jobsPath, "utf-8"));

console.log(`Loaded ${companies.length} companies and ${jobs.length} jobs.`);

console.log("Running Search Engine Verification with Real Data...");

// 1. Test Flattening
const searchable = flattenJobs(jobs, companies);
console.log(`Flattened ${searchable.length} jobs.`);

// 2. Test Fuse Search
const fuse = new Fuse(searchable, {
  includeScore: true,
  threshold: 0.4,
  keys: [
    { name: "jobTitle", weight: 0.3 },
    { name: "_searchable_booth_codes", weight: 0.2 },
    { name: "_searchable_company_name_en", weight: 0.3 },
    { name: "_searchable_company_name_th", weight: 0.2 },
  ]
});

// Test A: Search by Job Title (Real Example)
// "Production Engineer" is a job in the gist data
const res1 = fuse.search("Production");
const productionJob = res1.find(r => r.item.jobTitle.includes("Production"));
if (productionJob) {
    console.log(`✅ PASSED: Search by Job Title "Production" found "${productionJob.item.jobTitle}"`);
} else {
    console.error("❌ FAILED: Search by Job Title 'Production'");
}

// Test B: Search by Company Name (Real Example: "Valeo")
const res2 = fuse.search("Valeo");
console.log(`Debug: 'Valeo' search results count: ${res2.length}`);
if (res2.length > 0) {
    console.log(`Top result: ${JSON.stringify(res2[0].item.company?.companyName_en)} (Score: ${res2[0].score})`);
}

const valeoJob = res2.find(r => r.item._searchable_company_name_en.toLowerCase().includes("valeo"));
if (valeoJob) {
    console.log(`✅ PASSED: Search by Company "Valeo" found job at "${valeoJob.item._searchable_company_name_en}"`);
} else {
    console.error("❌ FAILED: Search by Company 'Valeo'");
    
    // Debugging: Find a job with companyId 1 (Valeo)
    const job1 = searchable.find(j => j.companyId === 1);
    if (job1) {
        console.log("Debug: Transformed Job 1 Data:", {
            jobId: job1.jobId,
            companyId: job1.companyId,
            companyNameEN: job1._searchable_company_name_en,
            companyNameTH: job1._searchable_company_name_th,
            hasCompanyObj: !!job1.company
        });
    } else {
        console.log("Debug: Could not find job with companyId 1");
    }
}

// Test C: Search by Booth (Real Data Check needed)
// Let's find a company with a booth in the data first to test properly
const companyWithBooth = companies.find(c => c.boothDay1 && c.boothDay1 !== "-" && c.boothDay1.length < 10);
if (companyWithBooth) {
    const boothCode = companyWithBooth.boothDay1;
    console.log(`Testing Booth Search for code: "${boothCode}" (Company: ${companyWithBooth.companyName_en})`);
    
    // Clean booth code for search (e.g. if it's "Hall 1 A05", search for "A05")
    const match = boothCode.match(/[A-Z]+\d+/);
    const searchTerm = match ? match[0] : boothCode;
    
    const res3 = fuse.search(searchTerm);
    const found = res3.find(r => r.item.company?.companyName_en === companyWithBooth.companyName_en);
    
    if (found) {
        console.log(`✅ PASSED: Search by Booth "${searchTerm}" found company "${found.item.company?.companyName_en}"`);
    } else {
        console.error(`❌ FAILED: Search by Booth "${searchTerm}" did not find expected company`);
    }
} else {
    console.log("⚠️ SKIPPED: No suitable booth data found for auto-verification");
}

console.log("REAL DATA VERIFICATION COMPLETE ✨");
