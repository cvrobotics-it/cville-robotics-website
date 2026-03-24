import { defineQuery } from 'next-sanity'

export const GALLERY_ALBUM_FIELDS = `{
  _id,
  title,
  "slug": slug.current,
  category,
  seasonYear,
  eventDate,
  location,
  summary,
  coverImage,
  photos[]{
    _key,
    caption,
    photographer,
    image,
  }
}`

export const currentGalleryAlbumsQuery = defineQuery(`
  *[_type == "galleryAlbum" && category == "current"]
    | order(seasonYear desc, eventDate desc, title asc)
    ${GALLERY_ALBUM_FIELDS}
`)

export const archivedGalleryAlbumsQuery = defineQuery(`
  *[_type == "galleryAlbum" && category == "archive"]
    | order(seasonYear desc, eventDate desc, title asc)
    ${GALLERY_ALBUM_FIELDS}
`)

export const galleryAlbumBySlugQuery = defineQuery(`
  *[_type == "galleryAlbum" && slug.current == $slug][0]
    ${GALLERY_ALBUM_FIELDS}
`)

export const newsletterIssuesQuery = defineQuery(`
  *[_type == "newsletterIssue"]
    | order(publishDate desc, _createdAt desc){
      _id,
      title,
      "slug": slug.current,
      publishDate,
      summary,
      heroImage,
      body,
    }
`)

export const newsletterIssueBySlugQuery = defineQuery(`
  *[_type == "newsletterIssue" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishDate,
    summary,
    heroImage,
    body,
  }
`)

export const sponsorsQuery = defineQuery(`
  *[_type == "sponsor"]
    | order(displayOrder asc, name asc){
      _id,
      name,
      description,
      thanks,
      website,
      displayOrder,
      logo,
    }
`)
