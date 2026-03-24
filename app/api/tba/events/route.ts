import { NextResponse } from "next/server";
import { getTeamEvents, getTeamEventsForYear, TEAM_KEY } from "@/lib/tba-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const teamKey = searchParams.get("team") || TEAM_KEY;
  const year = yearParam ? parseInt(yearParam, 10) : undefined;

  try {
    const events = year ? await getTeamEventsForYear(teamKey, year) : await getTeamEvents(teamKey);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching team events:", error);
    return NextResponse.json(
      { error: "Failed to fetch team events" },
      { status: 500 }
    );
  }
}
