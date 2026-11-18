import { NextResponse } from "next/server";
import { seasonDetailsParametersSchema } from "@/lib/request-parameters";

import {
  ALL_YEARS,
  getTeamEventStatusesForYear,
  getTeamMatchesForYear,
  TEAM_KEY,
  type TBAMatch,
  type TBAStatus,
} from "@/lib/tba-api";

type EventDetails = {
  matches: TBAMatch[];
  tbaStatus: TBAStatus | null;
  statboticsStats: null;
  fetchError: boolean;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearsParam = searchParams.get("years");
  const parameters = seasonDetailsParametersSchema.safeParse({
    team: searchParams.get("team") ?? TEAM_KEY,
    years:
      yearsParam === null
        ? ALL_YEARS.map(String)
        : yearsParam.split(",").map((year) => year.trim()),
  });
  if (!parameters.success)
    return NextResponse.json(
      { error: "Provide a valid team and up to 40 season years" },
      { status: 400 },
    );
  const { team: teamKey, years } = parameters.data;

  const detailsByEvent: Record<string, EventDetails> = {};

  const yearResults = await Promise.allSettled(
    years.map(async (year) => {
      const [matchesResult, statusesResult] = await Promise.allSettled([
        getTeamMatchesForYear(teamKey, year),
        getTeamEventStatusesForYear(teamKey, year),
      ]);

      const matches =
        matchesResult.status === "fulfilled" ? matchesResult.value : [];
      const statuses =
        statusesResult.status === "fulfilled" ? statusesResult.value : {};

      for (const match of matches) {
        detailsByEvent[match.event_key] ||= {
          matches: [],
          tbaStatus: statuses[match.event_key] || null,
          statboticsStats: null,
          fetchError: false,
        };
        detailsByEvent[match.event_key].matches.push(match);
      }

      for (const [eventKey, status] of Object.entries(statuses)) {
        detailsByEvent[eventKey] ||= {
          matches: [],
          tbaStatus: status,
          statboticsStats: null,
          fetchError: false,
        };
        detailsByEvent[eventKey].tbaStatus = status;
      }

      return (
        matchesResult.status === "rejected" &&
        statusesResult.status === "rejected"
      );
    }),
  );

  const fetchError = yearResults.every(
    (result) => result.status === "rejected" || result.value,
  );

  return NextResponse.json({ events: detailsByEvent, fetchError });
}
