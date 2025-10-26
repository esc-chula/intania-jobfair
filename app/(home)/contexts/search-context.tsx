"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchActive: boolean;
  jobTypeFilter: string;
  setJobTypeFilter: (filter: string) => void;
  eligibleYearFilter: string;
  setEligibleYearFilter: (filter: string) => void;
  majorFilter: string;
  setMajorFilter: (filter: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [eligibleYearFilter, setEligibleYearFilter] = useState("");
  const [majorFilter, setMajorFilter] = useState("");
  
  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      isSearchActive,
      jobTypeFilter,
      setJobTypeFilter,
      eligibleYearFilter,
      setEligibleYearFilter,
      majorFilter,
      setMajorFilter,
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
