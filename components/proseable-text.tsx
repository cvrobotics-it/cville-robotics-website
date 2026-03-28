import { useMemo } from 'react'
import type { PortableTextBlock } from 'sanity'

import PortableTextRenderer from './portable-text'

type ProseableTextProps = {
  value: PortableTextBlock[]
}

/**
 * Use Tailwind CSS's `prose` classes with Portable Text markup (blocks)
 * without inheriting styles for custom components (types like images)
 * 
 * This groups standard text blocks together and wraps them in prose,
 * while keeping custom types (like images) outside of prose styling.
 */
export default function ProseableText({ value = [] }: ProseableTextProps) {
  // Group together standard `_type === "block"` blocks
  // and separate out custom types (images, etc)
  const valueGroups = useMemo(
    () =>
      value.reduce<PortableTextBlock[][]>(
        (acc, item) => {
          const lastIdx = acc.length - 1

          if (
            // We don't have items in this group yet
            acc[lastIdx].length === 0 ||
            // The last group has the same `_type`
            acc[lastIdx][0]._type === item._type
          ) {
            acc[lastIdx].push(item)
          } else {
            // Create a new group because the `_type` is different
            acc.push([item])
          }

          return acc
        },
        [[]]
      ),
    [value]
  )

  if (!valueGroups?.length) return null

  return valueGroups.map((group) =>
    group[0]._type === 'block' ? (
      <div key={group[0]._key} className="prose prose-lg max-w-none">
        <PortableTextRenderer value={group} />
      </div>
    ) : (
      <PortableTextRenderer key={group[0]._key} value={group} />
    )
  )
}
