import {
  Armchair,
  Beef,
  Boxes,
  Factory,
  Hammer,
  Package,
  Shirt,
  Wrench,
} from "lucide-react"

export const symptoms = ["Late orders", "Idle machines", "Crowded floor", "Products going back and forth"]

export const industries = [
  { label: "Metal fabrication", icon: Wrench },
  { label: "Food & beverage", icon: Beef },
  { label: "Plastics & packaging", icon: Package },
  { label: "Garments & textiles", icon: Shirt },
  { label: "Furniture & wood", icon: Armchair },
  { label: "Building materials", icon: Hammer },
  { label: "Warehousing", icon: Boxes },
  { label: "General assembly", icon: Factory },
]

export type StoryStep = {
  id: "checkup" | "diagnosis" | "treatment" | "recovery"
  number: string
  label: string
  title: string
  body: string
  points: string[]
}

export const storySteps: StoryStep[] = [
  {
    id: "checkup",
    number: "01",
    label: "Check-up",
    title: "Walk the floor",
    body: "First, a check-up. We walk your floor, watch how the work moves, and time every step.",
    points: ["How far products travel", "How long each step takes", "Where work waits"],
  },
  {
    id: "diagnosis",
    number: "02",
    label: "Diagnosis",
    title: "Find the cause",
    body: "Then, the diagnosis. We find what is really slowing you down.",
    points: ["Everything waits for one forklift", "Products travel too far", "The layout is the cause"],
  },
  {
    id: "treatment",
    number: "03",
    label: "Treatment",
    title: "Design & test",
    body: "Next, the treatment. We design a better layout, and test it on the computer before anything moves.",
    points: ["A better layout, designed around your work", "Tested on computer first", "Same machines, same people"],
  },
  {
    id: "recovery",
    number: "04",
    label: "Recovery",
    title: "Move & measure",
    body: "Finally, recovery. We help you make the changes step by step, and check the results.",
    points: ["Phase 1 — move a few machines", "Phase 2 — move the next group", "Phase 3 — finish and tidy up"],
  },
]

export const results = [
  { value: 68.7, suffix: "%", label: "less material travel" },
  { value: 38.75, suffix: "%", label: "lower handling cost" },
  { value: 36.39, suffix: "%", label: "more output" },
]

export const resultsSource =
  "Published factory redesign studies report up to these figures. Sources: published case studies (Ethiopia 2025, Bangladesh 2014, Peru 2025). Results vary by factory."

export const caseStudy = {
  eyebrow: "Example factory · illustrative model",
  title: "60 → 75 parts per shift",
  summary:
    "Same machines. Same people. A metalworking floor where every part travelled 191 m and doubled back across the factory — and one forklift was busy 100% of the shift.",
  rows: [
    { label: "Parts per shift", before: "60", after: "75" },
    { label: "Forklift travel per part", before: "336 m", after: "196 m" },
    { label: "Material route per part", before: "191 m", after: "80 m" },
  ],
  highlight: "+25% output",
  note: "Illustrative simulation of an example factory. Every model is first checked against the real factory's output.",
}

export const testimonials = [
  // PLACEHOLDER — replace with real, approved client quotes before launch.
  {
    quote:
      "We thought we needed another machine. Pan Axis showed us the machine was fine — it was waiting for the forklift. We moved three stations over two weekends and the backlog was gone.",
    name: "Operations Manager",
    company: "Metal fabrication, Tema",
  },
  {
    quote:
      "What convinced our directors was the simulation. We watched our current shift and the new layout side by side before we spent a cedi on moving anything.",
    name: "Plant Director",
    company: "Plastics & packaging, Accra",
  },
  {
    quote:
      "They never once tried to sell us equipment. They measured, they listened to our team, and they came back after the move to prove it worked.",
    name: "Managing Director",
    company: "Food processing, Kumasi",
  },
]
