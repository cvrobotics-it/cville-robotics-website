import { newsletterIssueBySlugQuery, newsletterIssuesQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/client'
import type { SanityNewsletterIssue } from '@/sanity/lib/types'

export async function getNewsletterIssues() {
  return sanityFetch<SanityNewsletterIssue[]>({
    query: newsletterIssuesQuery,
    revalidate: 60,
  })
}

export async function getNewsletterIssue(slug: string) {
  return sanityFetch<SanityNewsletterIssue | null>({
    query: newsletterIssueBySlugQuery,
    params: { slug },
    revalidate: 60,
  })
}
