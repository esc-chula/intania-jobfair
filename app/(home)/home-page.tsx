
import Hero from "./sections/hero";
import Search from "./sections/search";
import JobResults from "./sections/job-results";
import FeaturedCompanies from "./sections/featured-companies";
import FeaturedJobs from "./sections/featured-jobs";
import { SearchProvider } from "./contexts/search-context";

export default async function HomePage() {
  // NOTE: ยังไม่ fetch จริงใน branch นี้ — จะไปทำใน branch ถัดไป
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <SearchProvider>
          <div className="mt-6">
            <Search />
          </div>

          <div className="mt-10 space-y-12">
            <JobResults />
            <FeaturedCompanies />
            <FeaturedJobs />
          </div>
        </SearchProvider>
      </div>
    </>
  );
}


