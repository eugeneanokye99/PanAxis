import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"

const sectionVariants = cva("relative", {
  variants: {
    tone: {
      default: "bg-background text-foreground",
      muted: "bg-muted/60 text-foreground",
      card: "bg-card text-card-foreground",
      ink: "bg-ink text-ink-foreground",
    },
    spacing: {
      default: "py-24 md:py-32",
      sm: "py-16 md:py-20",
      none: "",
    },
  },
  defaultVariants: { tone: "default", spacing: "default" },
})

export function Section({
  tone,
  spacing,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section data-tone={tone ?? "default"} className={cn(sectionVariants({ tone, spacing }), className)} {...props}>
      {children}
    </section>
  )
}

export function Eyebrow({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode
  tone?: "default" | "ink"
  className?: string
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-bold tracking-[0.28em] uppercase",
        tone === "ink" ? "text-ink-highlight" : "text-highlight",
        className,
      )}
    >
      <span className={cn("h-px w-8", tone === "ink" ? "bg-ink-highlight" : "bg-highlight")} />
      {children}
    </p>
  )
}

type HeadingSegment = Parameters<typeof TextReveal>[0]["segments"][number]

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  size = "default",
  className,
  children,
}: {
  eyebrow?: string
  title: HeadingSegment[] | string
  description?: React.ReactNode
  align?: "left" | "center"
  tone?: "default" | "ink"
  size?: "default" | "display"
  className?: string
  children?: React.ReactNode
}) {
  const segments = typeof title === "string" ? [title] : title
  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "mx-auto items-center text-center", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <TextReveal
        segments={segments}
        className={cn(
          "max-w-4xl text-balance",
          size === "display"
            ? "font-display text-5xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl"
            : "text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl lg:text-5xl",
        )}
      />
      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "max-w-2xl text-lg leading-8",
              tone === "ink" ? "text-ink-muted" : "text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  )
}
