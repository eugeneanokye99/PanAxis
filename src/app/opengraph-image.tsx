import { ImageResponse } from "next/og"

import { brandColors } from "@/lib/brand"
import { siteConfig } from "@/content/site"

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: brandColors.ink,
          color: brandColors.paper,
          borderLeft: `16px solid ${brandColors.gold}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill={brandColors.inkCard} />
            <path
              d="M13 15h25.5a11.5 11.5 0 0 1 0 23H28.5a4 4 0 0 0-4 4V50H15V35.5a7 7 0 0 1 7-7h16a3.75 3.75 0 0 0 0-7.5H19.5Z"
              fill={brandColors.gold}
            />
            <path d="M33 50 47.5 29H55L40.5 50Z" fill={brandColors.green} />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: 12 }}>PAN AXIS</span>
            <span style={{ fontSize: 18, letterSpacing: 8, color: brandColors.gold }}>INDUSTRIAL SOLUTIONS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 110, fontWeight: 800, lineHeight: 1 }}>Doctors for</span>
          <span style={{ fontSize: 110, fontWeight: 800, lineHeight: 1, color: brandColors.gold }}>factories.</span>
        </div>
        <span style={{ fontSize: 28, color: brandColors.inkMuted }}>{siteConfig.promise}</span>
      </div>
    ),
    size,
  )
}
