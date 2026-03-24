import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const sponsorType = defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'thanks',
      title: 'Thanks message',
      type: 'string',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'thanks',
    },
  },
})
