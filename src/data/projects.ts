import { featuredJsons } from './featuredProjects'
import { type LyricProject, parseLyricProject } from './projectSchema'
import { loadStoredProjects } from './projectStorage'

export const featuredProjects = featuredJsons.map((projectJson) =>
  parseLyricProject(projectJson),
)

export function findFeaturedProject(projectId: string): LyricProject | null {
  return featuredProjects.find((project) => project.id === projectId) ?? null
}

export function findLocalProject(storageId: string): LyricProject | null {
  return (
    loadStoredProjects().find((storedProject) => storedProject.storageId === storageId)
      ?.project ?? null
  )
}
