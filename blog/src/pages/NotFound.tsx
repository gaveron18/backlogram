import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-6xl font-black text-slate-200 dark:text-slate-800 mb-4">404</h1>
      <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Страница не найдена</p>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Запрошенная страница не существует или была перемещена.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
      >
        <Home size={16} /> На главную
      </Link>
    </div>
  )
}
