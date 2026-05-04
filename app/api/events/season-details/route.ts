import { NextResponse } from "next/server";

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
  const teamKey = searchParams.get("team") || TEAM_KEY;
  const yearsParam = searchParams.get("years");
  const years = (yearsParam ? yearsParam.split(",") : ALL_YEARS.map(String))
    .map((year) => Number.parseInt(year.trim(), 10))
    .filter((year) => !Number.isNaN(year));

  const detailsByEvent: Record<string, EventDetails> = {};

  const yearResults = await Promise.allSettled(
    years.map(async (year) => {
      const [matchesResult, statusesResult] = await Promise.allSettled([
        getTeamMatchesForYear(teamKey, year),
        getTeamEventStatusesForYear(teamKey, year),
      ]);

      const matches = matchesResult.status === "fulfilled" ? matchesResult.value : [];
      const statuses = statusesResult.status === "fulfilled" ? statusesResult.value : {};

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

      return matchesResult.status === "rejected" && statusesResult.status === "rejected";
    })
  );

  const fetchError = yearResults.every((result) => result.status === "fulfilled" && result.value);

  return NextResponse.json({ events: detailsByEvent, fetchError });
}
