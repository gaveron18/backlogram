import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Loader2, AlertCircle, ChevronLeft } from 'lucide-react'
import { fetchPosts, formatDate, type BlogPost } from '../lib/rss'

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPosts()
      .then((all) => {
        if (category) {
          setPosts(all.filter((p) => p.category === decodeURIComponent(category)))
        } else {
          setPosts(all)
        }
      })
      .catch(() => setError('Не удалось загрузить статьи. Попробуйте позже.'))
      .finally(() => setLoading(false))
  }, [category])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
        <p className="text-slate-600 dark:text-slate-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <ChevronLeft size={16} /> Все статьи
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
        Категория: {decodeURIComponent(category ?? '')}
      </h1>

      {posts.length === 0 && (
        <p className="text-slate-500 dark:text-slate-400 text-center py-16">
          Статей в этой категории пока нет.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col h-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-md bg-white dark:bg-slate-900"
            >
              {post.image && (
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-5">
                <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 mb-2">
                  <Calendar size={11} /> {formatDate(post.pubDate)}
                </span>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-3 flex-1">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {post.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Читать <ArrowRight size={12} />
                </span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
