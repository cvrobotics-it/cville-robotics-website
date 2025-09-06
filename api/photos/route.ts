import { NextResponse } from "next/server";
import { getManifest } from "@/lib/gallery/getManifest";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = await getManifest();
  const headers =
    process.env.NODE_ENV === "production"
      ? { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" }
      : { "Cache-Control": "no-store" };
  return NextResponse.json(data, { headers });
}
