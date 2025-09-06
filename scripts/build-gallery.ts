import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import type { Manifest, Album, ImageMeta } from "@/lib/gallery/types";

const PHOTOS_DIR = path.join(process.cwd(), "public", "photos");
const OUT_DIR = path.join(process.cwd(), "generated");
const OUT_FILE = path.join(OUT_DIR, "photos-manifest.json");
const THUMBS_ROOT = path.join(process.cwd(), "public", "_thumbs");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
// change this to tune thumb sizes
const THUMB_WIDTH = 960; // good balance for grids

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

async function readDirSafe(dir: string) {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function processImage(
  fullPath: string,
  publicSrc: string,
  albumSlug: string
): Promise<ImageMeta> {
  const buf = await fs.readFile(fullPath);
  const img = sharp(buf);
  const meta = await img.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  // create thumbnail webp
  const albumThumbDir = path.join(THUMBS_ROOT, albumSlug);
  await ensureDir(albumThumbDir);
  const fileBase = path.parse(fullPath).name;
  const thumbFile = `${fileBase}.webp`;
  const thumbDiskPath = path.join(albumThumbDir, thumbFile);

  const thumbBuf = await img
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ effort: 5, quality: 80 })
    .toBuffer();
  await fs.writeFile(thumbDiskPath, thumbBuf);

  const blurBuf = await img
    .resize({ width: 16 })
    .webp({ quality: 30 })
    .toBuffer();
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  return {
    src: publicSrc,
    width,
    height,
    thumb: `/_thumbs/${albumSlug}/${thumbFile}`,
    blurDataURL,
  };
}

async function main() {
  const top = await readDirSafe(PHOTOS_DIR);
  const albums: Album[] = [];

  for (const dirent of top) {
    if (!dirent.isDirectory()) continue;
    const albumName = dirent.name;
    const albumSlug = toSlug(albumName);
    const albumDir = path.join(PHOTOS_DIR, albumName);
    const files = await readDirSafe(albumDir);

    const images: ImageMeta[] = [];

    // root files
    for (const f of files) {
      if (f.isFile() && IMAGE_EXTS.has(path.extname(f.name).toLowerCase())) {
        const src = `/photos/${encodeURIComponent(
          albumName
        )}/${encodeURIComponent(f.name)}`;
        images.push(
          await processImage(path.join(albumDir, f.name), src, albumSlug)
        );
      }
    }

    // one nested level (optional)
    for (const f of files) {
      if (!f.isDirectory()) continue;
      const subDir = path.join(albumDir, f.name);
      const subFiles = await readDirSafe(subDir);
      for (const sf of subFiles) {
        if (
          sf.isFile() &&
          IMAGE_EXTS.has(path.extname(sf.name).toLowerCase())
        ) {
          const src = `/photos/${encodeURIComponent(
            albumName
          )}/${encodeURIComponent(f.name)}/${encodeURIComponent(sf.name)}`;
          images.push(
            await processImage(path.join(subDir, sf.name), src, albumSlug)
          );
        }
      }
    }

    if (!images.length) continue;

    // pick first as cover
    const cover = images[0].thumb;
    albums.push({ name: albumName, slug: albumSlug, cover, images });
  }

  // newest-ish first by natural string order
  albums.sort((a, b) => a.name.localeCompare(b.name)).reverse();

  const manifest: Manifest = { albums };
  await ensureDir(OUT_DIR);
  await fs.mkdir(THUMBS_ROOT, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(manifest, null, 2), "utf8");
  console.log(
    `✅ wrote ${path.relative(process.cwd(), OUT_FILE)} with ${
      albums.length
    } album(s)`
  );
}

main();
