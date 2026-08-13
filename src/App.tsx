import { Navigate, Route, Routes } from 'react-router-dom'
import GuidePage from './pages/GuidePage'
import LibraryPage from './pages/LibraryPage'
import Mp3EditorPage from './pages/Mp3EditorPage'
import NotFoundPage from './pages/NotFoundPage'
import ReaderPage from './pages/ReaderPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LibraryPage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="/mp3-editor" element={<Mp3EditorPage />} />
      <Route path="/read/featured/:projectId" element={<ReaderPage source="featured" />} />
      <Route path="/read/local/:storageId" element={<ReaderPage source="local" />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
