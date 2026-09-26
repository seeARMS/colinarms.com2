// Camera settings for every photo, read from its EXIF when the site builds.
// Pages are prerendered inside workerd, which can't read the project's files,
// so this Vite plugin reads them in Node and hands the result to the page as
// `virtual:photo-meta`: a map from file name (no extension) to its settings.
import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import exifr from 'exifr'

const ID = 'virtual:photo-meta'
const RESOLVED = `\0${ID}`
const DIR = fileURLToPath(new URL('../src/assets/photos/', import.meta.url))
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const TAGS = ['Model', 'LensModel', 'FocalLength', 'FNumber', 'ExposureTime', 'ISO', 'DateTimeOriginal']

// "RF100-500mm F4.5-7.1 L IS USM" reads as "RF100-500mm".
const shortLens = (lens) => lens?.match(/^\S*\d+(?:-\d+)?mm/)?.[0] ?? lens

function shutter(seconds) {
  if (!seconds) return undefined
  if (seconds >= 1) return `${Number(seconds.toFixed(1))}s`
  return `1/${Math.round(1 / seconds)}s`
}

// EXIF dates carry no time zone; keep the calendar date the camera wrote.
function day(raw) {
  const m = typeof raw === 'string' && raw.match(/^(\d{4}):(\d{2}):(\d{2})/)
  return m ? `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}` : undefined
}

async function read() {
  const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  const entries = await Promise.all(
    files.map(async (file) => {
      const name = file.replace(/\.[^.]+$/, '')
      try {
        const x = (await exifr.parse(await readFile(DIR + file), { pick: TAGS, reviveValues: false })) ?? {}
        return [
          name,
          {
            camera: x.Model?.trim(),
            lens: shortLens(x.LensModel?.trim()),
            lensFull: x.LensModel?.trim(),
            focal: x.FocalLength ? `${Math.round(x.FocalLength)}mm` : undefined,
            aperture: x.FNumber ? `f/${Number(x.FNumber.toFixed(1))}` : undefined,
            shutter: shutter(x.ExposureTime),
            iso: x.ISO ? `ISO ${x.ISO}` : undefined,
            date: day(x.DateTimeOriginal),
          },
        ]
      } catch {
        return [name, {}]
      }
    }),
  )
  return Object.fromEntries(entries)
}

export default function photoMeta() {
  return {
    name: 'photo-meta',
    resolveId(id) {
      if (id === ID) return RESOLVED
    },
    async load(id) {
      if (id !== RESOLVED) return
      return `export default ${JSON.stringify(await read())}`
    },
  }
}
