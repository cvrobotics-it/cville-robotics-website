import { promises as fs } from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);

export async function listAlbumImagePaths(
  directory: string,
): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listAlbumImagePaths(file)));
    else if (
      entry.isFile() &&
      IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
    )
      files.push(file);
  }
  return files.sort((a, b) => a.localeCompare(b));
}

export async function removeUploadedSources(files: string[]) {
  for (const file of files) await fs.unlink(file);
}
