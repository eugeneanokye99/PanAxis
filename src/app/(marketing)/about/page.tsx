import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Eye, Handshake, Ruler, Stethoscope } from "lucide-react"

import { siteConfig } from "@/content/site"
import { movePhases } from "@/content/method"
import { Button } from "@/components/ui/button"
import { CtaBand } from "@/components/marketing/cta-band"
import { MachinesStatement } from "@/components/marketing/machines-statement"
import { PageHero } from "@/components/marketing/page-hero"
import { ResultsBand } from "@/components/marketing/proof"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Parallax } from "@/components/motion/parallax"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"

export const metadata: Metadata = {
  title: "About us",
  description:
    "Pan Axis Industrial Solutions is an Accra-based team of industrial engineers. We are doctors for factories: we measure, diagnose, treat and follow up.",
  alternates: { canonical: "/about" },
}

const values = [
  {
    icon: Stethoscope,
    title: "Diagnose before you treat",
    body: "No layout is drawn until the floor is measured. Opinions are cheap; cycle times and route distances are not.",
  },
  {
    icon: Ruler,
    title: "Test before you move",
    body: "Every option runs through a computer model of your factory first. Moving machines is too expensive to guess.",
  },
  {
    icon: Handshake,
    title: "Keep production running",
    body: "Moves are planned in phases, usually over weekends. Your customers should never notice we were there.",
  },
  {
    icon: Eye,
    title: "Honest first opinions",
    body: "If your layout is not the problem, we say so in the FloorCheck — and point you to what is.",
  },
]

const timeline = [
  { when: "Day 1", title: "FloorCheck", body: "One hour on your floor. An honest first opinion." },
  { when: "Weeks 1–2", title: "Session A — Facts", body: "Time studies, route tracing, constraints." },
  { when: "Weeks 2–4", title: "Session B — Options", body: "Two or three layouts, scored on your priorities." },
  { when: "Weeks 4–6", title: "Session C — Test", body: "Every option simulated for a full shift." },
  { when: "Weeks 6–8", title: "Session D — Hand-over", body: "Final drawing, move plan, team presentation." },
  ...movePhases.map((p) => ({ when: p.when, title: `${p.phase} move`, body: p.what })),
  { when: "+4–8 weeks", title: "Re-measure", body: "We come back and prove it worked." },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${siteConfig.legalName}`}
        chapter="04"
        title={[{ text: "Doctors" }, { text: "for factories.", className: "text-highlight" }]}
        description="When you feel sick, you go to a doctor. When your factory is sick — late orders, idle machines, crowded floors — you call us."
        aside={
          <Button asChild size="lg" variant="outline">
            <Link href="/how-it-works">
              See our method
              <ArrowRight />
            </Link>
          </Button>
        }
      />

      <Section tone="ink" className="overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative container-page grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading tone="ink" eyebrow="Our story" title="Most factories already own the capacity they need." />
          </div>
          <Parallax offset={30}>
            <div className="space-y-6 text-lg leading-8 text-ink-muted">
              <p>
                Factory floors rarely start badly. They grow — one machine, one order, one product at a time — until
                parts travel hundreds of metres, double back across the floor and queue for a single forklift.
              </p>
              <p>
                Pan Axis was founded in {siteConfig.location} to fix exactly that. We are industrial engineers who
                measure how work really moves, find what is truly slowing it down, and redesign the floor around the
                work — testing every option in a computer model before a single machine moves.
              </p>
              <p className="font-semibold text-ink-foreground">
                We don&apos;t sell machines. We help you get more from the ones you already have.
              </p>
            </div>
          </Parallax>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <SectionHeading eyebrow="What we believe" title="Four principles we never skip" />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
            {values.map((value, i) => (
              <StaggerItem
                key={value.title}
                className="group relative overflow-hidden rounded-3xl border bg-card p-8 transition-colors duration-500 hover:border-primary/50"
              >
                <span className="absolute -top-4 right-6 font-display text-9xl font-extrabold text-foreground/[0.04]">
                  {i + 1}
                </span>
                <value.icon className="size-9 text-highlight" />
                <h3 className="mt-6 text-2xl font-bold tracking-tight">{value.title}</h3>
                <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">{value.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <MachinesStatement />

      <Section tone="muted">
        <div className="container-page">
          <SectionHeading
            eyebrow="What working with us looks like"
            title="From first visit to proven result"
            description="A typical engagement, start to finish. Smaller floors move faster; multi-site groups run several in parallel."
          />
          <ol className="relative mt-16 space-y-0 border-l border-border pl-8 md:pl-12">
            {timeline.map((item, i) => (
              <li key={`${item.when}-${item.title}`} className="relative pb-10 last:pb-0">
                <span className="absolute top-1.5 -left-[calc(2rem+5px)] size-2.5 rounded-full bg-primary ring-4 ring-background md:-left-[calc(3rem+5px)]" />
                <Reveal delay={Math.min(i * 0.03, 0.2)} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
                  <p className="text-sm font-bold text-highlight">{item.when}</p>
                  <div>
                    <p className="text-lg font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <ResultsBand />

      <Section spacing="sm">
        <div className="container-page text-center">
          <TextReveal
            segments={[{ text: "Get more out of the floor" }, { text: "you already have.", className: "text-highlight" }]}
            className="mx-auto max-w-4xl font-display text-5xl leading-[0.9] font-extrabold uppercase sm:text-7xl"
          />
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
