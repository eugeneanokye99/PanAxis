import * as React from "react"

import { cn } from "@/lib/utils"

type AnyProps = Record<string, unknown>

/**
 * Merges its props onto its single child element, so a styled component can
 * render as a link (or anything else) via `asChild`.
 */
export function Slot({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) {
  if (!React.isValidElement<AnyProps>(children)) return null

  const childProps = children.props
  return React.cloneElement(children, {
    ...props,
    ...childProps,
    className: cn(props.className, childProps.className as string | undefined),
    style: { ...props.style, ...(childProps.style as React.CSSProperties | undefined) },
  })
}
