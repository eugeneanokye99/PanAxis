import type { Metadata } from "next"
import { Suspense } from "react"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { siteConfig } from "@/content/site"
import { WhatsAppIcon } from "@/components/icons"
import { ContactForm, ContactFormSkeleton } from "@/components/marketing/contact-form"
import { Eyebrow, Section } from "@/components/marketing/section"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"

export const metadata: Metadata = {
  title: "Contact — book a free FloorCheck",
  description: siteConfig.offer.summary,
  alternates: { canonical: "/contact" },
}

const nextSteps = [
  { title: "We call you back", body: "Within one working day, to understand your floor and agree a time." },
  { title: "One hour on your floor", body: "An engineer walks the floor with you and watches how work moves." },
  { title: "An honest first opinion", body: "Is the layout the cause? You get a clear answer — and a next step." },
]

const channels = [
  { icon: WhatsAppIcon, label: "WhatsApp", value: siteConfig.phone.display, href: siteConfig.phone.whatsapp },
  { icon: Phone, label: "Call", value: siteConfig.phone.display, href: siteConfig.phone.href },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: "Based in", value: siteConfig.location },
  { icon: Clock, label: "Hours", value: siteConfig.hours },
]

export default function ContactPage() {
  return (
    <Section className="overflow-hidden pt-36 md:pt-44">
      <div className="absolute inset-0 bg-grid mask-fade-y opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-0 size-[36rem] rounded-full bg-glow blur-[120px]" />
      <div className="relative container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Contact · {siteConfig.offer.name}</Eyebrow>
          </Reveal>
          <TextReveal
            as="h1"
            trigger="mount"
            delay={0.1}
            segments={[{ text: "Book your free" }, { text: "check-up.", className: "text-highlight" }]}
            className="mt-6 font-display text-6xl leading-[0.86] font-extrabold tracking-tight uppercase sm:text-8xl"
          />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">{siteConfig.offer.summary}</p>
          </Reveal>

          <Stagger className="mt-10 space-y-3">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <c.icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-widest text-muted-foreground uppercase">{c.label}</span>
                    <span className="block font-semibold">{c.value}</span>
                  </span>
                </>
              )
              return (
                <StaggerItem key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-foreground/5"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-2">{inner}</div>
                  )}
                </StaggerItem>
              )
            })}
          </Stagger>

          <Reveal delay={0.2} className="mt-12 rounded-3xl bg-ink p-7 text-ink-foreground">
            <p className="text-xs font-bold tracking-[0.25em] text-ink-highlight">WHAT HAPPENS NEXT</p>
            <ol className="mt-5 space-y-5">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink-highlight text-sm font-extrabold text-ink">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-bold">{step.title}</span>
                    <span className="block text-sm text-ink-muted">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:pt-10">
          <Suspense fallback={<ContactFormSkeleton />}>
            <ContactForm />
          </Suspense>
        </Reveal>
      </div>
    </Section>
  )
}
