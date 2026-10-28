"use client"

import * as React from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

import { symptoms } from "@/content/home"
import { Eyebrow } from "@/components/marketing/section"
import { Heartbeat } from "@/components/motion/heartbeat"

/**
 * "Feeling sick? You see a doctor. Your factory can get sick too."
 * A pinned, scroll-scrubbed scene: symptoms appear one by one, then the question lands.
 */
export function Symptoms() {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  const introOpacity = useTransform(scrollYProgress, [0, 0.14, 0.2], [1, 1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.2], [0, -60])
  const factoryOpacity = useTransform(scrollYProgress, [0.16, 0.26], [0, 1])
  const factoryScale = useTransform(scrollYProgress, [0.16, 0.3], [0.85, 1])
  const sickOpacity = useTransform(scrollYProgress, [0.2, 0.28, 0.7, 0.76], [0, 1, 1, 0])
  const callOpacity = useTransform(scrollYProgress, [0.76, 0.84], [0, 1])
  const callY = useTransform(scrollYProgress, [0.76, 0.84], [40, 0])
  const stroke = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])

  return (
    <section aria-label="Symptoms of a sick factory" className="relative bg-ink text-ink-foreground">
      <div ref={ref} className="relative h-[300svh]">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40" />

          {/* Beat 1: Feeling sick? */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-4 text-center"
          >
            <Heartbeat className="h-16 w-72 text-ink-success sm:w-[28rem]" />
            <p className="font-display text-5xl font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl">
              Feeling sick? <span className="text-ink-highlight">You see a doctor.</span>
            </p>
          </motion.div>

          {/* Beat 2 + 3: the sick factory */}
          <div className="relative container-page grid items-center gap-12 lg:grid-cols-2">
            <motion.div style={{ opacity: factoryOpacity, scale: factoryScale }} className="mx-auto w-full max-w-md">
              <svg viewBox="0 0 260 180" className="w-full" aria-hidden>
                <motion.path
                  d="M20 170 V80 L70 50 V80 L120 50 V80 L170 50 V170 Z"
                  className="fill-ink-card stroke-ink-destructive"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  style={{ pathLength: stroke }}
                />
                <rect x="185" y="30" width="18" height="140" className="fill-ink-card stroke-ink-border" strokeWidth="3" />
                <line x1="8" y1="170" x2="250" y2="170" className="stroke-ink-border" strokeWidth="3" />
                {[40, 72, 104, 136].map((x, i) => (
                  <SickWindow key={x} x={x} index={i} progress={scrollYProgress} />
                ))}
                <motion.circle
                  cx="194"
                  cy="20"
                  r="9"
                  className="fill-ink-muted/40"
                  animate={{ y: [0, -14, 0], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </svg>
            </motion.div>

            <div className="relative min-h-[20rem]">
              <motion.div style={{ opacity: sickOpacity }} className="absolute inset-0">
                <Eyebrow tone="ink">Diagnosis needed</Eyebrow>
                <p className="mt-5 font-display text-5xl leading-[0.9] font-extrabold uppercase sm:text-7xl">
                  Your factory <span className="block text-ink-destructive">can get sick too.</span>
                </p>
                <ul className="mt-8 flex flex-col items-start gap-3">
                  {symptoms.map((symptom, i) => (
                    <SymptomChip key={symptom} label={symptom} index={i} progress={scrollYProgress} />
                  ))}
                </ul>
              </motion.div>

              <motion.div style={{ opacity: callOpacity, y: callY }} className="absolute inset-0 flex flex-col justify-center">
                <p className="font-display text-6xl leading-[0.88] font-extrabold uppercase sm:text-8xl">
                  Who do you <span className="text-ink-highlight">call?</span>
                </p>
                <p className="mt-6 max-w-md text-lg leading-8 text-ink-muted">
                  Meet Pan Axis. We are doctors for factories — and the treatment starts with a check-up.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SymptomChip({ label, index, progress }: { label: string; index: number; progress: MotionValue<number> }) {
  const start = 0.3 + index * 0.08
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1])
  const x = useTransform(progress, [start, start + 0.05], [-24, 0])
  return (
    <motion.li
      style={{ opacity, x }}
      className="rounded-full bg-ink-destructive px-4 py-2 text-sm font-semibold text-ink-foreground shadow-lg"
    >
      {label}
    </motion.li>
  )
}

function SickWindow({ x, index, progress }: { x: number; index: number; progress: MotionValue<number> }) {
  const start = 0.3 + index * 0.08
  const opacity = useTransform(progress, [start, start + 0.05], [1, 0.25])
  return <motion.rect x={x} y="112" width="18" height="16" rx="2" className="fill-ink-highlight" style={{ opacity }} />
}
