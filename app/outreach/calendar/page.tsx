import React from "react";

const GOOGLE_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/u/0/embed?src=c_7e3c604fed25fa99f4fc588a7043ec80770b70f023e5991fe681678d68b06a10@group.calendar.google.com&ctz=America/New_York";

export default function OutreachCalendarPage() {
  return (
    <main className="w-full px-0 my-12">
      <h1 className="text-4xl font-bold mb-4 text-primary tracking-wide text-center">
        Our Team&apos;s Calendar
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Stay up to date with our upcoming outreach events and meetings!
      </p>
      <iframe
        src={GOOGLE_CALENDAR_EMBED_URL}
        className="w-full"
        style={{
          minHeight: 800,
          minWidth: 0,
          border: "none",
          background: "white",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          padding: 0,
        }}
        frameBorder="0"
        scrolling="no"
        title="Robotics Outreach Calendar"
      />
    </main>
  );
}
