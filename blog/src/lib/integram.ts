/**
 * Integram API client for the blog admin panel.
 *
 * The actual API endpoints and authentication tokens will be configured
 * via environment variables. This file provides a typed wrapper around
 * the Integram REST API for managing blog posts and content.
 *
 * Environment variables (set in .env.local):
 *   VITE_INTEGRAM_API_URL  – base URL of the Integram instance
 *   VITE_INTEGRAM_TOKEN    – access token for the Integram workspace
 *   VITE_INTEGRAM_TABLE_ID – ID of the table that stores blog articles
 */

const BASE_URL = import.meta.env.VITE_INTEGRAM_API_URL ?? ''
const TOKEN = import.meta.env.VITE_INTEGRAM_TOKEN ?? ''
const TABLE_ID = import.meta.env.VITE_INTEGRAM_TABLE_ID ?? ''

function headers(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  }
}

export interface Article {
  id: string
  title: string
  slug: string
  category: string
  body: string
  publishedAt: string
  imageUrl?: string
  author?: string
}

/** Fetch all articles from Integram table */
export async function fetchArticles(): Promise<Article[]> {
  const url = `${BASE_URL}/api/table/${TABLE_ID}/rows`
  const res = await fetch(url, { headers: headers() })
  if (!res.ok) throw new Error(`Integram API error: ${res.status}`)
  const data = await res.json()
  // Map Integram row structure to our Article interface
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.rows ?? data).map((row: any) => ({
    id: row.id ?? row._id,
    title: row.title ?? row['Заголовок'] ?? '',
    slug: row.slug ?? row['Slug'] ?? '',
    category: row.category ?? row['Категория'] ?? '',
    body: row.body ?? row['Текст'] ?? '',
    publishedAt: row.published_at ?? row['Дата публикации'] ?? '',
    imageUrl: row.image_url ?? row['Изображение'] ?? undefined,
    author: row.author ?? row['Автор'] ?? undefined,
  }))
}

/** Create a new article in Integram */
export async function createArticle(article: Omit<Article, 'id'>): Promise<Article> {
  const url = `${BASE_URL}/api/table/${TABLE_ID}/rows`
  const res = await fetch(url, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      title: article.title,
      slug: article.slug,
      category: article.category,
      body: article.body,
      published_at: article.publishedAt,
      image_url: article.imageUrl,
      author: article.author,
    }),
  })
  if (!res.ok) throw new Error(`Integram API error: ${res.status}`)
  const data = await res.json()
  return { ...article, id: data.id ?? data._id }
}

/** Update an existing article */
export async function updateArticle(id: string, article: Partial<Omit<Article, 'id'>>): Promise<void> {
  const url = `${BASE_URL}/api/table/${TABLE_ID}/rows/${id}`
  const res = await fetch(url, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(article),
  })
  if (!res.ok) throw new Error(`Integram API error: ${res.status}`)
}

/** Delete an article */
export async function deleteArticle(id: string): Promise<void> {
  const url = `${BASE_URL}/api/table/${TABLE_ID}/rows/${id}`
  const res = await fetch(url, { method: 'DELETE', headers: headers() })
  if (!res.ok) throw new Error(`Integram API error: ${res.status}`)
}
