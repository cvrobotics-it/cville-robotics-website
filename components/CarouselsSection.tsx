// components/CarouselsSection.tsx (Server)
import type { Album } from "@/lib/gallery/types";
import LazyMount from "@/components/LazyMount";
import AlbumCarousel from "@/components/AlbumCarousel";

export default function CarouselsSection({ albums }: { albums: Album[] }) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-semibold mb-8 text-center">Photos</h1>
        <div className="space-y-12">
          {albums.map((album) => (
            <div key={album.slug}>
              <h2 className="text-3xl font-bold mb-4 text-center">
                {album.name}
              </h2>
              <LazyMount>
                <AlbumCarousel
                  album={album}
                  maxWidth="max-w-3xl"
                  aspect="aspect-[16/9]"
                />
              </LazyMount>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
