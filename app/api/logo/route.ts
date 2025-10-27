import { NextResponse } from "next/server";
import { resolveLocalLogo } from "@/lib/assets";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key") ?? undefined;
    const url = resolveLocalLogo(key);
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ url: "/placeholder-company.svg" }, { status: 200 });
  }
}
