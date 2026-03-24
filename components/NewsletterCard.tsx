import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/sanity/lib/image'
import type { SanityNewsletterIssue } from '@/sanity/lib/types'

type NewsletterCardProps = {
  issue: SanityNewsletterIssue
  variant?: 'featured' | 'default'
}

export default function NewsletterCard({
  issue,
  variant = 'default',
}: NewsletterCardProps) {
  const heroUrl = issue.heroImage?.asset
    ? urlFor(issue.heroImage).width(1200).height(630).fit('crop').url()
    : null

  const cardThumbUrl = issue.heroImage?.asset
    ? urlFor(issue.heroImage).width(200).height(200).fit('crop').url()
    : null

  const formattedDate = new Date(issue.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (variant === 'featured') {
    return (
      <article className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-xl">
        {heroUrl ? (
          <div className="relative aspect-[2/1] bg-base-200">
            <Image
              src={heroUrl}
              alt={issue.heroImage?.alt || issue.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : null}
        <div className="space-y-4 p-6 lg:p-8">
          <div className="flex items-center gap-3 text-sm text-base-content/60">
            <time dateTime={issue.publishDate}>{formattedDate}</time>
          </div>
          <h2 className="text-3xl font-bold text-primary">{issue.title}</h2>
          <p className="text-base-content/75">{issue.summary}</p>
          <Link href={`/newsletter/${issue.slug}`} className="btn btn-primary w-fit">
            Read issue
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex gap-4 rounded-[1.25rem] border border-base-300 bg-base-100 p-4 shadow-lg transition-shadow hover:shadow-xl">
      {cardThumbUrl ? (
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-base-200">
          <Image
            src={cardThumbUrl}
            alt={issue.heroImage?.alt || issue.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      ) : null}
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-xs text-base-content/55">{formattedDate}</p>
          <h3 className="mt-1 text-xl font-semibold text-base-content group-hover:text-primary">
            <Link href={`/newsletter/${issue.slug}`}>{issue.title}</Link>
          </h3>
          <p className="mt-2 text-sm text-base-content/65 line-clamp-3">{issue.summary}</p>
        </div>
        <Link href={`/newsletter/${issue.slug}`} className="mt-4 text-sm font-medium text-primary hover:underline">
          Read more
        </Link>
      </div>
    </article>
  )
}
