import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ArrowLeft, Clock } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { getAllPosts, getPost, slugify } from "@/lib/blog"
import { siteConfig } from "@/content/site"
import { Badge } from "@/components/ui/badge"
import { BlogCard } from "@/components/marketing/blog-card"
import { CtaBand } from "@/components/marketing/cta-band"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", publishedTime: post.meta.date, authors: [post.meta.author] },
  }
}

const mdxComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => <h2 id={slugify(String(children))}>{children}</h2>,
  a: ({ href = "", children }: { href?: string; children?: React.ReactNode }) =>
    href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noreferrer">{children}</a>,
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = (await getAllPosts()).filter((p) => p.slug !== slug).slice(0, 2)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { "@type": "Organization", name: post.meta.author },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="relative overflow-hidden pt-36 pb-16 md:pt-44">
          <div className="absolute inset-0 bg-grid mask-fade-y opacity-70" />
          <div className="relative container-page max-w-4xl">
            <Reveal>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
                All insights
              </Link>
            </Reveal>
            <Reveal delay={0.05} className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge>{post.meta.category}</Badge>
              <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {post.meta.readingTime} min read
              </span>
            </Reveal>
            <TextReveal
              as="h1"
              trigger="mount"
              delay={0.1}
              stagger={0.03}
              segments={[post.meta.title]}
              className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.3}>
              <p className="mt-6 text-xl leading-8 text-muted-foreground">{post.meta.description}</p>
            </Reveal>
          </div>
        </header>

        <div className="container-page grid max-w-6xl gap-12 pb-24 lg:grid-cols-[1fr_16rem]">
          <Reveal className="prose-panaxis max-w-3xl">
            <MDXRemote source={post.content} components={mdxComponents} />
          </Reveal>
          {post.headings.length > 0 && (
            <aside className="hidden lg:block">
              <nav aria-label="On this page" className="sticky top-32 rounded-2xl border bg-card p-6">
                <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">On this page</p>
                <ol className="mt-4 space-y-3 text-sm">
                  {post.headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-muted-foreground transition-colors hover:text-highlight">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <Section tone="muted" spacing="sm">
          <div className="container-page">
            <SectionHeading eyebrow="Keep reading" title="More from the floor" />
            <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <BlogCard post={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  )
}
