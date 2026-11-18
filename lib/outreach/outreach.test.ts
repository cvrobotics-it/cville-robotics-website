import assert from "node:assert/strict";
import test from "node:test";

import {
  EMPTY_FILTERS,
  filterEvents,
  formatEventDates,
  formatReportedValue,
  formatTotal,
  getProjectBreakdown,
  getDateNote,
  getEventStatus,
  getEventYear,
  getFilterOptions,
  getHistoryFilters,
  getHistoryHref,
  sortOutreachEvents,
  getToday,
  groupEventsByYear,
  totalMetric,
} from "./model";
import { parseOutreachCsv } from "./parse";

const HEADER =
  "Start of Event,End of Event,Name of Project,Type of Project,Event Location,Attendance of Team,Attendance of Event,Event Days,Time Spent for Prep in Hours,Time Spent at Event in Hours";
const PROJECT =
  '9/20/2024,10/18/2024,"Herralink, programming class",Community Event,"Dulles, VA",6,15,3,3,1.5';

function csv(...rows: string[]) {
  return [HEADER, ...rows].join("\r\n");
}

function project(row = PROJECT) {
  const event = parseOutreachCsv(csv(row)).at(0);
  assert.ok(event);
  return event;
}

test("reads the published column layout, quoted commas, decimal hours, and multiline project names", () => {
  const event = project(
    PROJECT.replace(
      "Herralink, programming class",
      "Herralink,\nprogramming class",
    ),
  );
  assert.equal(event.name, "Herralink,\nprogramming class");
  assert.equal(event.location, "Dulles, VA");
  assert.deepEqual(event.eventHours, { kind: "exact", value: 1.5 });
  assert.deepEqual(event.start, { kind: "known", value: "2024-09-20" });
});

test("distinguishes missing values from zero and keeps minimum values as minimums", () => {
  const event = project(
    "3/1/2024,3/1/2024,Robotics club,Youth Club,School,0,,1,5+,0",
  );
  assert.deepEqual(event.teamAttendance, { kind: "exact", value: 0 });
  assert.deepEqual(event.eventAttendance, { kind: "unreported" });
  assert.equal(formatReportedValue(event.teamAttendance), "0");
  assert.equal(formatReportedValue(event.eventAttendance), "Not recorded");
  assert.equal(formatReportedValue(event.prepHours), "5+");
});

test("reads comma-formatted numbers and preserves unrecognized measurements without inventing zero", () => {
  const event = project(
    '3/1/2024,3/1/2024,Robotics club,Youth Club,School,5,"1,200",1,unknown,2',
  );
  assert.deepEqual(event.eventAttendance, { kind: "exact", value: 1200 });
  assert.deepEqual(event.prepHours, { kind: "invalid", source: "unknown" });
  assert.equal(formatTotal(totalMetric([event], "prepHours")), "Not recorded");
});

test("rejects impossible dates while accepting leap days", () => {
  const invalid = project(
    "2/29/2025,2/30/2025,Club,Youth Club,School,5,10,1,0,2",
  );
  assert.equal(invalid.start.kind, "invalid");
  assert.equal(invalid.end.kind, "invalid");
  assert.ok(getDateNote(invalid));
  assert.equal(getEventStatus(invalid, "2026-10-20"), "unconfirmed");
  assert.deepEqual(
    project("2/29/2024,2/29/2024,Club,Youth Club,School,5,10,1,0,2").start,
    { kind: "known", value: "2024-02-29" },
  );
});

test("uses the recorded end date when the start is missing", () => {
  const event = project(
    ",05/29/2026,Bull Run STEAM Fair,Community Event,Bull Run Elementary School,10,150,1,4,4",
  );
  assert.equal(getEventYear(event), "2026");
  assert.equal(getEventStatus(event, "2026-10-20"), "completed");
  assert.equal(formatEventDates(event), "Ended May 29, 2026");
  assert.equal(getDateNote(event), "Start date not recorded.");
});

test("preserves reversed source dates and calls out the inconsistency", () => {
  const event = project(
    "9/29/2023,9/23/2023,Homecoming,Community Event,School,10,200,1,2,3",
  );
  assert.deepEqual(event.end, { kind: "known", value: "2023-09-23" });
  assert.match(getDateNote(event) ?? "", /end date precedes/);
  assert.equal(getEventStatus(event, "2023-09-25"), "unconfirmed");
});

test("keeps upcoming and ongoing records out of completed outreach totals", () => {
  const events = parseOutreachCsv(
    csv(
      "10/24/2026,10/24/2026,Bake Sale,Fundraising,Studio,,,1,3,4",
      "10/19/2026,10/21/2026,School club,Youth Club,School,5,15,3,2,4",
      "10/19/2026,10/19/2026,STEM night,School Event,School,8,100,1,1,2",
    ),
  );
  assert.deepEqual(
    events.map((event) => getEventStatus(event, "2026-10-20")),
    ["upcoming", "ongoing", "completed"],
  );
  const completed = events.filter(
    (event) => getEventStatus(event, "2026-10-20") === "completed",
  );
  assert.equal(completed.length, 1);
  assert.equal(formatTotal(totalMetric(completed, "eventHours")), "2");
  assert.equal(
    getEventStatus(
      project("10/20/2026,10/20/2026,Today,School Event,School,5,10,1,1,2"),
      "2026-10-20",
    ),
    "ongoing",
  );
});

test("handles the team's local day without shifting dates at midnight or daylight saving changes", () => {
  assert.equal(getToday(new Date("2026-10-20T03:30:00Z")), "2026-10-19");
  assert.equal(getToday(new Date("2026-10-20T04:30:00Z")), "2026-10-20");
  assert.equal(getToday(new Date("2026-11-01T05:30:00Z")), "2026-11-01");
  assert.equal(getToday(new Date("2026-11-01T06:30:00Z")), "2026-11-01");
});

test("reports partial totals as minimums and never multiplies hours by attendance or days", () => {
  const events = parseOutreachCsv(
    csv(
      "3/1/2024,3/1/2024,Club,Youth Club,School,20,100,10,5+,4",
      "3/2/2024,3/2/2024,Visit,School Event,School,5,,2,,0",
    ),
  );
  assert.deepEqual(totalMetric(events, "eventAttendance"), {
    value: 100,
    reported: 1,
    incomplete: true,
  });
  assert.equal(formatTotal(totalMetric(events, "eventAttendance")), "100+");
  assert.equal(formatTotal(totalMetric(events, "prepHours")), "5+");
  assert.equal(formatTotal(totalMetric(events, "eventHours")), "4");
  assert.equal(formatTotal(totalMetric([], "eventHours")), "Not recorded");
});

test("combines case-insensitive search, category, and year filters", () => {
  const events = parseOutreachCsv(
    csv(
      "3/1/2024,3/1/2024,Robotics Club,Youth Club,Union Mill School,5,20,1,1,2",
      "3/1/2023,3/1/2023,Robotics Club,Youth Club,Union Mill School,5,20,1,1,2",
      "3/1/2024,3/1/2024,STEAM Fair,Community Event,Union Mill School,5,100,1,1,2",
    ),
  );
  const matches = filterEvents(events, {
    query: " UNION   robotics ",
    year: "2024",
    category: "Youth Club",
  });
  assert.equal(matches.length, 1);
  assert.equal(matches.at(0)?.name, "Robotics Club");
  assert.equal(filterEvents(events, EMPTY_FILTERS).length, 3);
  assert.equal(
    filterEvents(events, { ...EMPTY_FILTERS, query: "no such school" }).length,
    0,
  );
});

test("groups newest first and counts a multi-year project once in its start year", () => {
  const events = parseOutreachCsv(
    csv(
      "9/1/2023,2/16/2024,Mentored FTC Teams,FIRST Team,School,15,30,40,2,80",
      "5/1/2024,5/1/2024,School Visit,School Event,School,5,100,1,1,2",
      "4/1/2024,4/1/2024,School Fair,School Event,School,5,100,1,1,2",
    ),
  );
  const groups = groupEventsByYear(events);
  assert.deepEqual(
    groups.map((group) => group.year),
    ["2024", "2023"],
  );
  assert.equal(groups.at(0)?.projects.at(0)?.name, "School Visit");
  assert.deepEqual(getProjectBreakdown(events).years, [
    { label: "2023", projects: 1 },
    { label: "2024", projects: 2 },
  ]);
  assert.deepEqual(getProjectBreakdown(events).categories, [
    { label: "School Event", projects: 2 },
    { label: "FIRST Team", projects: 1 },
  ]);
  assert.deepEqual(getFilterOptions(events).years, ["2024", "2023"]);
  assert.equal(events.at(0)?.name, "Mentored FTC Teams");
});

test("one outreach feed puts current and upcoming projects first, then recent completions, without dropping unconfirmed projects", () => {
  const events = parseOutreachCsv(
    csv(
      "9/1/2025,10/18/2026,Team mentoring,FIRST Team,School,5,20,1,1,2",
      "10/1/2026,10/2/2026,School visit,School Event,School,5,20,1,1,2",
      "10/19/2026,10/21/2026,Ongoing club,Youth Club,School,5,20,1,1,2",
      "10/24/2026,10/24/2026,Upcoming fair,Community Event,School,5,20,1,1,2",
      "10/22/2026,10/22/2026,Upcoming visit,School Event,School,5,20,1,1,2",
      "9/1/2026,,Unconfirmed club,Youth Club,School,5,20,1,1,2",
      ",10/10/2026,Community event,Community Event,School,5,20,1,1,2",
      ",,Undated project,Community Event,School,5,20,1,1,2",
    ),
  );
  const originalOrder = events.map((event) => event.name);
  assert.deepEqual(
    sortOutreachEvents({ events, today: "2026-10-20" }).map(
      (event) => event.name,
    ),
    ["Ongoing club", "Upcoming visit", "Upcoming fair", "Team mentoring", "Community event", "School visit", "Unconfirmed club", "Undated project"],
  );
  assert.equal(sortOutreachEvents({ events: [], today: "2026-10-20" }).length, 0);
  assert.deepEqual(events.map((event) => event.name), originalOrder);
});

test("rejects unavailable, malformed, or structurally changed feeds instead of showing fabricated data", () => {
  assert.throws(() =>
    parseOutreachCsv("<html>Google Sheets unavailable</html>"),
  );
  assert.throws(
    () => parseOutreachCsv("Name of Project,Attendance\nClub,10"),
    /missing required columns/,
  );
  assert.throws(() => parseOutreachCsv(HEADER), /no project records/);
  assert.throws(() =>
    parseOutreachCsv(csv('3/1/2024,3/1/2024,"Unclosed name')),
  );
  assert.throws(
    () =>
      parseOutreachCsv(csv("3/1/2024,3/1/2024,,Youth Club,School,5,10,1,0,2")),
    /row 2 is invalid/,
  );
});

test("quarter-hour values and minimums retain their reported precision", () => {
  const event = project(
    "3/1/2024,3/1/2024,Club,Youth Club,School,5,20,1,0.25,0.75+",
  );
  assert.equal(formatReportedValue(event.prepHours), "0.25");
  assert.equal(formatReportedValue(event.eventHours), "0.75+");
  assert.equal(formatTotal(totalMetric([event], "prepHours")), "0.25");
});

test("missing or invalid end dates do not imply that an ongoing project is completed", () => {
  const missingEnd = project(
    "9/1/2026,,School club,Youth Club,School,5,20,1,1,2",
  );
  const invalidEnd = project(
    "9/1/2026,invalid,School club,Youth Club,School,5,20,1,1,2",
  );
  assert.equal(getEventStatus(missingEnd, "2026-10-20"), "unconfirmed");
  assert.equal(getEventStatus(invalidEnd, "2026-10-20"), "unconfirmed");
  assert.equal(
    getEventStatus(
      project("11/1/2026,,School club,Youth Club,School,5,20,1,1,2"),
      "2026-10-20",
    ),
    "upcoming",
  );
});

test("URL filters round-trip special characters and update when browser history changes", () => {
  const options = {
    years: ["2024", "2026"],
    categories: ["Youth Club", "Community Event"],
  };
  const filters = {
    query: "STEM & robotics",
    year: "2024",
    category: "Youth Club",
  };
  const url = new URL(
    getHistoryHref(filters),
    "https://www.centrevillerobotics.org",
  );
  assert.equal(url.pathname, "/outreach");
  assert.equal(url.hash, "#projects");
  assert.equal(getHistoryHref(EMPTY_FILTERS), "/outreach#projects");
  assert.deepEqual(getHistoryFilters(url.searchParams, options), filters);
  assert.deepEqual(
    getHistoryFilters(
      new URLSearchParams("q=Bull+Run&year=2026&type=Community+Event"),
      options,
    ),
    { query: "Bull Run", year: "2026", category: "Community Event" },
  );
  assert.deepEqual(
    getHistoryFilters(
      new URLSearchParams("year=unknown&type=Unknown"),
      options,
    ),
    EMPTY_FILTERS,
  );
  assert.deepEqual(
    getHistoryFilters(new URLSearchParams(), options),
    EMPTY_FILTERS,
  );
});

test("ignores empty lines and trims spreadsheet whitespace", () => {
  const events = parseOutreachCsv(
    csv("", PROJECT, "  , , , , , , , , ,  ", ""),
  );
  assert.equal(events.length, 1);
  assert.equal(
    project(PROJECT.replace("Community Event", "  Community Event ")).category,
    "Community Event",
  );
});
