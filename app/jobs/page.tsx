import { fetchJobs } from "@/lib/data";

export default async function JobsPage() {
  const jobs = await fetchJobs();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">ตำแหน่งงาน</h1>
      <p className="text-sm text-muted-foreground">
        รายการ {jobs.length} ตำแหน่ง
      </p>
    </div>
  );
}
