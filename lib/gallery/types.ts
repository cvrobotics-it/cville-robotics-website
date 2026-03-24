export type ImageMeta = {
  src: string;
  width: number;
  height: number;
  thumb: string;
  blurDataURL?: string;
};

export type Album = {
  name: string;
  slug: string;
  cover: string;
  images: ImageMeta[];
};

export type Manifest = {
  albums: Album[];
};
