"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import type { PostMeta } from "@/lib/blog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

/** Category-filterable list of posts. Cards are rendered on the server and passed in by slug. */
export function BlogGrid({ posts, cards }: { posts: PostMeta[]; cards: Record<string, React.ReactNode> }) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))]
  const [category, setCategory] = React.useState("All")
  const visible = category === "All" ? posts : posts.filter((p) => p.category === category)

  return (
    <Tabs defaultValue="All" value={category} onValueChange={setCategory} className="gap-12">
      <TabsList className="max-w-full overflow-x-auto">
        {categories.map((c) => (
          <TabsTrigger key={c} value={c}>
            {c}
          </TabsTrigger>
        ))}
      </TabsList>
      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {cards[post.slug]}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Tabs>
  )
}
