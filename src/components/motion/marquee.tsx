import * as React from "react"

import { cn } from "@/lib/utils"

/** Infinite horizontal ticker. Content is duplicated once for a seamless loop. */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
}: {
  children: React.ReactNode
  duration?: number
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={cn("group flex overflow-hidden mask-fade-x", className)}>
      <div
        className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  )
}
