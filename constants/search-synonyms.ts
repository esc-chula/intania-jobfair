// Search synonyms for better matching
export const searchSynonyms: Record<string, string[]> = {
  // Programming & Development
  programmer: ["developer", "coder", "โปรแกรมเมอร์", "นักพัฒนา", "dev"],
  developer: ["programmer", "coder", "โปรแกรมเมอร์", "นักพัฒนา", "dev"],
  engineer: ["วิศวกร", "eng", "engr"],
  
  // Job Types
  intern: ["ฝึกงาน", "trainee", "นักศึกษาฝึกงาน", "internship"],
  "full-time": ["full time", "fulltime", "เต็มเวลา", "งานประจำ"],
  "part-time": ["part time", "parttime", "พาร์ทไทม์", "งานพิเศษ"],
  
  // Locations
  bangkok: ["กรุงเทพ", "กรุงเทพมหานคร", "bkk", "krung thep"],
  "กรุงเทพ": ["bangkok", "กรุงเทพมหานคร", "bkk", "krung thep"],
  "chiang mai": ["เชียงใหม่", "chiangmai", "เชียงใหม่"],
  "เชียงใหม่": ["chiang mai", "chiangmai"],
  
  // Business/Work
  company: ["บริษัท", "corp", "corporation", "องค์กร"],
  บริษัท: ["company", "corp", "corporation", "องค์กร"],
  manager: ["ผู้จัดการ", "mgr", "หัวหน้า"],
  analyst: ["นักวิเคราะห์", "วิเคราะห์"],
  
  // Tech terms
  software: ["ซอฟต์แวร์", "โปรแกรม", "sw"],
  data: ["ข้อมูล", "ดาต้า", "database", "ฐานข้อมูล"],
  ai: ["artificial intelligence", "ปัญญาประดิษฐ์", "เอไอ"],
  
  // Industries
  "marketing": ["การตลาด", "มาร์เก็ตติ้ง", "mkt"],
  "sales": ["ขาย", "การขาย", "นักขาย"],
  "finance": ["การเงิน", "บัญชี", "accounting"],

  // Event locations
  "booth": ["บูธ", "ซุ้ม", "stall", "stand"],
  "บูธ": ["booth", "ซุ้ม", "stall", "stand"],
  "hall": ["ฮอลล์", "โถง", "อาคาร"],
  "zone": ["โซน", "พื้นที่"],
};

// Get all synonyms for a term (including the term itself)
export function getSynonyms(term: string): string[] {
  const normalized = term.toLowerCase().trim();
  const synonyms = new Set<string>([normalized]);
  
  // Check if term is a key
  if (searchSynonyms[normalized]) {
    searchSynonyms[normalized].forEach(syn => synonyms.add(syn.toLowerCase()));
  }
  
  // Check if term appears in any synonym list
  Object.entries(searchSynonyms).forEach(([key, values]) => {
    if (values.some(v => v.toLowerCase() === normalized)) {
      synonyms.add(key.toLowerCase());
      values.forEach(v => synonyms.add(v.toLowerCase()));
    }
  });
  
  return Array.from(synonyms);
}
