import Papa from "papaparse";
import { z } from "zod";

import type { OutreachDate, OutreachEvent, ReportedValue } from "./model";

const rowSchema = z.object({
  "Start of Event": z.string(),
  "End of Event": z.string(),
  "Name of Project": z.string().min(1),
  "Type of Project": z.string(),
  "Event Location": z.string(),
  "Attendance of Team": z.string(),
  "Attendance of Event": z.string(),
  "Event Days": z.string(),
  "Time Spent for Prep in Hours": z.string(),
  "Time Spent at Event in Hours": z.string(),
});

const numberSchema = z
  .string()
  .regex(/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/)
  .transform((value) => Number(value.replaceAll(",", "")))
  .pipe(z.number().finite().nonnegative());

function parseMetric(source: string): ReportedValue {
  if (!source) return { kind: "unreported" };
  const minimum = source.endsWith("+");
  const parsed = numberSchema.safeParse(minimum ? source.slice(0, -1) : source);
  if (!parsed.success) return { kind: "invalid", source };
  return { kind: minimum ? "minimum" : "exact", value: parsed.data };
}

function parseDate(source: string): OutreachDate {
  if (!source) return { kind: "unreported" };
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(source);
  if (match) {
    const month = Number(match[1]);
    const day = Number(match[2]);
    const year = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (
      year >= 1900 &&
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    ) {
      return { kind: "known", value: date.toISOString().slice(0, 10) };
    }
  }
  return { kind: "invalid", source };
}

export function parseOutreachCsv(csv: string): OutreachEvent[] {
  const parsed = Papa.parse<unknown>(csv, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (header) => header.trim(),
    transform: (value) => value.trim(),
  });
  if (parsed.errors.length)
    throw new Error("The outreach CSV could not be parsed.");

  const headers = parsed.meta.fields ?? [];
  if (!rowSchema.keyof().options.every((header) => headers.includes(header))) {
    throw new Error("The outreach sheet is missing required columns.");
  }
  if (!parsed.data.length)
    throw new Error("The outreach sheet has no project records.");

  return parsed.data.map((record, index) => {
    const result = rowSchema.safeParse(record);
    if (!result.success)
      throw new Error(`Outreach sheet row ${index + 2} is invalid.`);
    const row = result.data;
    return {
      id: `outreach-row-${index + 2}`,
      name: row["Name of Project"],
      category: row["Type of Project"] || "Uncategorized",
      location: row["Event Location"] || "Location not recorded",
      start: parseDate(row["Start of Event"]),
      end: parseDate(row["End of Event"]),
      teamAttendance: parseMetric(row["Attendance of Team"]),
      eventAttendance: parseMetric(row["Attendance of Event"]),
      days: parseMetric(row["Event Days"]),
      prepHours: parseMetric(row["Time Spent for Prep in Hours"]),
      eventHours: parseMetric(row["Time Spent at Event in Hours"]),
    };
  });
}
