import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { generalFaqs } from "@/content/faqs"
import { services } from "@/content/services"
import { Button } from "@/components/ui/button"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqSection } from "@/components/marketing/faq"
import { MethodTabs } from "@/components/marketing/method-tabs"
import { PageHero } from "@/components/marketing/page-hero"
import { IndustriesMarquee } from "@/components/marketing/proof"
import { Section, SectionHeading } from "@/components/marketing/section"
import { ServiceCard } from "@/components/marketing/service-card"
import { Stagger, StaggerItem } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Free FloorCheck, bottleneck diagnosis, layout redesign, simulation and phased move planning — every Pan Axis service follows one evidence-first method.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        chapter="02"
        title={[{ text: "Treatment," }, { text: "not guesswork.", className: "text-highlight" }]}
        description="Every service follows the same path: measure the floor, find the real cause, design and test the cure, then move step by step. Take the whole treatment, or just the part you need."
        aside={
          <Button asChild size="lg">
            <Link href="/contact">
              Start with a free FloorCheck
              <ArrowRight />
            </Link>
          </Button>
        }
      />
      <IndustriesMarquee />

      <Section>
        <div className="container-page">
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} index={i} />
              </StaggerItem>
            ))}
            <StaggerItem>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-dashed p-7">
                <p className="text-sm leading-6 text-muted-foreground">
                  Planning a new building, an expansion, or a line for a new product? The same method works on a
                  blank floor.
                </p>
                <Button asChild variant="outline" className="mt-8 self-start">
                  <Link href="/contact?interest=partnership">Talk to an engineer</Link>
                </Button>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      <Section tone="muted">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="One standard method"
            title="How the services fit together"
            description="Sessions A to D build on each other. Most clients take all four; some start with A and decide from there."
          />
          <div className="mt-16">
            <MethodTabs />
          </div>
        </div>
      </Section>

      <FaqSection faqs={generalFaqs.slice(0, 5)} />
      <CtaBand />
    </>
  )
}
