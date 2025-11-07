import Section from "@/components/common/section";
import SkeletonCard from "@/components/common/skeleton-card";
import CompanyCardShort from "@/components/companies/company-card-short";
import { fetchCompanies, fetchJobs } from "@/lib/data";
import { pickFeaturedCompanies } from "../services/home.service";
import Link from "next/link";

export default async function FeaturedCompanies() {
  try {
    const [companies, jobs] = await Promise.all([
      fetchCompanies(),
      fetchJobs(),
    ]);

    const featuredCompanies = pickFeaturedCompanies(companies, 4);

    return (
      <Section
        title="บริษัทที่น่าสนใจ"
        actionLabel="ดูทั้งหมด"
        actionHref="/companies"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredCompanies.map((company) => {
            const jobCount = jobs.filter(job => job.companyId === company[""]).length;
            return (
              <Link
                key={company[""]}
                href={`/companies/${company[""]}`}
                className="w-full"
              >
                <CompanyCardShort
                  company={company}
                  jobCount={jobCount}
                />
              </Link>
            );
          })}
        </div>
      </Section>
    );
  } catch (error) {
    console.error("Failed to load featured companies:", error);
    return (
      <Section
        title="บริษัทที่น่าสนใจ"
        actionLabel="ดูทั้งหมด"
        actionHref="/companies"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </Section>
    );
  }
}