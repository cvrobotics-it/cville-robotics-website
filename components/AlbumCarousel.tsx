// components/AlbumCarousel.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
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
  aspect = "aspect-[4/3]", // change to aspect-[16/9] if you want it shorter
  autoPlayDelay = 3500,
  className,
}: {
  album: Album;
  maxWidth?: string;
  aspect?: string;
  autoPlayDelay?: number;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();

  const options: EmblaOptionsType = {
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

  return (
    <div className={clsx("relative mx-auto", maxWidth, className)}>
      <div className="overflow-hidden rounded-xl shadow" ref={emblaRef}>
        <div className="flex">
          {album.images.map((img, i) => {
            const hasDims = img.width > 0 && img.height > 0;
            return (
              <div className="relative min-w-0 flex-[0_0_100%]" key={img.src}>
                {hasDims ? (
                  <Image
                    src={img.src}
                    alt={`${album.name} ${i + 1}`}
                    width={img.width}
                    height={img.height}
                    placeholder={img.blurDataURL ? "blur" : "empty"}
                    blurDataURL={img.blurDataURL}
                    className="h-auto w-full object-cover rounded-xl"
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                    sizes={sizesByMax}
                  />
                ) : (
                  <div className={clsx("relative w-full", aspect)}>
                    <Image
                      src={img.src}
                      alt={`${album.name} ${i + 1}`}
                      fill
                      className="object-cover rounded-xl"
                      sizes={sizesByMax}
                    />
                  </div>
                )}
              </div>
            );
          })}
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
    </div>
  );
}
