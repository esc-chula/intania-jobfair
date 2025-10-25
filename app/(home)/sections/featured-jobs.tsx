import Section from "@/components/common/section";
import SkeletonCard from "@/components/common/skeleton-card";

export default function FeaturedJobs() {
  return (
    <Section
      title="ตำแหน่งงานที่น่าสนใจ"
      actionLabel="ดูทั้งหมด"
      actionHref="/jobs"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </Section>
  );
}