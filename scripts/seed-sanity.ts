import { createReadStream } from 'node:fs'
import { promises as fs } from 'node:fs'
import path from 'node:path'

import { createClient } from '@sanity/client'

async function loadEnvFile(fileName: string) {
  const filePath = path.join(process.cwd(), fileName)

  try {
    const content = await fs.readFile(filePath, 'utf8')

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim()

      if (!trimmed || trimmed.startsWith('#')) continue

      const separatorIndex = trimmed.indexOf('=')
      if (separatorIndex === -1) continue

      const key = trimmed.slice(0, separatorIndex).trim()
      const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '')

      if (!(key in process.env)) {
        process.env[key] = value
      }
    }
  } catch {
    // Ignore missing env files
  }
}

await loadEnvFile('.env')
await loadEnvFile('.env.local')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-24'
const shouldDeleteSource = process.argv.includes('--delete-source')

if (!projectId || !dataset || !token) {
  throw new Error(
    'Missing Sanity configuration. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN before running the seed script.'
  )
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion,
  useCdn: false,
})

type SponsorSeedEntry = {
  name: string
  logo: string
  thanks: string
  description: string
  website: string
}

const PHOTOS_DIR = path.join(process.cwd(), 'public', 'photos')
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

const sponsorSeed: SponsorSeedEntry[] = [
  {
    name: 'Leidos',
    logo: '/sponsors/Leidos-logo-horz-full-rgb.svg',
    thanks: 'Special thanks to Mrs. Nelson!',
    description: 'A leading FORTUNE 500 innovation company delivering technology solutions in defense, intelligence, civil, and health markets.',
    website: 'https://www.leidos.com/',
  },
  {
    name: 'Centreville Dance Academy',
    logo: '/sponsors/Centreville_Dance_Logo.png',
    thanks: 'Special thanks to Mr. Taylor!',
    description: 'A local arts education partner supporting students and community programs in Centreville.',
    website: 'https://centrevilledance.com/',
  },
  {
    name: 'Mermaid Water & Plumbing',
    logo: '/sponsors/Mermaid-Water-Logo-High-Resolution.png',
    thanks: 'Thank you!',
    description: 'A family-run water treatment and plumbing business helping fund team operations and outreach.',
    website: 'https://www.watersoftenersystems.com/',
  },
  {
    name: 'General Dynamics Information Technology',
    logo: '/sponsors/gdit-logo.png',
    thanks: 'Special thanks to Mr. Connelly and Mr. Raheja!',
    description: 'A technology and professional services company supporting critical government missions.',
    website: 'https://gdit.com/',
  },
  {
    name: 'Tria',
    logo: '/sponsors/Copy of Tria Logo_Blue.png',
    thanks: 'Thank you!',
    description: 'A federal technology consulting firm investing in the next generation of STEM talent.',
    website: 'https://triafed.com/',
  },
  {
    name: 'Ascent Educational Services',
    logo: '/sponsors/Ascentlogo.png',
    thanks: 'Thank you!',
    description: 'An educational consulting organization supporting student growth and opportunity.',
    website: 'https://www.ascent-educational-consulting.com/',
  },
]

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function inferSeasonYear(name: string) {
  const match = name.match(/20\d{2}/)
  return match ? Number.parseInt(match[0], 10) : new Date().getFullYear()
}

function inferCategory(seasonYear: number): 'current' | 'archive' {
  return seasonYear >= new Date().getFullYear() ? 'current' : 'archive'
}

async function readDirSafe(dir: string) {
  try {
    return await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }
}

async function listAlbumImagePaths(albumDir: string) {
  const entries = await readDirSafe(albumDir)
  const imagePaths: string[] = []

  for (const entry of entries) {
    const entryPath = path.join(albumDir, entry.name)

    if (entry.isFile() && IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      imagePaths.push(entryPath)
    }

    if (entry.isDirectory()) {
      const subEntries = await readDirSafe(entryPath)
      for (const subEntry of subEntries) {
        if (subEntry.isFile() && IMAGE_EXTS.has(path.extname(subEntry.name).toLowerCase())) {
          imagePaths.push(path.join(entryPath, subEntry.name))
        }
      }
    }
  }

  return imagePaths.sort((a, b) => a.localeCompare(b))
}

async function uploadImage(filePath: string) {
  const filename = path.basename(filePath)

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await client.assets.upload('image', createReadStream(filePath), {
        filename,
      })
    } catch (error) {
      if (attempt === 3) {
        throw error
      }

      console.log(`    upload failed for ${filename}, retrying (${attempt}/3)...`)
      await new Promise((resolve) => setTimeout(resolve, attempt * 2000))
    }
  }

  throw new Error(`Upload failed for ${filename}`)
}

async function uploadOptionalImage(filePath: string) {
  const absolutePath = path.join(process.cwd(), 'public', filePath.replace(/^\//, ''))

  try {
    await fs.access(absolutePath)
    return uploadImage(absolutePath)
  } catch {
    return null
  }
}

async function seedSponsors() {
  console.log(`Seeding ${sponsorSeed.length} sponsor entries...`)

  for (const [index, sponsor] of sponsorSeed.entries()) {
    console.log(`[Sponsor ${index + 1}/${sponsorSeed.length}] ${sponsor.name}`)
    const asset = sponsor.logo ? await uploadOptionalImage(sponsor.logo) : null

    await client.createOrReplace({
      _id: `sponsor.${toSlug(sponsor.name)}`,
      _type: 'sponsor',
      name: sponsor.name,
      website: sponsor.website,
      thanks: sponsor.thanks,
      description: sponsor.description,
      displayOrder: index,
      logo: asset
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
            alt: `${sponsor.name} logo`,
          }
        : undefined,
    })
  }
}

async function seedGallery() {
  const entries = await readDirSafe(PHOTOS_DIR)
  const albumDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)

  console.log(`Seeding ${albumDirs.length} gallery album(s)...`)

  for (const [index, albumName] of albumDirs.entries()) {
    console.log(`\n[Album ${index + 1}/${albumDirs.length}] ${albumName}`)
    const albumDir = path.join(PHOTOS_DIR, albumName)
    const seasonYear = inferSeasonYear(albumName)
    const category = inferCategory(seasonYear)
    const slug = toSlug(albumName)
    const imagePaths = await listAlbumImagePaths(albumDir)

    if (imagePaths.length === 0) continue

    console.log(`Uploading ${imagePaths.length} image(s)...`)

    const photoIds: string[] = []
    const inlinePhotos: Array<{
      _type: 'object'
      _key: string
      image: {
        _type: 'image'
        asset: {
          _type: 'reference'
          _ref: string
        }
        alt: string
      }
      caption?: string
      photographer?: string
    }> = []
    let coverAssetRef: string | null = null

    for (const [photoIndex, filePath] of imagePaths.entries()) {
      console.log(`  - [${photoIndex + 1}/${imagePaths.length}] ${path.basename(filePath)}`)
      const asset = await uploadImage(filePath)
      const photoKey = `${slug}-${photoIndex + 1}`

      if (!coverAssetRef) coverAssetRef = asset._id

      inlinePhotos.push({
        _type: 'object',
        _key: photoKey,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
          alt: `${albumName} photo ${photoIndex + 1}`,
        },
      })
    }

    await client.createOrReplace({
      _id: `galleryAlbum.${slug}`,
      _type: 'galleryAlbum',
      title: albumName,
      slug: { _type: 'slug', current: slug },
      category,
      seasonYear,
      eventDate: `${seasonYear}-01-01`,
      coverImage: coverAssetRef
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: coverAssetRef,
            },
            alt: albumName,
          }
        : undefined,
      photos: inlinePhotos,
    })

    if (shouldDeleteSource) {
      await fs.rm(albumDir, { recursive: true, force: true })
      console.log(`Removed local source folder: ${albumName}`)
    }

    console.log(`Finished album: ${albumName}`)
  }
}

async function main() {
  await seedSponsors()
  await seedGallery()

  console.log('Seeded sponsors and gallery content into Sanity.')

  if (shouldDeleteSource) {
    console.log('Original gallery folders were removed from public/photos after upload.')
  } else {
    console.log('Original gallery folders were preserved. Re-run with --delete-source to remove them after upload.')
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
