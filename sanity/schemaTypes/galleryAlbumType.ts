import { ImagesIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

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
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
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
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'category',
      seasonYear: 'seasonYear',
    },
    prepare(selection) {
      const { title, media, subtitle, seasonYear } = selection

      return {
        title,
        media,
        subtitle: [subtitle, seasonYear].filter(Boolean).join(' • '),
      }
    },
  },
})
