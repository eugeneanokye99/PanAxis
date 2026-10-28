import type { Metadata } from "next"
import { CircleCheck } from "lucide-react"

import { sessions } from "@/content/method"
import { generalFaqs } from "@/content/faqs"
import { cn } from "@/lib/utils"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqSection } from "@/components/marketing/faq"
import { SessionVisual } from "@/components/marketing/method-visuals"
import { PageHero } from "@/components/marketing/page-hero"
import { ResultsBand } from "@/components/marketing/proof"
import { ScrollStory } from "@/components/marketing/scroll-story"
import { Section } from "@/components/marketing/section"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { TextReveal } from "@/components/motion/text-reveal"

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Four sessions, one standard method: get the facts right, design the options, test before you move, finish and hand over.",
  alternates: { canonical: "/how-it-works" },
}

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Four sessions · one standard method"
        chapter="A–D"
        title={[{ text: "Measured." }, { text: "Designed.", className: "text-highlight" }, { text: "Tested." }]}
        description="Every redesign follows the same proven path — before anything moves. Here is exactly what happens in each session, and what you get at the end of it."
      />

      <ScrollStory />

      <Section spacing="sm" className="pt-24 md:pt-32">
        <div className="container-page">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sessions.map((session) => (
              <StaggerItem key={session.letter}>
                <a
                  href={`#session-${session.letter.toLowerCase()}`}
                  className="group block h-full rounded-2xl border-t-2 border-primary bg-card p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-secondary font-extrabold text-secondary-foreground">
                    {session.letter}
                  </span>
                  <p className="mt-4 font-bold">{session.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{session.summary}</p>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {sessions.map((session, i) => {
        const flipped = i % 2 === 1
        return (
          <Section key={session.letter} id={`session-${session.letter.toLowerCase()}`} tone={flipped ? "muted" : "default"}>
            <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className={cn(flipped && "lg:order-2")}>
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span className="grid size-14 place-items-center rounded-2xl bg-secondary font-display text-3xl font-extrabold text-secondary-foreground">
                      {session.letter}
                    </span>
                    <p className="text-xs font-bold tracking-[0.28em] text-highlight">SESSION {session.letter}</p>
                  </div>
                </Reveal>
                <TextReveal
                  segments={[session.title]}
                  className="mt-6 font-display text-5xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-7xl"
                />
                <Reveal delay={0.15}>
                  <p className="mt-6 text-lg leading-8 text-muted-foreground">{session.description}</p>
                </Reveal>
                <Stagger className="mt-8 space-y-3">
                  {session.checklist.map((item) => (
                    <StaggerItem key={item} className="flex items-start gap-3 text-base font-medium">
                      <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" />
                      {item}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
              <Reveal delay={0.1} className={cn("rounded-[2rem] bg-ink p-3 sm:p-4", flipped && "lg:order-1")}>
                <SessionVisual letter={session.letter} />
              </Reveal>
            </div>
          </Section>
        )
      })}

      <ResultsBand />
      <FaqSection faqs={generalFaqs.slice(2, 6)} />
      <CtaBand />
    </>
  )
}
