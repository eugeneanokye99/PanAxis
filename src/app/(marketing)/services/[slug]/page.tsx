import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CircleCheck, Clock, TriangleAlert } from "lucide-react"

import { getService, services } from "@/content/services"
import { Button } from "@/components/ui/button"
import { CtaBand } from "@/components/marketing/cta-band"
import { FaqSection } from "@/components/marketing/faq"
import { PageHero } from "@/components/marketing/page-hero"
import { Section, SectionHeading } from "@/components/marketing/section"
import { ServiceCard } from "@/components/marketing/service-card"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const index = services.indexOf(service)
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={`Service ${String(index + 1).padStart(2, "0")} · ${service.title}`}
        chapter={String(index + 1).padStart(2, "0")}
        title={[{ text: service.headline }]}
        description={service.intro}
        aside={
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold">
              <Clock className="size-4 text-highlight" />
              {service.duration}
            </span>
            <Button asChild size="lg">
              <Link href={`/contact?interest=${service.slug}`}>
                Book this service
                <ArrowRight />
              </Link>
            </Button>
          </div>
        }
      />

      <Section tone="ink" className="overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative container-page grid gap-14 lg:grid-cols-2">
          <SectionHeading tone="ink" eyebrow="Symptoms" title="You might need this if…" />
          <Stagger className="space-y-4">
            {service.problems.map((problem) => (
              <StaggerItem
                key={problem}
                className="flex items-start gap-4 rounded-2xl border border-ink-border bg-ink-card p-5"
              >
                <TriangleAlert className="mt-0.5 size-5 shrink-0 text-ink-destructive" />
                <p className="text-base font-medium">{problem}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <SectionHeading eyebrow="What we do" title="The treatment, step by step" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((feature, i) => (
              <StaggerItem key={feature.title} className="rounded-3xl border bg-card p-7">
                <span className="font-display text-5xl font-extrabold text-highlight">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="muted" spacing="sm">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Deliverables" title="What you get" />
          <Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-2xl border bg-card px-5 py-4 text-sm font-semibold">
                  <CircleCheck className="size-5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <FaqSection faqs={service.faqs} title={`${service.title}: questions`} />

      <Section spacing="sm">
        <div className="container-page">
          <SectionHeading eyebrow="Related" title="Other parts of the treatment" />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((s) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} index={services.indexOf(s)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
