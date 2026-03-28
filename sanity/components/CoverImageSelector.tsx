import { useCallback } from 'react'
import { set, useFormValue, type NumberInputProps } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
})

export function CoverImageSelector(props: NumberInputProps) {
  const { value, onChange, readOnly } = props
  const photos = useFormValue(['photos']) as any[] || []

  const handleSelect = useCallback(
    (index: number) => {
      if (!readOnly) {
        onChange(set(index))
      }
    },
    [onChange, readOnly]
  )

  if (photos.length === 0) {
    return (
      <div style={{ padding: '16px', backgroundColor: '#fff4e6', borderRadius: '8px', border: '1px solid #ffd666' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#614700' }}>
          Add photos to the album first, then select a cover image.
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
      {photos.map((photo: any, index: number) => {
        const isSelected = value === index || (value === undefined && index === 0)
        const imageUrl = photo.image?.asset?._ref 
          ? builder.image(photo.image).width(280).height(210).fit('crop').url()
          : null

        return (
          <button
            key={photo._key || index}
            type="button"
            onClick={() => handleSelect(index)}
            disabled={readOnly}
            style={{
              padding: 0,
              border: 'none',
              borderRadius: '8px',
              cursor: readOnly ? 'not-allowed' : 'pointer',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: 'transparent',
              outline: isSelected ? '3px solid #2276fc' : '2px solid #e1e3e6',
              outlineOffset: '-2px',
              transition: 'all 0.15s ease',
              boxShadow: isSelected ? '0 4px 12px rgba(34, 118, 252, 0.2)' : 'none',
              opacity: readOnly ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isSelected && !readOnly) {
                e.currentTarget.style.outlineColor = '#b4b9bf'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected && !readOnly) {
                e.currentTarget.style.outlineColor = '#e1e3e6'
              }
            }}
          >
            <div style={{ aspectRatio: '4/3', position: 'relative' }}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={photo.image?.alt || photo.caption || `Photo ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f3f4f6',
                    color: '#9ca3af',
                    fontSize: '13px',
                  }}
                >
                  No image
                </div>
              )}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#2276fc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  ✓
                </div>
              )}
            </div>
            <div
              style={{
                padding: '8px',
                backgroundColor: isSelected ? '#f0f7ff' : '#f9fafb',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: isSelected ? '600' : '500',
                color: isSelected ? '#2276fc' : '#6b7280',
              }}
            >
              {photo.caption || photo.image?.alt || `Photo ${index + 1}`}
            </div>
          </button>
        )
      })}
    </div>
  )
}
