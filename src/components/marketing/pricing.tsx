import Link from "next/link"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import { comparison, plans } from "@/content/pricing"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

export function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <Stagger className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
      {plans.map((plan) => (
        <StaggerItem key={plan.name}>
          <div
            className={cn(
              "relative flex h-full flex-col rounded-3xl border p-8 transition-transform duration-500 ease-out-expo hover:-translate-y-1",
              plan.featured ? "border-transparent bg-ink text-ink-foreground shadow-2xl lg:-my-4 lg:py-12" : "bg-card",
            )}
          >
            {plan.featured && (
              <>
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-grid opacity-50" />
                  <div className="absolute -top-24 -right-24 size-64 rounded-full bg-glow blur-[80px]" />
                </div>
                <Badge className="absolute -top-3 left-8">Most chosen</Badge>
              </>
            )}
            <div className="relative">
              <p className={cn("text-sm font-bold", plan.featured ? "text-ink-highlight" : "text-highlight")}>{plan.name}</p>
              <p className="mt-4 font-display text-6xl leading-none font-extrabold uppercase">{plan.price}</p>
              {plan.cadence && (
                <p className={cn("mt-2 text-sm", plan.featured ? "text-ink-muted" : "text-muted-foreground")}>
                  {plan.cadence}
                </p>
              )}
              <p className={cn("mt-5 text-sm leading-6", plan.featured ? "text-ink-muted" : "text-muted-foreground")}>
                {plan.description}
              </p>
            </div>
            {!compact && (
              <ul className="relative mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn("mt-0.5 size-4 shrink-0", plan.featured ? "text-ink-success" : "text-success")}
                      strokeWidth={3}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            <Button
              asChild
              size="lg"
              variant={plan.featured ? "default" : "outline"}
              className={cn("relative w-full", compact ? "mt-8" : "mt-10")}
            >
              <Link href={plan.cta.href}>{plan.cta.label}</Link>
            </Button>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

export function ComparisonTable() {
  return (
    <Reveal>
      <div className="overflow-x-auto rounded-3xl border bg-card" data-lenis-prevent>
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">What each engagement includes</caption>
          <thead>
            <tr className="border-b bg-muted/60">
              <th scope="col" className="px-6 py-5 font-bold">
                Included
              </th>
              {plans.map((plan) => (
                <th key={plan.name} scope="col" className={cn("px-6 py-5 text-center font-bold", plan.featured && "text-highlight")}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.feature} className="border-b last:border-0">
                <th scope="row" className="px-6 py-4 font-medium">
                  {row.feature}
                </th>
                {row.values.map((value, i) => (
                  <td key={i} className={cn("px-6 py-4 text-center", plans[i].featured && "bg-primary/5")}>
                    {value === true ? (
                      <Check className="mx-auto size-4 text-success" strokeWidth={3} aria-label="Included" />
                    ) : value === false ? (
                      <Minus className="mx-auto size-4 text-muted-foreground/50" aria-label="Not included" />
                    ) : (
                      <span className="font-semibold">{value}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}
