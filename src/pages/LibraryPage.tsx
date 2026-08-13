import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { featuredProjects } from '../data/projects'
import { createStoredProject, loadStoredProjects, saveStoredProjects, touchStoredProject } from '../data/projectStorage'
import { createBlankProject, createProjectId, parseLyricProject, renameProject, type LyricProject } from '../data/projectSchema'
import './LibraryPage.css'

type SelectedProject = { source: 'featured'; id: string; project: LyricProject } | { source: 'local'; id: string; project: LyricProject }

export default function LibraryPage() {
  const navigate = useNavigate()
  const [storedProjects, setStoredProjects] = useState(loadStoredProjects)
  const [selected, setSelected] = useState<SelectedProject>({ source: 'featured', id: featuredProjects[0].id, project: featuredProjects[0] })
  const [searchQuery, setSearchQuery] = useState('')
  const [statusMessage, setStatusMessage] = useState('Projects stay in this browser.')
  const importInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { saveStoredProjects(storedProjects) }, [storedProjects])
  const matches = (project: LyricProject) => [project.metadata.title, project.metadata.artists.join(' '), project.metadata.language, project.metadata.source].join(' ').toLowerCase().includes(searchQuery.trim().toLowerCase())
  const featured = featuredProjects.filter(matches)
  const local = storedProjects.filter(({ project }) => matches(project))
  const isLocal = selected.source === 'local'

  const open = (source: SelectedProject['source'], id: string, project: LyricProject) => {
    setSelected({ source, id, project })
    navigate(`/read/${source}/${id}`)
  }
  const createProject = () => {
    const stored = createStoredProject(createBlankProject())
    setStoredProjects((projects) => [stored, ...projects])
    setSelected({ source: 'local', id: stored.storageId, project: stored.project })
    setStatusMessage('Created a local project.')
  }
  const duplicate = () => {
    const stored = createStoredProject({ ...selected.project, id: createProjectId(), metadata: { ...selected.project.metadata, title: `${selected.project.metadata.title} Copy`, source: 'My Projects' } })
    setStoredProjects((projects) => [stored, ...projects])
    setSelected({ source: 'local', id: stored.storageId, project: stored.project })
    setStatusMessage('Duplicated into My Projects.')
  }
  const rename = () => {
    if (!isLocal) return setStatusMessage('Duplicate a featured song before renaming it.')
    const title = window.prompt('Project title', selected.project.metadata.title)
    if (title === null) return
    setStoredProjects((projects) => projects.map((stored) => stored.storageId === selected.id ? touchStoredProject({ ...stored, project: renameProject(stored.project, title) }) : stored))
    setSelected((current) => current.source === 'local' ? { ...current, project: renameProject(current.project, title) } : current)
    setStatusMessage('Renamed project.')
  }
  const remove = () => {
    if (!isLocal) return setStatusMessage('Featured songs are read-only.')
    if (!window.confirm(`Delete "${selected.project.metadata.title}" from this browser?`)) return
    setStoredProjects((projects) => projects.filter((stored) => stored.storageId !== selected.id))
    setSelected({ source: 'featured', id: featuredProjects[0].id, project: featuredProjects[0] })
    setStatusMessage('Deleted local project.')
  }
  const exportProject = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(selected.project, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a'); link.href = url; link.download = `${slugify(selected.project.metadata.title)}.json`; link.click(); URL.revokeObjectURL(url)
    setStatusMessage('Exported project JSON.')
  }
  const importProject = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; event.target.value = ''
    if (!file) return
    try {
      const imported = parseLyricProject(JSON.parse(await file.text()))
      const stored = createStoredProject({ ...imported, metadata: { ...imported.metadata, source: 'My Projects' } })
      setStoredProjects((projects) => [stored, ...projects]); setSelected({ source: 'local', id: stored.storageId, project: stored.project }); setStatusMessage(`Imported "${stored.project.metadata.title}".`)
    } catch { setStatusMessage('Import failed. Choose a valid project JSON file.') }
  }

  return <main className="library-page"><section className="library-shell">
    <header className="library-header"><div><p className="eyebrow">LyricCanvas</p><h1>Projects</h1></div><button type="button" className="icon-button" onClick={createProject} aria-label="Create project">+</button></header>
    <label className="search-field"><span>Search</span><input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Title, artist, language" /></label>
    <nav className="project-actions" aria-label="Project actions"><button onClick={duplicate}>Duplicate</button><button onClick={rename}>Rename</button><button onClick={remove}>Delete</button><button onClick={exportProject}>Export</button><button onClick={() => importInputRef.current?.click()}>Import</button><button onClick={() => navigate('/guide')}>Guide</button><button onClick={() => navigate('/mp3-editor')}>MP3 editor</button></nav>
    <input ref={importInputRef} className="file-input" type="file" accept="application/json,.json" onChange={(event) => void importProject(event)} />
    <ProjectList title="Featured Songs" selected={selected} projects={featured.map((project) => ({ id: project.id, project, source: 'featured' as const }))} onOpen={open} />
    <ProjectList title="My Projects" emptyMessage="No local projects yet." selected={selected} projects={local.map((stored) => ({ id: stored.storageId, project: stored.project, source: 'local' as const }))} onOpen={open} />
    <p className="library-status" role="status">{statusMessage}</p>
  </section></main>
}

function ProjectList({ title, projects, emptyMessage, selected, onOpen }: { title: string; projects: { id: string; source: SelectedProject['source']; project: LyricProject }[]; emptyMessage?: string; selected: SelectedProject; onOpen: (source: SelectedProject['source'], id: string, project: LyricProject) => void }) {
  return <section className="project-section"><h2>{title}</h2>{projects.length ? <div className="project-list">{projects.map(({ id, project, source }) => <button key={id} className={selected.source === source && selected.id === id ? 'project-item active' : 'project-item'} onClick={() => onOpen(source, id, project)}><span>{project.metadata.title}</span><small>{project.metadata.artists.join(' + ')} · {project.lyrics.length} lines</small></button>)}</div> : <p className="empty-message">{emptyMessage}</p>}</section>
}
function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'lyric-project' }
