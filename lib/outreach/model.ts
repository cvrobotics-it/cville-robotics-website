export { getToday } from "../date-only";

export type ReportedValue =
  | { kind: "exact"; value: number }
  | { kind: "minimum"; value: number }
  | { kind: "unreported" }
  | { kind: "invalid"; source: string };

export type OutreachDate =
  | { kind: "known"; value: string }
  | { kind: "unreported" }
  | { kind: "invalid"; source: string };

export type OutreachEvent = {
  id: string;
  name: string;
  category: string;
  location: string;
  start: OutreachDate;
  end: OutreachDate;
  teamAttendance: ReportedValue;
  eventAttendance: ReportedValue;
  days: ReportedValue;
  prepHours: ReportedValue;
  eventHours: ReportedValue;
};

export type OutreachFilters = {
  query: string;
  year: string;
  category: string;
};

export const EMPTY_FILTERS: OutreachFilters = {
  query: "",
  year: "",
  category: "",
};

export function getHistoryHref(filters: OutreachFilters) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.year) params.set("year", filters.year);
  if (filters.category) params.set("type", filters.category);
  return `/outreach${params.size ? `?${params}` : ""}#projects`;
}

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 10,
});
const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatNumber(value: number) {
  return numberFormat.format(value);
}

export function formatReportedValue(value: ReportedValue): string {
  switch (value.kind) {
    case "exact":
      return formatNumber(value.value);
    case "minimum":
      return `${formatNumber(value.value)}+`;
    case "invalid":
      return value.source;
    case "unreported":
      return "Not recorded";
  }
}

export function getEventDate(event: OutreachEvent): string {
  if (event.start.kind === "known") return event.start.value;
  if (event.end.kind === "known") return event.end.value;
  return "";
}

export function getEventYear(event: OutreachEvent): string {
  return getEventDate(event).slice(0, 4) || "Undated";
}

export function getEventStatus(event: OutreachEvent, today: string) {
  const start = event.start.kind === "known" ? event.start.value : null;
  const end = event.end.kind === "known" ? event.end.value : null;
  if (end && end < today && (!start || start < today)) return "completed";
  if (start && start > today && (!end || end >= start)) return "upcoming";
  if (start && end && start <= today && today <= end && start <= end)
    return "ongoing";
  return "unconfirmed";
}

export function sortOutreachEvents({ events, today }: {
  events: OutreachEvent[];
  today: string;
}) {
  const priority = { ongoing: 0, upcoming: 1, completed: 2, unconfirmed: 3 };
  return [...events].sort((a, b) => {
    const aStatus = getEventStatus(a, today);
    const bStatus = getEventStatus(b, today);
    const statusOrder = priority[aStatus] - priority[bStatus];
    if (statusOrder) return statusOrder;
    if (aStatus === "upcoming") return getEventDate(a).localeCompare(getEventDate(b));
    const aDate = a.end.kind === "known" ? a.end.value : getEventDate(a);
    const bDate = b.end.kind === "known" ? b.end.value : getEventDate(b);
    return bDate.localeCompare(aDate);
  });
}

export function getHistoryFilters(
  params: Pick<URLSearchParams, "get">,
  options: ReturnType<typeof getFilterOptions>,
): OutreachFilters {
  const year = params.get("year") ?? "";
  const category = params.get("type") ?? "";
  return {
    query: params.get("q") ?? "",
    year: options.years.includes(year) ? year : "",
    category: options.categories.includes(category) ? category : "",
  };
}

export function formatEventDates(event: OutreachEvent) {
  const start = event.start.kind === "known" ? event.start.value : null;
  const end = event.end.kind === "known" ? event.end.value : null;
  if (start && end) {
    const first = dateFormat.format(new Date(`${start}T00:00:00Z`));
    return start === end
      ? first
      : `${first} to ${dateFormat.format(new Date(`${end}T00:00:00Z`))}`;
  }
  if (start)
    return `Started ${dateFormat.format(new Date(`${start}T00:00:00Z`))}`;
  if (end) return `Ended ${dateFormat.format(new Date(`${end}T00:00:00Z`))}`;
  return "Date not recorded";
}

export function getDateNote(event: OutreachEvent): string | null {
  if (event.start.kind === "invalid" || event.end.kind === "invalid") {
    return "A date in the source sheet needs review.";
  }
  if (
    event.start.kind === "known" &&
    event.end.kind === "known" &&
    event.end.value < event.start.value
  ) {
    return "The end date precedes the start date in the source sheet.";
  }
  if (event.start.kind === "unreported" && event.end.kind === "known") {
    return "Start date not recorded.";
  }
  if (event.end.kind === "unreported" && event.start.kind === "known") {
    return "End date not recorded.";
  }
  return null;
}

export function filterEvents(
  events: OutreachEvent[],
  filters: OutreachFilters,
) {
  const terms = filters.query
    .trim()
    .toLocaleLowerCase("en-US")
    .split(/\s+/)
    .filter(Boolean);
  return events.filter((event) => {
    const text =
      `${event.name} ${event.category} ${event.location}`.toLocaleLowerCase(
        "en-US",
      );
    return (
      (!filters.year || getEventYear(event) === filters.year) &&
      (!filters.category || event.category === filters.category) &&
      terms.every((term) => text.includes(term))
    );
  });
}

export function getFilterOptions(events: OutreachEvent[]) {
  return {
    years: [...new Set(events.map(getEventYear))].sort((a, b) =>
      b.localeCompare(a),
    ),
    categories: [...new Set(events.map((event) => event.category))].sort(
      (a, b) => a.localeCompare(b),
    ),
  };
}

export function groupEventsByYear(events: OutreachEvent[]) {
  const groups = new Map<string, OutreachEvent[]>();
  const sorted = [...events].sort((a, b) =>
    getEventDate(b).localeCompare(getEventDate(a)),
  );
  for (const event of sorted) {
    const year = getEventYear(event);
    const group = groups.get(year);
    if (group) group.push(event);
    else groups.set(year, [event]);
  }
  return [...groups].map(([year, projects]) => ({ year, projects }));
}

type MetricKey =
  "teamAttendance" | "eventAttendance" | "days" | "prepHours" | "eventHours";

export function totalMetric(events: OutreachEvent[], key: MetricKey) {
  let value = 0;
  let reported = 0;
  let minimum = false;
  for (const event of events) {
    const metric = event[key];
    if (metric.kind === "exact" || metric.kind === "minimum") {
      value += metric.value;
      reported += 1;
      minimum ||= metric.kind === "minimum";
    }
  }
  return { value, reported, incomplete: minimum || reported < events.length };
}

export function formatTotal(total: ReturnType<typeof totalMetric>) {
  if (!total.reported) return "Not recorded";
  return `${formatNumber(total.value)}${total.incomplete ? "+" : ""}`;
}

export function getProjectBreakdown(events: OutreachEvent[]) {
  const years = new Map<string, number>();
  const categories = new Map<string, number>();
  for (const event of events) {
    const year = getEventYear(event);
    years.set(year, (years.get(year) ?? 0) + 1);
    categories.set(event.category, (categories.get(event.category) ?? 0) + 1);
  }
  return {
    years: [...years]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([label, projects]) => ({ label, projects })),
    categories: [...categories]
      .sort(([a, aCount], [b, bCount]) => bCount - aCount || a.localeCompare(b))
      .map(([label, projects]) => ({ label, projects })),
  };
}
