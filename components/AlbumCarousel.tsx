// components/AlbumCarousel.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
import Autoplay from "embla-carousel-autoplay";
import type { Album } from "@/lib/gallery/types";
import clsx from "clsx";

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return prefers;
}

export default function AlbumCarousel({
  album,
  // make it smaller by default: ~560–640px wide
  maxWidth = "max-w-md", // choose: max-w-sm | max-w-md | max-w-lg | custom
  aspect = "aspect-[16/9]", // enforce consistent aspect to prevent tall images
  coverFit = "cover", // "cover" or "contain"
  autoPlayDelay = 3500,
  className,
}: {
  album: Album;
  maxWidth?: string;
  aspect?: string;
  coverFit?: "cover" | "contain";
  autoPlayDelay?: number;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();

  const options: CarouselOptions = {
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    reduceMotion
      ? []
      : [
          Autoplay({
            delay: autoPlayDelay,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  // pick a sensible sizes attr based on maxWidth (so Next/Image picks smaller files)
  const sizesByMax = maxWidth.includes("max-w-sm")
    ? "(max-width: 768px) 100vw, 480px"
    : maxWidth.includes("max-w-md")
    ? "(max-width: 768px) 100vw, 640px"
    : maxWidth.includes("max-w-lg")
    ? "(max-width: 768px) 100vw, 768px"
    : "(max-width: 768px) 100vw, 900px";

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextLightbox = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % album.images.length));
  const prevLightbox = () =>
    setLightboxIndex((i) =>
      i === null ? 0 : (i - 1 + album.images.length) % album.images.length
    );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <div className={clsx("relative mx-auto", maxWidth, className)}>
      <div className="overflow-hidden rounded-xl shadow" ref={emblaRef}>
        <div className="flex">
          {album.images.map((img, i) => (
            <div className="relative min-w-0 flex-[0_0_100%]" key={img.src}>
              <div className={clsx("relative w-full", aspect)}>
                <Image
                  src={img.thumb || img.src}
                  alt={`${album.name} ${i + 1}`}
                  fill
                  placeholder={img.blurDataURL ? "blur" : "empty"}
                  blurDataURL={img.blurDataURL}
                  className={clsx(
                    "rounded-xl cursor-zoom-in",
                    coverFit === "contain" ? "object-contain" : "object-cover"
                  )}
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes={sizesByMax}
                  onClick={() => openLightbox(i)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smaller controls */}
      <button
        aria-label="Previous slide"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 text-white px-2 py-1 hover:bg-black/70 text-sm"
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 text-white px-2 py-1 hover:bg-black/70 text-sm"
      >
        ›
      </button>

      {/* Smaller dots */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={clsx(
              "h-1.5 w-1.5 rounded-full transition",
              i === selectedIndex
                ? "bg-primary"
                : "bg-neutral/30 hover:bg-neutral/60"
            )}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={album.images[lightboxIndex].src}
              alt={`${album.name} ${lightboxIndex + 1}`}
              width={album.images[lightboxIndex].width || 1600}
              height={album.images[lightboxIndex].height || 900}
              className="w-full h-auto object-contain rounded-lg"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
            <button
              className="absolute -left-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex rounded-full bg-white/20 hover:bg-white/30 text-white px-3 py-2"
              onClick={prevLightbox}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="absolute -right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex rounded-full bg-white/20 hover:bg-white/30 text-white px-3 py-2"
              onClick={nextLightbox}
              aria-label="Next image"
            >
              ›
            </button>
            <button
              className="absolute top-2 right-2 rounded bg-white/20 hover:bg-white/30 text-white px-2 py-1"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
