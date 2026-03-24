import { NextResponse } from "next/server";

const STATBOTICS_API_BASE = "https://api.statbotics.io/v3";

async function fetchStatbotics(endpoint: string) {
  const response = await fetch(`${STATBOTICS_API_BASE}${endpoint}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Statbotics API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team") || "5243";

  try {
    const data = await fetchStatbotics(`/team/${team}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Statbotics team data:", error);
    return NextResponse.json(
      { error: "Failed to fetch team data" },
      { status: 500 }
    );
  }
}
