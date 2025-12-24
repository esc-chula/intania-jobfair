// Thai-English transliteration map
const transliterationMap: Record<string, string> = {
  // Cities
  "krung thep": "กรุงเทพ",
  bangkok: "กรุงเทพ",
  "chiang mai": "เชียงใหม่",
  chiangmai: "เชียงใหม่",
  phuket: "ภูเก็ต",
  pattaya: "พัทยา",
  "khon kaen": "ขอนแก่น",
  "nakhon ratchasima": "นครราชสีมา",
  korat: "นครราชสีมา",
  "udon thani": "อุดรธานี",
  rayong: "ระยอง",
  chonburi: "ชลบุรี",

  // Districts/Areas (Bangkok)
  sathorn: "สาทร",
  silom: "สีลม",
  sukhumvit: "สุขุมวิท",
  asoke: "อโศก",
  ratchada: "รัชดา",
  "lat phrao": "ลาดพร้าว",
  "bang na": "บางนา",
  samyan: "สามย่าน",

  // Common terms
  booth: "บูธ",
  company: "บริษัท",
};

// Reverse map (Thai to English)
const reverseMap: Record<string, string> = {};
Object.entries(transliterationMap).forEach(([eng, thai]) => {
  reverseMap[thai] = eng;
});

/**
 * Transliterate romanized Thai to Thai script and vice versa
 * Returns array of possible matches including original
 */
export function transliterate(text: string): string[] {
  const normalized = text.toLowerCase().trim();
  const results = new Set<string>([text, normalized]);

  // Try direct transliteration
  if (transliterationMap[normalized]) {
    results.add(transliterationMap[normalized]);
  }

  // Try reverse (Thai to English)
  if (reverseMap[normalized]) {
    results.add(reverseMap[normalized]);
  }

  // Try partial matches for multi-word queries
  const words = normalized.split(/\s+/);
  if (words.length > 1) {
    words.forEach((word, index) => {
      if (transliterationMap[word]) {
        const transliterated = [...words];
        transliterated[index] = transliterationMap[word];
        results.add(transliterated.join(" "));
      }
    });
  }

  return Array.from(results);
}

/**
 * Check if text contains any romanized Thai that can be transliterated
 */
export function hasTransliterableText(text: string): boolean {
  const normalized = text.toLowerCase();
  return Object.keys(transliterationMap).some((key) =>
    normalized.includes(key),
  );
}
