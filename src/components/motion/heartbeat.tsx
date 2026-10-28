"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const ECG =
  "M0 30 H40 L46 26 L52 30 H62 L68 4 L76 52 L82 30 H96 L104 22 L112 30 H160 L166 26 L172 30 H182 L188 4 L196 52 L202 30 H216 L224 22 L232 30 H280"

/** The brand's vital-signs line, drawn continuously. */
export function Heartbeat({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 280 56" fill="none" aria-hidden className={cn("overflow-visible", className)}>
      <path d={ECG} className="stroke-current opacity-15" strokeWidth={2} strokeLinejoin="round" />
      <motion.path
        d={ECG}
        className="stroke-current"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, pathOffset: 0 }}
        animate={{ pathLength: [0, 0.35, 0.35], pathOffset: [0, 0.65, 1] }}
        transition={{ duration: 2.6, delay, ease: "linear", repeat: Infinity, times: [0, 0.65, 1] }}
      />
    </svg>
  )
}
