"use client";

import { useEffect, useState, useTransition } from "react";
import { Calendar, History, Trophy } from "lucide-react";

import EventDetailsCard from "@/components/event-details-card";
import type { TBAEvent } from "@/lib/tba-api";

const SHOW_UPCOMING_EVENTS = true;

type EventsPageContentProps = {
  teamKey: string;
  years: number[];
};

type CachedEvents = {
  savedAt: number;
  events: TBAEvent[];
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/50">{children}</p>;
}

function EventSectionHeader({
  icon,
  eyebrow,
  title,
  description,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/20">
          {icon}
        </div>
        <div>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-primary md:text-4xl">{title}</h2>
        </div>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-base-content/65 md:text-right">{description}</p>
    </div>
  );
}

function EventCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-xl">
      <div className="space-y-8 p-6 md:p-8">
        <div className="h-8 w-36 rounded-full bg-base-300 animate-pulse" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full max-w-3xl space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-6 w-16 rounded-full bg-base-300 animate-pulse" />
                <div className="h-6 w-20 rounded-full bg-base-300 animate-pulse" />
              </div>
              <div className="h-11 w-full max-w-2xl rounded bg-base-300 animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="h-6 w-72 max-w-full rounded bg-base-300 animate-pulse" />
              <div className="h-6 w-80 max-w-full rounded bg-base-300 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <div className="h-12 w-36 rounded-lg bg-base-300 animate-pulse" />
            <div className="h-12 w-32 rounded-lg bg-base-300 animate-pulse" />
          </div>
        </div>
      </div>
    </article>
  );
}

function EventsLoading() {
  return (
    <div className="space-y-8">
      <EventCardSkeleton />
      <EventCardSkeleton />
    </div>
  );
}

function getEventsCacheKey(teamKey: string, year: number) {
  return `cvillerobotics_events_cache_${teamKey}_${year}`;
}

export default function EventsPageContent({ teamKey, years }: EventsPageContentProps) {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [events, setEvents] = useState<TBAEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const controller = new AbortController();
    let isCurrentRequest = true;
    const cacheKey = getEventsCacheKey(teamKey, selectedYear);
    const cachedValue = window.localStorage.getItem(cacheKey);
    let didUseCache = false;

    if (cachedValue) {
      try {
        const cached = JSON.parse(cachedValue) as CachedEvents;
        if (Array.isArray(cached.events)) {
          setEvents(cached.events);
          setIsLoading(false);
          didUseCache = true;
        }
      } catch {
        window.localStorage.removeItem(cacheKey);
      }
    } else {
      setEvents([]);
    }

    setIsLoading(!didUseCache);
    setIsRefreshing(didUseCache);

    fetch(`/api/tba/events?team=${encodeURIComponent(teamKey)}&year=${selectedYear}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load events");
        return response.json() as Promise<TBAEvent[]>;
      })
      .then((nextEvents) => {
        if (!isCurrentRequest) return;
        setEvents(nextEvents);
        window.localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), events: nextEvents } satisfies CachedEvents));
        setHasError(false);
      })
      .catch((error) => {
        if (!isCurrentRequest || error instanceof DOMException && error.name === "AbortError") return;
        setHasError(true);
      })
      .finally(() => {
        if (!isCurrentRequest) return;
        setIsLoading(false);
        setIsRefreshing(false);
      });

    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [selectedYear, teamKey]);

  const handleYearChange = (year: number) => {
    startTransition(() => setSelectedYear(year));
  };

  const now = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.start_date) > now)
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  const pastEvents = events
    .filter((event) => new Date(event.end_date) <= now)
    .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

  return (
    <>
      <section className="mb-10 overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-lg">
        <div className="flex flex-col gap-4 border-b border-base-300 bg-base-200/50 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-content">
              <History className="h-5 w-5" />
            </div>
            <div>
              <SectionEyebrow>Season archive</SectionEyebrow>
              <h2 className="mt-1 text-2xl font-bold text-primary">Browse one season at a time</h2>
              <p className="mt-1 text-sm text-base-content/65">
                Centreville Robotics has been active since 2014. Pick a season to keep the page fast and focused.
              </p>
            </div>
          </div>
          <label className="form-control w-full md:w-56">
            <span className="label-text mb-2 font-semibold text-base-content/70">Season</span>
            <select
              className="select select-bordered select-primary w-full rounded-2xl"
              value={selectedYear}
              onChange={(event) => handleYearChange(Number(event.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>{year} season</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex gap-2 overflow-x-auto p-4">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              className={`btn btn-sm shrink-0 rounded-full ${year === selectedYear ? "btn-primary" : "btn-outline"}`}
              onClick={() => handleYearChange(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </section>

      {isLoading && events.length === 0 ? <EventsLoading /> : null}

      {hasError && events.length === 0 ? (
        <div className="alert alert-error shadow-lg">
          <div>
            <span className="font-semibold">Unable to Load {selectedYear} Events</span>
            <p className="mt-1 text-sm">Please try refreshing the page or check The Blue Alliance directly.</p>
          </div>
        </div>
      ) : null}

      {!isLoading && events.length === 0 && !hasError ? (
        <div className="alert alert-info shadow-lg">
          <Calendar className="h-5 w-5" />
          <div>
            <span className="font-semibold">No {selectedYear} Events Found</span>
            <p className="mt-1 text-sm">Select another season to continue browsing the archive.</p>
          </div>
        </div>
      ) : null}

      {events.length > 0 ? (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <SectionEyebrow>Selected season</SectionEyebrow>
            <h2 className="mt-1 text-3xl font-bold text-primary">{selectedYear} events</h2>
          </div>
          {(isRefreshing || isPending) ? <span className="badge badge-outline badge-lg">Refreshing...</span> : null}
        </div>
      ) : null}

      {SHOW_UPCOMING_EVENTS && upcomingEvents.length > 0 ? (
        <section className="mb-16 space-y-6">
          <EventSectionHeader
            icon={<Calendar className="h-6 w-6" />}
            eyebrow="Next up"
            title="Upcoming events"
            description="The next competitions on the schedule, with official links ready before match data appears."
          />
          <div className="space-y-8">
            {upcomingEvents.map((event) => (
              <EventDetailsCard key={event.key} event={event} isPast={false} teamKey={teamKey} />
            ))}
          </div>
        </section>
      ) : null}

      {pastEvents.length > 0 ? (
        <section className="mb-16 space-y-6">
          <EventSectionHeader
            icon={<Trophy className="h-6 w-6" />}
            eyebrow="Completed events"
            title="Past competitions"
            description="A cleaner archive of official standings, event context, and match footage."
          />
          <div className="space-y-8">
            {pastEvents.map((event) => (
              <EventDetailsCard key={event.key} event={event} isPast={true} teamKey={teamKey} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
