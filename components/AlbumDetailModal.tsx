// components/AlbumDetailModal.tsx
"use client";

import { useEffect } from "react";
import type { Album } from "@/lib/gallery/types";
import AlbumCarousel from "@/components/AlbumCarousel";

type AlbumDetailModalProps = {
  album: Album | null;
  onClose: () => void;
};

export default function AlbumDetailModal({
  album,
  onClose,
}: AlbumDetailModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (album) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [album, onClose]);

  if (!album) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Album: ${album.name}`}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="text-lg font-semibold text-white">{album.name}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
            aria-label="Close album"
          >
            Close
          </button>
        </div>

        {/* Carousel */}
        {/* Scrollable carousel area */}
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-5xl px-4 py-8">
            <AlbumCarousel album={album} maxWidth="max-w-5xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
