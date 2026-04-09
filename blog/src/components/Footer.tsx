import { Rss, Send, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-12 pb-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2 mb-4">
              <span className="bg-blue-600 w-8 h-8 rounded flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-900/20">I</span>
              <span>Блог Интеграм</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Рассказываем о проектах, обновлениях и событиях. Конструктор Интеграм для корпоративной разработки без программирования.
            </p>
          </div>

          <div>
            <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-4">Разделы</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors">Все статьи</Link></li>
              <li><Link to="/category/О платформе" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors">О платформе</Link></li>
              <li><Link to="/category/Разработка" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors">Разработка</Link></li>
              <li><Link to="/category/Обучение" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors">Обучение</Link></li>
              <li><Link to="/category/Проекты" className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors">Проекты</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-4">Ресурсы</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://integram.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors">
                  Интеграм <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://help.integram.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors">
                  Документация <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="/feed/rss" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 text-sm transition-colors">
                  <Rss size={14} /> RSS-лента
                </a>
              </li>
              <li>
                <a href="https://t.me/qdmadept" className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors">
                  <Send size={14} /> Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 dark:text-slate-500 text-xs">
            © {currentYear} АО «Интеграм». Все права защищены.
          </div>
          <div className="text-slate-400 dark:text-slate-500 text-xs italic">
            Промышленный инструмент ускорения разработки.
          </div>
        </div>
      </div>
    </footer>
  )
}
