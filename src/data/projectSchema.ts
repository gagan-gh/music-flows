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
  overrides?: {
    // Visual overrides applied to this line. All fields optional and
    // if present will replace or delta the computed visual effects.
    warmth?: number
    intensity?: number
    drift?: number
    glowOpacity?: number
    particleOpacity?: number
    emphasis?: number
    bgStart?: string
    bgMiddle?: string
    bgEnd?: string
  }
}

export type LyricProject = {
  id: string
  metadata: {
    title: string
    artists: string[]
    source: string
    language: string
    songUrl?: string
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
    songUrl: undefined,
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

export function createBlankProject(id = createProjectId()): LyricProject {
  return {
    id,
    metadata: {
      title: 'Untitled Project',
      artists: ['Unknown Artist'],
      source: 'My Projects',
      language: 'Unknown',
      songUrl: undefined,
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
}

export function renameProject(project: LyricProject, title: string): LyricProject {
  return {
    ...project,
    metadata: {
      ...project.metadata,
      title: readString(title, project.metadata.title),
    },
  }
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

export function createProjectId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `project-${Date.now().toString(36)}`
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
    songUrl: readString(input.songUrl, undefined),
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
    overrides: parseOverrides((input as UnknownRecord).overrides),
  }
}

function parseOverrides(input: unknown) {
  if (!isRecord(input)) {
    return undefined
  }

  const maybeNumber = (key: string) => {
    const val = (input as UnknownRecord)[key]
    return typeof val === 'number' && Number.isFinite(val) ? val : undefined
  }

  const maybeString = (key: string) => {
    const val = (input as UnknownRecord)[key]
    return typeof val === 'string' && val.trim() ? val.trim() : undefined
  }

  const warmth = maybeNumber('warmth')
  const intensity = maybeNumber('intensity')
  const drift = maybeNumber('drift')
  const glowOpacity = maybeNumber('glowOpacity')
  const particleOpacity = maybeNumber('particleOpacity')
  const emphasis = maybeNumber('emphasis')
  const bgStart = maybeString('bgStart')
  const bgMiddle = maybeString('bgMiddle')
  const bgEnd = maybeString('bgEnd')

  if (
    warmth === undefined &&
    intensity === undefined &&
    drift === undefined &&
    glowOpacity === undefined &&
    particleOpacity === undefined &&
    emphasis === undefined &&
    bgStart === undefined &&
    bgMiddle === undefined &&
    bgEnd === undefined
  ) {
    return undefined
  }

  return {
    ...(warmth !== undefined ? { warmth } : {}),
    ...(intensity !== undefined ? { intensity } : {}),
    ...(drift !== undefined ? { drift } : {}),
    ...(glowOpacity !== undefined ? { glowOpacity } : {}),
    ...(particleOpacity !== undefined ? { particleOpacity } : {}),
    ...(emphasis !== undefined ? { emphasis } : {}),
    ...(bgStart !== undefined ? { bgStart } : {}),
    ...(bgMiddle !== undefined ? { bgMiddle } : {}),
    ...(bgEnd !== undefined ? { bgEnd } : {}),
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
