import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors [&_svg]:size-3.5",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        outline: "border-foreground/15 text-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        success: "border-success/30 bg-success/10 text-success",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive",
        ink: "border-ink-foreground/15 bg-ink-foreground/5 text-ink-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
