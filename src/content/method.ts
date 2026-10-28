export type Session = {
  letter: "A" | "B" | "C" | "D"
  title: string
  summary: string
  description: string
  checklist: string[]
}

export const sessions: Session[] = [
  {
    letter: "A",
    title: "Get the facts right",
    summary: "Measure how your factory really works today.",
    description:
      "Our engineer walks your floor, times every machine, and traces how each part moves. We also mark what cannot move — pillars, doors and loading docks.",
    checklist: [
      "Cycle times, breakdowns, changeovers",
      "Demand and target output",
      "Every product route traced",
      "Building limits: pillars, doors, exits",
      "What cannot move",
    ],
  },
  {
    letter: "B",
    title: "Design the options",
    summary: "Two or three layouts built around your priorities.",
    description:
      "We work out which areas belong close together, and draw two or three new layouts. Each one is scored on what matters to you: space, safety and smooth flow.",
    checklist: [
      "Space for every area, plus room to grow",
      "Material handling chosen: trolley, forklift, conveyor",
      "Must-have rules checked: safety, exits, sector rules",
      "Scored on your priorities",
    ],
  },
  {
    letter: "C",
    title: "Test before you move",
    summary: "A computer model proves which option works best.",
    description:
      "Before a single machine moves, we test every layout in a computer model of your factory. It runs a full shift in seconds, for every option.",
    checklist: [
      "Model checked against real output",
      "Full 8-hour shift simulated per option",
      "Bottlenecks tracked minute by minute",
      "Output, travel and utilisation compared",
    ],
  },
  {
    letter: "D",
    title: "Finish and hand over",
    summary: "Final drawing, move plan, and proof it worked.",
    description:
      "The best layout becomes a move plan, done in phases so production keeps running. Then we come back and measure the result.",
    checklist: [
      "Final layout drawing",
      "Phased move plan — production keeps running",
      "Report and live presentation to your team",
      "Re-measured 4–8 weeks after the move",
    ],
  },
]

export const layoutOptions = [
  { name: "Option 1 · Straight line", score: 68 },
  { name: "Option 2 · U-shape", score: 84, shortlisted: true },
  { name: "Option 3 · L-shape", score: 61 },
]

export const movePhases = [
  { phase: "Phase 1", when: "Weekend 1", what: "Cutting, turning" },
  { phase: "Phase 2", when: "Weekend 2", what: "Milling, welding" },
  { phase: "Phase 3", when: "Weekend 3", what: "Packing, walkways" },
]

export const simulation = {
  shiftMinutes: 480,
  current: { label: "Current layout", output: 60, bottleneck: "Forklift", utilisation: 100 },
  proposed: { label: "New layout (option 2)", output: 75, bottleneck: "Milling", utilisation: 93 },
}
