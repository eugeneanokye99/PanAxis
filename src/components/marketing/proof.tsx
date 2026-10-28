import { Quote } from "lucide-react"

import { caseStudy, industries, results, resultsSource, testimonials } from "@/content/home"
import { Badge } from "@/components/ui/badge"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Counter } from "@/components/motion/counter"
import { Marquee } from "@/components/motion/marquee"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

export function IndustriesMarquee() {
  return (
    <section aria-label="Industries we work with" className="border-y bg-card py-8">
      <div className="container-page flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
        <p className="shrink-0 text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
          Built for factories in
        </p>
        <Marquee duration={45} className="w-full">
          {industries.map((industry) => (
            <span
              key={industry.label}
              className="mx-6 inline-flex items-center gap-3 text-lg font-bold whitespace-nowrap text-foreground/70"
            >
              <industry.icon className="size-5 text-highlight" />
              {industry.label}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export function ResultsBand() {
  return (
    <Section tone="ink" className="overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-y-0 left-0 w-1.5 bg-ink-success" />
      <div className="relative container-page">
        <SectionHeading
          tone="ink"
          align="center"
          eyebrow="Published factory redesign studies report up to"
          title="The floor you have is worth more than you think."
        />
        <Stagger className="mt-16 grid gap-10 sm:grid-cols-3">
          {results.map((result) => (
            <StaggerItem key={result.label} className="text-center">
              <Counter
                value={result.value}
                suffix={result.suffix}
                decimals={2}
                className="font-display text-7xl font-extrabold text-ink-highlight tabular-nums lg:text-8xl"
              />
              <p className="mt-2 text-base font-semibold text-ink-foreground">{result.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-14 max-w-2xl text-center text-xs leading-5 text-ink-muted">{resultsSource}</p>
        </Reveal>
      </div>
    </Section>
  )
}

export function CaseStudy() {
  return (
    <Section>
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={caseStudy.eyebrow} title={caseStudy.title} description={caseStudy.summary} />
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2">
            <Badge variant="success">{caseStudy.highlight}</Badge>
            <Badge variant="outline">Same machines</Badge>
            <Badge variant="outline">Same people</Badge>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl border bg-card">
            <div className="grid grid-cols-[1fr_auto_auto] gap-6 border-b bg-muted/60 px-6 py-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">
              <span>Measure</span>
              <span>Before</span>
              <span>After</span>
            </div>
            {caseStudy.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_auto_auto] items-center gap-6 border-b px-6 py-5 last:border-0">
                <span className="font-semibold">{row.label}</span>
                <span className="text-muted-foreground tabular-nums line-through decoration-destructive/50">{row.before}</span>
                <span className="font-display text-3xl font-extrabold text-success tabular-nums">{row.after}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{caseStudy.note}</p>
        </Reveal>
      </div>
    </Section>
  )
}

export function Testimonials() {
  return (
    <Section tone="muted">
      <div className="container-page">
        <SectionHeading eyebrow="From the floor" title="What factory managers tell us" align="center" />
        <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.company}>
              <figure className="group flex h-full flex-col justify-between rounded-3xl border bg-card p-7 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_var(--glow)]">
                <div>
                  <Quote className="size-8 text-primary" />
                  <blockquote className="mt-5 text-base leading-7">&ldquo;{t.quote}&rdquo;</blockquote>
                </div>
                <figcaption className="mt-8 flex items-center gap-3 border-t pt-5">
                  <span className="grid size-10 place-items-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                    {t.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.company}</span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
