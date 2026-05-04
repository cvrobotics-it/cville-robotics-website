// Shared TBA API utilities for both API routes and server components

const TBA_API_BASE = "https://www.thebluealliance.com/api/v3";
const TBA_API_KEY = process.env.TBA_API_KEY || "";
const EVENT_CACHE_SECONDS = 3600;
const STATUS_CACHE_SECONDS = 1800;
const TBA_TIMEOUT_MS = 5000;

// Configuration from environment variables
const TEAM_NUMBER_RAW = process.env.NEXT_PUBLIC_TEAM_NUMBER || "5243";
const ROBOTICS_START_YEAR = 2014;
const CURRENT_SEASON_YEAR = new Date().getFullYear();
const DEFAULT_COMPETITION_YEARS = Array.from(
  { length: CURRENT_SEASON_YEAR - ROBOTICS_START_YEAR + 1 },
  (_, index) => CURRENT_SEASON_YEAR - index
);
const CONFIGURED_COMPETITION_YEARS = (process.env.NEXT_PUBLIC_COMPETITION_YEARS || "")
  .split(",")
  .map((y) => parseInt(y.trim(), 10))
  .filter((year) => !Number.isNaN(year));
const COMPETITION_YEARS = Array.from(new Set([...CONFIGURED_COMPETITION_YEARS, ...DEFAULT_COMPETITION_YEARS])).sort(
  (a, b) => b - a
);

export const TEAM_NUMBER = TEAM_NUMBER_RAW;
export const TEAM_KEY = `frc${TEAM_NUMBER}`;
export const PRIMARY_YEAR = COMPETITION_YEARS[0] || 2026;
export const ALL_YEARS = COMPETITION_YEARS.length > 0 ? COMPETITION_YEARS : [PRIMARY_YEAR];

export type TBAEvent = {
  key: string;
  name: string;
  event_code: string;
  event_type: number;
  start_date: string;
  end_date: string;
  year: number;
  city: string;
  state_prov: string;
  country: string;
  website?: string;
};

export type TBAMatch = {
  key: string;
  event_key: string;
  comp_level: string;
  set_number: number;
  match_number: number;
  alliances: {
    red: {
      score: number;
      team_keys: string[];
    };
    blue: {
      score: number;
      team_keys: string[];
    };
  };
  winning_alliance: string | null;
  actual_time?: number;
  videos?: Array<{
    type: string;
    key: string;
  }>;
};

export type TBAStatus = {
  qual?: {
    ranking?: {
      rank: number;
      matches_played: number;
    };
  };
  overall_status_str?: string;
};

async function fetchTBA(endpoint: string, revalidate = EVENT_CACHE_SECONDS) {
  const headers: HeadersInit = {
    Accept: "application/json",
  };
  
  if (TBA_API_KEY) {
    headers["X-TBA-Auth-Key"] = TBA_API_KEY;
  }

  const response = await fetch(`${TBA_API_BASE}${endpoint}`, {
    headers,
    next: { revalidate },
    signal: AbortSignal.timeout(TBA_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`TBA API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get all team events for the configured competition years
 */
export async function getTeamEvents(teamKey = TEAM_KEY): Promise<TBAEvent[]> {
  // Fetch events for all configured years in parallel
  const eventsPerYear = await Promise.all(
    ALL_YEARS.map((year) => fetchTBA(`/team/${teamKey}/events/${year}`).catch(() => []))
  );
  
  // Flatten and return all events
  return eventsPerYear.flat();
}

/**
 * Get events for a specific year
 */
export async function getTeamEventsForYear(teamKey = TEAM_KEY, year: number): Promise<TBAEvent[]> {
  return fetchTBA(`/team/${teamKey}/events/${year}`);
}

export async function getTeamEventMatches(teamKey = TEAM_KEY, eventKey: string): Promise<TBAMatch[]> {
  return fetchTBA(`/team/${teamKey}/event/${eventKey}/matches`);
}

export async function getTeamMatchesForYear(teamKey = TEAM_KEY, year: number): Promise<TBAMatch[]> {
  return fetchTBA(`/team/${teamKey}/matches/${year}`);
}

export async function getTeamEventStatus(teamKey = TEAM_KEY, eventKey: string): Promise<TBAStatus> {
  return fetchTBA(`/team/${teamKey}/event/${eventKey}/status`, STATUS_CACHE_SECONDS);
}

export async function getTeamEventStatusesForYear(teamKey = TEAM_KEY, year: number): Promise<Record<string, TBAStatus>> {
  return fetchTBA(`/team/${teamKey}/events/${year}/statuses`, STATUS_CACHE_SECONDS);
}

export function formatCompLevel(compLevel: string): string {
  const levels: Record<string, string> = {
    qm: "Qualification",
    ef: "Eighth Finals",
    qf: "Quarter Finals",
    sf: "Semi Finals",
    f: "Finals",
  };
  return levels[compLevel] || compLevel.toUpperCase();
}

export function didTeamWin(match: TBAMatch, teamKey = TEAM_KEY): boolean | null {
  if (!match.winning_alliance) return null;
  const isRed = match.alliances.red.team_keys.includes(teamKey);
  return (isRed && match.winning_alliance === "red") || (!isRed && match.winning_alliance === "blue");
}

export function getCurrentEvent(events: TBAEvent[]): TBAEvent | null {
  const now = new Date();
  const ongoing = events.find((e) => {
    const start = new Date(e.start_date);
    const end = new Date(e.end_date);
    return start <= now && now <= end;
  });
  
  if (ongoing) return ongoing;
  
  // If no ongoing event, return most recent past event
  const past = events
    .filter((e) => new Date(e.end_date) < now)
    .sort((a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime());
  
  return past[0] || null;
}
