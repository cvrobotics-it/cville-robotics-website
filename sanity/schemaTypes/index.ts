import { type SchemaTypeDefinition } from 'sanity'
import { galleryAlbumType } from './galleryAlbumType'
import { newsletterIssueType } from './newsletterIssueType'
import { sponsorType } from './sponsorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [galleryAlbumType, newsletterIssueType, sponsorType],
}
