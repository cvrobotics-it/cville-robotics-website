import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: false,
})

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  stega: false,
  token,
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: string
  params?: Record<string, unknown>
  revalidate?: number | false
}): Promise<QueryResponse> {
  return serverClient.fetch<QueryResponse>(query, params, {
    next: {
      revalidate,
    },
  })
}
