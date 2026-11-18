export function getToday(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  return ["year", "month", "day"]
    .map((type) => parts.find((part) => part.type === type)?.value ?? "")
    .join("-");
}

export function formatDateOnly(
  value: string,
  options: Intl.DateTimeFormatOptions,
) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Date not recorded";
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: "UTC",
  }).format(date);
}

export function getDateRangeStatus({
  start,
  end,
  today = getToday(),
}: {
  start: string;
  end: string;
  today?: string;
}) {
  if (end < today) return "completed";
  if (start > today) return "upcoming";
  return "ongoing";
}
