import assert from "node:assert/strict";
import test from "node:test";

import {
  seasonDetailsParametersSchema,
  teamEventParametersSchema,
  teamEventsParametersSchema,
} from "./request-parameters";

test("API parameters reject malformed numbers and path fragments before contacting upstream services", () => {
  assert.equal(
    teamEventsParametersSchema.safeParse({
      team: "frc5243",
      year: "2026suffix",
    }).success,
    false,
  );
  assert.equal(
    teamEventsParametersSchema.safeParse({ team: "../status", year: "2026" })
      .success,
    false,
  );
  assert.equal(
    teamEventParametersSchema.safeParse({
      team: "frc5243",
      eventKey: "../../status",
    }).success,
    false,
  );
  assert.deepEqual(
    teamEventParametersSchema.parse({ team: "frc5243", eventKey: "2026vahay" }),
    { team: "frc5243", eventKey: "2026vahay" },
  );
});

test("season detail requests have bounded fan-out and duplicate seasons only run once", () => {
  assert.equal(
    seasonDetailsParametersSchema.safeParse({
      team: "frc5243",
      years: Array(1000).fill("2026"),
    }).success,
    false,
  );
  assert.equal(
    seasonDetailsParametersSchema.safeParse({ team: "frc5243", years: [] })
      .success,
    false,
  );
  assert.deepEqual(
    seasonDetailsParametersSchema.parse({
      team: "frc5243",
      years: ["2025", "2026", "2026"],
    }).years,
    [2025, 2026],
  );
});
