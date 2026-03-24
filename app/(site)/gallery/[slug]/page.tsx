import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import AlbumPhotoGallery from '@/components/album-photo-gallery'
import { getGalleryAlbum } from '@/lib/gallery/content'

export const dynamic = 'force-dynamic'

type GalleryAlbumPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: GalleryAlbumPageProps): Promise<Metadata> {
  const { slug } = await params
  const album = await getGalleryAlbum(slug)

  if (!album) {
    return { title: 'Gallery | Centreville Robotics' }
  }

  return {
    title: `${album.title} | Gallery | Centreville Robotics`,
    description: album.summary || `Browse photos from ${album.title}.`,
  }
}

export default async function GalleryAlbumPage({ params }: GalleryAlbumPageProps) {
  const { slug } = await params
  const album = await getGalleryAlbum(slug)

  if (!album) notFound()

  const formattedDate = new Date(album.eventDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto space-y-10 px-4 py-12">
        <div>
          <Link href="/gallery" className="btn btn-outline btn-sm">
            Back to Gallery
          </Link>
        </div>

        <section className="rounded-[1.75rem] border border-base-300 bg-base-100 p-8 shadow-xl">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/60">
              <span className="badge badge-outline">{album.seasonYear}</span>
              <span className="badge badge-ghost">{album.category === 'current' ? 'Current gallery' : 'Archive'}</span>
            </div>
            <h1 className="text-5xl font-bold text-primary">{album.title}</h1>
            <div className="flex flex-wrap gap-5 text-base text-base-content/70">
              <span>{formattedDate}</span>
              {album.location ? <span>{album.location}</span> : null}
              <span>{album.photos.length} photos</span>
            </div>
            {album.summary ? <p className="text-lg leading-relaxed text-base-content/75">{album.summary}</p> : null}
          </div>
        </section>

        <AlbumPhotoGallery album={album} />
      </div>
    </div>
  )
}
