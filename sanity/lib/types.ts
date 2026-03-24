import type { PortableTextBlock } from 'sanity'

export type SanityImageAsset = {
  _ref: string
  _type: 'reference'
}

export type SanityImage = {
  _type?: 'image'
  asset?: SanityImageAsset
  alt?: string
}

export type SanityGalleryPhoto = {
  _key: string
  image?: SanityImage
  caption?: string
  photographer?: string
}

export type SanityGalleryAlbum = {
  _id: string
  title: string
  slug: string
  category: 'current' | 'archive'
  seasonYear: number
  eventDate: string
  location?: string
  summary?: string
  coverImage?: SanityImage
  photos: SanityGalleryPhoto[]
}

export type SanityNewsletterIssue = {
  _id: string
  title: string
  slug: string
  publishDate: string
  summary: string
  heroImage?: SanityImage
  body: PortableTextBlock[]
}

export type SanitySponsor = {
  _id: string
  name: string
  description?: string
  thanks?: string
  website: string
  displayOrder?: number
  logo?: SanityImage
}
