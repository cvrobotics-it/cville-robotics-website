import { NextResponse } from "next/server";
import { getTeamEventMatches, TEAM_KEY } from "@/lib/tba-api";
import { teamEventParametersSchema } from "@/lib/request-parameters";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parameters = teamEventParametersSchema.safeParse({
    team: searchParams.get("team") ?? TEAM_KEY,
    eventKey: searchParams.get("eventKey"),
  });
  if (!parameters.success)
    return NextResponse.json(
      { error: "A valid team and eventKey are required" },
      { status: 400 },
    );
  const { team: teamKey, eventKey } = parameters.data;

  try {
    const matches = await getTeamEventMatches(teamKey, eventKey);
    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error fetching team matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch team matches" },
      { status: 500 },
    );
  }
}
