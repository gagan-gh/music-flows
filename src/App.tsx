import { type CSSProperties, useEffect, useMemo, useState } from 'react'
import { mojarManushProject, type LyricLine } from './data/featuredProjects'
import './App.css'

const project = mojarManushProject

const particleDreamTheme = {
  backgroundStart: '#101827',
  backgroundMiddle: '#302246',
  backgroundEnd: '#0b1822',
  glowOne: '#67e8f9',
  glowTwo: '#f0abfc',
  glowThree: '#86efac',
  text: '#f8fbff',
  mutedText: 'rgba(226, 238, 255, 0.68)',
}

const lineMoods = [
  { warmth: 0.14, drift: 8, intensity: 0.46 },
  { warmth: 0.2, drift: 18, intensity: 0.52 },
  { warmth: 0.26, drift: 29, intensity: 0.58 },
  { warmth: 0.34, drift: 40, intensity: 0.68 },
  { warmth: 0.2, drift: 52, intensity: 0.62 },
  { warmth: 0.16, drift: 64, intensity: 0.56 },
  { warmth: 0.08, drift: 76, intensity: 0.6 },
  { warmth: 0.1, drift: 88, intensity: 0.5 },
  { warmth: 0.04, drift: 98, intensity: 0.44 },
  { warmth: 0.02, drift: 110, intensity: 0.42 },
  { warmth: 0.16, drift: 124, intensity: 0.54 },
  { warmth: 0.1, drift: 136, intensity: 0.5 },
  { warmth: 0.22, drift: 150, intensity: 0.62 },
  { warmth: 0.3, drift: 164, intensity: 0.66 },
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const lyricCount = project.lyrics.length
  const currentLine = project.lyrics[activeIndex]
  const previousLine = activeIndex > 0 ? project.lyrics[activeIndex - 1] : null
  const nextLine =
    activeIndex < lyricCount - 1 ? project.lyrics[activeIndex + 1] : null

  const progressLabel = useMemo(
    () => `${activeIndex + 1} / ${lyricCount}`,
    [activeIndex, lyricCount],
  )
  const visualStyle = useMemo(() => {
    const progress = activeIndex / Math.max(lyricCount - 1, 1)
    const lineMood = lineMoods[activeIndex] ?? lineMoods[0]
    const glowScale = 0.74 + lineMood.intensity * 0.62

    return {
      '--bg-start': particleDreamTheme.backgroundStart,
      '--bg-middle': particleDreamTheme.backgroundMiddle,
      '--bg-end': particleDreamTheme.backgroundEnd,
      '--glow-one': particleDreamTheme.glowOne,
      '--glow-two': particleDreamTheme.glowTwo,
      '--glow-three': particleDreamTheme.glowThree,
      '--text-primary': particleDreamTheme.text,
      '--text-muted': particleDreamTheme.mutedText,
      '--song-progress': progress,
      '--line-warmth': lineMood.warmth,
      '--line-drift': `${lineMood.drift}px`,
      '--glow-opacity': 0.24 + lineMood.intensity * 0.32,
      '--glow-scale': glowScale,
      '--particle-opacity': 0.16 + lineMood.intensity * 0.22,
      '--reader-lift': `${(lineMood.intensity - 0.5) * -18}px`,
    } as CSSProperties
  }, [activeIndex, lyricCount])

  const goToLine = (nextIndex: number) => {
    setActiveIndex(Math.min(Math.max(nextIndex, 0), lyricCount - 1))
  }

  const goPrevious = () => {
    goToLine(activeIndex - 1)
  }

  const goNext = () => {
    goToLine(activeIndex + 1)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveIndex((index) => Math.max(index - 1, 0))
      }

      if (
        event.key === 'ArrowDown' ||
        event.key === 'ArrowRight' ||
        event.key === ' '
      ) {
        event.preventDefault()
        setActiveIndex((index) => Math.min(index + 1, lyricCount - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lyricCount])

  const handleTouchEnd = (touchEndX: number) => {
    if (touchStartX === null) {
      return
    }

    const distance = touchEndX - touchStartX

    if (Math.abs(distance) > 48) {
      if (distance < 0) {
        goNext()
      } else {
        goPrevious()
      }
    }

    setTouchStartX(null)
  }

  return (
    <main
      className="lyric-app"
      style={visualStyle}
      onTouchStart={(event) => setTouchStartX(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
    >
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />
      <div className="particle-field" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <header className="app-header" aria-label="Current song">
        <p className="eyebrow">{project.metadata.source}</p>
        <h1>{project.metadata.title}</h1>
        <p className="artist-line">{project.metadata.artists.join(' + ')}</p>
      </header>

      <section className="reader" aria-live="polite">
        <button
          className="ghost-line previous-line"
          type="button"
          onClick={goPrevious}
          disabled={!previousLine}
          aria-label="Previous lyric"
        >
          {previousLine ? <LyricText line={previousLine} compact /> : null}
        </button>

        <article className="current-line" key={currentLine.id}>
          <LyricText line={currentLine} />
        </article>

        <button
          className="ghost-line next-line"
          type="button"
          onClick={goNext}
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
              style={{ width: `${((activeIndex + 1) / lyricCount) * 100}%` }}
            />
          </div>
        </div>
        <button type="button" onClick={goNext} disabled={!nextLine}>
          Next
        </button>
      </footer>
    </main>
  )
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
