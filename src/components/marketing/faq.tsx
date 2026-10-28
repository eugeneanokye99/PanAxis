import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { Faq } from "@/content/faqs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Section, SectionHeading } from "@/components/marketing/section"
import { Reveal } from "@/components/motion/reveal"

export function FaqSection({
  faqs,
  eyebrow = "Questions",
  title = "Straight answers",
}: {
  faqs: Faq[]
  eyebrow?: string
  title?: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} description="Can't find what you're looking for? Ask us directly — we answer every message." />
          <Reveal delay={0.2} className="mt-8">
            <Button asChild variant="outline">
              <Link href="/contact">
                Ask a question
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Accordion defaultValue={["faq-0"]}>
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  )
}
