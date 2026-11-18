import { unstable_cache, unstable_noStore } from "next/cache";

import type { OutreachEvent } from "./model";
import { parseOutreachCsv } from "./parse";
import { OUTREACH_CSV_URL, OUTREACH_REVALIDATE_SECONDS } from "./source";

export type OutreachContent =
  | { kind: "ready"; events: OutreachEvent[]; fetchedAt: string }
  | { kind: "unavailable" };

const loadOutreach = unstable_cache(
  async () => {
    const response = await fetch(OUTREACH_CSV_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok)
      throw new Error(`Outreach sheet returned HTTP ${response.status}.`);
    const events = parseOutreachCsv(await response.text());
    return { events, fetchedAt: new Date().toISOString() };
  },
  ["outreach-sheet-v1", OUTREACH_CSV_URL],
  { revalidate: OUTREACH_REVALIDATE_SECONDS },
);

export async function getOutreachContent(): Promise<OutreachContent> {
  try {
    return { kind: "ready", ...(await loadOutreach()) };
  } catch (error) {
    unstable_noStore();
    console.error({
      event: "outreach_sheet_unavailable",
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return { kind: "unavailable" };
  }
}
