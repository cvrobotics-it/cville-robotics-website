import { NextResponse } from "next/server";
import { getTeamStats } from "@/lib/statbotics-api";
import { TEAM_NUMBER } from "@/lib/tba-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const team = parseInt(searchParams.get("team") || TEAM_NUMBER);

  try {
    const stats = await getTeamStats(team);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching team stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch team stats" },
      { status: 500 }
    );
  }
}
