"use client"

import * as React from "react"
import Lenis from "lenis"
import { MotionConfig } from "motion/react"
import { usePathname } from "next/navigation"

const LenisContext = React.createContext<Lenis | null>(null)

export function useLenis() {
  return React.useContext(LenisContext)
}

/**
 * Weighted, inertial scrolling (the "coffee site" feel) plus global motion
 * settings. Disabled entirely when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null)
  const pathname = usePathname()

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -96 },
    })

    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    })

    setLenis(instance)

    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  React.useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis])

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  )
}
