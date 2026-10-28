import type { Metadata } from "next"
import { HandCoins, ShieldCheck, Wrench } from "lucide-react"

import { pricingFaqs } from "@/content/faqs"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqSection } from "@/components/marketing/faq"
import { PageHero } from "@/components/marketing/page-hero"
import { ComparisonTable, PricingCards } from "@/components/marketing/pricing"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Stagger, StaggerItem } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start with a free FloorCheck. After that, a fixed quote for the work your floor actually needs — no hourly surprises.",
  alternates: { canonical: "/pricing" },
}

const promises = [
  { icon: HandCoins, title: "Fixed quotes", body: "You know the full price before we start. No hourly billing, no surprises." },
  { icon: Wrench, title: "No equipment sales", body: "We earn nothing from machines, so our advice is about your floor — not a catalogue." },
  { icon: ShieldCheck, title: "Measured results", body: "We come back after the move and measure. You see the before and after in numbers." },
]

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagements & pricing"
        chapter="03"
        title={[{ text: "Start free." }, { text: "Pay for proof.", className: "text-highlight" }]}
        description="Every engagement begins with a free one-hour FloorCheck. If the layout is the cause, you receive a fixed quote for exactly the sessions your floor needs."
      />

      <Section spacing="sm" className="pb-24 md:pb-32">
        <div className="container-page">
          <PricingCards />
        </div>
      </Section>

      <Section tone="muted">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Compare" title="What's included" />
          <div className="mt-14">
            <ComparisonTable />
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <Stagger className="grid gap-5 md:grid-cols-3">
            {promises.map((p) => (
              <StaggerItem key={p.title} className="rounded-3xl border bg-card p-8">
                <p.icon className="size-8 text-highlight" />
                <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <FaqSection faqs={pricingFaqs} title="Pricing questions" />
      <CtaBand />
    </>
  )
}
