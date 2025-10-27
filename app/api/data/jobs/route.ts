import { NextResponse } from "next/server";
import { fetchJobs } from "@/lib/data";

export async function GET() {
  try {
    const data = await fetchJobs();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, must-revalidate" },
    });
  } catch (e) {
    console.error("[/api/data/jobs] error", e);
    return NextResponse.json([], { status: 200, headers: { "Cache-Control": "no-store" } });
  }
}
