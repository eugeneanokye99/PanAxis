"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react"

/** Moves its content slower or faster than the page as it passes through the viewport. */
export function Parallax({
  offset = 60,
  className,
  children,
}: {
  offset?: number
  className?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
