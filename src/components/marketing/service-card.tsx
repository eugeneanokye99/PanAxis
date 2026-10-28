import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Service } from "@/content/services"

export function ServiceCard({ service, index, className }: { service: Service; index: number; className?: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-7 transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_30px_60px_-30px_var(--glow)]",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-secondary-foreground transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
          <service.icon className="size-5" />
        </span>
        <span className="font-display text-5xl leading-none font-extrabold text-foreground/[0.07] transition-colors duration-500 group-hover:text-primary/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-8 text-xl font-bold tracking-tight">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{service.short}</p>
      <div className="mt-8 flex items-center justify-between border-t pt-5">
        <span className="text-xs font-semibold text-muted-foreground">{service.duration}</span>
        <span className="grid size-9 place-items-center rounded-full border transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}
