"use client"

import * as React from "react"
import { animate, motion, useInView } from "motion/react"
import { Check, Play, RotateCcw } from "lucide-react"

import { cn } from "@/lib/utils"
import { layoutOptions, movePhases, simulation } from "@/content/method"
import { caseStudy } from "@/content/home"
import { FloorPlan } from "@/components/marketing/floor-plan"

const EASE = [0.16, 1, 0.3, 1] as const

/** Session A — the measured current state. */
export function FactsVisual() {
  return <FloorPlan stage={0} />
}

/** Session B — options scored on your priorities. */
export function OptionsVisual() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div ref={ref} className="rounded-3xl border border-ink-border bg-ink-card p-5 text-ink-foreground sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-[0.25em] text-ink-muted">LAYOUT OPTIONS · SCORED</p>
        <p className="text-[10px] text-ink-muted">A = must be close · X = keep apart</p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {layoutOptions.map((option, i) => (
          <div
            key={option.name}
            className={cn(
              "relative rounded-2xl border p-4 transition-colors duration-700",
              option.shortlisted && inView ? "border-ink-success bg-ink-success/10" : "border-ink-border bg-ink",
            )}
          >
            {option.shortlisted && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2, duration: 0.5 }}
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-ink-success px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-ink"
              >
                SHORTLISTED
              </motion.span>
            )}
            <OptionGlyph variant={i} />
            <p className="mt-4 text-xs font-semibold">{option.name}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-border">
              <motion.div
                className={cn("h-full rounded-full", option.shortlisted ? "bg-ink-success" : "bg-ink-highlight")}
                initial={{ width: 0 }}
                animate={inView ? { width: `${option.score}%` } : {}}
                transition={{ delay: 0.3 + i * 0.25, duration: 1.4, ease: EASE }}
              />
            </div>
            <p className="mt-2 text-right font-display text-2xl font-extrabold">
              {option.score}
              <span className="text-sm text-ink-muted"> / 100</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OptionGlyph({ variant }: { variant: number }) {
  const shapes = [
    // straight line
    [
      [8, 20],
      [24, 20],
      [40, 20],
      [56, 20],
      [72, 20],
    ],
    // U-shape
    [
      [10, 10],
      [28, 10],
      [46, 10],
      [62, 20],
      [46, 30],
      [28, 30],
    ],
    // L-shape
    [
      [10, 6],
      [10, 18],
      [10, 30],
      [28, 30],
      [46, 30],
      [64, 30],
    ],
  ][variant]
  return (
    <svg viewBox="0 0 80 40" className="h-10 w-full" aria-hidden>
      <polyline
        points={shapes.map(([x, y]) => `${x + 4},${y + 3}`).join(" ")}
        fill="none"
        className="stroke-ink-muted/50"
        strokeWidth="1.5"
      />
      {shapes.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="6" rx="1.5" className="fill-ink-foreground" />
      ))}
    </svg>
  )
}

/** Session C — side-by-side simulated shifts. */
export function SimulationVisual() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })
  const [t, setT] = React.useState(0)
  const [run, setRun] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    const controls = animate(0, 1, { duration: 6, ease: "linear", onUpdate: setT })
    return () => controls.stop()
  }, [inView, run])

  const minutes = Math.round(t * (simulation.shiftMinutes - 1))
  const clock = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`
  const done = t >= 1

  const panels = [
    { ...simulation.current, parts: Math.floor(t * simulation.current.output), tone: "destructive" as const },
    { ...simulation.proposed, parts: Math.floor(t * simulation.proposed.output), tone: "success" as const },
  ]

  return (
    <div ref={ref} className="relative rounded-3xl border border-ink-border bg-ink-card p-5 text-ink-foreground sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] font-bold tracking-[0.25em] text-ink-muted">COMPUTER MODEL · ONE 8-HOUR SHIFT</p>
        <button
          type="button"
          onClick={() => {
            setT(0)
            setRun((r) => r + 1)
          }}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-ink-border px-3 py-1 text-[11px] font-semibold text-ink-muted transition-colors hover:border-ink-highlight hover:text-ink-highlight"
        >
          {done ? <RotateCcw className="size-3" /> : <Play className="size-3" />}
          {done ? "Replay" : "Running"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {panels.map((panel) => (
          <div key={panel.label} className="rounded-2xl border border-ink-border bg-ink p-4">
            <p className="text-xs font-bold">{panel.label}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Stat label="Shift clock" value={clock} />
              <Stat
                label="Parts"
                value={String(panel.parts)}
                className={panel.tone === "success" ? "text-ink-success" : undefined}
              />
              <Stat label="Forklift" value={`${Math.round(Math.min(t * 4, 1) * panel.utilisation)}%`} />
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink-border">
              <div
                className={cn("h-full rounded-full", panel.tone === "success" ? "bg-ink-success" : "bg-ink-highlight")}
                style={{ width: `${(panel.parts / simulation.proposed.output) * 100}%` }}
              />
            </div>
            <p className={cn("mt-3 text-[11px] font-semibold", panel.tone === "success" ? "text-ink-success" : "text-ink-destructive")}>
              Bottleneck: {panel.bottleneck}
            </p>
          </div>
        ))}
      </div>

      <motion.div
        initial={false}
        animate={done ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="pointer-events-none mt-5 rounded-2xl border border-ink-highlight/30 bg-ink p-5 text-center"
        aria-live="polite"
      >
        <p className="text-[10px] font-bold tracking-[0.25em] text-ink-highlight">RESULT OF ONE SIMULATED SHIFT</p>
        <p className="mt-2 font-display text-4xl font-extrabold">
          {simulation.current.output} → {simulation.proposed.output} parts per shift
        </p>
        <p className="mt-1 text-sm font-semibold text-ink-success">+25% output · same machines · same people</p>
      </motion.div>
      <p className="mt-4 text-[10px] text-ink-muted">{caseStudy.note}</p>
    </div>
  )
}

function Stat({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div>
      <p className="text-[9px] font-bold tracking-widest text-ink-muted uppercase">{label}</p>
      <p className={cn("mt-1 font-display text-2xl font-extrabold tabular-nums", className)}>{value}</p>
    </div>
  )
}

/** Session D — phased move plan and before/after. */
export function HandoverVisual() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div ref={ref} className="rounded-3xl border border-ink-border bg-ink-card p-5 text-ink-foreground sm:p-7">
      <p className="text-[10px] font-bold tracking-[0.25em] text-ink-highlight">PHASED MOVE PLAN</p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-3">
        {movePhases.map((phase, i) => (
          <motion.li
            key={phase.phase}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.3, duration: 0.6, ease: EASE }}
            className="relative rounded-2xl border-t-2 border-ink-success bg-ink p-4"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.3, type: "spring", bounce: 0.5 }}
              className="absolute top-3 right-3 grid size-5 place-items-center rounded-full bg-ink-success text-ink"
            >
              <Check className="size-3" strokeWidth={3} />
            </motion.span>
            <p className="text-sm font-bold">{phase.phase}</p>
            <p className="text-xs text-ink-muted">{phase.when}</p>
            <p className="mt-2 text-xs">{phase.what}</p>
          </motion.li>
        ))}
      </ol>
      <p className="mt-3 text-xs font-semibold text-ink-success">Production keeps running between moves</p>

      <p className="mt-8 text-[10px] font-bold tracking-[0.25em] text-ink-highlight">BEFORE AND AFTER (MODEL ESTIMATE)</p>
      <div className="mt-3 divide-y divide-ink-border rounded-2xl border border-ink-border bg-ink">
        {caseStudy.rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 + i * 0.2 }}
            className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 px-4 py-3 text-sm"
          >
            <span className="text-ink-muted">{row.label}</span>
            <span className="tabular-nums">{row.before}</span>
            <span className="text-ink-muted">→</span>
            <span className="font-bold text-ink-success tabular-nums">{row.after}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const sessionVisuals = {
  A: FactsVisual,
  B: OptionsVisual,
  C: SimulationVisual,
  D: HandoverVisual,
} as const

/** Renders the visual for a session letter; usable from server components. */
export function SessionVisual({ letter }: { letter: keyof typeof sessionVisuals }) {
  const Visual = sessionVisuals[letter]
  return <Visual />
}
