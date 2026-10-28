export type Plan = {
  name: string
  price: string
  cadence?: string
  description: string
  cta: { label: string; href: string }
  features: string[]
  featured?: boolean
}

export const plans: Plan[] = [
  {
    name: "FloorCheck",
    price: "Free",
    cadence: "1 hour on site",
    description: "An honest first opinion on whether your layout is holding you back.",
    cta: { label: "Book a FloorCheck", href: "/contact?interest=floorcheck" },
    features: ["Walk-through with your team", "Quick flow sketch", "Top three observations", "No obligation"],
  },
  {
    name: "Floor Redesign",
    price: "Fixed quote",
    cadence: "4 sessions · 4–8 weeks",
    description: "The full method: facts, options, simulation and a phased move plan.",
    cta: { label: "Request a quote", href: "/contact?interest=redesign" },
    features: [
      "Everything in FloorCheck",
      "Measured current-state map",
      "2–3 scored layout options",
      "Computer simulation of every option",
      "Final drawing & phased move plan",
      "Report and live team presentation",
    ],
    featured: true,
  },
  {
    name: "Partnership",
    price: "Custom",
    cadence: "Multi-site or ongoing",
    description: "For groups with several plants or continuous improvement goals.",
    cta: { label: "Talk to us", href: "/contact?interest=partnership" },
    features: [
      "Everything in Floor Redesign",
      "Move supervision on site",
      "Re-measurement after every move",
      "Expansion & new-building planning",
      "Priority support",
    ],
  },
]

export const comparison: { feature: string; values: (boolean | string)[] }[] = [
  { feature: "On-site walk-through", values: [true, true, true] },
  { feature: "Time studies & route tracing", values: [false, true, true] },
  { feature: "Layout options", values: [false, "2–3", "Unlimited"] },
  { feature: "Computer simulation", values: [false, true, true] },
  { feature: "Phased move plan", values: [false, true, true] },
  { feature: "Move supervision", values: [false, "Optional", true] },
  { feature: "Re-measurement after move", values: [false, "1×", "Every move"] },
  { feature: "Multi-site", values: [false, false, true] },
]
