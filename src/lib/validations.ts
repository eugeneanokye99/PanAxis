import { z } from "zod"

export const interestOptions = [
  { value: "floorcheck", label: "Free FloorCheck" },
  { value: "bottleneck-diagnosis", label: "Bottleneck diagnosis" },
  { value: "layout-redesign", label: "Layout redesign" },
  { value: "simulation", label: "Simulation & testing" },
  { value: "move-planning", label: "Move planning" },
  { value: "redesign", label: "Full floor redesign (A–D)" },
  { value: "partnership", label: "Multi-site partnership" },
  { value: "other", label: "Something else" },
] as const

export const sizeOptions = ["1–20 people", "21–50 people", "51–200 people", "200+ people"] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name."),
  company: z.string().trim().min(2, "Which factory or company is this for?"),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{7,20}$/, "Please enter a valid phone or WhatsApp number."),
  size: z.enum(sizeOptions, { error: "Please choose a team size." }),
  interest: z.enum(interestOptions.map((o) => o.value) as [string, ...string[]], {
    error: "Please choose what you're interested in.",
  }),
  message: z.string().trim().max(2000, "Please keep it under 2,000 characters.").optional(),
})

export type ContactValues = z.infer<typeof contactSchema>
