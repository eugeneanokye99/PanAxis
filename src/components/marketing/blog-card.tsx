import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import type { PostMeta } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Heartbeat } from "@/components/motion/heartbeat"

export function BlogCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_var(--glow)]",
        featured && "lg:flex-row",
      )}
    >
      <div
        className={cn(
          "relative flex aspect-[16/9] items-end overflow-hidden bg-ink p-6 text-ink-foreground",
          featured && "lg:aspect-auto lg:w-1/2",
        )}
      >
        <div className="absolute inset-0 bg-grid opacity-60 transition-transform duration-700 ease-out-expo group-hover:scale-110" />
        <Heartbeat className="absolute top-1/2 left-6 h-10 w-48 -translate-y-1/2 text-ink-success opacity-70" />
        <Badge variant="ink" className="relative">
          {post.category}
        </Badge>
      </div>
      <div className={cn("flex flex-1 flex-col p-7", featured && "lg:justify-center lg:p-12")}>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {post.readingTime} min read
          </span>
        </div>
        <h3 className={cn("mt-4 font-bold tracking-tight", featured ? "text-3xl leading-tight" : "text-xl leading-snug")}>
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{post.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-highlight">
          Read article
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
