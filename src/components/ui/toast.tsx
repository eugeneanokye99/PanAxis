"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CircleAlert, CircleCheck, X } from "lucide-react"

import { cn } from "@/lib/utils"

type ToastVariant = "success" | "error"
type ToastItem = { id: number; title: string; description?: string; variant: ToastVariant }

// A tiny external store so `toast()` can be called from anywhere.
let toasts: ToastItem[] = []
let nextId = 1
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

function dismiss(id: number) {
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

function push(variant: ToastVariant, title: string, options?: { description?: string; duration?: number }) {
  const id = nextId++
  toasts = [...toasts, { id, title, description: options?.description, variant }]
  emit()
  setTimeout(() => dismiss(id), options?.duration ?? 5000)
  return id
}

export const toast = {
  success: (title: string, options?: { description?: string; duration?: number }) => push("success", title, options),
  error: (title: string, options?: { description?: string; duration?: number }) => push("error", title, options),
  dismiss,
}

const EMPTY: ToastItem[] = []

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function Toaster() {
  const items = React.useSyncExternalStore(
    subscribe,
    () => toasts,
    () => EMPTY,
  )

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 bottom-4 z-[200] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
    >
      <AnimatePresence initial={false}>
        {items.map((item) => {
          const Icon = item.variant === "success" ? CircleCheck : CircleAlert
          return (
            <motion.div
              key={item.id}
              layout
              role="status"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl border bg-popover p-4 text-popover-foreground shadow-xl"
            >
              <Icon
                className={cn("mt-0.5 size-5 shrink-0", item.variant === "success" ? "text-success" : "text-destructive")}
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{item.title}</p>
                {item.description && <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>}
              </div>
              <button
                type="button"
                onClick={() => dismiss(item.id)}
                className="cursor-pointer rounded-full p-1 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="size-4" />
                <span className="sr-only">Dismiss</span>
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
