import { fetchJobs, fetchCompanies } from "@/lib/data";
import JobsListClient from "@/components/jobs/job-list";

export default async function JobsPage() {
  try {
    const [jobs, companies] = await Promise.all([
      fetchJobs(),
      fetchCompanies()
    ]);

    return (
      <div className="px-4 py-6">
        <div className="flex flex-col gap-4">
          <JobsListClient initialJobs={jobs} initialCompanies={companies} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load jobs data:", error);
    return (
      <div className="px-4 py-6">
        <div className="flex flex-col gap-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">ไม่สามารถโหลดข้อมูลงานได้ในขณะนี้</p>
          </div>
        </div>
      </div>
    );
  }
}
