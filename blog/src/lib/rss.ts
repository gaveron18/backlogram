export interface BlogPost {
  title: string
  link: string
  description: string
  category: string
  pubDate: string
  slug: string
  image?: string
}

const RSS_URL = import.meta.env.DEV ? '/blog-rss' : 'https://blog.ideav.online/feed/rss'

function extractSlug(link: string): string {
  return link.replace('https://blog.ideav.online/', '')
}

function extractImage(html: string): string | undefined {
  const match = html.match(/<img[^>]+src="([^"]+)"/i)
  return match?.[1]
}

export async function fetchPosts(): Promise<BlogPost[]> {
  const res = await fetch(RSS_URL)
  const text = await res.text()
  const parser = new DOMParser()
  const xml = parser.parseFromString(text, 'application/xml')
  const items = Array.from(xml.querySelectorAll('item'))

  return items.map((item) => {
    const link = item.querySelector('link')?.textContent ?? ''
    const description = item.querySelector('description')?.textContent ?? ''
    return {
      title: item.querySelector('title')?.textContent ?? '',
      link,
      description,
      category: item.querySelector('category')?.textContent ?? '',
      pubDate: item.querySelector('pubDate')?.textContent ?? '',
      slug: extractSlug(link),
      image: extractImage(description),
    }
  })
}

export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}
