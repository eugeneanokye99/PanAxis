"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
  baseId: string
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs>")
  return ctx
}

type TabsProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
}

function Tabs({ defaultValue, value: controlled, onValueChange, className, ...props }: TabsProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const value = controlled ?? uncontrolled
  const baseId = React.useId()

  const setValue = React.useCallback(
    (next: string) => {
      if (controlled === undefined) setUncontrolled(next)
      onValueChange?.(next)
    },
    [controlled, onValueChange],
  )

  return (
    <TabsContext.Provider value={{ value, setValue, baseId }}>
      <div data-slot="tabs" className={cn("flex flex-col gap-6", className)} {...props} />
    </TabsContext.Provider>
  )
}

function TabsList({ className, onKeyDown, ...props }: React.ComponentProps<"div">) {
  // Arrow-key roving focus, as per the WAI-ARIA tabs pattern.
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event)
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"]
    if (!keys.includes(event.key)) return
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'))
    const index = tabs.indexOf(document.activeElement as HTMLButtonElement)
    let next = index
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length
    if (event.key === "Home") next = 0
    if (event.key === "End") next = tabs.length - 1
    event.preventDefault()
    tabs[next]?.focus()
    tabs[next]?.click()
  }

  return (
    <div
      role="tablist"
      data-slot="tabs-list"
      onKeyDown={handleKeyDown}
      className={cn("inline-flex w-fit items-center gap-1 rounded-full border bg-card p-1", className)}
      {...props}
    />
  )
}

function TabsTrigger({ value, className, children, ...props }: React.ComponentProps<"button"> & { value: string }) {
  const { value: active, setValue, baseId } = useTabs()
  const selected = active === value
  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      data-state={selected ? "active" : "inactive"}
      onClick={() => setValue(value)}
      className={cn(
        "relative inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:text-secondary-foreground",
        className,
      )}
      {...props}
    >
      {selected && (
        <motion.span
          layoutId={`${baseId}-indicator`}
          className="absolute inset-0 -z-0 rounded-full bg-secondary"
          transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
}

function TabsContent({ value, className, ...props }: React.ComponentProps<"div"> & { value: string }) {
  const { value: active, baseId } = useTabs()
  if (active !== value) return null
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, useTabs }
