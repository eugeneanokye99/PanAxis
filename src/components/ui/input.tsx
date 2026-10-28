import * as React from "react"

import { cn } from "@/lib/utils"

const fieldBase =
  "w-full min-w-0 rounded-xl border border-input bg-card px-4 text-sm text-foreground shadow-none transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/15"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldBase, "h-12", className)} {...props} />
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(fieldBase, "min-h-32 resize-y py-3 leading-6", className)} {...props} />
}

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(fieldBase, "h-12 cursor-pointer appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 fill-none stroke-muted-foreground stroke-2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}

export { Input, Textarea, Select, fieldBase }
