export type SocialMediaLinks = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
};

export type Company = {
  "": number; // Row no. from sheet
  companyName_th: string;
  companyName_en: string;
  companyLogo: string;
  shortDescription: string;
  fullDescription: string;
  officeLocation_district: string;
  officeLocation_province: string; 
  officeLocation_full: string;
  businessFocus: string;
  websiteUrl?: string;
  socialMediaLinks?: SocialMediaLinks | Record<string, never>;
  hrContactName: string;
  hrContactEmail: string;
  hrContactPhone: string;
  promoMaterials?: string;
};

export type PositionType = "Internship" | "Part-time" | "Full-time";

export type EligibleStudentYear = {
  "Bachelor's Freshmen": boolean;
  "Bachelor's Sophmore": boolean;
  "Bachelor's Junior": boolean;
  "Bachelor's Senior": boolean;
  "Master's": boolean;
  "Doctorate": boolean;
};

export type MajorEligibility = Record<string, boolean>;

export type Job = {
  jobId: number; 
  companyId: number; // (foreign key)
  jobTitle: string; 
  jobDescription: string;
  positionType: PositionType; 
  openingsCount?: string; 
  eligibleStudentYear: EligibleStudentYear; 
  application_start?: string; 
  application_end?: string;
  always_applicable: boolean;
  application_link: string;
  field_of_work: string;
  major: MajorEligibility;
};
