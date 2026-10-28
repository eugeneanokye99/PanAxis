"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Animated factory floor used across the site.
 * stage 0 — check-up: the current route is traced and timed
 * stage 1 — diagnosis: the route turns red and the bottleneck is found
 * stage 2 — treatment: machines move into a better layout, route turns green
 * stage 3 — recovery: phased moves complete and output climbs
 */

type StationId = "raw" | "cutting" | "lathe" | "milling" | "welding" | "packing" | "dispatch"
type Point = { x: number; y: number }

const W = 66
const H = 28

const STATIONS: { id: StationId; label: string; time?: string; phase?: 1 | 2 | 3 }[] = [
  { id: "raw", label: "Raw stock" },
  { id: "cutting", label: "Cutting", time: "4.0 min", phase: 1 },
  { id: "lathe", label: "Lathe", time: "4.5 min", phase: 1 },
  { id: "milling", label: "Milling", time: "6.2 min", phase: 2 },
  { id: "welding", label: "Welding", time: "5.0 min", phase: 2 },
  { id: "packing", label: "Packing", time: "3.5 min", phase: 3 },
  { id: "dispatch", label: "Dispatch" },
]

const BEFORE: Record<StationId, Point> = {
  raw: { x: 22, y: 26 },
  milling: { x: 392, y: 34 },
  welding: { x: 112, y: 112 },
  lathe: { x: 150, y: 232 },
  packing: { x: 272, y: 248 },
  cutting: { x: 392, y: 214 },
  dispatch: { x: 22, y: 262 },
}

const AFTER: Record<StationId, Point> = {
  raw: { x: 22, y: 26 },
  cutting: { x: 120, y: 26 },
  lathe: { x: 218, y: 26 },
  milling: { x: 316, y: 26 },
  welding: { x: 392, y: 132 },
  packing: { x: 300, y: 240 },
  dispatch: { x: 22, y: 262 },
}

const ORDER: StationId[] = ["raw", "cutting", "lathe", "milling", "welding", "packing", "dispatch"]

function center(p: Point): Point {
  return { x: p.x + W / 2, y: p.y + H / 2 }
}

/** Orthogonal elbow route through every station, with a constant vertex count so it can morph. */
function routePoints(layout: Record<StationId, Point>) {
  const stations = ORDER.map((id) => center(layout[id]))
  return stations.flatMap((p, i) => (i === 0 ? [p] : [{ x: p.x, y: stations[i - 1].y }, p]))
}

function toPath(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
}

/** Keyframes for a dot travelling the route at constant speed. */
function toKeyframes(points: Point[]) {
  const lengths = points.map((p, i) => (i === 0 ? 0 : Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y)))
  const total = lengths.reduce((a, b) => a + b, 0)
  let acc = 0
  const times = lengths.map((l) => (acc += l) / total)
  return { cx: points.map((p) => p.x), cy: points.map((p) => p.y), times }
}

const BEFORE_POINTS = routePoints(BEFORE)
const AFTER_POINTS = routePoints(AFTER)
const BEFORE_PATH = toPath(BEFORE_POINTS)
const AFTER_PATH = toPath(AFTER_POINTS)
const BEFORE_FRAMES = toKeyframes(BEFORE_POINTS)
const AFTER_FRAMES = toKeyframes(AFTER_POINTS)

const EASE = [0.16, 1, 0.3, 1] as const

export function FloorPlan({ stage, className }: { stage: 0 | 1 | 2 | 3; className?: string }) {
  const layout = stage >= 2 ? AFTER : BEFORE
  const frames = stage >= 2 ? AFTER_FRAMES : BEFORE_FRAMES
  const routeTone = stage === 0 ? "stroke-ink-highlight" : stage === 1 ? "stroke-ink-destructive" : "stroke-ink-success"

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-ink-border bg-ink-card shadow-2xl",
        className,
      )}
    >
      <div className="relative aspect-[3/2] w-full">
        <svg viewBox="0 0 480 320" className="absolute inset-0 size-full" role="img" aria-label="Factory floor plan">
          <defs>
            <pattern id="floor-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" fill="none" className="stroke-ink-border" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="480" height="320" fill="url(#floor-grid)" opacity="0.6" />
          <rect x="8" y="8" width="464" height="304" rx="14" fill="none" className="stroke-ink-border" strokeWidth="1.5" />

          {/* Pillars — "what cannot move" */}
          {[
            { x: 184, y: 150 },
            { x: 296, y: 150 },
          ].map((p) => (
            <rect key={p.x} x={p.x} y={p.y} width="10" height="10" rx="2" className="fill-ink-muted/40" />
          ))}

          {/* Ghost of the old route once the layout has changed */}
          <AnimatePresence>
            {stage >= 2 && (
              <motion.path
                key="ghost"
                d={BEFORE_PATH}
                fill="none"
                className="stroke-ink-destructive"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0.18 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              />
            )}
          </AnimatePresence>

          {/* The material route */}
          <motion.path
            key={`route-${stage}`}
            fill="none"
            className={cn("transition-colors duration-700", routeTone)}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ d: stage === 3 ? AFTER_PATH : BEFORE_PATH, pathLength: stage === 0 ? 0 : 1 }}
            animate={{ d: stage >= 2 ? AFTER_PATH : BEFORE_PATH, pathLength: 1 }}
            transition={{
              d: { duration: 1.4, ease: EASE, delay: 0.25 },
              pathLength: { duration: 2.6, ease: "easeInOut" },
            }}
          />

          {/* Moving part on the route */}
          <motion.circle
            key={`part-${stage >= 2 ? "after" : "before"}`}
            r="4.5"
            className={cn(
              "transition-colors duration-700",
              stage === 1 ? "fill-ink-destructive" : stage === 0 ? "fill-ink-highlight" : "fill-ink-success",
            )}
            initial={{ cx: frames.cx[0], cy: frames.cy[0] }}
            animate={{ cx: frames.cx, cy: frames.cy }}
            transition={{ duration: stage >= 2 ? 3.2 : 6.5, times: frames.times, repeat: Infinity, ease: "linear", delay: 1.6 }}
          />

          {/* Stations */}
          {STATIONS.map((station, i) => {
            const pos = layout[station.id]
            const isEnd = station.id === "raw" || station.id === "dispatch"
            const activePhase = stage === 3 && station.phase
            return (
              <motion.g
                key={station.id}
                initial={false}
                animate={{ x: pos.x, y: pos.y }}
                transition={{ type: "spring", stiffness: 70, damping: 16, delay: stage >= 2 ? 0.05 * i : 0 }}
              >
                <motion.rect
                  width={W}
                  height={H}
                  rx="6"
                  className={cn(
                    "stroke-[1.5] transition-colors duration-700",
                    isEnd ? "fill-ink stroke-ink-border" : "fill-ink",
                    !isEnd && (stage >= 2 ? "stroke-ink-success" : stage === 1 && station.id === "milling" ? "stroke-ink-destructive" : "stroke-ink-highlight/70"),
                  )}
                  animate={activePhase ? { opacity: [0.6, 1] } : { opacity: 1 }}
                  transition={activePhase ? { delay: 0.6 + (station.phase ?? 0) * 0.7, duration: 0.4 } : undefined}
                />
                <text
                  x={W / 2}
                  y={H / 2 + 3.5}
                  textAnchor="middle"
                  className="fill-ink-foreground text-[9.5px] font-semibold"
                >
                  {station.label}
                </text>

                {/* Timing chips during the check-up */}
                <AnimatePresence>
                  {stage === 0 && station.time && (
                    <motion.g
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.8 + i * 0.25, duration: 0.5 }}
                    >
                      <rect x={W - 30} y={-12} width="40" height="14" rx="7" className="fill-ink-highlight" />
                      <text x={W - 10} y={-2} textAnchor="middle" className="fill-ink text-[7.5px] font-bold">
                        {station.time}
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Phase ticks during recovery */}
                <AnimatePresence>
                  {activePhase && (
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.6 + (station.phase ?? 0) * 0.7, type: "spring", bounce: 0.5 }}
                      style={{ originX: `${W}px`, originY: "0px" }}
                    >
                      <circle cx={W} cy={0} r="7.5" className="fill-ink-success" />
                      <path d={`M${W - 3.5} 0 l2.5 2.5 l4.5 -4.5`} fill="none" className="stroke-ink" strokeWidth="1.8" />
                    </motion.g>
                  )}
                </AnimatePresence>
              </motion.g>
            )
          })}

          {/* Magnifier walking the floor during the check-up */}
          <AnimatePresence>
            {stage === 0 && (
              <motion.g
                key="magnifier"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: ORDER.map((id) => center(BEFORE[id]).x),
                  y: ORDER.map((id) => center(BEFORE[id]).y - 4),
                }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", opacity: { duration: 0.4 } }}
              >
                <circle r="15" className="fill-ink-foreground/5 stroke-ink-foreground" strokeWidth="2.5" />
                <path d="M11 11 L22 22" className="stroke-ink-foreground" strokeWidth="4" strokeLinecap="round" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Bottleneck: the forklift everything waits for */}
          <AnimatePresence>
            {stage === 1 && (
              <motion.g
                key="bottleneck"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                style={{ originX: "248px", originY: "198px" }}
              >
                <circle cx="248" cy="198" r="20" className="fill-none stroke-ink-destructive" strokeWidth="2" />
                <circle
                  cx="248"
                  cy="198"
                  r="20"
                  className="animate-pulse-ring fill-none stroke-ink-destructive"
                  strokeWidth="2"
                  style={{ transformOrigin: "248px 198px", transformBox: "view-box" }}
                />
                <rect x="239" y="190" width="18" height="16" rx="3" className="fill-ink-highlight" />
                <rect x="243" y="194" width="6" height="5" rx="1" className="fill-ink" />
                <text x="222" y="194" textAnchor="end" className="fill-ink-destructive text-[10px] font-bold tracking-wider">
                  BOTTLENECK
                </text>
                <text x="222" y="207" textAnchor="end" className="fill-ink-destructive text-[9px] font-semibold">
                  Forklift busy 100%
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Queues of waiting work */}
          <AnimatePresence>
            {stage === 1 &&
              [0, 1, 2, 3].map((n) => (
                <motion.rect
                  key={`q-${n}`}
                  x={392 - 14 - n * 10}
                  y={74}
                  width="7"
                  height="7"
                  rx="1.5"
                  className="fill-ink-destructive"
                  initial={{ opacity: 0, y: 64 }}
                  animate={{ opacity: 1, y: 74 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.9 + n * 0.12 }}
                />
              ))}
          </AnimatePresence>
        </svg>
      </div>

      {/* Read-outs */}
      <div className="flex min-h-16 items-center justify-between gap-4 border-t border-ink-border px-4 py-3 sm:px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
            className="flex items-baseline gap-3"
          >
            <p className="text-[10px] font-bold tracking-[0.2em] text-ink-muted">
              {stage === 3 ? "OUTPUT PER SHIFT" : "ROUTE PER PART"}
            </p>
            <p
              className={cn(
                "font-display text-2xl leading-none font-extrabold sm:text-3xl",
                stage === 0 && "text-ink-highlight",
                stage === 1 && "text-ink-destructive",
                stage >= 2 && "text-ink-success",
              )}
            >
              {stage === 0 && "191 m"}
              {stage === 1 && "191 m ↺"}
              {stage === 2 && "80 m"}
              {stage === 3 && "60 → 75"}
            </p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>{stage === 3 && <OutputChart />}</AnimatePresence>
      </div>
    </div>
  )
}

function OutputChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-24 sm:w-32"
    >
      <svg viewBox="0 0 120 40" className="h-9 w-full overflow-visible" aria-hidden>
        <line x1="0" y1="38" x2="120" y2="38" className="stroke-ink-border" strokeWidth="1" />
        <motion.path
          d="M0 32 C 20 32, 30 31, 45 30 S 70 20, 85 14 S 110 6, 120 5"
          fill="none"
          className="stroke-ink-success"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  )
}
