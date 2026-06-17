import { LanguageProvider } from './context/LanguageContext'
import Index from './pages/Index'

export default function App() {
  return (
    <LanguageProvider>
      <Index />
    </LanguageProvider>
  )
}
