import { Suspense } from "react";
import { Metadata } from "next";
import { Calendar, MapPin, Trophy, ExternalLink, TrendingUp, Target, Award } from "lucide-react";
import LazyVideoCard from "@/components/LazyVideoCard";

import {
  getTeamEvents,
  getTeamEventMatches,
  getTeamEventStatus,
  formatCompLevel,
  didTeamWin,
  TEAM_KEY,
  TEAM_NUMBER,
  ALL_YEARS,
  type TBAEvent,
  type TBAMatch,
  type TBAStatus,
} from "@/lib/tba-api";

import {
  getTeamYearStats,
  getTeamEventStats,
  formatEPA,
  formatWinRate,
  getEPAColor,
  getWinRateColor,
  type StatboticsTeamYear,
  type StatboticsTeamEvent,
} from "@/lib/statbotics-api";

const MAX_VIDEOS_PER_EVENT = 6;
const SHOW_UPCOMING_EVENTS = true;
const EVENT_SKELETON_KEYS = ["stat-1", "stat-2", "stat-3", "stat-4"] as const;
const SEASON_SKELETON_KEYS = ["season-1", "season-2", "season-3", "season-4"] as const;
const EVENT_VIDEO_SKELETON_KEYS = ["video-1", "video-2", "video-3"] as const;

export const metadata: Metadata = {
  title: "Events & Competitions | Centreville Robotics",
  description: `Follow Team ${TEAM_NUMBER}'s competition schedule, match results, and performance analytics from FIRST Robotics Competition events.`,
};

// Skeleton Components - Match exact layout
function VideoCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-md">
      <div className="aspect-video bg-base-300 animate-pulse" />
      <div className="space-y-3 p-4">
        <div className="h-5 bg-base-300 rounded animate-pulse w-2/3" />
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-16 bg-base-300 rounded-full animate-pulse" />
          <div className="h-7 w-20 bg-base-300 rounded animate-pulse" />
          <div className="h-6 w-14 bg-base-300 rounded-full animate-pulse" />
        </div>
      </div>
    </article>
  );
}

function EventCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-xl">
      <div className="space-y-8 p-6 md:p-8">
        <div className="h-8 w-36 rounded-full bg-base-300 animate-pulse" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4 w-full">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-6 w-16 rounded-full bg-base-300 animate-pulse" />
                <div className="h-6 w-20 rounded-full bg-base-300 animate-pulse" />
              </div>
              <div className="h-11 bg-base-300 rounded animate-pulse w-full max-w-2xl" />
            </div>
            <div className="space-y-3">
              <div className="h-6 bg-base-300 rounded animate-pulse w-72 max-w-full" />
              <div className="h-6 bg-base-300 rounded animate-pulse w-80 max-w-full" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <div className="h-12 w-36 rounded-lg bg-base-300 animate-pulse" />
            <div className="h-12 w-32 rounded-lg bg-base-300 animate-pulse" />
          </div>
        </div>

        <div className="space-y-3 border-t border-base-300 pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="h-7 bg-base-300 rounded animate-pulse w-36" />
            <div className="h-5 bg-base-300 rounded animate-pulse w-40" />
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {EVENT_SKELETON_KEYS.map((key) => (
              <div key={key} className="rounded-2xl border border-base-300 bg-base-200/60 p-4">
                <div className="h-4 w-20 rounded bg-base-300 animate-pulse mb-3" />
                <div className="h-9 w-16 rounded bg-base-300 animate-pulse" />
                <div className="h-4 w-28 rounded bg-base-300 animate-pulse mt-3" />
              </div>
            ))}
          </div>

        </div>

        <div className="space-y-5 border-t border-base-300 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-base-300 animate-pulse" />
              <div className="space-y-2">
                <div className="h-7 w-36 rounded bg-base-300 animate-pulse" />
                <div className="h-4 w-56 max-w-full rounded bg-base-300 animate-pulse" />
              </div>
            </div>
            <div className="h-8 w-24 rounded-full bg-base-300 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {EVENT_VIDEO_SKELETON_KEYS.map((key) => (
              <VideoCardSkeleton key={key} />
            ))}
          </div>

          <div className="h-4 w-80 max-w-full mx-auto rounded bg-base-300 animate-pulse" />
        </div>
      </div>
    </article>
  );
}

function SeasonStatsSkeleton() {
  return (
    <section className="mb-14 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-base-300 animate-pulse" />
          <div className="h-9 w-72 rounded bg-base-300 animate-pulse" />
        </div>
        <div className="h-4 w-80 max-w-full rounded bg-base-300 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SEASON_SKELETON_KEYS.slice(0, 3).map((key) => (
          <div key={key} className="rounded-[1.5rem] border border-base-300 bg-base-100 shadow-lg">
            <div className="space-y-5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-16 rounded bg-base-300 animate-pulse" />
                  <div className="h-9 w-24 rounded bg-base-300 animate-pulse" />
                </div>
                <div className="h-6 w-24 rounded-full bg-base-300 animate-pulse" />
              </div>

              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-base-300 animate-pulse" />
                  <div className="h-8 w-20 rounded bg-base-300 animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-base-200 p-3 space-y-2">
                    <div className="h-6 w-16 mx-auto rounded bg-base-300 animate-pulse" />
                    <div className="h-3 w-14 mx-auto rounded bg-base-300 animate-pulse" />
                  </div>
                  <div className="rounded-lg bg-base-200 p-3 space-y-2">
                    <div className="h-6 w-16 mx-auto rounded bg-base-300 animate-pulse" />
                    <div className="h-3 w-14 mx-auto rounded bg-base-300 animate-pulse" />
                  </div>
                </div>

                <div className="border-t border-base-300" />

                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 rounded bg-base-300 animate-pulse" />
                  <div className="h-5 w-16 rounded bg-base-300 animate-pulse" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 rounded bg-base-300 animate-pulse" />
                  <div className="h-5 w-16 rounded bg-base-300 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================
// PERFORMANCE-OPTIMIZED VIDEO CARD
// ============================================

function MatchVideoCard({ match }: { match: TBAMatch }) {
  const video = match.videos?.[0];
  if (!video || video.type !== "youtube") return null;

  const won = didTeamWin(match);
  const isRed = match.alliances.red.team_keys.includes(TEAM_KEY);
  const alliance = isRed ? "red" : "blue";
  const score = isRed ? match.alliances.red.score : match.alliances.blue.score;
  const opponentScore = isRed ? match.alliances.blue.score : match.alliances.red.score;

  return (
    <article className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <figure className="relative aspect-video overflow-hidden bg-black">
        <Suspense fallback={<div className="absolute inset-0 bg-base-300 animate-pulse" />}>
          <LazyVideoCard videoKey={video.key} title={`${formatCompLevel(match.comp_level)} ${match.match_number}`} />
        </Suspense>
      </figure>
      <div className="space-y-3 p-4">
        <h3 className="text-base font-semibold text-base-content">
          {formatCompLevel(match.comp_level)} {match.match_number}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`badge ${alliance === "red" ? "badge-error" : "badge-info"}`}>
            {alliance.toUpperCase()}
          </span>
          <span className="text-lg font-bold tabular-nums text-base-content">
            {score} - {opponentScore}
          </span>
          {won !== null && (
            <span className={`badge ${won ? "badge-success" : "badge-ghost"}`}>
              {won ? "WIN" : "LOSS"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ============================================
// EVENT STATS COMPONENT
// ============================================

function EventStatsDisplay({ 
  statboticsStats, 
  tbaStatus, 
  record 
}: { 
  statboticsStats: StatboticsTeamEvent | null;
  tbaStatus: TBAStatus | null;
  record: { wins: number; losses: number; ties: number } | null;
}) {
  const winRate = record ? (record.wins / (record.wins + record.losses + record.ties)) : null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {tbaStatus?.qual?.ranking && (
        <div className="rounded-2xl border border-base-300 bg-base-200/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Target className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">Rank</span>
          </div>
          <div className="text-3xl font-bold text-primary">#{tbaStatus.qual.ranking.rank}</div>
          <p className="mt-1 text-sm text-base-content/70">{tbaStatus.qual.ranking.matches_played} qualification matches</p>
        </div>
      )}

      {record && (
        <div className="rounded-2xl border border-base-300 bg-base-200/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Trophy className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">Record</span>
          </div>
          <div className="text-3xl font-bold text-base-content">
            {record.wins}-{record.losses}-{record.ties}
          </div>
          <p className="mt-1 text-sm text-base-content/70">Win-loss-tie</p>
        </div>
      )}

      {statboticsStats?.EPA && (
        <div className="rounded-2xl border border-base-300 bg-base-200/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">EPA</span>
          </div>
          <div className={`text-3xl font-bold ${getEPAColor(statboticsStats.EPA.total)}`}>
            {formatEPA(statboticsStats.EPA.total)}
          </div>
          <p className="mt-1 text-sm text-base-content/70">Estimated points added</p>
          {statboticsStats.EPA_change !== 0 && (
            <p className={`mt-2 text-sm font-semibold ${statboticsStats.EPA_change > 0 ? "text-success" : "text-error"}`}>
              {statboticsStats.EPA_change > 0 ? "+" : ""}
              {formatEPA(statboticsStats.EPA_change)} at this event
            </p>
          )}
        </div>
      )}

      {winRate !== null && (
        <div className="rounded-2xl border border-base-300 bg-base-200/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Award className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">Rate</span>
          </div>
          <div className={`text-3xl font-bold ${getWinRateColor(winRate)}`}>
            {formatWinRate(winRate)}
          </div>
          <p className="mt-1 text-sm text-base-content/70">Official match win rate</p>
        </div>
      )}

      {!winRate && statboticsStats && (
        <div className="rounded-2xl border border-base-300 bg-base-200/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Award className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">Expected Wins</span>
          </div>
          <div className="text-3xl font-bold text-base-content">{statboticsStats.expected_wins.toFixed(1)}</div>
          <p className="mt-1 text-sm text-base-content/70">Projected from Statbotics</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN EVENT CARD COMPONENT
// ============================================

async function EventDetailsCard({ event, isPast }: { event: TBAEvent; isPast: boolean }) {
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  
  const dateRange =
    startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    " - " +
    endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const now = new Date();
  const isOngoing = startDate <= now && now <= endDate;
  const shouldFetchData = isPast || isOngoing;

  let matches: TBAMatch[] = [];
  let tbaStatus = null;
  let statboticsStats: StatboticsTeamEvent | null = null;
  let fetchError = false;

  if (shouldFetchData) {
    try {
      // Fetch data in parallel but with error handling per source
      const [matchesResult, tbaStatusResult, statboticsResult] = await Promise.allSettled([
        getTeamEventMatches(TEAM_KEY, event.key),
        getTeamEventStatus(TEAM_KEY, event.key),
        getTeamEventStats(parseInt(TEAM_NUMBER), event.key),
      ]);

      if (matchesResult.status === "fulfilled") matches = matchesResult.value;
      if (tbaStatusResult.status === "fulfilled") tbaStatus = tbaStatusResult.value;
      if (statboticsResult.status === "fulfilled") statboticsStats = statboticsResult.value;
      
      // Only mark error if ALL fetches failed
      if (matchesResult.status === "rejected" && tbaStatusResult.status === "rejected") {
        fetchError = true;
      }
    } catch (error) {
      console.error(`Error fetching data for ${event.key}:`, error);
      fetchError = true;
    }
  }

  const matchesWithVideos = matches
    .filter((m) => m.videos && m.videos.length > 0)
    .sort((a, b) => (b.actual_time || 0) - (a.actual_time || 0));

  // Parse record from status string
  const parseRecord = (statusStr: string) => {
    const recordMatch = statusStr?.match(/(\d+)-(\d+)-(\d+)/);
    if (recordMatch) {
      return {
        wins: parseInt(recordMatch[1]),
        losses: parseInt(recordMatch[2]),
        ties: parseInt(recordMatch[3]),
      };
    }
    return null;
  };

  const record = tbaStatus?.overall_status_str ? parseRecord(tbaStatus.overall_status_str) : null;

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-xl">
      <div className="space-y-8 p-6 md:p-8">
        {isOngoing && (
          <div className="badge badge-primary badge-lg animate-pulse">Happening Now</div>
        )}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/60">
                <span className="badge badge-outline">{event.year}</span>
                <span className="badge badge-ghost">{event.event_code.toUpperCase()}</span>
              </div>
              <h3 className="text-3xl font-bold leading-tight text-primary md:text-4xl">{event.name}</h3>
            </div>
            <div className="flex flex-wrap gap-5 text-base text-base-content/75">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{dateRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{event.city}, {event.state_prov}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {event.website && (
              <a href={event.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-primary">
                Event Website
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <a href={`https://www.thebluealliance.com/event/${event.key}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View on TBA
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {!fetchError && shouldFetchData && (tbaStatus?.qual?.ranking || record || statboticsStats) && (
          <div className="space-y-3 border-t border-base-300 pt-6">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-lg font-semibold text-base-content">Event results</h4>
              {statboticsStats?.num_matches ? (
                <span className="text-sm text-base-content/60">{statboticsStats.num_matches} official matches tracked</span>
              ) : null}
            </div>
            <EventStatsDisplay statboticsStats={statboticsStats} tbaStatus={tbaStatus} record={record} />
          </div>
        )}

        {fetchError && shouldFetchData && (
          <div className="alert alert-warning my-4">
            <span className="text-sm">Some data unavailable. Please check The Blue Alliance for complete information.</span>
          </div>
        )}

        {matchesWithVideos.length > 0 && (
          <div className="space-y-5 border-t border-base-300 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-base-content">Match videos</h4>
                  <p className="text-sm text-base-content/60">Latest archived footage from this event</p>
                </div>
              </div>
              <div className="badge badge-outline badge-lg">{matchesWithVideos.length} videos</div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {matchesWithVideos.slice(0, MAX_VIDEOS_PER_EVENT).map((match) => (
                <MatchVideoCard key={match.key} match={match} />
              ))}
            </div>
            {matchesWithVideos.length > MAX_VIDEOS_PER_EVENT && (
              <p className="text-center text-sm text-base-content/60">
                + {matchesWithVideos.length - MAX_VIDEOS_PER_EVENT} more match videos available on The Blue Alliance
              </p>
            )}
          </div>
        )}

        {/* No Videos Message */}
        {shouldFetchData && !fetchError && matchesWithVideos.length === 0 && matches.length > 0 && (
          <div className="alert alert-info my-4">
            <span className="text-sm">Match videos not yet available. Check back after the event!</span>
          </div>
        )}
      </div>
    </article>
  );
}

// ============================================
// SEASON SUMMARY COMPONENT
// ============================================

async function SeasonSummary() {
  // Fetch season stats for each year in parallel
  const yearStatsPromises = ALL_YEARS.map(year => getTeamYearStats(parseInt(TEAM_NUMBER), year));
  const yearStatsResults = await Promise.allSettled(yearStatsPromises);
  
  const yearStats = yearStatsResults.reduce<StatboticsTeamYear[]>((acc, result) => {
    if (result.status === "fulfilled" && result.value?.EPA) {
      acc.push(result.value);
    }

    return acc;
  }, []);

  if (yearStats.length === 0) return null;

  return (
    <section className="mb-14 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/50">Season summary</p>
                  <h2 className="text-3xl font-bold text-primary">Season performance</h2>
                </div>
                <p className="max-w-2xl text-sm text-base-content/65 md:text-right">
          Official event results from The Blue Alliance with added context from Statbotics when available.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {yearStats.map((stats) => {
          const epa = stats.EPA;

          if (!epa) return null;

          return (
          <div key={stats.year} className="rounded-[1.5rem] border border-base-300 bg-base-100 shadow-lg">
            <div className="space-y-5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/50">Season</p>
                  <h3 className="text-3xl font-bold text-primary">{stats.year}</h3>
                </div>
                <span className="badge badge-outline">{stats.wins + stats.losses + stats.ties} matches</span>
              </div>
              
              <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/70">Overall EPA</span>
                  <span className={`text-2xl font-bold ${getEPAColor(epa.total)}`}>
                    {formatEPA(epa.total)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-base-200 rounded-lg">
                    <div className="text-xl font-bold text-primary">{formatEPA(epa.auto)}</div>
                    <div className="text-xs text-base-content/70">Auto EPA</div>
                  </div>
                  <div className="text-center p-3 bg-base-200 rounded-lg">
                    <div className="text-xl font-bold text-secondary">{formatEPA(epa.teleop)}</div>
                    <div className="text-xs text-base-content/70">Teleop EPA</div>
                  </div>
                </div>

                <div className="border-t border-base-300"></div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/70">Record</span>
                  <span className="font-bold">
                    {stats.wins}-{stats.losses}-{stats.ties}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/70">Win Rate</span>
                  <span className={`font-bold ${getWinRateColor(stats.winrate)}`}>
                    {formatWinRate(stats.winrate)}
                  </span>
                </div>

                {stats.district_points > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-base-content/70">District Points</span>
                    <span className="font-bold text-accent">{stats.district_points}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================
// EVENTS LIST COMPONENT
// ============================================

async function EventsList() {
  try {
    const events = await getTeamEvents();
    const now = new Date();
    
    const upcomingEvents = events
      .filter((e) => new Date(e.start_date) > now)
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
    
    const pastEvents = events
      .filter((e) => new Date(e.end_date) <= now)
      .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

    if (events.length === 0) {
      return (
        <div className="alert alert-info shadow-lg">
          <Calendar className="w-5 h-5" />
          <div>
            <span className="font-semibold">No Events Found</span>
            <p className="text-sm mt-1">Check back during competition season or update your competition years in .env.local</p>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Season Summary */}
        <SeasonSummary />

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <section className="mb-16 space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/50">Completed events</p>
                  <h2 className="text-4xl font-bold text-primary">Past competitions</h2>
                </div>
              </div>
              <p className="text-sm text-base-content/60">Official standings, event context, and match footage.</p>
            </div>
            <div className="space-y-8">
              {pastEvents.map((event) => (
                <Suspense key={event.key} fallback={<EventCardSkeleton />}>
                  <EventDetailsCard event={event} isPast={true} />
                </Suspense>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Events Section */}
        {SHOW_UPCOMING_EVENTS && upcomingEvents.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/50">Upcoming</p>
                <h2 className="text-4xl font-bold text-primary">Upcoming events</h2>
              </div>
            </div>
            <div className="space-y-8">
              {upcomingEvents.map((event) => (
                <Suspense key={event.key} fallback={<EventCardSkeleton />}>
                  <EventDetailsCard event={event} isPast={false} />
                </Suspense>
              ))}
            </div>
          </section>
        )}
      </>
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <span className="font-semibold">Unable to Load Events</span>
          <p className="text-sm mt-1">Please try refreshing the page or check The Blue Alliance directly.</p>
        </div>
      </div>
    );
  }
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="border-b border-base-300 bg-gradient-to-b from-base-100 to-base-200">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-base-content/55">Team schedule</p>
              <h1 className="mb-4 text-5xl font-bold text-primary md:text-6xl">
                Events & Competitions
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-base-content/75 md:text-xl">
                Follow Team {TEAM_NUMBER} through the {ALL_YEARS.join(" and ")} season with official event results, rankings, and match videos.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {ALL_YEARS.map((year) => (
                  <span key={year} className="badge badge-outline badge-lg">{year} season</span>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-base-300 bg-base-100 p-5 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/50">Team links</p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={`https://www.thebluealliance.com/team/${TEAM_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full justify-between"
                >
                  The Blue Alliance
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.statbotics.io/team/${TEAM_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full justify-between"
                >
                  Statbotics
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<SeasonStatsSkeleton />}>
          <EventsList />
        </Suspense>
      </div>
    </div>
  );
}
