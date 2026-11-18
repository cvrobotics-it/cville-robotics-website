import { NextResponse } from "next/server";
import { getTeamEvents, getTeamEventsForYear, TEAM_KEY } from "@/lib/tba-api";
import { teamEventsParametersSchema } from "@/lib/request-parameters";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parameters = teamEventsParametersSchema.safeParse({
    team: searchParams.get("team") ?? TEAM_KEY,
    year: searchParams.get("year") ?? undefined,
  });
  if (!parameters.success)
    return NextResponse.json(
      { error: "Invalid team or season year" },
      { status: 400 },
    );
  const { team: teamKey, year } = parameters.data;

  try {
    const events = year
      ? await getTeamEventsForYear(teamKey, year)
      : await getTeamEvents(teamKey);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching team events:", error);
    return NextResponse.json(
      { error: "Failed to fetch team events" },
      { status: 500 },
    );
  }
}
