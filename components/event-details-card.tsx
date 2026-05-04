"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Radio,
  Target,
  TrendingUp,
  Trophy,
  Video,
} from "lucide-react";

import LazyVideoCard from "@/components/LazyVideoCard";
import type { StatboticsTeamEvent } from "@/lib/statbotics-api";
import type { TBAEvent, TBAMatch, TBAStatus } from "@/lib/tba-api";

const MAX_VIDEOS_PER_EVENT = 6;

export type EventDetailsResponse = {
  matches: TBAMatch[];
  tbaStatus: TBAStatus | null;
  statboticsStats: StatboticsTeamEvent | null;
  fetchError: boolean;
};

type SeasonDetailsResponse = {
  events: Record<string, EventDetailsResponse>;
  fetchError: boolean;
};

type EventDetailsCardProps = {
  event: TBAEvent;
  isPast: boolean;
  teamKey: string;
  initialDetails?: EventDetailsResponse | null;
};

const seasonDetailsCache = new Map<string, SeasonDetailsResponse>();
const seasonDetailsPromises = new Map<string, Promise<SeasonDetailsResponse>>();

function loadSeasonDetails(teamKey: string, year: number): Promise<SeasonDetailsResponse> {
  const cacheKey = `${teamKey}:${year}`;
  const cachedDetails = seasonDetailsCache.get(cacheKey);
  const pendingDetails = seasonDetailsPromises.get(cacheKey);

  if (cachedDetails) return Promise.resolve(cachedDetails);
  if (pendingDetails) return pendingDetails;

  const request = fetch(`/api/events/season-details?team=${encodeURIComponent(teamKey)}&years=${year}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load season details");
      return response.json() as Promise<SeasonDetailsResponse>;
    })
    .then((data) => {
      seasonDetailsCache.set(cacheKey, data);
      return data;
    })
    .finally(() => {
      seasonDetailsPromises.delete(cacheKey);
    });

  seasonDetailsPromises.set(cacheKey, request);
  return request;
}

function formatCompLevel(compLevel: string): string {
  const levels: Record<string, string> = {
    qm: "Qualification",
    ef: "Eighth Finals",
    qf: "Quarter Finals",
    sf: "Semi Finals",
    f: "Finals",
  };

  return levels[compLevel] || compLevel.toUpperCase();
}

function didTeamWin(match: TBAMatch, teamKey: string): boolean | null {
  if (!match.winning_alliance) return null;

  const isRed = match.alliances.red.team_keys.includes(teamKey);
  return (isRed && match.winning_alliance === "red") || (!isRed && match.winning_alliance === "blue");
}

function formatEPA(epa: number): string {
  return epa.toFixed(1);
}

function formatWinRate(winrate: number): string {
  return `${(winrate * 100).toFixed(0)}%`;
}

function getEPAColor(epa: number): string {
  if (epa >= 85) return "text-success";
  if (epa >= 70) return "text-primary";
  if (epa >= 50) return "text-warning";
  return "text-error";
}

function getWinRateColor(winrate: number): string {
  if (winrate >= 0.7) return "text-success";
  if (winrate >= 0.5) return "text-primary";
  if (winrate >= 0.3) return "text-warning";
  return "text-error";
}

function parseRecord(statusStr?: string) {
  const recordMatch = statusStr?.match(/(\d+)-(\d+)-(\d+)/);

  if (!recordMatch) return null;

  return {
    wins: Number.parseInt(recordMatch[1], 10),
    losses: Number.parseInt(recordMatch[2], 10),
    ties: Number.parseInt(recordMatch[3], 10),
  };
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/50">{children}</p>;
}

function DetailsLoadingPanel() {
  return (
    <div className="space-y-4 rounded-[1.5rem] border border-base-300 bg-base-200/40 p-4 md:p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-base-300 animate-pulse" />
          <div className="h-7 w-44 rounded bg-base-300 animate-pulse" />
        </div>
        <div className="h-5 w-32 rounded bg-base-300 animate-pulse" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
            <div className="mb-3 h-4 w-20 rounded bg-base-300 animate-pulse" />
            <div className="h-9 w-16 rounded bg-base-300 animate-pulse" />
            <div className="mt-2 h-4 w-24 rounded bg-base-300 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EventStatsDisplay({
  statboticsStats,
  tbaStatus,
  record,
}: {
  statboticsStats: StatboticsTeamEvent | null;
  tbaStatus: TBAStatus | null;
  record: { wins: number; losses: number; ties: number } | null;
}) {
  const matchCount = record ? record.wins + record.losses + record.ties : 0;
  const winRate = record && matchCount > 0 ? record.wins / matchCount : null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {tbaStatus?.qual?.ranking ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Target className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">Rank</span>
          </div>
          <div className="text-3xl font-bold text-primary">#{tbaStatus.qual.ranking.rank}</div>
          <p className="mt-1 text-sm text-base-content/70">{tbaStatus.qual.ranking.matches_played} qualification matches</p>
        </div>
      ) : null}

      {record ? (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Trophy className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">Record</span>
          </div>
          <div className="text-3xl font-bold text-base-content">
            {record.wins}-{record.losses}-{record.ties}
          </div>
          <p className="mt-1 text-sm text-base-content/70">Win-loss-tie</p>
        </div>
      ) : null}

      {statboticsStats?.EPA ? (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">EPA</span>
          </div>
          <div className={`text-3xl font-bold ${getEPAColor(statboticsStats.EPA.total)}`}>
            {formatEPA(statboticsStats.EPA.total)}
          </div>
          <p className="mt-1 text-sm text-base-content/70">Estimated points added</p>
          {statboticsStats.EPA_change !== 0 ? (
            <p className={`mt-2 text-sm font-semibold ${statboticsStats.EPA_change > 0 ? "text-success" : "text-error"}`}>
              {statboticsStats.EPA_change > 0 ? "+" : ""}
              {formatEPA(statboticsStats.EPA_change)} at this event
            </p>
          ) : null}
        </div>
      ) : null}

      {winRate !== null ? (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Award className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">Rate</span>
          </div>
          <div className={`text-3xl font-bold ${getWinRateColor(winRate)}`}>{formatWinRate(winRate)}</div>
          <p className="mt-1 text-sm text-base-content/70">Official match win rate</p>
        </div>
      ) : null}

      {winRate === null && statboticsStats ? (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Award className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">Expected Wins</span>
          </div>
          <div className="text-3xl font-bold text-base-content">{statboticsStats.expected_wins.toFixed(1)}</div>
          <p className="mt-1 text-sm text-base-content/70">Projected from Statbotics</p>
        </div>
      ) : null}
    </div>
  );
}

function MatchVideoCard({ match, teamKey }: { match: TBAMatch; teamKey: string }) {
  const video = match.videos?.[0];
  if (!video || video.type !== "youtube") return null;

  const won = didTeamWin(match, teamKey);
  const isRed = match.alliances.red.team_keys.includes(teamKey);
  const alliance = isRed ? "red" : "blue";
  const score = isRed ? match.alliances.red.score : match.alliances.blue.score;
  const opponentScore = isRed ? match.alliances.blue.score : match.alliances.red.score;

  return (
    <article className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
      <figure className="relative aspect-video overflow-hidden bg-black">
        <LazyVideoCard videoKey={video.key} title={`${formatCompLevel(match.comp_level)} ${match.match_number}`} />
      </figure>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/45">Match footage</p>
            <h3 className="mt-1 text-base font-bold text-base-content">
              {formatCompLevel(match.comp_level)} {match.match_number}
            </h3>
          </div>
          <Video className="h-5 w-5 text-primary/70 transition group-hover:text-primary" />
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-base-300 pt-3">
          <span className={`badge ${alliance === "red" ? "badge-error" : "badge-info"}`}>{alliance.toUpperCase()}</span>
          <span className="text-lg font-bold tabular-nums text-base-content">
            {score} - {opponentScore}
          </span>
          {won !== null ? <span className={`badge ${won ? "badge-success" : "badge-ghost"}`}>{won ? "WIN" : "LOSS"}</span> : null}
        </div>
      </div>
    </article>
  );
}

export default function EventDetailsCard({ event, isPast, teamKey, initialDetails = null }: EventDetailsCardProps) {
  const hasRequestedDetailsRef = useRef(false);
  const [details, setDetails] = useState<EventDetailsResponse | null>(initialDetails);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const startDate = useMemo(() => new Date(event.start_date), [event.start_date]);
  const endDate = useMemo(() => new Date(event.end_date), [event.end_date]);
  const now = new Date();
  const isOngoing = startDate <= now && now <= endDate;
  const shouldFetchData = isPast || isOngoing;
  const dateRange =
    startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    " - " +
    endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const statusLabel = isOngoing ? "Live now" : isPast ? "Completed" : "Upcoming";
  const statusIcon = isOngoing ? <Radio className="h-4 w-4" /> : isPast ? <CheckCircle2 className="h-4 w-4" /> : <Calendar className="h-4 w-4" />;
  const statusClass = isOngoing ? "badge-primary animate-pulse" : isPast ? "badge-success" : "badge-info";
  const record = parseRecord(details?.tbaStatus?.overall_status_str);
  const matches = details?.matches || [];
  const matchesWithVideos = matches
    .filter((match) => match.videos && match.videos.length > 0)
    .sort((a, b) => (b.actual_time || 0) - (a.actual_time || 0));

  useEffect(() => {
    if (!shouldFetchData || details || hasRequestedDetailsRef.current) return;

    hasRequestedDetailsRef.current = true;
    setIsLoadingDetails(true);
    setLoadFailed(false);

    loadSeasonDetails(teamKey, event.year)
      .then((seasonDetails) => {
        const eventDetails = seasonDetails.events[event.key] || {
          matches: [],
          tbaStatus: null,
          statboticsStats: null,
          fetchError: seasonDetails.fetchError,
        };
        setDetails(eventDetails);
      })
      .catch(() => setLoadFailed(true))
      .finally(() => setIsLoadingDetails(false));
  }, [details, event.key, event.year, shouldFetchData, teamKey]);

  return (
    <article className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-lg transition duration-200 hover:border-primary/30 hover:shadow-2xl">
      <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="space-y-7 p-5 md:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/60">
                <span className={`badge badge-lg gap-2 ${statusClass}`}>{statusIcon}{statusLabel}</span>
                <span className="badge badge-outline">{event.year}</span>
                <span className="badge badge-ghost">{event.event_code.toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-bold leading-tight text-primary md:text-4xl">{event.name}</h3>
            </div>
            <div className="grid gap-3 text-base text-base-content/75 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-2xl bg-base-200/70 px-4 py-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{dateRange}</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-base-200/70 px-4 py-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{event.city}, {event.state_prov}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:max-w-56 lg:justify-end">
            {event.website ? (
              <a href={event.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-between sm:w-auto lg:w-full">
                Event Website
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : null}
            <a href={`https://www.thebluealliance.com/event/${event.key}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full justify-between sm:w-auto lg:w-full">
              View on TBA
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {shouldFetchData && isLoadingDetails ? <DetailsLoadingPanel /> : null}

        {shouldFetchData && (loadFailed || details?.fetchError) ? (
          <div className="alert alert-warning my-4">
            <span className="text-sm">Live event details are slow right now. The official links above still work.</span>
          </div>
        ) : null}

        {shouldFetchData && details && !details.fetchError && (details.tbaStatus?.qual?.ranking || record || details.statboticsStats) ? (
          <div className="space-y-4 rounded-[1.5rem] border border-base-300 bg-base-200/40 p-4 md:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <SectionEyebrow>Results</SectionEyebrow>
                <h4 className="mt-1 text-xl font-bold text-base-content">Event performance</h4>
              </div>
              {details.statboticsStats?.num_matches ? <span className="text-sm text-base-content/60">{details.statboticsStats.num_matches} official matches tracked</span> : null}
            </div>
            <EventStatsDisplay statboticsStats={details.statboticsStats} tbaStatus={details.tbaStatus} record={record} />
          </div>
        ) : null}

        {matchesWithVideos.length > 0 ? (
          <div className="space-y-5 rounded-[1.5rem] border border-base-300 bg-base-200/40 p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/20">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-base-content">Match videos</h4>
                  <p className="text-sm text-base-content/60">Click a thumbnail to load YouTube only when needed.</p>
                </div>
              </div>
              <div className="badge badge-outline badge-lg">{matchesWithVideos.length} videos</div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {matchesWithVideos.slice(0, MAX_VIDEOS_PER_EVENT).map((match) => (
                <MatchVideoCard key={match.key} match={match} teamKey={teamKey} />
              ))}
            </div>
            {matchesWithVideos.length > MAX_VIDEOS_PER_EVENT ? (
              <p className="text-center text-sm text-base-content/60">+ {matchesWithVideos.length - MAX_VIDEOS_PER_EVENT} more match videos available on The Blue Alliance</p>
            ) : null}
          </div>
        ) : null}

        {shouldFetchData && details && !details.fetchError && matchesWithVideos.length === 0 && matches.length > 0 ? (
          <div className="alert alert-info my-4">
            <span className="text-sm">Match videos are not available yet. Check back after the event.</span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
