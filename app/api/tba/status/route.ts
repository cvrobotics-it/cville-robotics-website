import { NextResponse } from "next/server";
import { getTeamEventStatus } from "@/lib/tba-api";

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
    const status = await getTeamEventStatus(teamKey, eventKey);
    return NextResponse.json(status);
  } catch (error) {
    console.error("Error fetching team status:", error);
    return NextResponse.json(
      { error: "Failed to fetch team status" },
      { status: 500 }
    );
  }
}
