export type ImageMeta = {
  src: string; // full image path under /public/photos/...
  width: number; // original width (prod)
  height: number; // original height (prod)
  thumb: string; // thumbnail path (e.g., /_thumbs/album/file.webp) (prod)
  blurDataURL?: string; // small base64 preview (prod)
};

export type Album = {
  name: string;
  slug: string;
  cover: string; // a.thumb (or a.images[0].thumb)
  images: ImageMeta[];
};

export type Manifest = {
  albums: Album[];
};
