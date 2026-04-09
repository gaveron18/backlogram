import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  Save,
} from 'lucide-react'
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  type Article,
} from '../lib/integram'

type FormMode = 'create' | 'edit'
const emptyForm: Omit<Article, 'id'> = {
  title: '',
  slug: '',
  category: '',
  body: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  imageUrl: '',
  author: '',
}

export default function Admin() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState<Omit<Article, 'id'>>(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [formMode, setFormMode] = useState<FormMode>('create')
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const isConfigured = !!import.meta.env.VITE_INTEGRAM_API_URL && !!import.meta.env.VITE_INTEGRAM_TOKEN

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchArticles()
      setArticles(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isConfigured) load()
    else setLoading(false)
  }, [isConfigured, load])

  function openCreate() {
    setForm(emptyForm)
    setEditId(null)
    setFormMode('create')
    setShowForm(true)
  }

  function openEdit(article: Article) {
    setForm({
      title: article.title,
      slug: article.slug,
      category: article.category,
      body: article.body,
      publishedAt: article.publishedAt,
      imageUrl: article.imageUrl ?? '',
      author: article.author ?? '',
    })
    setEditId(article.id)
    setFormMode('edit')
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      if (formMode === 'create') {
        await createArticle(form)
        setNotice('Статья создана')
      } else if (editId) {
        await updateArticle(editId, form)
        setNotice('Статья обновлена')
      }
      setShowForm(false)
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Удалить статью?')) return
    setError('')
    try {
      await deleteArticle(id)
      setNotice('Статья удалена')
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка удаления')
    }
  }

  // If Integram is not configured, show setup instructions
  if (!isConfigured) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Панель управления</h1>
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-6">
          <div className="flex gap-3">
            <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h2 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Необходима настройка</h2>
              <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">
                Для работы с Интеграм создайте файл <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">.env.local</code> в папке <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">blog/</code> со следующими переменными:
              </p>
              <pre className="text-xs bg-amber-100 dark:bg-amber-900/40 rounded-lg p-4 overflow-x-auto font-mono whitespace-pre">
{`VITE_INTEGRAM_API_URL=https://integram.io
VITE_INTEGRAM_TOKEN=your_access_token_here
VITE_INTEGRAM_TABLE_ID=your_table_id_here`}
              </pre>
              <p className="text-xs text-amber-600 dark:text-amber-500 mt-3">
                Токен и идентификатор таблицы можно получить в настройках вашего рабочего пространства Интеграм.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Панель управления
        </h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all"
        >
          <Plus size={16} /> Новая статья
        </button>
      </div>

      {/* Notices */}
      {notice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3 mb-4"
        >
          <CheckCircle2 size={16} />
          {notice}
          <button onClick={() => setNotice('')} className="ml-auto">
            <X size={14} />
          </button>
        </motion.div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 mb-4">
          <AlertCircle size={16} />
          {error}
          <button onClick={() => setError('')} className="ml-auto">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Edit / Create form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">
            {formMode === 'create' ? 'Новая статья' : 'Редактировать статью'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Заголовок</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug (URL)</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="2025/01/moy-post"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Категория</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Дата публикации</label>
              <input
                type="date"
                value={form.publishedAt}
                onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Автор</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL изображения</label>
              <input
                type="text"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Текст статьи (HTML)</label>
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={10}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-all"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              Сохранить
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-600 rounded-lg transition-all"
            >
              Отмена
            </button>
          </div>
        </motion.div>
      )}

      {/* Articles table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-blue-500" size={36} />
        </div>
      ) : (
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          {articles.length === 0 ? (
            <div className="text-center py-16 text-slate-500 dark:text-slate-400 text-sm">
              Статей нет. Нажмите «Новая статья» чтобы добавить первую.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Заголовок</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 hidden sm:table-cell">Категория</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 hidden md:table-cell">Дата</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {articles.map((article) => (
                  <tr key={article.id} className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200 max-w-xs">
                      <span className="line-clamp-2">{article.title}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">{article.slug}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{article.category}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 hidden md:table-cell whitespace-nowrap">{article.publishedAt}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(article)}
                          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                          aria-label="Редактировать"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                          aria-label="Удалить"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
