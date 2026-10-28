import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { generalFaqs } from "@/content/faqs"
import { services } from "@/content/services"
import { Button } from "@/components/ui/button"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqSection } from "@/components/marketing/faq"
import { HomeHero } from "@/components/marketing/home-hero"
import { MachinesStatement } from "@/components/marketing/machines-statement"
import { MethodTabs } from "@/components/marketing/method-tabs"
import { PricingCards } from "@/components/marketing/pricing"
import { CaseStudy, IndustriesMarquee, ResultsBand, Testimonials } from "@/components/marketing/proof"
import { ScrollStory } from "@/components/marketing/scroll-story"
import { Section, SectionHeading } from "@/components/marketing/section"
import { ServiceCard } from "@/components/marketing/service-card"
import { Symptoms } from "@/components/marketing/symptoms"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { siteConfig } from "@/content/site"

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.legalName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    telephone: siteConfig.phone.href.replace("tel:", ""),
    address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
    url: siteConfig.url,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero />
      <IndustriesMarquee />
      <Symptoms />
      <ScrollStory />
      <MachinesStatement />

      <Section tone="muted">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Four sessions · one standard method"
            title="Every redesign follows the same proven path"
            description="Collect the facts, design the options, test them, and hand over a plan. Measured. Designed. Tested before anything moves."
          />
          <div className="mt-16">
            <MethodTabs />
          </div>
        </div>
      </Section>

      <ResultsBand />

      <Section>
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Services"
              title="From first check-up to full recovery"
              description="Start with a free FloorCheck, or bring us in for a single session. Every service follows the same evidence-first method."
            />
            <Reveal delay={0.2}>
              <Button asChild variant="outline">
                <Link href="/services">
                  All services
                  <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <StaggerItem key={service.slug} className={i === 0 ? "lg:row-span-1" : undefined}>
                <ServiceCard service={service} index={i} />
              </StaggerItem>
            ))}
            <StaggerItem>
              <Link
                href="/contact"
                className="group flex h-full flex-col justify-between rounded-3xl bg-primary p-7 text-primary-foreground transition-transform duration-500 ease-out-expo hover:-translate-y-1"
              >
                <p className="font-display text-4xl leading-[0.9] font-extrabold uppercase">
                  Not sure where to start?
                </p>
                <span className="mt-10 inline-flex items-center gap-2 font-bold">
                  Book the free FloorCheck
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </Section>

      <CaseStudy />
      <Testimonials />

      <Section>
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Engagements"
            title="Start free. Pay for proof."
            description="No hourly surprises. After the FloorCheck you receive a fixed quote for the work your floor actually needs."
          />
          <div className="mt-16">
            <PricingCards compact />
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/pricing" className="text-sm font-semibold text-highlight underline-offset-4 hover:underline">
              Compare everything that&apos;s included →
            </Link>
          </Reveal>
        </div>
      </Section>

      <FaqSection faqs={generalFaqs} />
      <CtaBand />
    </>
  )
}
