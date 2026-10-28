import type { Metadata } from "next"

import { getAllPosts } from "@/lib/blog"
import { BlogCard } from "@/components/marketing/blog-card"
import { BlogGrid } from "@/components/marketing/blog-grid"
import { CtaBand } from "@/components/marketing/cta-band"
import { PageHero } from "@/components/marketing/page-hero"
import { Section } from "@/components/marketing/section"
import { Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical notes on factory flow, layout, simulation and getting more from the floor you already have.",
  alternates: { canonical: "/blog" },
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const [featured, ...rest] = posts
  const cards = Object.fromEntries(rest.map((post) => [post.slug, <BlogCard key={post.slug} post={post} />]))

  return (
    <>
      <PageHero
        eyebrow="Insights · Floor notes"
        chapter="05"
        title={[{ text: "Notes from" }, { text: "the floor.", className: "text-highlight" }]}
        description="Short, practical writing on flow, layout and simulation — what we see on factory floors every week, and what to do about it."
      />

      <Section spacing="sm" className="pb-24 md:pb-32">
        <div className="container-page space-y-16">
          {featured && (
            <Reveal>
              <BlogCard post={featured} featured />
            </Reveal>
          )}
          {rest.length > 0 && <BlogGrid posts={rest} cards={cards} />}
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
