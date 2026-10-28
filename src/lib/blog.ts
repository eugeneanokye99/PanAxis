import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog")

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author: string
  readingTime: number
}

export type Heading = { id: string; text: string }

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  const words = content.split(/\s+/).filter(Boolean).length
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    category: String(data.category),
    author: String(data.author),
    readingTime: Math.max(1, Math.round(words / 220)),
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  "use cache"
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".mdx"))
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8")
      const { data, content } = matter(raw)
      return toMeta(file.replace(/\.mdx$/, ""), data, content)
    }),
  )
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPost(slug: string) {
  "use cache"
  try {
    const raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8")
    const { data, content } = matter(raw)
    const headings: Heading[] = Array.from(content.matchAll(/^##\s+(.+)$/gm)).map((m) => ({
      id: slugify(m[1]),
      text: m[1].trim(),
    }))
    return { meta: toMeta(slug, data, content), content, headings }
  } catch {
    return null
  }
}
