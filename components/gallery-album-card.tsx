import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/sanity/lib/image'
import type { SanityGalleryAlbum } from '@/sanity/lib/types'

type GalleryAlbumCardProps = {
  album: SanityGalleryAlbum
}

export default function GalleryAlbumCard({ album }: GalleryAlbumCardProps) {
  const coverImage = album.coverImage?.asset
    ? urlFor(album.coverImage).width(1200).height(900).fit('crop').url()
    : null
  const formattedDate = new Date(album.eventDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-base-100 shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/gallery/${album.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-base-200">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={album.coverImage?.alt || album.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : null}
        </div>
        <div className="space-y-3 p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/55">
            <span className="badge badge-outline">{album.seasonYear}</span>
            <span>{formattedDate}</span>
          </div>
          <h3 className="text-2xl font-bold text-primary">{album.title}</h3>
          {album.location ? <p className="text-sm text-base-content/65">{album.location}</p> : null}
          {album.summary ? <p className="line-clamp-3 text-base-content/75">{album.summary}</p> : null}
          <p className="text-sm font-medium text-base-content/55">{album.photos.length} photos</p>
        </div>
      </Link>
    </article>
  )
}
