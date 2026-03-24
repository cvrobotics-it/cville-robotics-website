// components/GallerySection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Album } from "@/lib/gallery/types";
import AlbumCard from "@/components/AlbumCard";
import AlbumDetailModal from "@/components/AlbumDetailModal";

type GroupedAlbums = {
  [year: string]: Album[];
};

function groupByYear(albums: Album[]): GroupedAlbums {
  return albums.reduce((acc, album) => {
    // Try to extract year from album name (e.g., "2025-2026 Season" or "2025 Competition")
    const yearMatch = album.name.match(/\b(20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : "Other";

    if (!acc[year]) acc[year] = [];
    acc[year].push(album);
    return acc;
  }, {} as GroupedAlbums);
}

type GallerySectionProps = {
  albums: Album[];
};

export default function GallerySection({ albums }: GallerySectionProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  if (albums.length === 0) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-base-content/60">No photos yet.</p>
        </div>
      </section>
    );
  }

  const latestAlbum = albums[0];
  const currentAlbums = albums.slice(1);

  // For now, treat all albums as "current" since the manifest doesn't have categories
  // When using Sanity, you'll filter by category="current"
  const groupedAlbums = groupByYear(albums);

  return (
    <>
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 space-y-12">
          {/* Hero: Latest Album */}
          {latestAlbum && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Current Gallery</h2>
              <div
                className="relative rounded-3xl overflow-hidden border border-base-200 bg-base-100 shadow-sm"
                style={{ aspectRatio: "16/7" }}
              >
                <Image
                  src={latestAlbum.images[0]?.thumb || latestAlbum.cover}
                  alt={latestAlbum.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <p className="text-white/80 text-sm mb-2">
                    Latest album
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {latestAlbum.name}
                  </h3>
                  <p className="text-white/80 mb-4">
                    {latestAlbum.images.length} photo
                    {latestAlbum.images.length !== 1 ? "s" : ""}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedAlbum(latestAlbum)}
                    className="btn btn-primary"
                  >
                    View Photos
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Album Grid */}
          {currentAlbums.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                {latestAlbum ? "More Albums" : "Current Gallery"}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentAlbums.map((album) => (
                  <AlbumCard
                    key={album.slug}
                    album={album}
                    onClick={() => setSelectedAlbum(album)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Past Photos by Year */}
      {Object.keys(groupedAlbums).length > 1 && (
        <section className="py-12 bg-base-200/50">
          <div className="mx-auto max-w-6xl px-4 space-y-12">
            <h2 className="text-2xl font-semibold">Our Past Photos</h2>

            {Object.entries(groupedAlbums)
              .sort(([a], [b]) => b.localeCompare(a))
              .slice(1) // Skip the first year (current)
              .map(([year, yearAlbums]) => (
                <div key={year}>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-lg font-medium text-base-content/60">
                      {year}
                    </h3>
                    <div className="flex-1 h-px bg-base-300" />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {yearAlbums.map((album) => (
                      <AlbumCard
                        key={album.slug}
                        album={album}
                        onClick={() => setSelectedAlbum(album)}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Album Modal */}
      <AlbumDetailModal
        album={selectedAlbum}
        onClose={() => setSelectedAlbum(null)}
      />
    </>
  );
}
