import type { Metadata } from 'next'

import CarouselsSection from '@/components/CarouselsSection'
import FeaturedAlbumsCarousel from '@/components/featured-albums-carousel'
import GalleryAlbumCard from '@/components/gallery-album-card'
import GalleryArchiveSection from '@/components/gallery-archive-section'
import { getGalleryContent } from '@/lib/gallery/content'

export const metadata: Metadata = {
  title: 'Gallery | Centreville Robotics',
  description: 'Browse current team photos and our archived gallery from past robotics seasons and events.',
}

export default async function GalleryPage() {
  const { currentAlbums, archivedAlbums, fallbackAlbums } = await getGalleryContent()

  if (fallbackAlbums.length > 0) {
    return <CarouselsSection albums={fallbackAlbums} />
  }

  return (
    <div className="min-h-screen bg-base-200">
      <section className="border-b border-base-300 bg-base-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/55">Photo gallery</p>
            <h1 className="text-5xl font-bold text-primary md:text-6xl">Gallery</h1>
            <p className="text-lg leading-relaxed text-base-content/75 md:text-xl">
              Team photos, outreach highlights, and competition moments organized into the current season and our archive.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto space-y-16 px-4 py-12">
        <section className="space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/50">Current season</p>
              <h2 className="text-4xl font-bold text-primary">Current gallery</h2>
            </div>
            <p className="text-sm text-base-content/60">Featured albums and the latest team moments.</p>
          </div>

          {currentAlbums.length > 0 ? (
            <div className="space-y-8">
              {currentAlbums.length > 1 ? <FeaturedAlbumsCarousel albums={currentAlbums.slice(0, 3)} /> : null}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {currentAlbums.map((album) => (
                  <GalleryAlbumCard key={album._id} album={album} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-base-300 bg-base-100 p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary">No current albums yet</h3>
              <p className="mt-2 text-base-content/70">Current-season albums will appear here once they are available.</p>
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/50">Archive</p>
              <h2 className="text-4xl font-bold text-primary">Our past photos</h2>
            </div>
            <p className="text-sm text-base-content/60">Older albums grouped by season.</p>
          </div>

          {archivedAlbums.length > 0 ? (
            <GalleryArchiveSection albums={archivedAlbums} />
          ) : (
            <div className="rounded-[1.5rem] border border-base-300 bg-base-100 p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-primary">Archive is empty</h3>
              <p className="mt-2 text-base-content/70">Past seasons will appear here once archived albums are available.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
