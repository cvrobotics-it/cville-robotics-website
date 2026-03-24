import type { Manifest, Album, ImageMeta } from "@/lib/gallery/types";

export async function getManifest(): Promise<Manifest> {
  const { promises: fs } = await import("node:fs");
  const path = await import("node:path");

  const PHOTOS_DIR = path.join(process.cwd(), "public", "photos");
  const IMAGE_EXTS = new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".avif",
  ]);
  const toSlug = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  try {
    await fs.access(PHOTOS_DIR);
  } catch {
    return { albums: [] };
  }

  const entries = await fs.readdir(PHOTOS_DIR, { withFileTypes: true });
  const albums: Album[] = [];

  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const name = e.name;
    const slug = toSlug(name);
    const dir = path.join(PHOTOS_DIR, name);
    const files = await fs.readdir(dir, { withFileTypes: true });

    const images: ImageMeta[] = [];

    for (const f of files) {
      if (f.isFile() && IMAGE_EXTS.has(path.extname(f.name).toLowerCase())) {
        const src = `/photos/${encodeURIComponent(name)}/${encodeURIComponent(
          f.name
        )}`;
        images.push({ src, width: 0, height: 0, thumb: src });
      }
      if (f.isDirectory()) {
        const sub = path.join(dir, f.name);
        const subFiles = await fs.readdir(sub, { withFileTypes: true });
        for (const sf of subFiles) {
          if (
            sf.isFile() &&
            IMAGE_EXTS.has(path.extname(sf.name).toLowerCase())
          ) {
            const src = `/photos/${encodeURIComponent(
              name
            )}/${encodeURIComponent(f.name)}/${encodeURIComponent(sf.name)}`;
            images.push({ src, width: 0, height: 0, thumb: src });
          }
        }
      }
    }

    if (images.length) {
      albums.push({ name, slug, cover: images[0].thumb, images });
    }
  }

  albums.sort((a, b) => a.name.localeCompare(b.name)).reverse();
  return { albums };
}
