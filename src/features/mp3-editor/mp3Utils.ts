import { ID3Writer } from 'browser-id3-writer'
import jsmediatags from 'jsmediatags/dist/jsmediatags.min.js'

export type FormValues = {
  title: string
  artist: string
  album: string
  albumArtist: string
  track: string
  disc: string
  year: string
  genre: string
  composer: string
  comment: string
}

type Defaults = Pick<
  FormValues,
  'artist' | 'album' | 'albumArtist' | 'year' | 'genre' | 'composer' | 'comment'
> & { albumArtName: string }

export type Picture = { data: ArrayBuffer; format: string }
type MediaTags = Record<string, unknown> & { picture?: Picture }
type TagFrame = { id: string; raw: Uint8Array }

const defaultsKey = 'lyric-canvas:mp3-editor-defaults'
const editableFrameIds = new Set([
  'TIT2', 'TPE1', 'TALB', 'TPE2', 'TRCK', 'TPOS', 'TYER', 'TDRC', 'TCON', 'TCOM', 'COMM',
])

export const emptyValues: FormValues = {
  title: '', artist: '', album: '', albumArtist: '', track: '', disc: '', year: '', genre: '', composer: '', comment: '',
}

const emptyDefaults: Defaults = {
  artist: '', album: '', albumArtist: '', year: '', genre: '', composer: '', comment: '', albumArtName: '',
}

export function isMp3(file: File) {
  return file.type === 'audio/mpeg' || file.name.toLowerCase().endsWith('.mp3')
}

export function formatBytes(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(bytes > 10 * 1024 * 1024 ? 1 : 2)} MB`
}

export function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`
}

export function editedName(name: string) {
  return `${name.replace(/\.mp3$/i, '')}_edited.mp3`
}

export function pictureUrl(picture: Picture) {
  return URL.createObjectURL(new Blob([picture.data], { type: picture.format }))
}

export function loadDefaults(): Defaults {
  try {
    return { ...emptyDefaults, ...JSON.parse(localStorage.getItem(defaultsKey) ?? '{}') }
  } catch {
    return emptyDefaults
  }
}

export function saveDefaults(values: FormValues, albumArtName: string) {
  const defaults: Defaults = {
    artist: values.artist,
    album: values.album,
    albumArtist: values.albumArtist,
    year: values.year,
    genre: values.genre,
    composer: values.composer,
    comment: values.comment,
    albumArtName,
  }
  localStorage.setItem(defaultsKey, JSON.stringify(defaults))
}

export function readTags(file: File): Promise<MediaTags> {
  return new Promise((resolve, reject) => {
    jsmediatags.read(file, {
      onSuccess: (tag: { tags: MediaTags }) => resolve(tag.tags),
      onError: reject,
    })
  })
}

function textValue(value: unknown) {
  return typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : ''
}

export function valuesFromTags(tags: MediaTags, defaults: Defaults): FormValues {
  return {
    title: textValue(tags.title),
    artist: textValue(tags.artist) || defaults.artist,
    album: textValue(tags.album) || defaults.album,
    albumArtist: textValue(tags.albumartist) || defaults.albumArtist,
    track: textValue(tags.track),
    disc: textValue(tags.disc),
    year: textValue(tags.year) || defaults.year,
    genre: textValue(tags.genre) || defaults.genre,
    composer: textValue(tags.composer) || defaults.composer,
    comment: textValue(tags.comment) || defaults.comment,
  }
}

export function buildEditedMp3(source: ArrayBuffer, values: FormValues, artwork: Picture | null, artworkChanged: boolean) {
  const bytes = new Uint8Array(source)
  const original = readExistingTag(bytes)
  const writer = new ID3Writer(new ArrayBuffer(0))
  if (values.title) writer.setFrame('TIT2', values.title)
  if (values.artist) writer.setFrame('TPE1', [values.artist])
  if (values.album) writer.setFrame('TALB', values.album)
  if (values.albumArtist) writer.setFrame('TPE2', values.albumArtist)
  if (values.track) writer.setFrame('TRCK', values.track)
  if (values.disc) writer.setFrame('TPOS', values.disc)
  if (/^\d{4}$/.test(values.year)) writer.setFrame('TYER', Number(values.year))
  if (values.genre) writer.setFrame('TCON', [values.genre])
  if (values.composer) writer.setFrame('TCOM', [values.composer])
  if (values.comment) writer.setFrame('COMM', { description: '', text: values.comment, language: 'eng' })
  if (artworkChanged && artwork) writer.setFrame('APIC', { type: 3, data: artwork.data, description: '' })
  writer.addTag()

  const generatedBuffer = (writer as unknown as { arrayBuffer: ArrayBuffer }).arrayBuffer
  const generated = readExistingTag(new Uint8Array(generatedBuffer))
  const retained = original.frames.filter((frame) => !editableFrameIds.has(frame.id) && !(artworkChanged && frame.id === 'APIC'))
  const body = concatBytes([...retained.map((frame) => frame.raw), ...generated.frames.map((frame) => frame.raw)])
  const tag = concatBytes([id3Header(body.length), body])
  return concatBytes([tag, bytes.slice(original.audioOffset)])
}

function readExistingTag(bytes: Uint8Array): { frames: TagFrame[]; audioOffset: number } {
  if (bytes.length < 10 || String.fromCharCode(...bytes.slice(0, 3)) !== 'ID3') return { frames: [], audioOffset: 0 }
  const version = bytes[3]
  const size = syncSafe(bytes.slice(6, 10))
  const end = Math.min(bytes.length, 10 + size + (bytes[5] & 0x10 ? 10 : 0))
  if (version !== 3 && version !== 4) return { frames: [], audioOffset: end }
  let position = 10 + (bytes[5] & 0x40 ? (version === 3 ? 4 + readUint32(bytes, 10) : syncSafe(bytes.slice(10, 14))) : 0)
  const frames: TagFrame[] = []
  while (position + 10 <= end && bytes[position] !== 0) {
    const id = String.fromCharCode(...bytes.slice(position, position + 4))
    const sizeAt = version === 4 ? syncSafe(bytes.slice(position + 4, position + 8)) : readUint32(bytes, position + 4)
    const next = position + 10 + sizeAt
    if (sizeAt < 0 || next > end) break
    const raw = bytes.slice(position, next)
    if (version === 4) {
      raw.set([(sizeAt >>> 24) & 0xff, (sizeAt >>> 16) & 0xff, (sizeAt >>> 8) & 0xff, sizeAt & 0xff], 4)
    }
    frames.push({ id, raw })
    position = next
  }
  return { frames, audioOffset: end }
}

function readUint32(bytes: Uint8Array, at: number) {
  return ((bytes[at] << 24) >>> 0) + (bytes[at + 1] << 16) + (bytes[at + 2] << 8) + bytes[at + 3]
}

function syncSafe(bytes: Uint8Array) {
  return (bytes[0] << 21) + (bytes[1] << 14) + (bytes[2] << 7) + bytes[3]
}

function id3Header(size: number) {
  return new Uint8Array([73, 68, 51, 3, 0, 0, (size >>> 21) & 0x7f, (size >>> 14) & 0x7f, (size >>> 7) & 0x7f, size & 0x7f])
}

function concatBytes(chunks: Uint8Array[]) {
  const output = new Uint8Array(chunks.reduce((size, chunk) => size + chunk.length, 0))
  let offset = 0
  chunks.forEach((chunk) => {
    output.set(chunk, offset)
    offset += chunk.length
  })
  return output
}
