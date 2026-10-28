"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

type AccordionContextValue = {
  open: string[]
  toggle: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)
const ItemContext = React.createContext<{ value: string; isOpen: boolean; id: string } | null>(null)

function useAccordion() {
  const ctx = React.useContext(AccordionContext)
  if (!ctx) throw new Error("Accordion components must be used inside <Accordion>")
  return ctx
}

function useItem() {
  const ctx = React.useContext(ItemContext)
  if (!ctx) throw new Error("AccordionTrigger/Content must be used inside <AccordionItem>")
  return ctx
}

type AccordionProps = React.ComponentProps<"div"> & {
  type?: "single" | "multiple"
  defaultValue?: string[]
}

function Accordion({ type = "single", defaultValue = [], className, ...props }: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(defaultValue)

  const toggle = React.useCallback(
    (value: string) => {
      setOpen((current) => {
        if (current.includes(value)) return current.filter((v) => v !== value)
        return type === "single" ? [value] : [...current, value]
      })
    },
    [type],
  )

  return (
    <AccordionContext.Provider value={{ open, toggle }}>
      <div data-slot="accordion" className={cn("divide-y divide-border border-y", className)} {...props} />
    </AccordionContext.Provider>
  )
}

function AccordionItem({ value, className, ...props }: React.ComponentProps<"div"> & { value: string }) {
  const { open } = useAccordion()
  const id = React.useId()
  const isOpen = open.includes(value)
  return (
    <ItemContext.Provider value={{ value, isOpen, id }}>
      <div data-slot="accordion-item" data-state={isOpen ? "open" : "closed"} className={cn("group", className)} {...props} />
    </ItemContext.Provider>
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<"button">) {
  const { toggle } = useAccordion()
  const { value, isOpen, id } = useItem()
  return (
    <h3 className="flex">
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        onClick={() => toggle(value)}
        className={cn(
          "flex flex-1 cursor-pointer items-center justify-between gap-6 py-6 text-left text-base font-semibold transition-colors outline-none hover:text-highlight focus-visible:text-highlight md:text-lg",
          className,
        )}
        {...props}
      >
        {children}
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-foreground/15 transition-[transform,background-color,border-color] duration-500 ease-out-expo group-data-[state=open]:rotate-45 group-data-[state=open]:border-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
          <Plus className="size-4" />
        </span>
      </button>
    </h3>
  )
}

function AccordionContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { isOpen, id } = useItem()
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`${id}-content`}
          role="region"
          aria-labelledby={`${id}-trigger`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className={cn("max-w-3xl pr-14 pb-6 text-base leading-7 text-muted-foreground", className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
