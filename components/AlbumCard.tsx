// components/AlbumCard.tsx
"use client";

import Image from "next/image";
import type { Album } from "@/lib/gallery/types";

type AlbumCardProps = {
  album: Album;
  onClick: () => void;
  variant?: "default" | "featured";
};

export default function AlbumCard({
  album,
  onClick,
  variant = "default",
}: AlbumCardProps) {
  const isFeatured = variant === "featured";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full text-left rounded-2xl border border-base-200 bg-base-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"
      }`}
    >
      <Image
        src={album.images[0]?.thumb || album.cover}
        alt={album.name}
        fill
        className="rounded-2xl object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-medium text-white/90 text-sm mb-1">
          {album.images.length} photo{album.images.length !== 1 ? "s" : ""}
        </p>
        <h3
          className={`font-semibold text-white ${
            isFeatured ? "text-xl" : "text-base"
          }`}
        >
          {album.name}
        </h3>
      </div>
    </button>
  );
}
