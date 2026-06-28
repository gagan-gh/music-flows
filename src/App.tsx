import {
  type ChangeEvent,
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { featuredJsons } from './data/featuredProjects'
import {
  createBlankProject,
  createProjectId,
  parseLyricProject,
  renameProject,
  type LyricLine,
  type LyricProject,
} from './data/projectSchema'
import {
  createStoredProject,
  loadStoredProjects,
  saveStoredProjects,
  touchStoredProject,
  type StoredProject,
} from './data/projectStorage'
import './App.css'
import FractalGarden from './components/FractalGarden'
import VineScreensaver, { seedFlowerSelection } from './vine_screensaver.jsx'

const featuredProjects = featuredJsons.map((projectJson) =>
  parseLyricProject(projectJson),
)
const featuredSourcePrefix = 'featured:'
const localSourcePrefix = 'local:'

const themes = {
  particle_dream: {
    backgroundStart: '#101827',
    backgroundMiddle: '#302246',
    backgroundEnd: '#0b1822',
    glowOne: '#67e8f9',
    glowTwo: '#f0abfc',
    glowThree: '#86efac',
    text: '#f8fbff',
    mutedText: 'rgba(226, 238, 255, 0.68)',
  },
  fractal_garden: {
    backgroundStart: '#071018',
    backgroundMiddle: '#0b2a1f',
    backgroundEnd: '#123028',
    glowOne: '#9be7b6',
    glowTwo: '#6ee7d8',
    glowThree: '#c6f7a1',
    text: '#f8fbf6',
    mutedText: 'rgba(225, 245, 230, 0.72)',
  },
  ink_painting: {
    backgroundStart: '#0b0b0d',
    backgroundMiddle: '#1b1a1f',
    backgroundEnd: '#2b2730',
    glowOne: '#ffd7a6',
    glowTwo: '#f5b7c4',
    glowThree: '#d7e3ff',
    text: '#fffdf8',
    mutedText: 'rgba(230, 226, 220, 0.68)',
  },
  vine_garden: {
    backgroundStart: '#0d1a0f',
    backgroundMiddle: '#0d1a0f',
    backgroundEnd: '#0d1a0f',
    glowOne: '#a8d5a2',
    glowTwo: '#5ab85a',
    glowThree: '#c6f7a1',
    text: '#f0fff0',
    mutedText: 'rgba(200, 240, 200, 0.70)',
  },
} as const

const sampleProjectJson = `{
  "id": "new-project",
  "metadata": {
    "title": "New Project",
    "artists": ["Artist Name"],
    "source": "My Projects",
    "language": "English"
  },
  "theme": "fractal_garden",
  "lyrics": [
    {
      "id": "line-01",
      "native": "Soft rain at dawn.",
      "romanization": "Soft rain at dawn.",
      "translation": "Soft rain at dawn.",
      "hints": {
        "mood": "gentle",
        "intensity": 0.5,
        "tags": ["rain", "morning"]
      }
    }
  ]
}`

const warmTags = new Set(['color', 'light', 'love', 'smile', 'sky'])
const coolTags = new Set(['rain', 'water', 'ocean', 'cloud', 'tears'])
const groundedTags = new Set(['earth', 'weight', 'body', 'dryness'])

function App() {
  const [storedProjects, setStoredProjects] = useState(loadStoredProjects)
  const [activeSourceId, setActiveSourceId] = useState(
    `${featuredSourcePrefix}${featuredProjects[0].id}`,
  )
  const [viewMode, setViewMode] = useState<'projects' | 'reader' | 'guide'>('projects')
  const [activeIndex, setActiveIndex] = useState(0)
  const [lineDirection, setLineDirection] = useState<'forward' | 'backward' | 'none'>('none')
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusMessage, setStatusMessage] = useState('Projects stay in this browser.')
  const importInputRef = useRef<HTMLInputElement>(null)
  const lastWheelNavigationRef = useRef(0)

  const activeProject = useMemo(
    () => resolveActiveProject(activeSourceId, storedProjects),
    [activeSourceId, storedProjects],
  )
  const activeStoredProject = useMemo(
    () => findStoredProject(activeSourceId, storedProjects),
    [activeSourceId, storedProjects],
  )
  const filteredFeaturedProjects = useMemo(
    () => filterProjects(featuredProjects, searchQuery),
    [searchQuery],
  )
  const filteredStoredProjects = useMemo(
    () =>
      storedProjects.filter((storedProject) =>
        matchesProject(storedProject.project, searchQuery),
      ),
    [searchQuery, storedProjects],
  )
  const lyricCount = activeProject.lyrics.length
  const safeActiveIndex = Math.min(activeIndex, lyricCount - 1)
  const currentLine = activeProject.lyrics[safeActiveIndex]
  const previousLine =
    safeActiveIndex > 0 ? activeProject.lyrics[safeActiveIndex - 1] : null
  const nextLine =
    safeActiveIndex < lyricCount - 1 ? activeProject.lyrics[safeActiveIndex + 1] : null

  const progressLabel = useMemo(
    () => `${safeActiveIndex + 1} / ${lyricCount}`,
    [safeActiveIndex, lyricCount],
  )
  const visualStyle = useMemo(() => {
    const progress = safeActiveIndex / Math.max(lyricCount - 1, 1)
    const lineMood = getLineVisualMood(currentLine, safeActiveIndex, lyricCount)
    const glowScale = 0.74 + lineMood.intensity * 0.62

    // Merge any per-line overrides (overrides take precedence)
    const overrides = currentLine.overrides ?? {}

    const warmth = overrides.warmth ?? lineMood.warmth
    const intensity = overrides.intensity ?? lineMood.intensity
    const drift = overrides.drift ?? lineMood.drift
    const glowOpacity =
      overrides.glowOpacity ?? (0.24 + intensity * 0.32)
    const particleOpacity =
      overrides.particleOpacity ?? (0.16 + intensity * 0.22)
    const emphasis = overrides.emphasis ?? intensity

    const theme = (themes as Record<string, any>)[activeProject.theme] ?? themes.particle_dream

    return {
      '--bg-start': theme.backgroundStart,
      '--bg-middle': theme.backgroundMiddle,
      '--bg-end': theme.backgroundEnd,
      '--glow-one': theme.glowOne,
      '--glow-two': theme.glowTwo,
      '--glow-three': theme.glowThree,
      '--text-primary': theme.text,
      '--text-muted': theme.mutedText,
      '--song-progress': progress,
      '--line-warmth': warmth,
      '--line-drift': `${drift}px`,
      '--glow-opacity': glowOpacity,
      '--glow-scale': glowScale,
      '--particle-opacity': particleOpacity,
      '--reader-lift': `${(intensity - 0.5) * -18}px`,
      '--line-emphasis': emphasis,
      // allow background color overrides per-line
      '--override-bg-start': overrides.bgStart ?? '',
      '--override-bg-middle': overrides.bgMiddle ?? '',
      '--override-bg-end': overrides.bgEnd ?? '',
    } as CSSProperties
  }, [currentLine, lyricCount, safeActiveIndex, activeProject.theme])

  const fractalIntensity = (currentLine.overrides?.intensity ?? currentLine.hints.intensity) ?? 0.5
  const vineSeed = (s: string) => s.length >= 5 ? s : null
  const vineSelection = seedFlowerSelection(vineSeed(currentLine.translation) ?? vineSeed(currentLine.romanization) ?? currentLine.native ?? '')

  useEffect(() => {
    saveStoredProjects(storedProjects)
  }, [storedProjects])

  useEffect(() => {
    setActiveIndex(0)
    setLineDirection('none')
  }, [activeSourceId])

  const goToLine = (nextIndex: number) => {
    const clampedIndex = Math.min(Math.max(nextIndex, 0), lyricCount - 1)

    if (clampedIndex > safeActiveIndex) {
      setLineDirection('forward')
    } else if (clampedIndex < safeActiveIndex) {
      setLineDirection('backward')
    }

    setActiveIndex(clampedIndex)
  }

  const goPrevious = () => {
    goToLine(safeActiveIndex - 1)
  }

  const goNext = () => {
    goToLine(safeActiveIndex + 1)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (viewMode !== 'reader') {
        return
      }

      if (shouldIgnoreReaderShortcut(event.target)) {
        return
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        setLineDirection('backward')
        setActiveIndex((index) => Math.max(index - 1, 0))
      }

      if (
        event.key === 'ArrowDown' ||
        event.key === 'ArrowRight' ||
        event.key === ' '
      ) {
        event.preventDefault()
        setLineDirection('forward')
        setActiveIndex((index) => Math.min(index + 1, lyricCount - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lyricCount, viewMode])

  const handleTouchEnd = (touchEndX: number, touchEndY: number) => {
    if (viewMode !== 'reader') {
      return
    }

    if (touchStart === null) {
      return
    }

    const deltaX = touchEndX - touchStart.x
    const deltaY = touchEndY - touchStart.y

    if (Math.abs(deltaY) >= Math.abs(deltaX) && Math.abs(deltaY) > 48) {
      if (deltaY < 0) {
        goNext()
      } else {
        goPrevious()
      }
    } else if (Math.abs(deltaX) > 48) {
      if (deltaX < 0) {
        goNext()
      } else {
        goPrevious()
      }
    }

    setTouchStart(null)
  }

  const handleWheel = (deltaY: number) => {
    if (viewMode !== 'reader' || Math.abs(deltaY) < 18) {
      return
    }

    const now = window.performance.now()

    if (now - lastWheelNavigationRef.current < 360) {
      return
    }

    lastWheelNavigationRef.current = now

    if (deltaY > 0) {
      goNext()
    } else {
      goPrevious()
    }
  }

  const selectFeaturedProject = (projectId: string) => {
    setActiveSourceId(`${featuredSourcePrefix}${projectId}`)
    setViewMode('reader')
  }

  const selectStoredProject = (storageId: string) => {
    setActiveSourceId(`${localSourcePrefix}${storageId}`)
    setViewMode('reader')
  }

  const createProject = () => {
    const storedProject = createStoredProject(createBlankProject())

    setStoredProjects((projects) => [storedProject, ...projects])
    setActiveSourceId(`${localSourcePrefix}${storedProject.storageId}`)
    setStatusMessage('Created a local project.')
  }

  const duplicateActiveProject = () => {
    const storedProject = createStoredProject({
      ...activeProject,
      id: createProjectId(),
      metadata: {
        ...activeProject.metadata,
        title: `${activeProject.metadata.title} Copy`,
        source: 'My Projects',
      },
    })

    setStoredProjects((projects) => [storedProject, ...projects])
    setActiveSourceId(`${localSourcePrefix}${storedProject.storageId}`)
    setStatusMessage('Duplicated into My Projects.')
  }

  const renameActiveProject = () => {
    if (!activeStoredProject) {
      setStatusMessage('Duplicate a featured song before renaming it.')
      return
    }

    const nextTitle = window.prompt(
      'Project title',
      activeStoredProject.project.metadata.title,
    )

    if (nextTitle === null) {
      return
    }

    setStoredProjects((projects) =>
      projects.map((storedProject) =>
        storedProject.storageId === activeStoredProject.storageId
          ? touchStoredProject({
              ...storedProject,
              project: renameProject(storedProject.project, nextTitle),
            })
          : storedProject,
      ),
    )
    setStatusMessage('Renamed project.')
  }

  const deleteActiveProject = () => {
    if (!activeStoredProject) {
      setStatusMessage('Featured songs are read-only.')
      return
    }

    const confirmed = window.confirm(
      `Delete "${activeStoredProject.project.metadata.title}" from this browser?`,
    )

    if (!confirmed) {
      return
    }

    setStoredProjects((projects) =>
      projects.filter(
        (storedProject) => storedProject.storageId !== activeStoredProject.storageId,
      ),
    )
    setActiveSourceId(`${featuredSourcePrefix}${featuredProjects[0].id}`)
    setStatusMessage('Deleted local project.')
  }

  const exportActiveProject = () => {
    const json = JSON.stringify(activeProject, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `${slugify(activeProject.metadata.title)}.json`
    link.click()
    URL.revokeObjectURL(url)
    setStatusMessage('Exported project JSON.')
  }

  const importProject = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    try {
      const parsedProject = parseLyricProject(JSON.parse(await file.text()))
      const storedProject = createStoredProject({
        ...parsedProject,
        metadata: {
          ...parsedProject.metadata,
          source: 'My Projects',
        },
      })

      setStoredProjects((projects) => [storedProject, ...projects])
      setActiveSourceId(`${localSourcePrefix}${storedProject.storageId}`)
      setStatusMessage(`Imported "${storedProject.project.metadata.title}".`)
    } catch {
      setStatusMessage('Import failed. Choose a valid project JSON file.')
    }
  }

  return (
    <main
      className={`lyric-app ${viewMode === 'projects' ? 'project-mode' : 'reader-mode'}`}
      style={visualStyle}
      onTouchStart={(event) => {
        if (viewMode === 'reader') {
          const touch = event.changedTouches[0]
          setTouchStart({ x: touch.clientX, y: touch.clientY })
        }
      }}
      onTouchEnd={(event) => {
        const touch = event.changedTouches[0]
        handleTouchEnd(touch.clientX, touch.clientY)
      }}
      onWheel={(event) => handleWheel(event.deltaY)}
    >
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />
      {activeProject.theme === 'fractal_garden' ? (
        <FractalGarden
          projectId={activeProject.id}
          seed={currentLine.romanization || currentLine.translation || currentLine.native}
          intensity={fractalIntensity}
          tags={currentLine.hints.tags}
          native={currentLine.native}
          translation={currentLine.translation}
        />
      ) : activeProject.theme === 'vine_garden' ? (
        <>
          <VineScreensaver
            backgroundMode
            flowerType={vineSelection.flowerType}
            colorProfile={vineSelection.colorProfile}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', pointerEvents: 'none', zIndex: 0 }} />
        </>
      ) : (
        <div className="particle-field" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      )}

      {viewMode === 'projects' ? (
        <section className="project-screen" aria-label="Project browser">
          <div className="project-shell">
            <div className="browser-header">
              <div>
                <p className="eyebrow">LyricCanvas</p>
                <h2>Projects</h2>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={createProject}
                aria-label="Create project"
              >
                +
              </button>
            </div>

            <label className="search-field">
              <span>Search</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Title, artist, language"
              />
            </label>

            <div className="project-actions">
              <button type="button" onClick={duplicateActiveProject}>
                Duplicate
              </button>
              <button type="button" onClick={renameActiveProject}>
                Rename
              </button>
              <button type="button" onClick={deleteActiveProject}>
                Delete
              </button>
              <button type="button" onClick={exportActiveProject}>
                Export
              </button>
              <button type="button" onClick={() => importInputRef.current?.click()}>
                Import
              </button>
              <button type="button" onClick={() => setViewMode('guide')}>
                Guide
              </button>
            </div>

            <input
              ref={importInputRef}
              className="file-input"
              type="file"
              accept="application/json,.json"
              onChange={importProject}
            />

            <ProjectList
              title="Featured Songs"
              projects={filteredFeaturedProjects.map((project) => ({
                id: project.id,
                project,
                active: activeSourceId === `${featuredSourcePrefix}${project.id}`,
                onSelect: () => selectFeaturedProject(project.id),
              }))}
            />

            <ProjectList
              title="My Projects"
              emptyMessage="No local projects yet."
              projects={filteredStoredProjects.map((storedProject) => ({
                id: storedProject.storageId,
                project: storedProject.project,
                active: activeSourceId === `${localSourcePrefix}${storedProject.storageId}`,
                onSelect: () => selectStoredProject(storedProject.storageId),
              }))}
            />

            <p className="browser-status" role="status">
              {statusMessage}
            </p>
          </div>
        </section>
      ) : null}

      {viewMode === 'guide' ? (
      <section className="project-screen" aria-label="JSON guide screen">
        <div className="project-shell">
          <div className="browser-header">
            <div>
              <p className="eyebrow">LyricCanvas</p>
              <h2>JSON Guide</h2>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => setViewMode('projects')}
              aria-label="Back to projects"
            >
              ←
            </button>
          </div>
          <JsonGuide />
          <p className="browser-status" role="status">
            Import your JSON from the Projects screen when ready.
          </p>
        </div>
      </section>
      ) : null}

      {viewMode === 'reader' ? (
      <section className="performance" aria-label="Lyric reader">
        <button
          type="button"
          className="reader-back"
          onClick={() => setViewMode('projects')}
        >
          Projects
        </button>
        {activeProject.theme === 'vine_garden' && (
          <button
            type="button"
            className="vine-download"
            onClick={() => {
              const canvas = document.querySelector('canvas') as HTMLCanvasElement | null
              if (!canvas) return
              const a = document.createElement('a')
              a.href = canvas.toDataURL('image/png')
              a.download = 'vine-garden.png'
              a.click()
            }}
          >
            ⬇ PNG
          </button>
        )}

        <header className="app-header" aria-label="Current song">
          <p className="eyebrow">{activeProject.metadata.source}</p>
          <h1>{activeProject.metadata.title}</h1>
          <p className="artist-line">
            {activeProject.metadata.artists.join(' + ')}
            {activeProject.metadata.songUrl && (
              <a
                href={activeProject.metadata.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="song-link-icon"
                aria-label="Listen to song"
              >
                ♪
              </a>
            )}
          </p>
        </header>

        <section className="reader" aria-live="polite">
          <button
            className="ghost-line previous-line"
            type="button"
            onClick={(event) => {
              goPrevious()
              event.currentTarget.blur()
            }}
            disabled={!previousLine}
            aria-label="Previous lyric"
          >
            {previousLine ? <LyricText line={previousLine} compact /> : null}
          </button>

          <article
            className={`current-line line-${lineDirection}`}
            key={currentLine.id}
          >
            <LyricText line={currentLine} />
          </article>

          <button
            className="ghost-line next-line"
            type="button"
            onClick={(event) => {
              goNext()
              event.currentTarget.blur()
            }}
            disabled={!nextLine}
            aria-label="Next lyric"
          >
            {nextLine ? <LyricText line={nextLine} compact /> : null}
          </button>
        </section>

        <footer className="reader-controls">
          <button type="button" onClick={goPrevious} disabled={!previousLine}>
            Previous
          </button>
          <div className="progress" aria-label={`Lyric ${progressLabel}`}>
            <span>{progressLabel}</span>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${((safeActiveIndex + 1) / lyricCount) * 100}%` }}
              />
            </div>
          </div>
          <button type="button" onClick={goNext} disabled={!nextLine}>
            Next
          </button>
        </footer>
      </section>
      ) : null}
    </main>
  )
}

function ProjectList({
  title,
  projects,
  emptyMessage,
}: {
  title: string
  projects: {
    id: string
    project: LyricProject
    active: boolean
    onSelect: () => void
  }[]
  emptyMessage?: string
}) {
  return (
    <section className="project-section">
      <h3>{title}</h3>
      {projects.length > 0 ? (
        <div className="project-list">
          {projects.map(({ id, project, active, onSelect }) => (
            <button
              key={id}
              type="button"
              className={active ? 'project-item active' : 'project-item'}
              onClick={onSelect}
            >
              <span>{project.metadata.title}</span>
              <small>
                {project.metadata.artists.join(' + ')} · {project.lyrics.length} lines
              </small>
            </button>
          ))}
        </div>
      ) : (
        <p className="empty-message">{emptyMessage}</p>
      )}
    </section>
  )
}

function JsonGuide() {
  return (
    <section className="json-guide" aria-label="New project JSON guide">
      <div className="guide-header">
        <h3>Build a new project JSON</h3>
        <p>
          Create a new JSON file and import it using the Import button above. Use this structure to add a project manually.
        </p>
      </div>
      <div className="guide-grid">
        <div>
          <strong>Required fields</strong>
          <ul>
            <li><code>id</code> – unique project identifier</li>
            <li><code>metadata</code> – title, artists, source, language</li>
            <li><code>theme</code> – <code>particle_dream</code>, <code>fractal_garden</code>, <code>ink_painting</code>, or <code>vine_garden</code></li>
            <li><code>lyrics</code> – array of lyric lines</li>
          </ul>
          <strong>Line fields</strong>
          <ul>
            <li><code>native</code>, <code>romanization</code>, <code>translation</code></li>
            <li><code>hints</code> – <code>mood</code>, <code>intensity</code> (0–1), <code>tags</code></li>
            <li><code>overrides</code> – optional visual tuning for a line</li>
          </ul>
          <strong>Supported moods</strong>
          <ul>
            <li><code>wonder</code>, <code>gentle</code>, <code>radiant</code></li>
            <li><code>longing</code>, <code>reflective</code>, <code>heavy</code></li>
            <li><code>playful</code>, <code>desolate</code>, <code>wounded</code></li>
          </ul>
          <strong>Suggested tags</strong>
          <ul>
            <li><code>rain</code>, <code>water</code>, <code>ocean</code>, <code>cloud</code></li>
            <li><code>light</code>, <code>color</code>, <code>sky</code>, <code>wind</code></li>
            <li><code>earth</code>, <code>weight</code>, <code>tears</code>, <code>love</code></li>
          </ul>
        </div>
        <pre className="guide-code">{sampleProjectJson}</pre>
      </div>
    </section>
  )
}

function resolveActiveProject(sourceId: string, storedProjects: StoredProject[]) {
  if (sourceId.startsWith(localSourcePrefix)) {
    const storageId = sourceId.slice(localSourcePrefix.length)
    const storedProject = storedProjects.find((project) => project.storageId === storageId)

    if (storedProject) {
      return storedProject.project
    }
  }

  if (sourceId.startsWith(featuredSourcePrefix)) {
    const projectId = sourceId.slice(featuredSourcePrefix.length)
    const featuredProject = featuredProjects.find((project) => project.id === projectId)

    if (featuredProject) {
      return featuredProject
    }
  }

  return featuredProjects[0]
}

function findStoredProject(sourceId: string, storedProjects: StoredProject[]) {
  if (!sourceId.startsWith(localSourcePrefix)) {
    return null
  }

  const storageId = sourceId.slice(localSourcePrefix.length)

  return storedProjects.find((project) => project.storageId === storageId) ?? null
}

function filterProjects(projects: LyricProject[], searchQuery: string) {
  return projects.filter((project) => matchesProject(project, searchQuery))
}

function matchesProject(project: LyricProject, searchQuery: string) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  if (!normalizedQuery) {
    return true
  }

  return [
    project.metadata.title,
    project.metadata.artists.join(' '),
    project.metadata.language,
    project.metadata.source,
  ]
    .join(' ')
    .toLowerCase()
    .includes(normalizedQuery)
}

function getLineVisualMood(line: LyricLine, index: number, total: number) {
  const progress = index / Math.max(total - 1, 1)
  const tagWarmth = line.hints.tags.reduce((score, tag) => {
    if (warmTags.has(tag)) {
      return score + 0.08
    }

    if (coolTags.has(tag)) {
      return score - 0.04
    }

    if (groundedTags.has(tag)) {
      return score - 0.06
    }

    return score
  }, 0)
  const moodWarmth = getMoodWarmth(line.hints.mood)
  const warmth = clamp(0.14 + progress * 0.12 + tagWarmth + moodWarmth, 0, 0.42)
  const groundedWeight = line.hints.tags.some((tag) => groundedTags.has(tag)) ? -8 : 0

  return {
    warmth,
    drift: 8 + progress * 156 + line.hints.intensity * 12 + groundedWeight,
    intensity: line.hints.intensity,
  }
}

function getMoodWarmth(mood: string) {
  const normalizedMood = mood.toLowerCase()

  if (['radiant', 'wonder', 'playful', 'gentle', 'longing'].includes(normalizedMood)) {
    return 0.08
  }

  if (['heavy', 'burdened', 'desolate', 'wounded'].includes(normalizedMood)) {
    return -0.08
  }

  return 0
}

function shouldIgnoreReaderShortcut(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'lyric-project'
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function LyricText({
  line,
  compact = false,
}: {
  line: LyricLine
  compact?: boolean
}) {
  return (
    <div className={compact ? 'lyric-text compact' : 'lyric-text'}>
      <p className="romanization">{line.romanization}</p>
      <p className="translation">{line.translation}</p>
      <p className="native">{line.native}</p>
    </div>
  )
}

export default App
