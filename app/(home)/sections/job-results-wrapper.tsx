"use client";
import { useState, useEffect } from "react";
import ClientJobResults from "./client-job-results";

export default function JobResultsWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent hydration mismatch by not rendering on server
  if (!isClient) {
    return null;
  }

  return <ClientJobResults />;
}
