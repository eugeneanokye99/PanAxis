"use client"

import * as React from "react"

const noop = () => () => {}

/** True only after hydration — avoids setState-in-effect for portals and theme UI. */
export function useMounted() {
  return React.useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
}
