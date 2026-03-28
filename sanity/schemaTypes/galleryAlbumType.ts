import { ImagesIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { CoverImageSelector } from '../components/CoverImageSelector'

export const galleryAlbumType = defineType({
  name: 'galleryAlbum',
  title: 'Gallery Album',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Current Gallery', value: 'current' },
          { title: 'Our Past Photos', value: 'archive' },
        ],
        layout: 'radio',
      },
      initialValue: 'current',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seasonYear',
      title: 'Season year',
      type: 'number',
      validation: (rule) => rule.required().integer().min(2000),
    }),
    defineField({
      name: 'eventDate',
      title: 'Event date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'albumPhoto',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'photographer',
              title: 'Photographer credit',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              alt: 'image.alt',
            },
            prepare(selection) {
              return {
                title: selection.title || selection.alt || 'Gallery image',
                media: selection.media,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'coverImageIndex',
      title: 'Cover image',
      description: 'Select which photo from the album to use as the cover (defaults to first photo)',
      type: 'number',
      initialValue: 0,
      components: {
        input: CoverImageSelector,
      },
      validation: (rule) => 
        rule.min(0).custom((value, context) => {
          const photos = (context.document?.photos as any[]) || []
          if (value !== undefined && value >= photos.length) {
            return `Cover image index must be less than ${photos.length} (number of photos)`
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      photos: 'photos',
      coverImageIndex: 'coverImageIndex',
      subtitle: 'category',
      seasonYear: 'seasonYear',
    },
    prepare(selection) {
      const { title, photos, coverImageIndex, subtitle, seasonYear } = selection
      const index = coverImageIndex || 0
      const coverPhoto = photos?.[index]

      return {
        title,
        media: coverPhoto?.image,
        subtitle: [subtitle, seasonYear].filter(Boolean).join(' • '),
      }
    },
  },
})
