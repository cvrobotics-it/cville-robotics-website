import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import ProseableText from '@/components/proseable-text'
import { getNewsletterIssue, getNewsletterIssues } from '@/lib/newsletter/content'
import { urlFor } from '@/sanity/lib/image'

type NewsletterIssuePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const issues = (await getNewsletterIssues()) || []
  return issues.map((issue) => ({ slug: issue.slug }))
}

export async function generateMetadata({ params }: NewsletterIssuePageProps): Promise<Metadata> {
  const { slug } = await params
  const issue = await getNewsletterIssue(slug)

  if (!issue) {
    return { title: 'Newsletter' }
  }

  return {
    title: `${issue.title} | Newsletter`,
    description: issue.summary,
  }
}

export default async function NewsletterIssuePage({ params }: NewsletterIssuePageProps) {
  const { slug } = await params
  const issue = await getNewsletterIssue(slug)

  if (!issue) notFound()

  const heroUrl = issue.heroImage?.asset
    ? urlFor(issue.heroImage).width(1800).height(1000).fit('crop').url()
    : null

  return (
    <div className="min-h-screen bg-base-200">
      <article className="container mx-auto space-y-8 px-4 py-14">
        <header className="rounded-[1.75rem] border border-base-300 bg-base-100 p-8 shadow-xl">
          <p className="text-sm text-base-content/55">
            {new Date(issue.publishDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <h1 className="mt-3 text-5xl font-bold text-primary">{issue.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-base-content/75">{issue.summary}</p>
        </header>

        {heroUrl ? (
          <div className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 p-3 shadow-xl">
            <Image
              src={heroUrl}
              alt={issue.heroImage?.alt || issue.title}
              width={1800}
              height={1000}
              className="h-auto w-full rounded-[1.25rem] object-cover"
            />
          </div>
        ) : null}

        <section className="rounded-[1.75rem] border border-base-300 bg-base-100 p-8 shadow-xl">
          <ProseableText value={issue.body} />
        </section>
      </article>
    </div>
  )
}
