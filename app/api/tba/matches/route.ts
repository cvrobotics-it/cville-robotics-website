import { NextResponse } from "next/server";
import { getTeamEventMatches } from "@/lib/tba-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventKey = searchParams.get("eventKey");
  const teamKey = searchParams.get("team") || "frc5243";

  if (!eventKey) {
    return NextResponse.json(
      { error: "eventKey parameter is required" },
      { status: 400 }
    );
  }

  try {
    const matches = await getTeamEventMatches(teamKey, eventKey);
    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error fetching team matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch team matches" },
      { status: 500 }
    );
  }
}
