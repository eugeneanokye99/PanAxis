import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"

import "./globals.css"
import { siteConfig } from "@/content/site"
import { brandColors } from "@/lib/brand"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { Toaster } from "@/components/ui/toast"

// Self-hosted (via @fontsource) so builds never depend on reaching Google Fonts.
const montserrat = localFont({
  src: "../../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
})

const display = localFont({
  src: "../../node_modules/@fontsource-variable/big-shoulders/files/big-shoulders-latin-wght-normal.woff2",
  variable: "--font-display-face",
  weight: "100 900",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  keywords: [
    "factory layout",
    "plant layout redesign",
    "facility layout",
    "production flow",
    "bottleneck analysis",
    "simulation",
    "lean manufacturing",
    "Ghana",
    "Accra",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.legalName,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: brandColors.paper },
    { media: "(prefers-color-scheme: dark)", color: brandColors.ink },
  ],
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${display.variable}`}>
      <body className="min-h-svh">
        <ThemeProvider>
          <SmoothScroll>
            <a
              href="#main"
              className="sr-only z-[300] rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
            >
              Skip to content
            </a>
            {children}
            <Toaster />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
