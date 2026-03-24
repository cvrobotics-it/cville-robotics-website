import { sanityFetch } from '@/sanity/lib/client'
import { sponsorsQuery } from '@/sanity/lib/queries'
import type { SanitySponsor } from '@/sanity/lib/types'

export async function getSponsors() {
  return sanityFetch<SanitySponsor[]>({
    query: sponsorsQuery,
    revalidate: 60,
  })
}
