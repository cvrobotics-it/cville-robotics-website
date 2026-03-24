import { getManifest } from '@/lib/gallery/getManifest'
import {
  archivedGalleryAlbumsQuery,
  currentGalleryAlbumsQuery,
  galleryAlbumBySlugQuery,
} from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/client'
import type { SanityGalleryAlbum } from '@/sanity/lib/types'

export async function getGalleryContent() {
  const [currentAlbums, archivedAlbums] = await Promise.all([
    sanityFetch<SanityGalleryAlbum[]>({ query: currentGalleryAlbumsQuery, revalidate: 60 }),
    sanityFetch<SanityGalleryAlbum[]>({ query: archivedGalleryAlbumsQuery, revalidate: 60 }),
  ])

  if ((currentAlbums?.length || 0) > 0 || (archivedAlbums?.length || 0) > 0) {
    return {
      currentAlbums: currentAlbums || [],
      archivedAlbums: archivedAlbums || [],
      fallbackAlbums: [],
    }
  }

  const { albums } = await getManifest()

  return {
    currentAlbums: [],
    archivedAlbums: [],
    fallbackAlbums: albums,
  }
}

export async function getGalleryAlbum(slug: string) {
  return sanityFetch<SanityGalleryAlbum | null>({
    query: galleryAlbumBySlugQuery,
    params: { slug },
    revalidate: 60,
  })
}
