import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

const CALENDAR_ID =
  "c_7e3c604fed25fa99f4fc588a7043ec80770b70f023e5991fe681678d68b06a10@group.calendar.google.com";

const GOOGLE_CALENDAR_EMBED_URL = `https://calendar.google.com/calendar/u/0/embed?src=${encodeURIComponent(
  CALENDAR_ID
)}&ctz=America/New_York`;

const GOOGLE_CALENDAR_OPEN_URL = `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(
  CALENDAR_ID
)}`;

export const metadata: Metadata = {
  title: "Outreach Calendar | Centreville Robotics",
  description:
    "Upcoming outreach events and meetings for Centreville Robotics (Aegis Robotics). View and add to your Google Calendar.",
};

export default function OutreachCalendarPage() {
  return (
    <main className="w-full my-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-primary tracking-wide text-center">
          Our Team&apos;s Calendar
        </h1>
        <p className="text-lg text-base-content/80 mb-6 text-center">
          Stay up to date with our upcoming outreach events and meetings. Times
          are shown in Eastern Time.
        </p>

        <div className="flex justify-center gap-3 mb-8">
          <Link
            href={GOOGLE_CALENDAR_OPEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Open in Google Calendar
          </Link>
          <Link
            href={GOOGLE_CALENDAR_OPEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Add to My Calendar
          </Link>
        </div>

        <div className="w-full max-w-5xl mx-auto rounded-lg border border-gray-200 overflow-hidden">
          <iframe
            src={GOOGLE_CALENDAR_EMBED_URL}
            className="w-full h-[70vh] min-h-[480px] sm:min-h-[540px] md:h-[80vh]"
            loading="lazy"
            style={{ border: "0", background: "white" }}
            scrolling="no"
            title="Robotics Outreach Calendar"
          />
        </div>

        <p className="text-center text-sm opacity-70 mt-4">
          Can&apos;t see the calendar? Open it directly in Google Calendar using
          the button above.
        </p>
      </div>
    </main>
  );
}
