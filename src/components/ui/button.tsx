import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Slot } from "@/components/ui/slot"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out-expo outline-none focus-visible:ring-4 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_8px_30px_-12px_var(--glow)] hover:shadow-[0_12px_40px_-10px_var(--glow)] hover:brightness-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-foreground/15 bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/5",
        ghost: "text-foreground hover:bg-foreground/5",
        ink: "border border-ink-foreground/20 bg-transparent text-ink-foreground hover:border-ink-foreground/50 hover:bg-ink-foreground/5",
        success: "bg-success text-success-foreground hover:brightness-110",
        link: "h-auto rounded-none px-0 text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants, type ButtonProps }
