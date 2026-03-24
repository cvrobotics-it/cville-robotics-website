import type { Metadata } from 'next'

import NewsletterCard from '@/components/NewsletterCard'
import { getNewsletterIssues } from '@/lib/newsletter/content'

export const metadata: Metadata = {
  title: 'Newsletter | Centreville Robotics',
  description: 'Weekly updates, team news, and highlights from Centreville Robotics.',
}

export default async function NewsletterPage() {
  const issues = (await getNewsletterIssues()) || []
  const [featuredIssue, ...otherIssues] = issues

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto space-y-12 px-4 py-14">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-base-content/55">Weekly updates</p>
          <h1 className="text-5xl font-bold text-primary md:text-6xl">Newsletter</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-base-content/75">
            Weekly updates from the team, upcoming events, outreach highlights, and competition progress.
          </p>
        </section>

        {featuredIssue ? (
          <NewsletterCard issue={featuredIssue} variant="featured" />
        ) : (
          <section className="rounded-[1.75rem] border border-base-300 bg-base-100 p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-primary">No newsletter issues yet</h2>
            <p className="mt-3 text-base-content/70">The latest team updates will appear here once newsletter issues are published.</p>
          </section>
        )}

        {otherIssues.length > 0 ? (
          <section className="space-y-5">
            <h2 className="text-3xl font-bold text-primary">Past issues</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {otherIssues.map((issue) => (
                <NewsletterCard key={issue._id} issue={issue} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
