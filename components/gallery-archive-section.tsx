import GalleryAlbumCard from '@/components/gallery-album-card'
import type { SanityGalleryAlbum } from '@/sanity/lib/types'

type GalleryArchiveSectionProps = {
  albums: SanityGalleryAlbum[]
}

export default function GalleryArchiveSection({ albums }: GalleryArchiveSectionProps) {
  const albumsByYear = albums.reduce<Record<string, SanityGalleryAlbum[]>>((acc, album) => {
    const year = String(album.seasonYear)
    acc[year] ||= []
    acc[year].push(album)
    return acc
  }, {})
  const yearEntries = Object.entries(albumsByYear)
    .map(([year, yearAlbums]) => [
      year,
      [...yearAlbums].sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()),
    ] as const)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))

  return (
    <div className="space-y-12">
      {yearEntries.map(([year, yearAlbums]) => (
        <section key={year} className="space-y-5">
          <div className="flex items-center gap-4 border-b border-base-300 pb-3">
            <h3 className="text-2xl font-bold text-primary">{year}</h3>
            <div className="h-px flex-1 bg-base-300" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {yearAlbums.map((album) => (
              <GalleryAlbumCard key={album._id} album={album} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
