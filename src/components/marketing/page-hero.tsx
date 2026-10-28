import * as React from "react"

import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/marketing/section"
import { Reveal } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"

type Segment = Parameters<typeof TextReveal>[0]["segments"][number]

/**
 * Editorial inner-page hero in the spirit of the reference site: an oversized
 * condensed headline, a chapter number and a short lede.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  chapter,
  aside,
  children,
  className,
}: {
  eyebrow: string
  title: Segment[]
  description?: React.ReactNode
  chapter?: string
  aside?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28", className)}>
      <div className="absolute inset-0 bg-grid mask-fade-y opacity-70" />
      <div className="pointer-events-none absolute -top-40 right-0 size-[36rem] rounded-full bg-glow blur-[120px]" />
      <div className="relative container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              as="h1"
              trigger="mount"
              delay={0.1}
              segments={title}
              className="mt-6 max-w-5xl font-display text-6xl leading-[0.86] font-extrabold tracking-tight uppercase sm:text-8xl lg:text-[9rem]"
            />
          </div>
          {chapter && (
            <Reveal delay={0.4} className="hidden lg:block">
              <span className="font-display text-[11rem] leading-none font-extrabold text-foreground/[0.06]">
                {chapter}
              </span>
            </Reveal>
          )}
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          {description && (
            <Reveal delay={0.35}>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground md:text-xl">{description}</p>
            </Reveal>
          )}
          {aside && (
            <Reveal delay={0.45} className="lg:justify-self-end">
              {aside}
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
