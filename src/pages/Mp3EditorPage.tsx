import { Link } from 'react-router-dom'
import MetadataEditor from '../components/MetadataEditor'

export default function Mp3EditorPage() {
  return <MetadataEditor backLink={<Link to="/">← Library</Link>} />
}
