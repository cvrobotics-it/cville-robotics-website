import { NextResponse } from "next/server";
import { getTeamYearStats, getTeamEventStats } from "@/lib/statbotics-api";
import { TEAM_NUMBER } from "@/lib/tba-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const eventKey = searchParams.get("eventKey");
  const team = parseInt(searchParams.get("team") || TEAM_NUMBER);

  try {
    if (eventKey) {
      // Get stats for a specific event
      const eventStats = await getTeamEventStats(team, eventKey);
      return NextResponse.json(eventStats);
    }
    
    if (year) {
      // Get stats for a specific year
      const yearStats = await getTeamYearStats(team, parseInt(year));
      return NextResponse.json(yearStats);
    }
    
    // Return error if no parameters provided
    return NextResponse.json(
      { error: "Either 'year' or 'eventKey' parameter is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching Statbotics data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Statbotics data" },
      { status: 500 }
    );
  }
}
