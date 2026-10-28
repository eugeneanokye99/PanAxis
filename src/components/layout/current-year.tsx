"use client"

import * as React from "react"

function Year() {
  return <>{new Date().getFullYear()}</>
}

// Streamed behind Suspense so the prerendered shell never evaluates `new Date()` (Cache Components rule).
export function CurrentYear() {
  return (
    <React.Suspense fallback={null}>
      <Year />
    </React.Suspense>
  )
}
