import type { ReactNode } from "react";
import { OUTREACH_SHEET_URL } from "@/lib/outreach/source";
import "./outreach.css";

export function OutreachLayout({ children }: { children: ReactNode }) {
  return (
    <div className="outreach-site">
      <div className="outreach-wrap">
        <header className="outreach-header">
          <h1>Outreach</h1>
          <p>Follow our school visits, mentoring, and community events.</p>
        </header>
        {children}
      </div>
    </div>
  );
}

export function OutreachSource({ fetchedAt }: { fetchedAt: string | null }) {
  return (
    <footer className="outreach-source">
      {fetchedAt && (
        <p>
          Last checked{" "}
          <time dateTime={fetchedAt}>
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "America/New_York",
            }).format(new Date(fetchedAt))}
          </time>{" "}Eastern.
        </p>
      )}
      <div>
        <a href={OUTREACH_SHEET_URL} target="_blank" rel="noopener noreferrer">
          View spreadsheet<span className="sr-only">, opens in a new tab</span>
        </a>
      </div>
    </footer>
  );
}

export function OutreachUnavailable() {
  return (
    <div role="status" className="outreach-empty">
      <h2>We couldn&apos;t load the outreach log</h2>
      <p>Please try again, or open the spreadsheet below.</p>
      <a href="/outreach">Try again</a>
    </div>
  );
}
