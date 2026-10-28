import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Eyebrow } from "@/components/marketing/section"
import { Heartbeat } from "@/components/motion/heartbeat"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="relative flex min-h-svh items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-grid mask-fade-y" />
        <div className="relative container-page">
          <Eyebrow>Error 404 · Route not found</Eyebrow>
          <h1 className="mt-6 font-display text-7xl leading-[0.85] font-extrabold tracking-tight uppercase sm:text-9xl">
            This part <span className="block text-highlight">took a wrong turn.</span>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-8 text-muted-foreground">
            Like a product doubling back across the floor, this page went somewhere it shouldn&apos;t. Let&apos;s get
            you back on the route.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button asChild size="lg">
              <Link href="/">
                <ArrowLeft />
                Back to home
              </Link>
            </Button>
            <Heartbeat className="h-8 w-48 text-destructive" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
