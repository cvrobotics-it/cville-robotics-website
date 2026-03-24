"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";

import { urlFor } from "@/sanity/lib/image";
import type { SanityGalleryAlbum } from "@/sanity/lib/types";

type AlbumPhotoGalleryProps = {
  album: SanityGalleryAlbum;
};

export default function AlbumPhotoGallery({ album }: AlbumPhotoGalleryProps) {
  const photos = useMemo(
    () =>
      album.photos
        .map((photo) => ({
          ...photo,
          imageUrl: photo.image?.asset ? urlFor(photo.image).width(1600).height(1200).fit("max").url() : null,
          thumbUrl: photo.image?.asset ? urlFor(photo.image).width(600).height(450).fit("crop").url() : null,
        }))
        .filter((photo) => photo.imageUrl),
    [album.photos]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: photos.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((current) => (current === null ? 0 : (current + 1) % photos.length));
      if (event.key === "ArrowLeft") setLightboxIndex((current) =>
        current === null ? 0 : (current - 1 + photos.length) % photos.length
      );
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("overflow-hidden");

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [lightboxIndex, photos.length]);

  if (photos.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-base-300 bg-base-100 p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-primary">No photos in this album yet</h2>
        <p className="mt-2 text-base-content/70">Photos added to this album will appear here automatically.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-xl" ref={emblaRef}>
          <div className="flex">
            {photos.map((photo, index) => (
              <article key={photo._key} className="min-w-0 flex-[0_0_100%]">
                <button
                  type="button"
                  className="relative block aspect-[16/9] w-full bg-base-200 text-left"
                  onClick={() => setLightboxIndex(index)}
                >
                  <Image
                    src={photo.imageUrl!}
                    alt={photo.image?.alt || photo.caption || album.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    priority={index === 0}
                  />
                </button>
              </article>
            ))}
          </div>
        </div>

        {photos[selectedIndex]?.caption || photos[selectedIndex]?.photographer ? (
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
            {photos[selectedIndex]?.caption ? <p className="text-base-content/80">{photos[selectedIndex].caption}</p> : null}
            {photos[selectedIndex]?.photographer ? (
              <p className="mt-2 text-sm text-base-content/55">Photo by {photos[selectedIndex].photographer}</p>
            ) : null}
          </div>
        ) : null}

        {photos.length > 1 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {photos.map((photo, index) => (
              <button
                key={photo._key}
                type="button"
                className={clsx(
                  "relative aspect-[4/3] overflow-hidden rounded-xl border bg-base-200 transition",
                  index === selectedIndex ? "border-primary shadow-md" : "border-base-300 hover:border-base-content/30"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
              >
                <Image
                  src={photo.thumbUrl || photo.imageUrl!}
                  alt={photo.image?.alt || photo.caption || album.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, 140px"
                />
              </button>
            ))}
          </div>
        ) : null}
      </section>

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${album.title} photo viewer`}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setLightboxIndex(null);
            }
          }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close viewer"
            onClick={() => setLightboxIndex(null)}
          />
          <div className="relative z-10 w-full max-w-6xl">
            <Image
              src={photos[lightboxIndex].imageUrl!}
              alt={photos[lightboxIndex].image?.alt || photos[lightboxIndex].caption || album.title}
              width={1600}
              height={1200}
              className="max-h-[82vh] w-full rounded-2xl object-contain"
            />

            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-3 py-2 text-2xl text-white hover:bg-white/25"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-3 py-2 text-2xl text-white hover:bg-white/25"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % photos.length)}
              aria-label="Next photo"
            >
              ›
            </button>
            <button
              type="button"
              className="absolute right-3 top-3 rounded-full bg-white/15 px-3 py-2 text-white hover:bg-white/25"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close viewer"
            >
              Close
            </button>

            <div className="mt-4 rounded-2xl bg-white/10 p-4 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-white/70">
                  {lightboxIndex + 1} / {photos.length}
                </span>
                {photos[lightboxIndex].photographer ? (
                  <span className="text-sm text-white/70">Photo by {photos[lightboxIndex].photographer}</span>
                ) : null}
              </div>
              {photos[lightboxIndex].caption ? <p className="mt-2">{photos[lightboxIndex].caption}</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
