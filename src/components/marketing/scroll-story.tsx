"use client"

import * as React from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react"
import { CircleCheck, TriangleAlert } from "lucide-react"

import { cn } from "@/lib/utils"
import { storySteps } from "@/content/home"
import { Eyebrow } from "@/components/marketing/section"
import { FloorPlan } from "@/components/marketing/floor-plan"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * The pinned "chapters" sequence modelled on the reference coffee site:
 * one hero object (the factory floor) transforms as the visitor scrolls
 * through Check-up → Diagnosis → Treatment → Recovery.
 */
export function ScrollStory() {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const [active, setActive] = React.useState(0)

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(storySteps.length - 1, Math.max(0, Math.floor(value * storySteps.length)))
    setActive(next)
  })

  const step = storySteps[active]
  const stage = active as 0 | 1 | 2 | 3

  return (
    <section id="how-it-works" aria-label="How Pan Axis treats a factory" className="relative bg-ink text-ink-foreground">
      <div ref={ref} className="relative h-[420svh]">
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="pointer-events-none absolute top-1/3 -left-40 size-[30rem] rounded-full bg-glow blur-[140px]" />

          <div className="relative container-page flex flex-1 flex-col justify-center gap-6 pt-24 pb-8 lg:pt-20">
            {/* Stepper */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Eyebrow tone="ink">
                <span className="hidden sm:inline">Doctors for factories · </span>The treatment {active + 1}/4
              </Eyebrow>
              <ol className="relative hidden w-full max-w-md grid-cols-4 sm:grid">
                <div className="absolute top-[5px] right-[12.5%] left-[12.5%] h-px bg-ink-border" />
                <motion.div
                  className="absolute top-[5px] left-[12.5%] h-px w-3/4 origin-left bg-ink-highlight"
                  style={{ scaleX: progress }}
                />
                {storySteps.map((s, i) => (
                  <li key={s.id} className="relative flex flex-col items-center gap-2">
                    <span
                      className={cn(
                        "size-[11px] rounded-full border-2 transition-colors duration-500",
                        i < active && "border-ink-success bg-ink-success",
                        i === active && "border-ink-highlight bg-ink-highlight",
                        i > active && "border-ink-border bg-ink",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[11px] font-semibold transition-colors",
                        i === active ? "text-ink-highlight" : "text-ink-muted",
                      )}
                    >
                      {s.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid flex-1 items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              {/* Copy */}
              <div className="relative order-2 min-h-[15rem] lg:order-1 lg:min-h-[26rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <div className="flex items-end gap-4">
                      <motion.span
                        variants={{
                          hidden: { y: 60, opacity: 0 },
                          show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
                          exit: { y: -40, opacity: 0, transition: { duration: 0.35 } },
                        }}
                        className="font-display text-7xl leading-[0.8] font-extrabold text-ink-highlight sm:text-8xl lg:text-[9rem]"
                      >
                        {step.number}
                      </motion.span>
                      <motion.span
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          show: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.6 } },
                          exit: { opacity: 0, transition: { duration: 0.2 } },
                        }}
                        className="mb-2 rounded-full bg-ink-highlight px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-ink"
                      >
                        STEP {active + 1} OF 4
                      </motion.span>
                    </div>
                    <div className="mt-3 overflow-hidden">
                      <motion.h3
                        variants={{
                          hidden: { y: "105%" },
                          show: { y: "0%", transition: { duration: 0.9, delay: 0.05, ease: EASE } },
                          exit: { y: "-105%", transition: { duration: 0.35 } },
                        }}
                        className="font-display text-5xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-6xl lg:text-7xl"
                      >
                        {step.label}
                      </motion.h3>
                    </div>
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        show: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.7, ease: EASE } },
                        exit: { opacity: 0, transition: { duration: 0.2 } },
                      }}
                      className="mt-4 max-w-md text-base leading-7 text-ink-muted sm:text-lg"
                    >
                      {step.body}
                    </motion.p>
                    <ul className="mt-5 hidden space-y-2.5 sm:block">
                      {step.points.map((point, i) => (
                        <motion.li
                          key={point}
                          variants={{
                            hidden: { opacity: 0, x: -16 },
                            show: { opacity: 1, x: 0, transition: { delay: 0.35 + i * 0.12, duration: 0.6, ease: EASE } },
                            exit: { opacity: 0, transition: { duration: 0.15 } },
                          }}
                          className="flex items-center gap-3 text-sm font-semibold"
                        >
                          {step.id === "diagnosis" ? (
                            <TriangleAlert className="size-4.5 text-ink-destructive" />
                          ) : (
                            <CircleCheck className="size-4.5 text-ink-success" />
                          )}
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* The transforming object */}
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              >
                <FloorPlan stage={stage} />
              </motion.div>
            </div>

            <p className="text-center text-xs text-ink-muted/70">Scroll to follow the treatment ↓</p>
          </div>
        </div>
      </div>
    </section>
  )
}
