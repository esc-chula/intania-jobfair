import { searchJobsAndCompanies } from "../search";
import { Job, Company } from "@/types/schema";

// Simple assertion helper
function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

// Mock data
const mockCompanies: Company[] = [
  {
    "": 1,
    companyName_th: "บริษัท เทค จำกัด",
    companyName_en: "Tech Co., Ltd.",
    companyLogo: "",
    shortDescription: "Leading tech company",
    fullDescription: "We do software.",
    officeLocation_district: "Pathum Wan",
    officeLocation_province: "Bangkok",
    officeLocation_full: "Pathum Wan, Bangkok",
    businessFocus: "Computer systems, IT & Communications Technology",
    hrContactName: "HR",
    hrContactEmail: "hr@tech.co",
    hrContactPhone: "020000000",
    day1: true,
    day2: true,
    boothDay1: "A01",
    boothDay2: "A01",
  },
  {
    "": 2,
    companyName_th: "ซีพี ออลล์",
    companyName_en: "CP ALL",
    companyLogo: "",
    shortDescription: "Retail",
    fullDescription: "7-11 operator",
    officeLocation_district: "Bang Rak",
    officeLocation_province: "Bangkok",
    officeLocation_full: "Bang Rak, Bangkok",
    businessFocus: "Business",
    hrContactName: "HR",
    hrContactEmail: "hr@cpall.co",
    hrContactPhone: "020000000",
    day1: true,
    day2: true,
    boothDay1: "Hall 1 B05",
    boothDay2: "Hall 1 B05",
  },
  {
    "": 3,
    companyName_th: "บริษัท ตรวจสอบ",
    companyName_en: "Audit Corp",
    companyLogo: "",
    shortDescription: "Audit",
    fullDescription: "Auditing",
    officeLocation_district: "Silom",
    officeLocation_province: "Bangkok",
    officeLocation_full: "Silom, Bangkok",
    businessFocus: "Finance",
    hrContactName: "HR",
    hrContactEmail: "hr@audit.co",
    hrContactPhone: "020000000",
    day1: true,
    day2: true,
    boothDay1: "B03-B04",
    boothDay2: "B03, B04",
  },
  {
    "": 4,
    companyName_th: "บริษัท เอ็กซ์วายซี",
    companyName_en: "XYZ Corp",
    companyLogo: "",
    shortDescription: "XYZ",
    fullDescription: "XYZ",
    officeLocation_district: "Silom",
    officeLocation_province: "Bangkok",
    officeLocation_full: "Silom, Bangkok",
    businessFocus: "Finance",
    hrContactName: "HR",
    hrContactEmail: "hr@xyz.co",
    hrContactPhone: "020000000",
    day1: true,
    day2: true,
    boothDay1: "B30",
    boothDay2: "B30",
  },
];

const mockJobs: Job[] = [
  {
    jobId: 101,
    companyId: 1,
    jobTitle: "Software Engineer",
    jobDescription: "Write code",
    positionType: "Full-time",
    eligibleStudentYear: {
      "Bachelor's Freshmen": false,
      "Bachelor's Sophmore": false,
      "Bachelor's Junior": false,
      "Bachelor's Senior": true,
      "Master's": true,
      Doctorate: false,
    },
    always_applicable: false,
    application_link: "",
    field_of_work: "Computer systems, IT & Communications Technology",
    major: {},
  },
  {
    jobId: 102,
    companyId: 2,
    jobTitle: "Marketing Manager",
    jobDescription: "Do marketing",
    positionType: "Full-time",
    eligibleStudentYear: {
        "Bachelor's Freshmen": false,
        "Bachelor's Sophmore": false,
        "Bachelor's Junior": false,
        "Bachelor's Senior": true,
        "Master's": true,
        Doctorate: false,
    },
    always_applicable: false,
    application_link: "",
    field_of_work: "Business",
    major: {},
  },
];

async function runTests() {
  console.log("Running Search Logic Verification...");

  // Test 1: English Company Name
  {
    const result = searchJobsAndCompanies("Tech", mockJobs, mockCompanies);
    assert(result.companies.length === 1, "English Name Search: Should find 1 company");
    assert(result.companies[0].companyName_en === "Tech Co., Ltd.", "English Name Search: Name match");
  }

  // Test 2: Thai Company Name
  {
    const result = searchJobsAndCompanies("ซีพี", mockJobs, mockCompanies);
    assert(result.companies.length === 1, "Thai Name Search: Should find 1 company");
    assert(result.companies[0].companyName_en === "CP ALL", "Thai Name Search: Name match");
  }

  // Test 3: Job Title
  {
    const result = searchJobsAndCompanies("Software", mockJobs, mockCompanies);
    assert(result.jobs.length === 1, "Job Title Search: Should find 1 job");
    assert(result.jobs[0].jobTitle === "Software Engineer", "Job Title Search: Title match");
  }

  // Test 4: Booth A01
  {
    const result = searchJobsAndCompanies("A01", mockJobs, mockCompanies);
    assert(result.companies.length === 1, "Booth A01: Should find 1 company");
    assert(result.companies[0].companyName_en === "Tech Co., Ltd.", "Booth A01: Company match");
  }

  // Test 5: Booth Hall 1
  {
    const result = searchJobsAndCompanies("Hall 1", mockJobs, mockCompanies);
    assert(result.companies.length === 1, "Booth Hall 1: Should find 1 company");
    assert(result.companies[0].companyName_en === "CP ALL", "Booth Hall 1: Company match");
  }

  // Test 6: Booth with Thai "บูธ A01"
  {
    const result = searchJobsAndCompanies("บูธ A01", mockJobs, mockCompanies);
    assert(result.companies.length === 1, "Thai Booth Search: Should find 1 company");
    assert(result.companies[0].companyName_en === "Tech Co., Ltd.", "Thai Booth Search: Company match");
  }

  // Test 7: Booth Range (B03-B04) - Search "B03"
  {
    const result = searchJobsAndCompanies("B03", mockJobs, mockCompanies);
    assert(result.companies.length === 1, "Booth Range Search 'B03': Should find 1 company");
    assert(result.companies[0].companyName_en === "Audit Corp", "Booth Range Search 'B03': Company match");
  }

  // Test 8: Booth Range (B03-B04) - Search "B04"
  {
    const result = searchJobsAndCompanies("B04", mockJobs, mockCompanies);
    assert(result.companies.length === 1, "Booth Range Search 'B04': Should find 1 company");
    assert(result.companies[0].companyName_en === "Audit Corp", "Booth Range Search 'B04': Company match");
  }

  // Test 9: False Positive Check (Search "B3", ensure no "B30")
  {
    // Searching "B3" should NOT find "XYZ Corp" (which has booth B30)
    // It implies we need strict matching like "B3" or "B03" but not prefix match on numbers
    const result = searchJobsAndCompanies("B3", mockJobs, mockCompanies);
    
    const foundXYZ = result.companies.find(c => c.companyName_en === "XYZ Corp");
    assert(!foundXYZ, "Strict Booth Search: 'B3' should NOT match 'B30' (XYZ Corp)");
  }

  console.log("ALL TESTS PASSED ✨");
}

runTests().catch(console.error);
