import { fetchJobs } from "@/lib/data";
import { Job, Company } from "@/types/schema";
import JobsListClient from "@/components/jobs/joblist";

const dummyJobs: Job[] = [
  {
    jobId: "job-001",
    companyId: "comp-001",
    jobTitle: "Frontend Developer",
    jobDescription:
      "พัฒนา UI ด้วย React/Next.js และทำงานร่วมกับทีมออกแบบ\nความรับผิดชอบ: สร้างคอมโพเนนต์ที่นำกลับมาใช้ใหม่, ปรับปรุงประสิทธิภาพ, เขียน unit tests",
    positionType: "full-time" as any,
    openingsCount: 2,
    eligibleYear: ["ป.ตรี", "ป.โท"],
    applicationStartDate: "2025-10-01",
    applicationEndDate: "2025-11-15",
    applicationLink: "https://example.com/apply/frontend",
    jobType: ["เทคโนโลยีสารสนเทศ"],
    majors: ["วิทยาการคอมพิวเตอร์", "วิศวกรรมซอฟต์แวร์"],
  },
  {
    jobId: "job-002",
    companyId: "comp-002",
    jobTitle: "Backend Engineer",
    jobDescription:
      "ออกแบบและพัฒนาระบบ backend (Node.js/TypeScript)\nรวมถึงการออกแบบฐานข้อมูลและ API ที่มีประสิทธิภาพ",
    positionType: "full-time" as any,
    openingsCount: 1,
    eligibleYear: ["ป.ตรี"],
    applicationStartDate: "2025-09-15",
    applicationEndDate: "2025-10-30",
    applicationLink: "https://example.com/apply/backend",
    jobType: ["เทคโนโลยีสารสนเทศ"],
    majors: ["วิทยาการคอมพิวเตอร์", "สารสนเทศศาสตร์"],
  },
  {
    jobId: "job-003",
    companyId: "comp-003",
    jobTitle: "Data Analyst (Part-time)",
    jobDescription:
      "วิเคราะห์ข้อมูลธุรกิจ สร้างรายงานและ dashboard ด้วย SQL / Python / BI tools",
    positionType: "part-time" as any,
    openingsCount: 3,
    eligibleYear: ["ป.ตรี", "ป.โท"],
    applicationStartDate: "2025-10-05",
    applicationEndDate: "2025-11-05",
    applicationLink: "https://example.com/apply/data-analyst",
    jobType: ["วิเคราะห์ข้อมูล"],
    majors: ["สถิติ", "คณิตศาสตร์ประยุกต์", "วิทยาการคอมพิวเตอร์"],
  },
  {
    jobId: "job-004",
    companyId: "comp-004",
    jobTitle: "UX/UI Designer (Internship)",
    jobDescription:
      "ช่วยทีมออกแบบสร้าง wireframes และ interactive prototype\nเหมาะสำหรับนิสิต/นักศึกษาที่ต้องการพอร์ตโฟลิโอ",
    positionType: "internship" as any,
    // openingsCount omitted -> should be displayed as "ไม่ระบุ"
    eligibleYear: ["ป.ตรี"],
    applicationStartDate: "2025-10-10",
    applicationEndDate: "2025-12-01",
    applicationLink: "https://example.com/apply/designer",
    jobType: ["ออกแบบ"],
    majors: ["ออกแบบนิเทศศิลป์", "มัณฑนศิลป์"],
  },
  {
    jobId: "job-005",
    companyId: "comp-005",
    jobTitle: "Marketing Specialist",
    jobDescription:
      "วางแผนแคมเปญการตลาด ดำเนินการโฆษณาและวัดผล KPI ใช้เครื่องมือดิจิทัลมาร์เก็ตติ้ง",
    positionType: "full-time" as any,
    openingsCount: 1,
    eligibleYear: ["ป.ตรี"],
    applicationStartDate: "2025-09-20",
    applicationEndDate: "2025-10-20",
    applicationLink: "https://example.com/apply/marketing",
    jobType: ["การตลาด"],
    majors: ["การตลาด", "บริหารธุรกิจ"],
  },
];

const dummyCompanies: Company[] = [
  {
    companyId: "comp-001",
    companyName: "Intana Tech Co., Ltd.",
    companyLogo:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    shortDescription:
      "บริษัทด้านซอฟต์แวร์และผลิตภัณฑ์ดิจิทัลที่มุ่งเน้นการพัฒนาเว็บและแอปพลิเคชัน ใช้เทคโนโลยีสมัยใหม่เพื่อสร้างผลิตภัณฑ์ที่ใช้งานง่ายและปรับขนาดได้ รองรับทีมออกแบบและวิศวกรที่มีความเชี่ยวชาญ",
    fullDescription:
      "Intana Tech เป็นบริษัทพัฒนาซอฟต์แวร์ชั้นนำที่ให้บริการออกแบบและพัฒนาเว็บแอปพลิเคชัน, ระบบ backend, และ data pipeline\n\n- เทคโนโลยีหลัก: React, Next.js, Node.js, PostgreSQL\n- วัฒนธรรม: ทำงานเป็นทีม ให้ความสำคัญกับคุณภาพโค้ดและการเรียนรู้ต่อเนื่อง\n- สวัสดิการ: ประกันสุขภาพ, วันลาพักผ่อน, งบพัฒนาบุคลากร\n\nเรากำลังเปิดรับผู้ที่รักการพัฒนา UI/UX และสนใจสร้างซอฟต์แวร์ที่มีผลกระทบต่อผู้ใช้จริง",
    officeLocation:
      "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
    companyType: ["เทคโนโลยีสารสนเทศ", "ซอฟต์แวร์"],
    websiteUrl: "https://intanatech.example.com",
    socialMediaLinks: {
      linkedin: "https://www.linkedin.com/company/intana-tech",
      facebook: "https://www.facebook.com/intanatech",
    } as any,
    hrContact: {
      name: "น.ส. วิภา ใจดี",
      email: "hr@intanatech.example.com",
      phone: "+66-2-123-4567",
    } as any,
    promoMaterials: [
      "/companies/comp-001/promo-1.png",
      "/companies/comp-001/promo-2.png",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    ],
    hiringStatus: true,
  },
  {
    companyId: "comp-002",
    companyName: "DataCore Solutions",
    companyLogo:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
    shortDescription:
      "ทีมวิศวกรด้าน backend และ data engineering ให้บริการออกแบบระบบที่ทนทานและปรับขนาดได้ พร้อมโซลูชันการวิเคราะห์ข้อมูลสำหรับธุรกิจต่างๆ",
    fullDescription:
      "DataCore Solutions เชี่ยวชาญด้านระบบ backend, API ที่ปรับขนาดได้ และ Data Warehouse\n\n- โฟกัสที่ประสิทธิภาพและความเสถียรของระบบ\n- ทำงานร่วมกับทีมผลิตภัณฑ์เพื่อออกแบบ API ที่ชัดเจนและทดสอบได้\n\nบริษัทเหมาะสำหรับผู้ที่ชอบแก้โจทย์เชิงสถาปัตยกรรมและฐานข้อมูล",
    officeLocation:
      "45 ซอยสุขุมวิท 77 แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพมหานคร 10110",
    companyType: ["เทคโนโลยีสารสนเทศ", "วิเคราะห์ข้อมูล"],
    websiteUrl: "https://datacore.example.com",
    socialMediaLinks: {
      linkedin: "https://www.linkedin.com/company/datacore",
    } as any,
    hrContact: {
      name: "นาย ปกรณ์ สุขสม",
      email: "recruit@datacore.example.com",
      phone: "+66-2-234-5678",
    } as any,
    promoMaterials: ["/companies/comp-002/promo-1.png"],
    hiringStatus: true,
  },
  {
    companyId: "comp-003",
    companyName: "Insight Analytics",
    companyLogo:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=400&q=80",
    shortDescription:
      "บริษัทวิเคราะห์ข้อมูลและให้คำปรึกษาด้าน BI ช่วยองค์กรแปลงข้อมูลเป็นการตัดสินใจเชิงกลยุทธ์",
    fullDescription:
      "Insight Analytics ให้บริการวิเคราะห์ข้อมูล, สร้าง dashboard และช่วยทีมธุรกิจตีความข้อมูลเพื่อปรับปรุงกระบวนการ\n\n- เครื่องมือ: SQL, Python, Looker/Power BI\n- โครงการ: วิเคราะห์ลูกค้า, การคาดการณ์ยอดขาย\n\nเหมาะสำหรับผู้ที่ชอบทำงานกับข้อมูลและการสื่อสารผลลัพธ์ให้กับผู้บริหาร",
    officeLocation: "8 อาคารชาญอิสสระ ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ 10110",
    companyType: ["วิเคราะห์ข้อมูล", "ที่ปรึกษา"],
    websiteUrl: "https://insight-analytics.example.com",
    socialMediaLinks: {} as any,
    hrContact: {
      name: "นางสาว ปารินทร์ พูนทรัพย์",
      email: "careers@insight-analytics.example.com",
      phone: "+66-2-345-6789",
    } as any,
    promoMaterials: ["/companies/comp-003/promo-1.png"],
    hiringStatus: false,
  },
  {
    companyId: "comp-004",
    companyName: "Creative Studio Co.",
    companyLogo:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=400&q=80",
    shortDescription:
      "สตูดิโอออกแบบ UX/UI และการสื่อสารภาพ มุ่งเน้นการสร้างผลงานที่มีเอกลักษณ์และประสบการณ์ผู้ใช้ที่ดีที่สุด",
    fullDescription:
      "Creative Studio เป็นทีมออกแบบที่รับงานออกแบบ UX/UI, branding และ prototype\n\n- กระบวนการออกแบบเน้นการวิจัยผู้ใช้และทดสอบต้นแบบ\n- ให้โอกาสนักศึกษาฝึกงานและผู้เริ่มต้นในสายออกแบบ",
    officeLocation: "ชั้น 4 อาคารสาทรธานี เขตสาทร กรุงเทพมหานคร 10120",
    companyType: ["ออกแบบ", "UX/UI"],
    websiteUrl: "https://creative-studio.example.com",
    socialMediaLinks: {} as any,
    hrContact: {
      name: "คุณ ธีระ เกษม",
      email: "hr@creative-studio.example.com",
      phone: "+66-2-456-7890",
    } as any,
    promoMaterials: ["/companies/comp-004/promo-1.png"],
    hiringStatus: true,
  },
  {
    companyId: "comp-005",
    companyName: "MarketLead Agency",
    companyLogo:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80",
    shortDescription:
      "เอเจนซี่การตลาดดิจิทัลที่ช่วยลูกค้าออกแบบแคมเปญและวัดผล KPI ด้วยเครื่องมือโฆษณาออนไลน์และการวิเคราะห์",
    fullDescription:
      "MarketLead มีทีมผู้เชี่ยวชาญด้านการตลาดดิจิทัล, โฆษณา PPC และการวัดผล KPI\n\n- บริการ: วางกลยุทธ์แคมเปญ, วิเคราะห์ผล และเพิ่มประสิทธิภาพโฆษณา\n- เหมาะสำหรับผู้ที่มีความคิดสร้างสรรค์และสนใจการตลาดเชิงตัวเลข",
    officeLocation: "ซอยอโศก ถนนสุขุมวิท เขตวัฒนา กรุงเทพมหานคร 10110",
    companyType: ["การตลาด", "ดิจิทัลมาร์เก็ตติ้ง"],
    websiteUrl: "https://marketlead.example.com",
    socialMediaLinks: {} as any,
    hrContact: {
      name: "น.ส. จินตนา วิริยะ",
      email: "jobs@marketlead.example.com",
      phone: "+66-2-567-8901",
    } as any,
    promoMaterials: ["/companies/comp-005/promo-1.png"],
    hiringStatus: true,
  },
];

export default async function JobsPage() {
  const jobs = await fetchJobs();

  return (
    <div className="flex flex-col gap-4">
      <div className="h-9 w-full bg-gray-200"></div>
      <JobsListClient initialJobs={dummyJobs} initialCompanies={dummyCompanies} />
    </div>
  );
}
