export type SocialMediaLinks = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
};

export type HrContact = {
  name: string;
  email: string;
  phone: string;
};

export type Company = {
  companyId: string; // unique id
  companyName: string;
  companyLogo: string; // path under public, e.g. /companies/{id}/logo.png
  shortDescription: string; // ~200 words max
  fullDescription: string; // rich text stored as markdown/plain for now
  officeLocation: string; // Thai address
  companyType: string[]; // tags (สายงาน)
  websiteUrl?: string;
  socialMediaLinks?: SocialMediaLinks;
  hrContact: HrContact;
  promoMaterials?: string[]; // image paths under public
  hiringStatus: boolean; // true if currently accepting applications
};

export type PositionType = "Internship" | "Part-time" | "Full-time";

export type Job = {
  jobId: string; // unique id
  companyId: string; // foreign key
  jobTitle: string;
  jobDescription: string; // rich text as markdown/plain for now
  positionType: PositionType;
  openingsCount?: number; // optional; if missing, display as "ไม่ระบุ"
  eligibleYear: string[]; // tags in Thai
  applicationStartDate: string; // ISO date
  applicationEndDate: string; // ISO date
  applicationLink: string; // URL
  jobType: string[]; // field of work tags in Thai
  majors: string[]; // tags in Thai
};

export type MajorsDictionary = string[];
export type JobTypesDictionary = string[];
