import { type CSSProperties, type TouchEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FractalGarden from '../components/FractalGarden'
import { findFeaturedProject, findLocalProject } from '../data/projects'
import { type LyricLine, type LyricProject } from '../data/projectSchema'
import VineScreensaver, { seedFlowerSelection } from '../vine_screensaver.jsx'
import NotFoundPage from './NotFoundPage'
import './ReaderPage.css'

const themes = { particle_dream: ['#101827','#302246','#0b1822','#67e8f9','#f0abfc','#86efac'], fractal_garden: ['#071018','#0b2a1f','#123028','#9be7b6','#6ee7d8','#c6f7a1'], ink_painting: ['#0b0b0d','#1b1a1f','#2b2730','#ffd7a6','#f5b7c4','#d7e3ff'], vine_garden: ['#0d1a0f','#0d1a0f','#0d1a0f','#a8d5a2','#5ab85a','#c6f7a1'] } as const

export default function ReaderPage({ source }: { source: 'featured' | 'local' }) {
  const { projectId, storageId } = useParams()
  const project = source === 'featured' ? findFeaturedProject(projectId ?? '') : findLocalProject(storageId ?? '')
  if (!project) return <NotFoundPage />
  return <Reader project={project} />
}

function Reader({ project }: { project: LyricProject }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'backward' | 'none'>('none')
  const wheelAt = useRef(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const line = project.lyrics[activeIndex]
  const previous = project.lyrics[activeIndex - 1]
  const next = project.lyrics[activeIndex + 1]
  const theme = themes[project.theme]
  const intensity = line.overrides?.intensity ?? line.hints.intensity
  const style = useMemo(() => ({ '--reader-bg-start': line.overrides?.bgStart ?? theme[0], '--reader-bg-middle': line.overrides?.bgMiddle ?? theme[1], '--reader-bg-end': line.overrides?.bgEnd ?? theme[2], '--reader-glow-one': theme[3], '--reader-glow-two': theme[4], '--reader-glow-three': theme[5], '--reader-lift': `${(intensity - .5) * -18}px`, '--line-emphasis': line.overrides?.emphasis ?? intensity } as CSSProperties), [intensity, line, theme])
  const go = useCallback((index: number) => { const nextIndex = Math.max(0, Math.min(index, project.lyrics.length - 1)); setDirection(nextIndex > activeIndex ? 'forward' : nextIndex < activeIndex ? 'backward' : 'none'); setActiveIndex(nextIndex) }, [activeIndex, project.lyrics.length])
  useEffect(() => { setActiveIndex(0); setDirection('none') }, [project.id])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(event.target.tagName)) return
      if (['ArrowUp','ArrowLeft'].includes(event.key)) { event.preventDefault(); go(activeIndex - 1) }
      if (['ArrowDown','ArrowRight',' '].includes(event.key)) { event.preventDefault(); go(activeIndex + 1) }
    }
    window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, go])
  const onWheel = (deltaY: number) => { const now = performance.now(); if (Math.abs(deltaY) < 18 || now - wheelAt.current < 360) return; wheelAt.current = now; go(activeIndex + (deltaY > 0 ? 1 : -1)) }
  const onTouchEnd = (event: TouchEvent<HTMLElement>) => { const start = touchStart.current; const end = event.changedTouches[0]; touchStart.current = null; if (!start || !end) return; const x = end.clientX - start.x; const y = end.clientY - start.y; if (Math.max(Math.abs(x), Math.abs(y)) < 48) return; go(activeIndex + ((Math.abs(y) >= Math.abs(x) ? y : x) < 0 ? 1 : -1)) }
  const vine = seedFlowerSelection((line.translation.length >= 5 ? line.translation : line.romanization) || line.native)
  return <main className="reader-page" style={style} onWheel={(event) => onWheel(event.deltaY)} onTouchStart={(event) => { const touch = event.changedTouches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY } }} onTouchEnd={onTouchEnd}>
    <div className="reader-ambient reader-ambient-one" /><div className="reader-ambient reader-ambient-two" /><div className="reader-ambient reader-ambient-three" />
    {project.theme === 'fractal_garden' ? <FractalGarden projectId={project.id} seed={line.romanization || line.translation || line.native} intensity={intensity} tags={line.hints.tags} native={line.native} translation={line.translation} /> : project.theme === 'vine_garden' ? <VineScreensaver key={project.id} backgroundMode flowerType={vine.flowerType} colorProfile={vine.colorProfile} /> : <ParticleField />}
    <section className="reader-performance" aria-label="Lyric reader"><Link className="reader-back" to="/">Projects</Link><header className="reader-header"><p>{project.metadata.source}</p><h1>{project.metadata.title}</h1><p>{project.metadata.artists.join(' + ')}</p></header><section className="reader-lines" aria-live="polite"><Ghost line={previous} onClick={() => go(activeIndex - 1)} /><article className={`current-line line-${direction}`} key={line.id}><LyricText line={line} /></article><Ghost line={next} onClick={() => go(activeIndex + 1)} /></section><footer className="reader-controls"><button onClick={() => go(activeIndex - 1)} disabled={!previous}>Previous</button><div><span>{activeIndex + 1} / {project.lyrics.length}</span><div className="progress-track"><div style={{ width: `${((activeIndex + 1) / project.lyrics.length) * 100}%` }} /></div></div><button onClick={() => go(activeIndex + 1)} disabled={!next}>Next</button></footer></section>
  </main>
}
function ParticleField() { return <div className="particle-field" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <span key={index} />)}</div> }
function Ghost({ line, onClick }: { line?: LyricLine; onClick: () => void }) { return <button className="ghost-line" onClick={onClick} disabled={!line} aria-label={line ? 'Change lyric' : undefined}>{line && <LyricText line={line} compact />}</button> }
function LyricText({ line, compact = false }: { line: LyricLine; compact?: boolean }) { return <div className={compact ? 'lyric-text compact' : 'lyric-text'}><p className="romanization">{line.romanization}</p><p className="translation">{line.translation}</p><p className="native">{line.native}</p></div> }
