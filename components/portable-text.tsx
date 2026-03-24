import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'

import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 text-3xl font-bold text-primary">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-2xl font-bold text-base-content">{children}</h3>,
    normal: ({ children }) => <p className="text-lg leading-8 text-base-content/80">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6 text-lg text-base-content/80">{children}</ul>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      const imageUrl = urlFor(value).width(1600).fit('max').url()

      return (
        <figure className="space-y-3 overflow-hidden rounded-2xl bg-base-200 p-3">
          <Image
            src={imageUrl}
            alt={value.alt || 'Newsletter image'}
            width={1600}
            height={900}
            className="h-auto w-full rounded-xl object-cover"
          />
          {value.alt ? <figcaption className="text-sm text-base-content/60">{value.alt}</figcaption> : null}
        </figure>
      )
    },
  },
}

type PortableTextRendererProps = {
  value: PortableTextBlock[]
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />
}
