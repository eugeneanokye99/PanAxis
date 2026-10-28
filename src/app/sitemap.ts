import type { MetadataRoute } from "next"

import { siteConfig } from "@/content/site"
import { services } from "@/content/services"
import { getAllPosts } from "@/lib/blog"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/services", "/how-it-works", "/pricing", "/about", "/blog", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }))
  const servicePages = services.map((s) => ({ url: `${siteConfig.url}/services/${s.slug}`, priority: 0.7 }))
  const posts = (await getAllPosts()).map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.date,
    priority: 0.6,
  }))
  return [...pages, ...servicePages, ...posts]
}
