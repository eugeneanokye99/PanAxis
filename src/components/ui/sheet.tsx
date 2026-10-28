"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMounted } from "@/lib/hooks"
import { Slot } from "@/components/ui/slot"

type SheetContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

function useSheet() {
  const ctx = React.useContext(SheetContext)
  if (!ctx) throw new Error("Sheet components must be used inside <Sheet>")
  return ctx
}

function Sheet({
  open: controlled,
  onOpenChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) {
  const [uncontrolled, setUncontrolled] = React.useState(false)
  const open = controlled ?? uncontrolled
  const titleId = React.useId()
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlled === undefined) setUncontrolled(next)
      onOpenChange?.(next)
    },
    [controlled, onOpenChange],
  )
  return <SheetContext.Provider value={{ open, setOpen, titleId }}>{children}</SheetContext.Provider>
}

function SheetTrigger({ asChild, ...props }: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { open, setOpen } = useSheet()
  const Comp = asChild ? Slot : "button"
  return <Comp aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(true)} {...props} />
}

function SheetClose({ asChild, ...props }: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { setOpen } = useSheet()
  const Comp = asChild ? Slot : "button"
  return <Comp onClick={() => setOpen(false)} {...props} />
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

function SheetContent({
  side = "right",
  className,
  children,
}: {
  side?: "right" | "left"
  className?: string
  children: React.ReactNode
}) {
  const { open, setOpen, titleId } = useSheet()
  const panelRef = React.useRef<HTMLDivElement>(null)
  const mounted = useMounted()

  React.useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const html = document.documentElement
    html.style.overflow = "hidden"
    html.classList.add("lenis-stopped")

    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    })

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
      if (event.key !== "Tab" || !panelRef.current) return
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("keydown", onKeyDown)
      html.style.overflow = ""
      html.classList.remove("lenis-stopped")
      previouslyFocused?.focus()
    }
  }, [open, setOpen])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-lenis-prevent
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute inset-y-0 flex w-full max-w-md flex-col overflow-y-auto bg-background shadow-2xl",
              side === "right" ? "right-0 border-l" : "left-0 border-r",
              className,
            )}
          >
            {children}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-5 right-4 grid size-10 cursor-pointer place-items-center rounded-full border border-foreground/10 transition-colors hover:bg-foreground/5"
            >
              <X className="size-4" />
              <span className="sr-only">Close menu</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  const { titleId } = useSheet()
  return <h2 id={titleId} className={cn("text-lg font-bold", className)} {...props} />
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, useSheet }
