import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("flex items-center gap-1 text-sm font-semibold text-foreground select-none", className)}
      {...props}
    />
  )
}

function FieldMessage({ className, children, ...props }: React.ComponentProps<"p">) {
  if (!children) return null
  return (
    <p data-slot="field-message" role="alert" className={cn("text-xs font-medium text-destructive", className)} {...props}>
      {children}
    </p>
  )
}

export { Label, FieldMessage }
