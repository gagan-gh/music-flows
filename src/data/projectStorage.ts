import {
  createProjectId,
  parseLyricProject,
  type LyricProject,
} from './projectSchema'

const storageKey = 'lyric-canvas-projects'

export type StoredProject = {
  storageId: string
  project: LyricProject
  createdAt: string
  updatedAt: string
}

type StoredProjectInput = {
  storageId?: unknown
  project?: unknown
  createdAt?: unknown
  updatedAt?: unknown
}

export function loadStoredProjects(): StoredProject[] {
  if (!canUseLocalStorage()) {
    return []
  }

  const rawValue = localStorage.getItem(storageKey)

  if (!rawValue) {
    return []
  }

  try {
    const parsedValue: unknown = JSON.parse(rawValue)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue
      .map(parseStoredProject)
      .filter((project): project is StoredProject => project !== null)
  } catch {
    return []
  }
}

export function saveStoredProjects(projects: StoredProject[]) {
  if (!canUseLocalStorage()) {
    return
  }

  localStorage.setItem(storageKey, JSON.stringify(projects))
}

export function createStoredProject(project: LyricProject): StoredProject {
  const now = new Date().toISOString()
  const storageId = createProjectId()

  return {
    storageId,
    project: {
      ...project,
      id: storageId,
    },
    createdAt: now,
    updatedAt: now,
  }
}

export function touchStoredProject(storedProject: StoredProject): StoredProject {
  return {
    ...storedProject,
    updatedAt: new Date().toISOString(),
  }
}

function parseStoredProject(input: unknown): StoredProject | null {
  if (!isStoredProjectInput(input)) {
    return null
  }

  const now = new Date().toISOString()
  const storageId =
    typeof input.storageId === 'string' && input.storageId.trim()
      ? input.storageId.trim()
      : createProjectId()

  return {
    storageId,
    project: {
      ...parseLyricProject(input.project),
      id: storageId,
    },
    createdAt: readDate(input.createdAt, now),
    updatedAt: readDate(input.updatedAt, now),
  }
}

function canUseLocalStorage() {
  return typeof localStorage !== 'undefined'
}

function isStoredProjectInput(input: unknown): input is StoredProjectInput {
  return typeof input === 'object' && input !== null
}

function readDate(value: unknown, fallback: string) {
  if (typeof value !== 'string') {
    return fallback
  }

  return Number.isNaN(Date.parse(value)) ? fallback : value
}
