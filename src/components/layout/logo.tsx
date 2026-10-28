import Link from "next/link"

import { cn } from "@/lib/utils"

/** The Pan Axis mark: a gold angular "P" and a green "A" stroke on an ink tile. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("size-9 shrink-0", className)}>
      <rect width="64" height="64" rx="14" className="fill-ink" />
      <path
        d="M13 15h25.5a11.5 11.5 0 0 1 0 23H28.5a4 4 0 0 0-4 4V50H15V35.5a7 7 0 0 1 7-7h16a3.75 3.75 0 0 0 0-7.5H19.5Z"
        className="fill-ink-highlight"
      />
      <path d="M33 50 47.5 29H55L40.5 50Z" className="fill-ink-success" />
    </svg>
  )
}

export function Logo({ className, tone = "default" }: { className?: string; tone?: "default" | "ink" }) {
  return (
    <Link href="/" aria-label="Pan Axis — home" className={cn("group inline-flex items-center gap-3", className)}>
      <LogoMark className="transition-transform duration-500 ease-out-expo group-hover:-rotate-6" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[15px] font-bold tracking-[0.28em]",
            tone === "ink" ? "text-ink-foreground" : "text-foreground",
          )}
        >
          PAN AXIS
        </span>
        <span
          className={cn(
            "mt-1 text-[8.5px] font-semibold tracking-[0.32em]",
            tone === "ink" ? "text-ink-highlight" : "text-highlight",
          )}
        >
          INDUSTRIAL SOLUTIONS
        </span>
      </span>
    </Link>
  )
}
