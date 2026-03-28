import { useCallback } from 'react'
import { set, unset, useFormValue, type NumberInputProps } from 'sanity'

export function CoverImageSelector(props: NumberInputProps) {
  const { value, onChange, schemaType } = props
  const photos = useFormValue(['photos']) as any[] || []

  const handleSelect = useCallback(
    (index: number) => {
      onChange(index === value ? unset() : set(index))
    },
    [onChange, value]
  )

  if (photos.length === 0) {
    return (
      <div style={{ padding: '12px', backgroundColor: '#fff4e6', borderRadius: '4px', border: '1px solid #ffd666' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#614700' }}>
          Add photos to the album first, then select a cover image.
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{ margin: 0, fontSize: '13px', color: '#73808c' }}>
        {schemaType.description || 'Select a photo to use as the cover image'}
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {photos.map((photo: any, index: number) => {
          const isSelected = value === index || (value === undefined && index === 0)
          return (
            <button
              key={photo._key || index}
              type="button"
              onClick={() => handleSelect(index)}
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: isSelected ? '2px solid #2276fc' : '1px solid #dfe3e8',
                backgroundColor: isSelected ? '#e6f0ff' : 'white',
                cursor: 'pointer',
                width: '120px',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '100px',
                    height: '75px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: '#f3f4f6',
                  }}
                >
                  {photo.image?.asset ? (
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: '600' }} >
                      ✓ Has Image
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9ca3af',
                        fontSize: '12px',
                      }}
                    >
                      No image
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '13px', fontWeight: isSelected ? '600' : '400' }}>
                  Photo {index + 1}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
