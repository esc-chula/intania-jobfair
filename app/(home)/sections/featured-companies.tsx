import Section from "@/components/common/section";
import SkeletonCard from "@/components/common/skeleton-card";

export default function FeaturedCompanies() {
  return (
    <Section
      title="บริษัทที่น่าสนใจ"
      actionLabel="ดูทั้งหมด"
      actionHref="/companies"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </Section>
  );
}