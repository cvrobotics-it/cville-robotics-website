import assert from "node:assert/strict";
import test from "node:test";

import { formatDateOnly, getDateRangeStatus, getToday } from "./date-only";

test("date-only content keeps its calendar date across server and browser time zones", () => {
  const previous = process.env.TZ;
  try {
    for (const zone of [
      "UTC",
      "America/New_York",
      "Pacific/Honolulu",
      "Asia/Tokyo",
    ]) {
      process.env.TZ = zone;
      assert.equal(
        formatDateOnly("2026-10-20", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        "October 20, 2026",
      );
    }
  } finally {
    if (previous === undefined) delete process.env.TZ;
    else process.env.TZ = previous;
  }
});

test("an event remains ongoing for its entire first and last calendar days", () => {
  const range = { start: "2026-10-18", end: "2026-10-20" };
  assert.equal(
    getDateRangeStatus({ ...range, today: "2026-10-17" }),
    "upcoming",
  );
  assert.equal(
    getDateRangeStatus({ ...range, today: "2026-10-18" }),
    "ongoing",
  );
  assert.equal(
    getDateRangeStatus({ ...range, today: "2026-10-20" }),
    "ongoing",
  );
  assert.equal(
    getDateRangeStatus({ ...range, today: "2026-10-21" }),
    "completed",
  );
  assert.equal(getToday(new Date("2026-10-21T02:00:00Z")), "2026-10-20");
});
