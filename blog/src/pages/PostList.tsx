import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Tag, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { fetchPosts, formatDate, type BlogPost } from '../lib/rss'

export default function PostList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setError('Не удалось загрузить статьи. Попробуйте позже.'))
      .finally(() => setLoading(false))
  }, [])

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

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero / Featured post */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <a
            href={featured.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all shadow-sm hover:shadow-md"
          >
            {featured.image && (
              <div className="relative w-full overflow-hidden max-h-80">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6 sm:p-8 bg-white dark:bg-slate-900">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <Tag size={11} /> {featured.category || 'Статья'}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                  <Calendar size={11} /> {formatDate(featured.pubDate)}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                {featured.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                Читать статью <ArrowRight size={14} />
              </span>
            </div>
          </a>
        </motion.div>
      )}

      {/* Post grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post, i) => (
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
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {post.category && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                      {post.category}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {formatDate(post.pubDate)}
                  </span>
                </div>
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

      {posts.length === 0 && (
        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
          Статей пока нет.
        </div>
      )}
    </div>
  )
}
