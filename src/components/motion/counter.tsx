"use client"

import * as React from "react"
import { animate, useInView } from "motion/react"

/** Counts up to `value` once it scrolls into view. */
export function Counter({
  value,
  from = 0,
  decimals,
  prefix = "",
  suffix = "",
  duration = 2.2,
  className,
}: {
  value: number
  from?: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const places = decimals ?? (Number.isInteger(value) ? 0 : (value.toString().split(".")[1]?.length ?? 0))
  const format = React.useCallback((n: number) => `${prefix}${n.toFixed(places)}${suffix}`, [places, prefix, suffix])

  React.useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(from, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest)
      },
    })
    return () => controls.stop()
  }, [inView, from, value, duration, format])

  return (
    <span ref={ref} className={className}>
      {format(from)}
    </span>
  )
}
