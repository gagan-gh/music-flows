import { Link } from 'react-router-dom'
import './PageShell.css'

export default function NotFoundPage() {
  return (
    <main className="page-shell">
      <section className="page-card not-found-page">
        <p className="eyebrow">LyricCanvas</p>
        <h1>Page not found</h1>
        <p>The page or project you requested is not available in this browser.</p>
        <Link className="page-link" to="/">Go to projects</Link>
      </section>
    </main>
  )
}
