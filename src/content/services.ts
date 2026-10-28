import {
  Activity,
  ClipboardCheck,
  Cpu,
  LayoutDashboard,
  Route,
  type LucideIcon,
} from "lucide-react"

export type Service = {
  slug: string
  icon: LucideIcon
  title: string
  short: string
  headline: string
  intro: string
  problems: string[]
  features: { title: string; description: string }[]
  deliverables: string[]
  duration: string
  faqs: { question: string; answer: string }[]
}

export const services: Service[] = [
  {
    slug: "floorcheck",
    icon: ClipboardCheck,
    title: "Free FloorCheck",
    short: "A one-hour walk through your factory and an honest first opinion.",
    headline: "An honest first opinion, in one hour.",
    intro:
      "Every engagement starts the same way: one of our engineers walks your floor with you, watches how work moves, and tells you plainly whether your layout is holding you back. No obligation, no sales pitch.",
    problems: [
      "You suspect the layout is slowing you down but cannot prove it",
      "Orders are late even though machines look busy",
      "You are about to expand, buy equipment or move building",
    ],
    features: [
      {
        title: "On-site walk-through",
        description: "We follow your products from raw stock to dispatch and note every stop, wait and backtrack.",
      },
      {
        title: "Quick flow sketch",
        description: "A rough map of how material really travels today, with the obvious trouble spots marked.",
      },
      {
        title: "Plain-language verdict",
        description: "Is the layout the cause? If not, we say so — and point you to what is.",
      },
    ],
    deliverables: ["Walk-through with your team", "Hand-drawn flow sketch", "Top three observations", "Recommended next step"],
    duration: "1 hour on site",
    faqs: [
      {
        question: "Is the FloorCheck really free?",
        answer: "Yes. It costs you one hour of your time. If we cannot help, we will tell you on the day.",
      },
      {
        question: "Do we need to stop production?",
        answer: "No. We want to see the factory working normally — that is the whole point.",
      },
    ],
  },
  {
    slug: "bottleneck-diagnosis",
    icon: Activity,
    title: "Bottleneck diagnosis",
    short: "Measure how your factory really works today, and find what is really slowing you down.",
    headline: "Find what is really slowing you down.",
    intro:
      "We build a true, measured picture of your factory: cycle times, breakdowns, changeovers, demand, every product route and every building limit. Then we follow the evidence to the real bottleneck — which is often not where people expect.",
    problems: [
      "Machines sit idle waiting for material",
      "One forklift or one machine is busy all shift",
      "Products travel back and forth across the floor",
    ],
    features: [
      { title: "Time studies", description: "Cycle times, breakdowns and changeovers for every station." },
      { title: "Route tracing", description: "Every product route traced from IN to OUT, in metres." },
      { title: "Constraint mapping", description: "Pillars, doors, exits, loading docks — what cannot move." },
      { title: "Root-cause report", description: "Where work waits, why it waits and what it costs you." },
    ],
    deliverables: ["Measured current-state map", "Route distances per part", "Bottleneck analysis", "Findings presentation"],
    duration: "Session A · 1–2 weeks",
    faqs: [
      {
        question: "What data do you need from us?",
        answer:
          "Whatever you already have — order history, shift patterns, machine lists. We collect the rest ourselves on the floor.",
      },
    ],
  },
  {
    slug: "layout-redesign",
    icon: LayoutDashboard,
    title: "Layout redesign",
    short: "Two or three new layouts built around your building, your process and your priorities.",
    headline: "A better layout, designed around your work.",
    intro:
      "We work out which areas belong close together and which must stay apart, then draw two or three realistic layouts. Each one is scored on what matters to you — space, safety, smooth flow and room to grow.",
    problems: [
      "The floor grew one machine at a time and nobody planned the flow",
      "Walkways are blocked and the floor feels crowded",
      "You need room for new equipment but think you are out of space",
    ],
    features: [
      { title: "Closeness mapping", description: "Which departments must be close, and which must be kept apart." },
      { title: "Two to three options", description: "Straight line, U-shape, L-shape — whatever suits your building." },
      { title: "Material handling", description: "Trolley, forklift or conveyor, chosen for each route." },
      { title: "Scored on your priorities", description: "Safety, exits and sector rules checked before scoring." },
    ],
    deliverables: ["Relationship chart", "2–3 scaled layout options", "Scoring matrix", "Shortlisted option"],
    duration: "Session B · 1–2 weeks",
    faqs: [
      {
        question: "Will we need to buy new machines?",
        answer: "No. We don't sell machines. Our job is to get more from the ones you already have.",
      },
    ],
  },
  {
    slug: "simulation",
    icon: Cpu,
    title: "Simulation & testing",
    short: "A computer model of your factory runs a full shift in seconds, for every option.",
    headline: "Test before anything moves.",
    intro:
      "Before a single machine moves, we test every layout in a computer model of your factory. It runs a full eight-hour shift in seconds, so you see output, waiting and bottlenecks for each option — with your machines and your people.",
    problems: [
      "You cannot afford to get a move wrong",
      "Management wants numbers before approving changes",
      "Previous rearrangements did not deliver what was promised",
    ],
    features: [
      { title: "Calibrated model", description: "Every model is first checked against the real factory's output." },
      { title: "Side-by-side shifts", description: "Current layout versus each new option, minute by minute." },
      { title: "Bottleneck tracking", description: "See exactly where the constraint moves after the change." },
      { title: "Output forecast", description: "Parts per shift, travel per part, utilisation per resource." },
    ],
    deliverables: ["Validated simulation model", "Shift-by-shift comparison", "Bottleneck report", "Recommended layout"],
    duration: "Session C · 1–2 weeks",
    faqs: [
      {
        question: "How accurate is the model?",
        answer:
          "We calibrate it against your factory's real output before testing anything. Results still vary by factory, and we say so.",
      },
    ],
  },
  {
    slug: "move-planning",
    icon: Route,
    title: "Move planning & hand-over",
    short: "The best option becomes a phased move plan — and we come back to prove it worked.",
    headline: "Move step by step. Keep production running.",
    intro:
      "The winning layout becomes a final drawing and a phased move plan, usually done over weekends so production keeps running. After the move we come back, measure again, and show you the before and after.",
    problems: [
      "You cannot stop production to rearrange the floor",
      "Your team needs to understand and own the new layout",
      "You want proof that the change paid off",
    ],
    features: [
      { title: "Final drawings", description: "Scaled layout with walkways, utilities and clearances." },
      { title: "Phased move plan", description: "Which machines move, in which order, on which weekend." },
      { title: "Team hand-over", description: "Report and live presentation to your people." },
      { title: "Re-measurement", description: "We return 4–8 weeks after the move and measure again." },
    ],
    deliverables: ["Final layout drawing", "Phased move schedule", "Report & live presentation", "Before/after measurement"],
    duration: "Session D · plus follow-up at 4–8 weeks",
    faqs: [
      {
        question: "Do you physically move the machines?",
        answer:
          "We plan and supervise the move with your team and your preferred riggers, and stay involved until the new layout is running.",
      },
    ],
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
