import { type DragEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import {
  buildEditedMp3,
  editedName,
  emptyValues,
  formatBytes,
  formatDuration,
  isMp3,
  loadDefaults,
  type FormValues,
  type Picture,
  pictureUrl,
  readTags,
  saveDefaults,
  valuesFromTags,
} from '../features/mp3-editor/mp3Utils'
import './MetadataEditor.css'

export default function MetadataEditor({ backLink }: { backLink: ReactNode }) {
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
        <span className="metadata-back">{backLink}</span>
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
