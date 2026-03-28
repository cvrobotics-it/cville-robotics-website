"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { urlFor } from "@/sanity/lib/image";
import type { SanityGalleryAlbum } from "@/sanity/lib/types";

type FeaturedAlbumsCarouselProps = {
  albums: SanityGalleryAlbum[];
};

export default function FeaturedAlbumsCarousel({ albums }: FeaturedAlbumsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: albums.length > 1 },
    albums.length > 1
      ? [
          Autoplay({
            delay: 5000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]
      : []
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/50">Featured</p>
          <h3 className="text-3xl font-bold text-primary">Recent albums</h3>
        </div>
        <p className="text-sm text-base-content/60">A quick look at the latest team moments.</p>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-xl" ref={emblaRef}>
        <div className="flex">
          {albums.map((album) => {
            const coverIndex = album.coverImageIndex ?? 0
            const coverPhoto = album.photos[coverIndex]
            const coverImage = coverPhoto?.image?.asset
              ? urlFor(coverPhoto.image).width(1600).height(900).fit("crop").url()
              : null;
            const formattedDate = new Date(album.eventDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });

            return (
              <article key={album._id} className="relative min-w-0 flex-[0_0_100%]">
                <div className="relative aspect-[16/8] bg-base-200">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={coverPhoto?.image?.alt || album.title}
                      fill
                      className="object-cover"
                      priority={selectedIndex === albums.indexOf(album)}
                      sizes="(max-width: 1280px) 100vw, 1200px"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
                    <div className="max-w-3xl space-y-3 text-white">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-white/75">
                        <span className="badge badge-outline border-white/30 text-white">{album.seasonYear}</span>
                        <span>{formattedDate}</span>
                        {album.location ? <span>{album.location}</span> : null}
                      </div>
                      <h4 className="text-3xl font-bold md:text-4xl">{album.title}</h4>
                      {album.summary ? <p className="max-w-2xl text-base text-white/80">{album.summary}</p> : null}
                      <div className="pt-2">
                        <Link href={`/gallery/${album.slug}`} className="btn btn-primary btn-sm md:btn-md">
                          View album
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {albums.length > 1 ? (
        <div className="flex items-center justify-center gap-2">
          {albums.map((album, index) => (
            <button
              key={album._id}
              type="button"
              aria-label={`Go to album ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${index === selectedIndex ? "w-8 bg-primary" : "w-2.5 bg-base-300 hover:bg-base-content/30"}`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
