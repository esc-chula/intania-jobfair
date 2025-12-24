import { useState, useMemo, useEffect } from "react";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import { Job, Company, EligibleStudentYear } from "@/types/schema";
import { flattenJobs, SearchableJob, extractUniqueMajors } from "@/lib/search-engine/transformer";

export interface SearchFilters {
  query: string;
  selectedMajors: string[]; // ["Computer Engineering"]
  selectedYears: string[]; // ["Bachelor's Senior", "Year 3"] - keys from schema
  selectedTypes: string[]; // ["Internship", "Full Time"]
  selectedFields: string[]; // ["Manufacturing", "Software"]
}

const FUSE_OPTIONS = {
  includeScore: true,
  threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything
  keys: [
    { name: "jobTitle", weight: 0.3 },
    { name: "_searchable_booth_codes", weight: 0.2 },
    { name: "_searchable_company_name_en", weight: 0.3 },
    { name: "_searchable_company_name_th", weight: 0.2 },
    { name: "field_of_work", weight: 0.1 },
  ],
};

export function useSearchEngine(jobs: Job[], companies: Company[]) {
  // 1. Data Transformation (Memoized)
  const searchableJobs = useMemo(() => flattenJobs(jobs, companies), [jobs, companies]);
  const uniqueMajors = useMemo(() => extractUniqueMajors(jobs), [jobs]);

  // 2. Fuse Index (Memoized "Index-Once")
  const fuse = useMemo(() => new Fuse(searchableJobs, FUSE_OPTIONS), [searchableJobs]);

  // 3. Filter State
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    selectedMajors: [],
    selectedYears: [],
    selectedTypes: [],
    selectedFields: [],
  });

  const [filteredJobs, setFilteredJobs] = useState<SearchableJob[]>(searchableJobs);
  const [isSearching, setIsSearching] = useState(false);

  // 4. Search Logic
  const handleSearch = useMemo(
    () =>
      debounce((currentFilters: SearchFilters) => {
        setIsSearching(true);
        let results = searchableJobs;

        // Step A: Fuzzy Search
        if (currentFilters.query.trim()) {
           const fuseResults = fuse.search(currentFilters.query);
           results = fuseResults.map((res) => res.item);
        }

        // Step B: Boolean Filters
        results = results.filter((job: SearchableJob) => {
          // Major Filter (OR logic: if job has ANY of selected majors)
          // Assumption: If filters.majors is empty, show all.
          if (currentFilters.selectedMajors.length > 0) {
             const hasMajor = currentFilters.selectedMajors.some(m => 
               job.major?.[m] // Check if job requires this major (is true)
             );
             if (!hasMajor) return false;
          }

          // Year Filter (OR logic)
          if (currentFilters.selectedYears.length > 0) {
            const hasYear = currentFilters.selectedYears.some(y => 
              job.eligibleStudentYear?.[y as keyof EligibleStudentYear]
            );
            if (!hasYear) return false;
          }

          // Type Filter
          if (currentFilters.selectedTypes.length > 0) {
             if (!currentFilters.selectedTypes.includes(job.positionType)) return false;
          }

          // Field Filter
          if (currentFilters.selectedFields.length > 0) {
             if (!currentFilters.selectedFields.includes(job.field_of_work)) return false;
          }

          return true;
        });

        setFilteredJobs(results);
        setIsSearching(false);
      }, 100), // 100ms debounce
    [fuse, searchableJobs]
  );

  // Trigger search when filters change
  useEffect(() => {
    handleSearch(filters);
    return () => handleSearch.cancel();
  }, [filters, handleSearch]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev: SearchFilters) => ({ ...prev, [key]: value }));
  };

  return {
    filteredJobs,
    uniqueMajors,
    filters,
    updateFilter,
    isSearching,
    totalResults: filteredJobs.length,
  };
}
