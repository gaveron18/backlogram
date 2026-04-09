import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-blue-500/30 transition-colors duration-300 flex flex-col">
        <Header />
        <main className="flex-1 pt-20 pb-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
