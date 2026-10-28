"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { EASE_OUT_EXPO } from "@/components/motion/reveal"

type Segment = string | { text: string; className?: string; break?: boolean }

type TextRevealProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span"
  segments: Segment[]
  className?: string
  delay?: number
  stagger?: number
  /** "mount" animates immediately (heroes); "inView" waits for scroll. */
  trigger?: "mount" | "inView"
}

/**
 * Editorial headline reveal: each word slides up from behind a mask.
 * Segments let parts of the line take their own colour or force a line break.
 */
export function TextReveal({
  as = "h2",
  segments,
  className,
  delay = 0,
  stagger = 0.06,
  trigger = "inView",
}: TextRevealProps) {
  const Tag = motion[as]
  const label = segments.map((s) => (typeof s === "string" ? s : s.text)).join(" ")

  let index = 0
  const words = segments.flatMap((segment, si) => {
    const seg = typeof segment === "string" ? { text: segment } : segment
    const parts = seg.text.split(" ").filter(Boolean)
    const nodes = parts.map((word, wi) => {
      const i = index++
      return (
        <span key={`${si}-${wi}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={cn("inline-block will-change-transform", seg.className)}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 1, delay: delay + i * stagger, ease: EASE_OUT_EXPO } },
            }}
          >
            {word}
          </motion.span>
          {" "}
        </span>
      )
    })
    if ("break" in seg && seg.break) nodes.push(<br key={`br-${si}`} />)
    return nodes
  })

  const animateProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "show" }
      : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }

  return (
    <Tag aria-label={label} className={className} {...animateProps}>
      <span aria-hidden>{words}</span>
    </Tag>
  )
}
