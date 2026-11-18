import type { Metadata } from "next";

import OutreachHistory from "@/components/outreach/outreach-history";
import {
  OutreachLayout,
  OutreachSource,
  OutreachUnavailable,
} from "@/components/outreach/outreach-layout";
import { getOutreachContent } from "@/lib/outreach/content";
import { getToday } from "@/lib/outreach/model";

export const metadata: Metadata = {
  title: "Outreach",
  description:
    "See Centreville Robotics' latest outreach projects, school visits, and community events from our public outreach log.",
};

export const dynamic = "force-dynamic";

export default async function OutreachPage() {
  const content = await getOutreachContent();
  return (
    <OutreachLayout>
      {content.kind === "ready" ? (
        <OutreachHistory events={content.events} today={getToday()} />
      ) : (
        <OutreachUnavailable />
      )}
      <OutreachSource
        fetchedAt={content.kind === "ready" ? content.fetchedAt : null}
      />
    </OutreachLayout>
  );
}
