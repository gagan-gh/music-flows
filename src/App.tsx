import { type CSSProperties, useEffect, useMemo, useState } from 'react'
import { mojarManushProject } from './data/featuredProjects'
import type { LyricLine } from './data/projectSchema'
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

const warmTags = new Set(['color', 'light', 'love', 'smile', 'sky'])
const coolTags = new Set(['rain', 'water', 'ocean', 'cloud', 'tears'])
const groundedTags = new Set(['earth', 'weight', 'body', 'dryness'])

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
    const lineMood = getLineVisualMood(currentLine, activeIndex, lyricCount)
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
  }, [activeIndex, currentLine, lyricCount])

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
