import Section from "../components/section";
import SkeletonCard from "../components/skeleton-card";
import EmptyState from "../components/empty-state";

export default function JobResults() {
  // branch นี้ยังไม่มี data — โชว์ skeleton 3 ใบเป็น placeholder
  return (
    <Section title="ผลการค้นหา" description="ตำแหน่งงานล่าสุด">
      <div className="grid gap-4 md:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* ตัวอย่าง empty UI (จะเปิดใช้ในภายหลัง) */}
      <div className="hidden">
        <EmptyState title="ไม่พบผลการค้นหา" hint="ลองใช้คำค้นหาอื่น หรือเลือกตัวกรองใหม่" />
      </div>
    </Section>
  );
}