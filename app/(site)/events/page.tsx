import { Metadata } from "next";
import {
  Activity,
  ExternalLink,
} from "lucide-react";
import EventsPageContent from "@/components/events-page-content";

import {
  TEAM_KEY,
  TEAM_NUMBER,
  ALL_YEARS,
} from "@/lib/tba-api";

export const metadata: Metadata = {
  title: "Events & Competitions",
  description: `Follow Team ${TEAM_NUMBER}'s competition schedule, match results, and performance analytics from FIRST Robotics Competition events.`,
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/50">{children}</p>;
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="relative overflow-hidden border-b border-base-300 bg-base-100">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="container relative mx-auto px-4 py-14 md:py-18">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
            <div>
              <SectionEyebrow>Team {TEAM_NUMBER} schedule</SectionEyebrow>
              <h1 className="mt-3 max-w-4xl text-5xl font-bold tracking-tight text-primary md:text-7xl">
                Events & Competitions
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-base-content/75 md:text-xl">
                Competition history, upcoming dates, official rankings, and match footage in one place without loading heavy video embeds until you ask for them.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="badge badge-primary badge-lg">Active since 2014</span>
                <span className="badge badge-outline badge-lg bg-base-100/80">Choose a season below</span>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-200/60 shadow-xl backdrop-blur">
              <div className="border-b border-base-300 bg-base-100/75 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-content">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <SectionEyebrow>Live sources</SectionEyebrow>
                    <p className="mt-1 font-bold text-base-content">Official data links</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-5">
                <a
                  href={`https://www.thebluealliance.com/team/${TEAM_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full justify-between rounded-2xl"
                >
                  The Blue Alliance
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.statbotics.io/team/${TEAM_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full justify-between rounded-2xl"
                >
                  Statbotics
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <EventsPageContent teamKey={TEAM_KEY} years={ALL_YEARS} />
      </div>
    </div>
  );
}
