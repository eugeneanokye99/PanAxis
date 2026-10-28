"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowDown, ArrowRight, Gauge, Route, TrendingUp } from "lucide-react"

import { siteConfig } from "@/content/site"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/marketing/section"
import { Heartbeat } from "@/components/motion/heartbeat"
import { Magnetic } from "@/components/motion/magnetic"
import { TextReveal } from "@/components/motion/text-reveal"

const EASE = [0.16, 1, 0.3, 1] as const

const vitals = [
  { icon: TrendingUp, label: "Output", value: "+25%", tone: "text-success", className: "top-[8%] -left-6 sm:-left-12" },
  { icon: Route, label: "Travel", value: "−58%", tone: "text-highlight", className: "top-[44%] -right-4 sm:-right-10" },
  { icon: Gauge, label: "Forklift busy", value: "100% → 93%", tone: "text-destructive", className: "bottom-[6%] left-2 sm:-left-6" },
]

export function HomeHero() {
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16 md:pt-36 lg:flex lg:min-h-svh lg:items-center lg:pt-28 lg:pb-16">
      <div className="absolute inset-0 bg-grid mask-fade-y" />
      <div className="pointer-events-none absolute -top-32 right-[10%] size-[40rem] rounded-full bg-glow blur-[140px]" />

      <div className="relative container-page grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div style={{ y: headlineY, opacity: fade }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <Eyebrow>
              {siteConfig.legalName} · {siteConfig.location}
            </Eyebrow>
          </motion.div>

          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.15}
            stagger={0.09}
            segments={[
              { text: "Doctors", break: true },
              { text: "for", break: true },
              { text: "factories.", className: "text-highlight" },
            ]}
            className="mt-6 font-display text-[clamp(4rem,min(15vw,17svh),12rem)] leading-[0.82] font-extrabold tracking-tight uppercase"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
            className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground lg:mt-6 2xl:text-xl"
          >
            Late orders, idle machines, crowded floors? We measure how your work really moves, design a better
            layout, and <span className="font-semibold text-foreground">test it on the computer before anything moves.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-3 lg:mt-8"
          >
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/contact">
                  Book a free FloorCheck
                  <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline">
              <a href="#how-it-works">
                See how it works
                <ArrowDown className="transition-transform group-hover/button:translate-y-0.5" />
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            One hour on your floor · No obligation · We don&apos;t sell machines
          </motion.p>
        </motion.div>

        {/* Vital-signs monitor */}
        <motion.div style={{ y: visualY, scale: visualScale }} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink p-6 text-ink-foreground shadow-2xl sm:p-8 lg:mx-auto lg:aspect-auto lg:h-[min(36rem,72svh)] lg:max-w-md"
          >
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.25em] text-ink-muted">
                <span>FACTORY VITALS</span>
                <span className="inline-flex items-center gap-2 text-ink-success">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink-success opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-ink-success" />
                  </span>
                  LIVE
                </span>
              </div>

              <Heartbeat className="mt-8 h-14 w-full text-ink-success" delay={0.8} />

              <FactoryIllustration />

              <div className="mt-auto grid grid-cols-3 gap-3 border-t border-ink-border pt-5">
                {[
                  ["191 m", "route before"],
                  ["80 m", "route after"],
                  ["+25%", "output"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="font-display text-2xl font-extrabold text-ink-highlight sm:text-3xl">{value}</p>
                    <p className="text-[11px] text-ink-muted">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {vitals.map((vital, i) => (
            <motion.div
              key={vital.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.8, ease: EASE }}
              className={`absolute ${vital.className}`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-3 rounded-2xl border bg-card/90 px-4 py-3 shadow-xl backdrop-blur"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-muted">
                  <vital.icon className={`size-4 ${vital.tone}`} />
                </span>
                <span>
                  <span className="block text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    {vital.label}
                  </span>
                  <span className="block text-sm font-bold">{vital.value}</span>
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FactoryIllustration() {
  return (
    <svg viewBox="0 0 240 150" className="mx-auto mt-6 w-full max-w-xs" aria-hidden>
      <motion.path
        d="M20 140 V70 L60 45 V70 L100 45 V70 L140 45 V140 Z"
        className="fill-ink-card stroke-ink-highlight"
        strokeWidth="2.5"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 1.8, ease: "easeInOut" }}
      />
      <motion.rect
        x="150"
        y="20"
        width="14"
        height="120"
        className="fill-ink-card stroke-ink-highlight"
        strokeWidth="2.5"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: "140px" }}
        transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
      />
      <line x1="10" y1="140" x2="230" y2="140" className="stroke-ink-border" strokeWidth="2" />
      {[34, 62, 90, 118].map((x, i) => (
        <motion.rect
          key={x}
          x={x}
          y="96"
          width="16"
          height="14"
          rx="2"
          className="fill-ink-highlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.35, 1] }}
          transition={{ delay: 1.6 + i * 0.2, duration: 2.4, repeat: Infinity, repeatDelay: 1.5 }}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="157"
          cy="14"
          r="7"
          className="fill-ink-muted/40"
          initial={{ opacity: 0, y: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.8, 0], y: -36, x: 14, scale: 1.6 }}
          transition={{ delay: 2 + i * 1, duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </svg>
  )
}
