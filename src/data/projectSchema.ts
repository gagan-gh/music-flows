export const themeIds = ['particle_dream', 'fractal_garden', 'ink_painting'] as const

export type ThemeId = (typeof themeIds)[number]

export type LyricHints = {
  mood: string
  intensity: number
  tags: string[]
}

export type LyricLine = {
  id: string
  native: string
  romanization: string
  translation: string
  hints: LyricHints
}

export type LyricProject = {
  id: string
  metadata: {
    title: string
    artists: string[]
    source: string
    language: string
  }
  theme: ThemeId
  lyrics: LyricLine[]
}

type UnknownRecord = Record<string, unknown>

const defaultProject: LyricProject = {
  id: 'untitled-project',
  metadata: {
    title: 'Untitled Project',
    artists: ['Unknown Artist'],
    source: 'Custom Project',
    language: 'Unknown',
  },
  theme: 'particle_dream',
  lyrics: [
    {
      id: 'line-01',
      native: '',
      romanization: 'Add a first lyric line',
      translation: 'Your translation or meaning appears here.',
      hints: {
        mood: 'neutral',
        intensity: 0.5,
        tags: [],
      },
    },
  ],
}

export function parseLyricProject(input: unknown): LyricProject {
  if (!isRecord(input)) {
    return defaultProject
  }

  const lyricsInput = Array.isArray(input.lyrics) ? input.lyrics : []
  const lyrics = lyricsInput
    .map((line, index) => parseLyricLine(line, index))
    .filter((line) => hasReadableText(line))

  return {
    id: readString(input.id, defaultProject.id),
    metadata: parseMetadata(input.metadata),
    theme: parseTheme(input.theme),
    lyrics: lyrics.length > 0 ? lyrics : defaultProject.lyrics,
  }
}

function parseMetadata(input: unknown): LyricProject['metadata'] {
  if (!isRecord(input)) {
    return defaultProject.metadata
  }

  return {
    title: readString(input.title, defaultProject.metadata.title),
    artists: readStringArray(input.artists, defaultProject.metadata.artists),
    source: readString(input.source, defaultProject.metadata.source),
    language: readString(input.language, defaultProject.metadata.language),
  }
}

function parseTheme(input: unknown): ThemeId {
  return typeof input === 'string' && themeIds.includes(input as ThemeId)
    ? (input as ThemeId)
    : defaultProject.theme
}

function parseLyricLine(input: unknown, index: number): LyricLine {
  const fallbackId = `line-${String(index + 1).padStart(2, '0')}`

  if (!isRecord(input)) {
    return {
      ...defaultProject.lyrics[0],
      id: fallbackId,
    }
  }

  return {
    id: readString(input.id, fallbackId),
    native: readString(input.native, ''),
    romanization: readString(input.romanization, ''),
    translation: readString(input.translation, ''),
    hints: parseHints(input.hints),
  }
}

function parseHints(input: unknown): LyricHints {
  if (!isRecord(input)) {
    return {
      mood: 'neutral',
      intensity: 0.5,
      tags: [],
    }
  }

  return {
    mood: readString(input.mood, 'neutral'),
    intensity: clamp(readNumber(input.intensity, 0.5), 0, 1),
    tags: readStringArray(input.tags, []),
  }
}

function hasReadableText(line: LyricLine) {
  return Boolean(line.native || line.romanization || line.translation)
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function readStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback
  }

  const strings = value.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0,
  )

  return strings.length > 0 ? strings.map((item) => item.trim()) : fallback
}

function readNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
