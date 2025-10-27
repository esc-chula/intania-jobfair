import { NextResponse } from "next/server";
import { fetchCompanies } from "@/lib/data";

export async function GET() {
  try {
    const data = await fetchCompanies();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, must-revalidate" },
    });
  } catch (e) {
    console.error("[/api/data/companies] error", e);
    return NextResponse.json([], { status: 200, headers: { "Cache-Control": "no-store" } });
  }
}
