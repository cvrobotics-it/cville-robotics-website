"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  EMPTY_FILTERS,
  filterEvents,
  formatEventDates,
  formatNumber,
  formatReportedValue,
  getDateNote,
  getEventStatus,
  getFilterOptions,
  getHistoryHref,
  getHistoryFilters,
  sortOutreachEvents,
  type OutreachEvent,
  type OutreachFilters,
} from "@/lib/outreach/model";

const PAGE_SIZE = 6;

function ProjectEntry({ event, today }: { event: OutreachEvent; today: string }) {
  const [open, setOpen] = useState(false);
  const status = getEventStatus(event, today);
  const dateNote = getDateNote(event);
  const metrics = [
    { label: "Event attendance", value: event.eventAttendance },
    { label: "Team members", value: event.teamAttendance },
    { label: "Outreach hours", value: event.eventHours },
    { label: "Preparation hours", value: event.prepHours },
    { label: "Event days", value: event.days },
  ].filter((metric) => metric.value.kind !== "unreported");
  const titleId = `outreach-title-${event.id}`;
  const metaId = `outreach-meta-${event.id}`;
  const detailsId = `outreach-details-${event.id}`;

  return (
    <li className="outreach-project">
      <h2>
        <button
          type="button"
          className="outreach-project-toggle"
          id={`outreach-project-${event.id}`}
          aria-labelledby={titleId}
          aria-describedby={metaId}
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="outreach-project-copy">
            <span id={titleId} className="outreach-project-name">{event.name}</span>
            <span id={metaId} className="outreach-project-meta">
              {status !== "completed" && (
                <span className="outreach-project-status">
                  {status === "ongoing" ? "In progress" : status === "upcoming" ? "Upcoming" : "Dates unconfirmed"}
                </span>
              )}
              <span>{formatEventDates(event)}</span>
              <span>{event.location}</span>
            </span>
          </span>
          <ChevronDown size={20} aria-hidden="true" />
        </button>
      </h2>
        <div id={detailsId} hidden={!open} className="outreach-project-details">
          <dl>
            <div><dt>Project type</dt><dd>{event.category}</dd></div>
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{formatReportedValue(metric.value)}</dd>
              </div>
            ))}
          </dl>
          {dateNote && <p>{dateNote}</p>}
          {metrics.some((metric) => metric.value.kind === "minimum") && (
            <p>A + means at least that amount.</p>
          )}
        </div>
    </li>
  );
}

export default function OutreachHistory({ events, today }: {
  events: OutreachEvent[];
  today: string;
}) {
  const params = useSearchParams();
  const options = getFilterOptions(events);
  const filters = getHistoryFilters(params, options);
  const ordered = sortOutreachEvents({ events, today });
  const matches = filterEvents(ordered, filters);
  const [page, setPage] = useState({ scope: params.toString(), limit: PAGE_SIZE });
  const pendingFocus = useRef<string | null>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const limit = page.scope === params.toString() ? page.limit : PAGE_SIZE;
  const visible = matches.slice(0, limit);
  const active = Boolean(filters.query || filters.year || filters.category);

  useEffect(() => {
    const id = pendingFocus.current;
    pendingFocus.current = null;
    if (id) document.getElementById(`outreach-project-${id}`)?.focus();
  }, [page]);

  useEffect(() => {
    function resetPage() {
      pendingFocus.current = null;
      setPage({ scope: new URLSearchParams(window.location.search).toString(), limit: PAGE_SIZE });
    }
    window.addEventListener("popstate", resetPage);
    return () => window.removeEventListener("popstate", resetPage);
  }, []);

  function changeFilters({ next, replace = false }: { next: OutreachFilters; replace?: boolean }) {
    const href = getHistoryHref(next);
    pendingFocus.current = null;
    setPage({ scope: new URL(href, window.location.origin).searchParams.toString(), limit: PAGE_SIZE });
    if (replace) window.history.replaceState(null, "", href);
    else if (href !== window.location.pathname + window.location.search + window.location.hash)
      window.history.pushState(null, "", href);
  }

  function clearFilters() {
    changeFilters({ next: EMPTY_FILTERS });
    searchInput.current?.focus();
  }

  return (
    <section id="projects" className="outreach-projects" aria-label="Outreach projects">
      <div className="outreach-controls">
        <div className="outreach-search">
          <Search size={20} aria-hidden="true" />
          <label htmlFor="outreach-search" className="sr-only">Search projects</label>
          <input
            ref={searchInput}
            id="outreach-search"
            type="search"
            value={filters.query}
            placeholder="Search projects"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="search"
            onChange={(event) => changeFilters({ next: { ...filters, query: event.target.value }, replace: true })}
          />
        </div>
        <label htmlFor="outreach-year" className="sr-only">Year</label>
        <select
          id="outreach-year"
          value={filters.year}
          onChange={(event) => changeFilters({ next: { ...filters, year: event.target.value } })}
        >
          <option value="">All years</option>
          {options.years.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
      <div className="outreach-results-bar">
        <p role="status" aria-live="polite" aria-atomic="true">
          {formatNumber(matches.length)} {matches.length === 1 ? "project" : "projects"}
          {filters.category ? ` · ${filters.category}` : ""}
        </p>
        {active && <button type="button" onClick={clearFilters}>Clear filters</button>}
      </div>

      {visible.length ? (
        <ul className="outreach-project-list">
          {visible.map((event) => <ProjectEntry key={event.id} event={event} today={today} />)}
        </ul>
      ) : (
        <div className="outreach-empty">
          <h2>No projects found</h2>
          <p>Try another name or year.</p>
          {active && <button type="button" onClick={clearFilters}>Show all projects</button>}
        </div>
      )}

      {limit < matches.length && (
        <div className="outreach-load-more">
          <button
            type="button"
            onClick={() => {
              pendingFocus.current = matches[limit]?.id ?? null;
              setPage({ scope: params.toString(), limit: limit + PAGE_SIZE });
            }}
          >
            Show more projects
          </button>
        </div>
      )}
    </section>
  );
}
