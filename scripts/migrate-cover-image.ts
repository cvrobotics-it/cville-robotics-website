import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { resolve } from 'path'

// Load .env.local from project root
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
})

console.log('Using project:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('Using dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)

async function migrateCoverImage() {
  console.log('Starting migration: removing old coverImage field...')

  // Fetch all gallery albums that have the old coverImage field
  const albums = await client.fetch<any[]>(`
    *[_type == "galleryAlbum" && defined(coverImage)] {
      _id,
      _rev,
      coverImage,
      photos
    }
  `)

  console.log(`Found ${albums.length} albums with old coverImage field`)

  if (albums.length === 0) {
    console.log('No albums to migrate!')
    return
  }

  // Create transaction to remove coverImage from all documents
  let transaction = client.transaction()
  
  albums.forEach((album) => {
    console.log(`  - Removing coverImage from: ${album._id}`)
    transaction = transaction.patch(album._id, (patch) => patch.unset(['coverImage']))
  })

  // Commit the transaction
  try {
    await transaction.commit()
    console.log('✅ Migration complete! Old coverImage field removed from all albums.')
    console.log('Note: Albums will now use the first photo (index 0) as cover by default.')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  }
}

migrateCoverImage()
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })
