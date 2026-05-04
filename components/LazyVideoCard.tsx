"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

interface LazyVideoCardProps {
  videoKey: string;
  title: string;
}

export default function LazyVideoCard({ videoKey, title }: LazyVideoCardProps) {
  const [isActivated, setIsActivated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`;

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral text-neutral-content">
      {!isActivated ? (
        <button
          type="button"
          className="group relative h-full w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/70"
          onClick={() => setIsActivated(true)}
          aria-label={`Play ${title} match video`}
        >
          <Image
            src={thumbnailUrl}
            alt=""
            fill
            className="object-cover opacity-85 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-base-100/95 text-primary shadow-xl transition duration-200 group-hover:scale-105">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
            </span>
          </span>
          <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            Click to load video
          </span>
        </button>
      ) : (
        <>
          {!isLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-base-300">
              <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          ) : null}
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={`h-full w-full transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            data-no-skeleton
          />
        </>
      )}
    </div>
  );
}
