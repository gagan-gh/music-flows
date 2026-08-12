import { ID3Writer } from 'browser-id3-writer'
import { type DragEvent, useEffect, useRef, useState } from 'react'
import jsmediatags from 'jsmediatags/dist/jsmediatags.min.js'
import './MetadataEditor.css'

type FormValues = {
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

type Picture = { data: ArrayBuffer; format: string }
type MediaTags = Record<string, unknown> & { picture?: Picture }
type TagFrame = { id: string; raw: Uint8Array }

const defaultsKey = 'lyric-canvas:mp3-editor-defaults'
const editableFrameIds = new Set([
  'TIT2', 'TPE1', 'TALB', 'TPE2', 'TRCK', 'TPOS', 'TYER', 'TDRC', 'TCON', 'TCOM', 'COMM',
])
const emptyValues: FormValues = {
  title: '', artist: '', album: '', albumArtist: '', track: '', disc: '', year: '', genre: '', composer: '', comment: '',
}
const emptyDefaults: Defaults = {
  artist: '', album: '', albumArtist: '', year: '', genre: '', composer: '', comment: '', albumArtName: '',
}

export default function MetadataEditor({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [initialValues, setInitialValues] = useState<FormValues>(emptyValues)
  const [artwork, setArtwork] = useState<Picture | null>(null)
  const [originalArtwork, setOriginalArtwork] = useState<Picture | null>(null)
  const [artworkChanged, setArtworkChanged] = useState(false)
  const [artworkName, setArtworkName] = useState('')
  const [duration, setDuration] = useState<number | null>(null)
  const [status, setStatus] = useState('Choose an MP3 to start editing.')
  const [isDragging, setIsDragging] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const mp3InputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null)

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
  }, [audioUrl])

  useEffect(() => () => {
    if (artworkUrl) URL.revokeObjectURL(artworkUrl)
  }, [artworkUrl])

  const chooseFile = (nextFile: File | undefined) => {
    if (!nextFile) return
    if (!isMp3(nextFile)) {
      setStatus('Please choose an MP3 file. Other file types are not supported.')
      return
    }
    void openFile(nextFile)
  }

  const openFile = async (nextFile: File) => {
    setStatus('Reading metadata locally…')
    setFile(nextFile)
    setDuration(null)
    setArtwork(null)
    setOriginalArtwork(null)
    setArtworkChanged(false)
    setArtworkName('')
    setAudioUrl(URL.createObjectURL(nextFile))

    try {
      const tags = await readTags(nextFile)
      const saved = loadDefaults()
      const nextValues = valuesFromTags(tags, saved)
      const existingPicture = tags.picture ?? null
      setValues(nextValues)
      setInitialValues(nextValues)
      setArtwork(existingPicture)
      setOriginalArtwork(existingPicture)
      setArtworkUrl(existingPicture ? pictureUrl(existingPicture) : null)
      setStatus('Metadata loaded. Your file remains on this device.')
    } catch {
      const saved = loadDefaults()
      const nextValues = { ...emptyValues, ...saved }
      setValues(nextValues)
      setInitialValues(nextValues)
      setStatus('No readable ID3 tag found. You can add metadata below.')
    }
  }

  const updateValue = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const chooseArtwork = async (nextFile: File | undefined) => {
    if (!nextFile) return
    if (!['image/jpeg', 'image/png'].includes(nextFile.type)) {
      setStatus('Choose a JPG, JPEG, or PNG image for album artwork.')
      return
    }
    const nextPicture = { data: await nextFile.arrayBuffer(), format: nextFile.type }
    setArtwork(nextPicture)
    setArtworkChanged(true)
    setArtworkName(nextFile.name)
    setArtworkUrl(URL.createObjectURL(nextFile))
    setStatus(`Using ${nextFile.name} as the front cover.`)
  }

  const removeArtwork = () => {
    setArtwork(null)
    setArtworkChanged(true)
    setArtworkName('')
    setArtworkUrl(null)
  }

  const resetChanges = () => {
    setValues(initialValues)
    setArtwork(originalArtwork)
    setArtworkChanged(false)
    setArtworkName('')
    setArtworkUrl(originalArtwork ? pictureUrl(originalArtwork) : null)
    setStatus('Changes reset to the metadata in the opened MP3.')
  }

  const save = async () => {
    if (!file) return
    setIsSaving(true)
    try {
      const original = await file.arrayBuffer()
      const output = buildEditedMp3(original, values, artwork, artworkChanged)
      const url = URL.createObjectURL(new Blob([output], { type: 'audio/mpeg' }))
      const link = document.createElement('a')
      link.href = url
      link.download = editedName(file.name)
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1_000)
      saveDefaults(values, artworkName)
      setInitialValues(values)
      setOriginalArtwork(artwork)
      setArtworkChanged(false)
      setStatus('Edited MP3 downloaded. Audio data was copied without re-encoding.')
    } catch {
      setStatus('Could not save this MP3. Please try another file.')
    } finally {
      setIsSaving(false)
    }
  }

  const bitrate = file && duration && duration > 0 ? Math.round((file.size * 8) / duration / 1000) : null

  return (
    <section className="metadata-screen" aria-label="MP3 metadata editor">
      <header className="metadata-header">
        <button type="button" className="metadata-back" onClick={onBack}>← Library</button>
        <div>
          <p className="eyebrow">LyricCanvas tools</p>
          <h1>MP3 Metadata Editor</h1>
          <p>Edit MP3 tags locally in your browser.</p>
        </div>
      </header>

      <input ref={mp3InputRef} className="file-input" type="file" accept="audio/mpeg,.mp3" onChange={(event) => chooseFile(event.target.files?.[0])} />
      <input ref={imageInputRef} className="file-input" type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" onChange={(event) => void chooseArtwork(event.target.files?.[0])} />

      <button
        type="button"
        className={`mp3-dropzone ${isDragging ? 'is-dragging' : ''}`}
        onClick={() => mp3InputRef.current?.click()}
        onDragEnter={(event) => { event.preventDefault(); setIsDragging(true) }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event: DragEvent<HTMLButtonElement>) => { event.preventDefault(); setIsDragging(false); chooseFile(event.dataTransfer.files[0]) }}
      >
        <span className="drop-icon">♫</span>
        <strong>Drop an MP3 here</strong>
        <span>or</span>
        <span className="choose-file">Choose MP3</span>
      </button>

      {file ? (
        <div className="file-details">
          <span><b>Filename</b>{file.name}</span>
          <span><b>File size</b>{formatBytes(file.size)}</span>
          <span><b>Duration</b>{duration === null ? 'Loading…' : formatDuration(duration)}</span>
          <span><b>Bitrate</b>{bitrate ? `${bitrate} kbps` : '—'}</span>
        </div>
      ) : null}

      {file ? (
        <div className="metadata-workspace">
          <section className="metadata-card">
            <div className="section-heading"><h2>Metadata</h2><span>ID3 tags</span></div>
            <div className="metadata-form">
              <Field label="Title" value={values.title} onChange={(value) => updateValue('title', value)} />
              <Field label="Artist" value={values.artist} onChange={(value) => updateValue('artist', value)} />
              <Field label="Album" value={values.album} onChange={(value) => updateValue('album', value)} />
              <Field label="Album Artist" value={values.albumArtist} onChange={(value) => updateValue('albumArtist', value)} />
              <Field label="Track Number" value={values.track} onChange={(value) => updateValue('track', value)} />
              <Field label="Disc Number" value={values.disc} onChange={(value) => updateValue('disc', value)} />
              <Field label="Year" value={values.year} inputMode="numeric" onChange={(value) => updateValue('year', value)} />
              <Field label="Genre" value={values.genre} onChange={(value) => updateValue('genre', value)} />
              <Field label="Composer" value={values.composer} onChange={(value) => updateValue('composer', value)} />
              <Field label="Comment" value={values.comment} textarea onChange={(value) => updateValue('comment', value)} />
            </div>
          </section>

          <aside className="metadata-side">
            <section className="metadata-card artwork-card">
              <div className="section-heading"><h2>Album artwork</h2><span>Front cover</span></div>
              <div className="artwork-preview">{artworkUrl ? <img src={artworkUrl} alt="Album artwork preview" /> : <span>Cover image</span>}</div>
              <div className="artwork-actions">
                <button type="button" onClick={() => imageInputRef.current?.click()}>Choose image</button>
                <button type="button" onClick={removeArtwork} disabled={!artwork}>Remove</button>
              </div>
            </section>
            <section className="metadata-card player-card">
              <div className="section-heading"><h2>Listen</h2><span>Original file</span></div>
              <audio ref={audioRef} controls src={audioUrl ?? undefined} onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? null)} />
            </section>
          </aside>
        </div>
      ) : null}

      {file ? <div className="metadata-actions"><button type="button" className="secondary-action" onClick={resetChanges}>Reset changes</button><button type="button" className="primary-action" onClick={() => void save()} disabled={isSaving}>{isSaving ? 'Preparing download…' : 'Save & download MP3'}</button></div> : null}
      <p className="metadata-status" role="status">{status}</p>
      <p className="privacy-notice">Your files never leave your device. All metadata editing happens locally in your browser.</p>
    </section>
  )
}

function Field({ label, value, onChange, textarea = false, inputMode }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean; inputMode?: 'numeric' }) {
  return <label className="metadata-field"><span>{label}</span>{textarea ? <textarea value={value} onChange={(event) => onChange(event.target.value)} /> : <input value={value} inputMode={inputMode} onChange={(event) => onChange(event.target.value)} />}</label>
}

function isMp3(file: File) { return file.type === 'audio/mpeg' || file.name.toLowerCase().endsWith('.mp3') }
function formatBytes(bytes: number) { return `${(bytes / 1024 / 1024).toFixed(bytes > 10 * 1024 * 1024 ? 1 : 2)} MB` }
function formatDuration(seconds: number) { return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}` }
function editedName(name: string) { return `${name.replace(/\.mp3$/i, '')}_edited.mp3` }
function pictureUrl(picture: Picture) { return URL.createObjectURL(new Blob([picture.data], { type: picture.format })) }

function loadDefaults(): Defaults {
  try { return { ...emptyDefaults, ...JSON.parse(localStorage.getItem(defaultsKey) ?? '{}') } } catch { return emptyDefaults }
}
function saveDefaults(values: FormValues, albumArtName: string) {
  const defaults: Defaults = { artist: values.artist, album: values.album, albumArtist: values.albumArtist, year: values.year, genre: values.genre, composer: values.composer, comment: values.comment, albumArtName }
  localStorage.setItem(defaultsKey, JSON.stringify(defaults))
}
function readTags(file: File): Promise<MediaTags> {
  return new Promise((resolve, reject) => jsmediatags.read(file, { onSuccess: (tag: { tags: MediaTags }) => resolve(tag.tags), onError: reject }))
}
function textValue(value: unknown) { return typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : '' }
function valuesFromTags(tags: MediaTags, defaults: Defaults): FormValues {
  return { title: textValue(tags.title), artist: textValue(tags.artist) || defaults.artist, album: textValue(tags.album) || defaults.album, albumArtist: textValue(tags.albumartist) || defaults.albumArtist, track: textValue(tags.track), disc: textValue(tags.disc), year: textValue(tags.year) || defaults.year, genre: textValue(tags.genre) || defaults.genre, composer: textValue(tags.composer) || defaults.composer, comment: textValue(tags.comment) || defaults.comment }
}

function buildEditedMp3(source: ArrayBuffer, values: FormValues, artwork: Picture | null, artworkChanged: boolean) {
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
      const frameSize = sizeAt
      raw.set([(frameSize >>> 24) & 0xff, (frameSize >>> 16) & 0xff, (frameSize >>> 8) & 0xff, frameSize & 0xff], 4)
    }
    frames.push({ id, raw })
    position = next
  }
  return { frames, audioOffset: end }
}
function readUint32(bytes: Uint8Array, at: number) { return ((bytes[at] << 24) >>> 0) + (bytes[at + 1] << 16) + (bytes[at + 2] << 8) + bytes[at + 3] }
function syncSafe(bytes: Uint8Array) { return (bytes[0] << 21) + (bytes[1] << 14) + (bytes[2] << 7) + bytes[3] }
function id3Header(size: number) { return new Uint8Array([73, 68, 51, 3, 0, 0, (size >>> 21) & 0x7f, (size >>> 14) & 0x7f, (size >>> 7) & 0x7f, size & 0x7f]) }
function concatBytes(chunks: Uint8Array[]) { const output = new Uint8Array(chunks.reduce((size, chunk) => size + chunk.length, 0)); let offset = 0; chunks.forEach((chunk) => { output.set(chunk, offset); offset += chunk.length }); return output }
