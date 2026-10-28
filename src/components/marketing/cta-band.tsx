import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

import { siteConfig } from "@/content/site"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/icons"
import { LogoMark } from "@/components/layout/logo"
import { Eyebrow } from "@/components/marketing/section"
import { Heartbeat } from "@/components/motion/heartbeat"
import { Magnetic } from "@/components/motion/magnetic"
import { Reveal } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"

export function CtaBand({
  title = [{ text: "Book your free" }, { text: "factory check-up", className: "text-ink-highlight" }],
  description = `We call it the ${siteConfig.offer.name}. One hour. No obligation. An honest first opinion on whether your layout is holding you back.`,
}: {
  title?: Parameters<typeof TextReveal>[0]["segments"]
  description?: string
}) {
  return (
    <section className="px-3 py-3">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink text-ink-foreground">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-y-0 left-0 w-1.5 bg-ink-highlight" />
        <div className="pointer-events-none absolute -right-40 -bottom-40 size-[34rem] rounded-full bg-glow blur-[120px]" />
        <div className="relative container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-20">
          <Reveal className="flex flex-col items-start gap-5">
            <LogoMark className="size-20" />
            <div>
              <p className="text-2xl font-bold tracking-[0.3em]">PAN AXIS</p>
              <p className="mt-1 text-sm font-semibold text-ink-highlight">{siteConfig.tagline}</p>
            </div>
            <Heartbeat className="h-8 w-40 text-ink-success" />
          </Reveal>
          <div>
            <Eyebrow tone="ink">Start here</Eyebrow>
            <TextReveal
              segments={title}
              className="mt-5 font-display text-5xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-7xl"
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-ink-muted">{description}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <a href={siteConfig.phone.whatsapp} target="_blank" rel="noreferrer">
                    <WhatsAppIcon className="size-5" />
                    Call / WhatsApp {siteConfig.phone.display}
                  </a>
                </Button>
              </Magnetic>
              <Button asChild size="lg" variant="ink">
                <Link href="/contact">
                  Book online
                  <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
                </Link>
              </Button>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-muted">
                <Phone className="size-4 text-ink-highlight" />
                {siteConfig.legalName} · {siteConfig.location}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
