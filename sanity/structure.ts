import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Gallery Albums')
        .child(S.documentTypeList('galleryAlbum').title('Gallery Albums')),
      S.divider(),
      S.listItem()
        .title('Newsletter')
        .child(S.documentTypeList('newsletterIssue').title('Newsletter Issues')),
      S.listItem()
        .title('Sponsors')
        .child(S.documentTypeList('sponsor').title('Sponsors')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['galleryAlbum', 'newsletterIssue', 'sponsor'].includes(
            listItem.getId() || ''
          )
      ),
    ])
