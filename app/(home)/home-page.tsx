
import Hero from "./sections/hero";
import Search from "./sections/search";
import JobResultsWrapper from "./sections/job-results-wrapper";
import FeaturedCompanies from "./sections/featured-companies";
import FeaturedJobs from "./sections/featured-jobs";
import { SearchProvider } from "./contexts/search-context";

export default async function HomePage() {
  // NOTE: ยังไม่ fetch จริงใน branch นี้ — จะไปทำใน branch ถัดไป
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-4 py-4 md:py-6">
        <SearchProvider>
          <div className="mt-4 md:mt-6">
            <Search />
          </div>

          <div className="mt-6 md:mt-8 space-y-8 md:space-y-10">
            <JobResultsWrapper />
            <FeaturedCompanies />
            <FeaturedJobs />
          </div>
        </SearchProvider>
      </div>
    </>
  );
}


