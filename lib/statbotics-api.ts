// Statbotics API Configuration

const STATBOTICS_API_BASE = "https://api.statbotics.io/v3";
const STATBOTICS_API_KEY = process.env.STATBOTICS_API_KEY || "";
const STATBOTICS_CACHE_SECONDS = 3600;

type StatboticsEPA = {
  total: number;
  auto: number;
  teleop: number;
  endgame: number;
  offensive: number;
  defensive: number;
};

export type StatboticsTeamYear = {
  team: number;
  year: number;
  EPA?: StatboticsEPA;
  wins: number;
  losses: number;
  ties: number;
  winrate: number;
  num_teams: number;
  district_points: number;
  status: string;
  qual_avg: number;
  playoff_avg: number;
};

export type StatboticsTeam = {
  team: number;
  name: string;
  active_years: number[];
  state: string;
  country: string;
  district: string;
  rookie_year: number;
  overall_epa: number;
  current_epa: number;
};

export type StatboticsTeamEvent = {
  team: number;
  event: string;
  year: number;
  EPA?: StatboticsEPA;
  wins: number;
  losses: number;
  ties: number;
  winrate: number;
  EPA_change: number;
  num_matches: number;
  expected_wins: number;
};

function isStatboticsEPA(value: unknown): value is StatboticsEPA {
  if (!value || typeof value !== "object") return false;

  const epa = value as Record<string, unknown>;

  return ["total", "auto", "teleop", "endgame", "offensive", "defensive"].every(
    (key) => typeof epa[key] === "number"
  );
}

function normalizeTeamYear(data: unknown): StatboticsTeamYear | null {
  if (!data || typeof data !== "object") return null;

  const value = data as Partial<StatboticsTeamYear> & { EPA?: unknown };

  if (typeof value.team !== "number" || typeof value.year !== "number") return null;

  return {
    team: value.team,
    year: value.year,
    EPA: isStatboticsEPA(value.EPA) ? value.EPA : undefined,
    wins: typeof value.wins === "number" ? value.wins : 0,
    losses: typeof value.losses === "number" ? value.losses : 0,
    ties: typeof value.ties === "number" ? value.ties : 0,
    winrate: typeof value.winrate === "number" ? value.winrate : 0,
    num_teams: typeof value.num_teams === "number" ? value.num_teams : 0,
    district_points: typeof value.district_points === "number" ? value.district_points : 0,
    status: typeof value.status === "string" ? value.status : "",
    qual_avg: typeof value.qual_avg === "number" ? value.qual_avg : 0,
    playoff_avg: typeof value.playoff_avg === "number" ? value.playoff_avg : 0,
  };
}

function normalizeTeamEvent(data: unknown): StatboticsTeamEvent | null {
  if (!data || typeof data !== "object") return null;

  const value = data as Partial<StatboticsTeamEvent> & { EPA?: unknown };

  if (typeof value.team !== "number" || typeof value.event !== "string") return null;

  return {
    team: value.team,
    event: value.event,
    year: typeof value.year === "number" ? value.year : 0,
    EPA: isStatboticsEPA(value.EPA) ? value.EPA : undefined,
    wins: typeof value.wins === "number" ? value.wins : 0,
    losses: typeof value.losses === "number" ? value.losses : 0,
    ties: typeof value.ties === "number" ? value.ties : 0,
    winrate: typeof value.winrate === "number" ? value.winrate : 0,
    EPA_change: typeof value.EPA_change === "number" ? value.EPA_change : 0,
    num_matches: typeof value.num_matches === "number" ? value.num_matches : 0,
    expected_wins: typeof value.expected_wins === "number" ? value.expected_wins : 0,
  };
}

async function fetchStatbotics(endpoint: string, revalidate = STATBOTICS_CACHE_SECONDS) {
  const headers: HeadersInit = {
    Accept: "application/json",
  };
  
  if (STATBOTICS_API_KEY) {
    headers["Authorization"] = `Bearer ${STATBOTICS_API_KEY}`;
  }

  const response = await fetch(`${STATBOTICS_API_BASE}${endpoint}`, {
    headers,
    next: { revalidate },
  });

  if (!response.ok) return null;

  return response.json();
}

export async function getTeamYearStats(team: number, year: number): Promise<StatboticsTeamYear | null> {
  const data = await fetchStatbotics(`/team_year/${team}/${year}`);
  return normalizeTeamYear(data);
}

export async function getTeamStats(team: number): Promise<StatboticsTeam | null> {
  try {
    const data = await fetchStatbotics(`/team/${team}`);
    return data as StatboticsTeam | null;
  } catch (error) {
    console.error(`Error fetching team stats:`, error);
    return null;
  }
}

export async function getTeamEventStats(team: number, eventKey: string): Promise<StatboticsTeamEvent | null> {
  const data = await fetchStatbotics(`/team_event/${team}/${eventKey}`);
  return normalizeTeamEvent(data);
}

export function getEPAColor(epa: number): string {
  if (epa >= 85) return "text-success";
  if (epa >= 70) return "text-primary";
  if (epa >= 50) return "text-warning";
  return "text-error";
}

export function getWinRateColor(winrate: number): string {
  if (winrate >= 0.7) return "text-success";
  if (winrate >= 0.5) return "text-primary";
  if (winrate >= 0.3) return "text-warning";
  return "text-error";
}

export function formatEPA(epa: number): string {
  return epa.toFixed(1);
}

export function formatWinRate(winrate: number): string {
  return `${(winrate * 100).toFixed(0)}%`;
}
