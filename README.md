# Centreville Robotics Website

Website for Centreville Robotics / FRC Team 5243, built with Next.js and deployed through Vercel.

## Tech stack

- [Next.js](https://nextjs.org/) 15 with the App Router
- [React](https://react.dev/) 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/)
- [Sanity](https://www.sanity.io/) for CMS content and `/studio`
- The Blue Alliance and Statbotics APIs for team/event data
- Vercel Analytics and Speed Insights

## Getting started

Install dependencies:

```bash
pnpm install
```

Create `.env.local` with the required Sanity values:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-24
```

Optional environment variables:

```bash
SANITY_API_READ_TOKEN=your-read-token
SANITY_API_WRITE_TOKEN=your-write-token
TBA_API_KEY=your-blue-alliance-key
STATBOTICS_API_KEY=your-statbotics-key
NEXT_PUBLIC_TEAM_NUMBER=5243
NEXT_PUBLIC_COMPETITION_YEARS=2026,2025,2024
```

Start the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

## Common commands

```bash
pnpm dev          # run locally
pnpm build        # create a production build
pnpm start        # run the production build
pnpm lint         # run ESLint
pnpm test         # run regression tests
pnpm seed:sanity  # seed Sanity with starter content
```

## Project structure

```text
app/              Next.js routes, API routes, and Sanity Studio route
components/       Shared UI components
lib/              Content loaders and external API helpers
public/           Static assets, sponsor logos, and downloadable PDFs
sanity/           Sanity schemas, queries, client config, and Studio structure
scripts/          Content migration and seeding utilities
```

## Updating content

- Site pages live under `app/(site)`.
- Shared navigation and layout pieces live in `components`.
- CMS-backed sponsors, gallery albums, and newsletters are defined in `sanity/schemaTypes`.
- Static files that should be served directly belong in `public`.
- The sponsorship packet download is `public/Sponsorship Proposal Packet.pdf` and is linked from `components/sponsorship-cta.tsx`.

## Team calendar

`/calendar` displays the team's Google Calendar for meetings, competitions, outreach, and other activities. Its page lives in `app/(site)/calendar/page.tsx`. The former `/outreach/calendar` URL permanently redirects to `/calendar`, and the calendar has its own navigation entry.

## Outreach data

`/outreach` reads the published Google Sheets CSV feed configured in `lib/outreach/source.ts`. Keep that source tab publicly published. Changes to the published data appear after the 15-minute cache expires and a visitor requests the page; Google may also take time to publish edits.

The page shows one project list with search and a year filter. Dates and locations are visible; opening a project reveals its recorded attendance and hours. Six projects appear initially, with a button to show more. Current and upcoming projects appear first, followed by recent completed projects. Its `q`, `year`, and legacy `type` URL parameters can be bookmarked or shared. Old `/outreach/past` links redirect to `/outreach` and retain their filters.

The server validates the sheet before caching it. Keep the column names used in `lib/outreach/parse.ts`, and enter dates as `MM/DD/YYYY`. Unreported measurements are omitted from project details, zero remains zero, and values such as `5+` remain minimums. Hours are shown as recorded.

The page links to the original spreadsheet. If Google is unavailable, an existing successful cache can still be served; when no cache is available, the page shows an unavailable message with that source link.

Run the spreadsheet parsing and calculation checks with `pnpm test:outreach`.

## Deployment

Production deploys are handled by Vercel from the main repository. Open pull requests against the upstream `main` branch so changes can be reviewed, merged, and deployed from the canonical project.
