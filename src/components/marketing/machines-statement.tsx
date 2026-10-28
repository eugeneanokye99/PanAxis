"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowUp, Cog } from "lucide-react"

import { TextReveal } from "@/components/motion/text-reveal"
import { Reveal } from "@/components/motion/reveal"

/** "We don't sell machines." — gears turned by the scroll. */
export function MachinesStatement() {
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const counter = useTransform(rotate, (r) => -r * 1.4)

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <TextReveal
            segments={[{ text: "We don't sell", break: true }, { text: "machines." }]}
            className="font-display text-6xl leading-[0.86] font-extrabold tracking-tight uppercase sm:text-8xl lg:text-[8.5rem]"
          />
          <TextReveal
            as="p"
            delay={0.3}
            segments={[{ text: "We help you get more from the ones you already have.", className: "text-highlight" }]}
            className="mt-8 max-w-xl text-2xl leading-snug font-bold sm:text-3xl"
          />
          <Reveal delay={0.5}>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
              No equipment commissions, no hidden agenda. Most factories already own the capacity they need — it is
              lost to waiting, walking and backtracking. We find it and give it back.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto flex h-72 w-full max-w-md items-center justify-center sm:h-96" aria-hidden>
          <motion.div style={{ rotate }} className="absolute top-6 left-0 text-primary sm:top-10">
            <Cog className="size-36 sm:size-48" strokeWidth={1.4} />
          </motion.div>
          <motion.div style={{ rotate: counter }} className="absolute top-1/2 left-1/2 -translate-x-1/2 text-success">
            <Cog className="size-24 sm:size-32" strokeWidth={1.4} />
          </motion.div>
          <motion.div style={{ rotate }} className="absolute top-6 right-0 text-primary sm:top-10">
            <Cog className="size-36 sm:size-48" strokeWidth={1.4} />
          </motion.div>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute -top-4 text-success"
              style={{ left: `${18 + i * 32}%` }}
              animate={{ y: [8, -6, 8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
            >
              <ArrowUp className="size-7" strokeWidth={3} />
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
