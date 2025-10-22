// import Link from "next/link";
// import { fetchCompanies, fetchJobs } from "@/lib/data";

// export default async function Home() {
//   const [companies, jobs] = await Promise.all([fetchCompanies(), fetchJobs()]);
//   return (
//     <div className="space-y-8">
//       <section className="text-center py-10">
//         <h1 className="text-3xl font-semibold">Intania Job Fair 2025</h1>
//         <p className="text-muted-foreground mt-2">
//           ค้นหาบริษัทและตำแหน่งฝึกงาน/งาน ที่เหมาะกับคุณ
//         </p>
//         <div className="mt-6 flex items-center justify-center gap-3">
//           <Link
//             href="/companies"
//             className="rounded-md px-4 py-2 bg-foreground text-background text-sm"
//           >
//             ดูบริษัททั้งหมด ({companies.length})
//           </Link>
//           <Link href="/jobs" className="rounded-md px-4 py-2 border text-sm">
//             ดูตำแหน่งงาน ({jobs.length})
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

export const revalidate = 86400; // revalidate daily per README

import HomePage from "./(home)/home-page";

export default function Page() {
  return <HomePage />;
}
