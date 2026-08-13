import { Link } from 'react-router-dom'
import './GuidePage.css'

const sampleProjectJson = `{
  "id": "new-project",
  "metadata": {
    "title": "New Project",
    "artists": ["Artist Name"],
    "source": "My Projects",
    "language": "English"
  },
  "theme": "fractal_garden",
  "lyrics": [{
    "id": "line-01",
    "native": "Soft rain at dawn.",
    "romanization": "Soft rain at dawn.",
    "translation": "Soft rain at dawn.",
    "hints": { "mood": "gentle", "intensity": 0.5, "tags": ["rain", "morning"] }
  }]
}`

export default function GuidePage() {
  return <main className="guide-page"><section className="guide-shell"><header className="guide-page-header"><div><p className="eyebrow">LyricCanvas</p><h1>JSON Guide</h1></div><Link className="guide-back" to="/" aria-label="Back to projects">←</Link></header><section className="json-guide"><div className="guide-header"><h2>Build a new project JSON</h2><p>Create a JSON file and import it from Projects to add a project manually.</p></div><div className="guide-grid"><div><strong>Required fields</strong><ul><li><code>id</code> – unique project identifier</li><li><code>metadata</code> – title, artists, source, language</li><li><code>theme</code> – <code>particle_dream</code>, <code>fractal_garden</code>, <code>ink_painting</code>, or <code>vine_garden</code></li><li><code>lyrics</code> – an array of lyric lines</li></ul><strong>Line fields</strong><ul><li><code>native</code>, <code>romanization</code>, <code>translation</code></li><li><code>hints</code> – mood, intensity (0–1), tags</li><li><code>overrides</code> – optional visual tuning</li></ul></div><pre className="guide-code">{sampleProjectJson}</pre></div></section></section></main>
}
