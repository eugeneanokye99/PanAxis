export const siteConfig = {
  name: "Pan Axis",
  legalName: "Pan Axis Industrial Solutions",
  tagline: "Doctors for factories",
  promise: "Get more out of the floor you already have.",
  description:
    "Pan Axis redesigns factory floors in Ghana and beyond. We measure how your work really moves, design better layouts, test them in a computer model, and help you move — without buying a single new machine.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://panaxis.com",
  location: "Accra, Ghana",
  phone: {
    display: "026 717 8863",
    href: "tel:+233267178863",
    whatsapp: "https://wa.me/233267178863",
  },
  email: "hello@panaxis.com",
  hours: "Mon – Fri, 8:00 – 17:00 GMT",
  offer: {
    name: "FloorCheck",
    title: "Book your free factory check-up",
    summary: "A one-hour walk through your factory and an honest first opinion. No obligation.",
  },
  socials: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    whatsapp: "https://wa.me/233267178863",
  },
} as const

export type NavItem = {
  title: string
  href: string
  description?: string
}

export const mainNav: NavItem[] = [
  { title: "Services", href: "/services" },
  { title: "How it works", href: "/how-it-works" },
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
  { title: "Insights", href: "/blog" },
]

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { title: "Free FloorCheck", href: "/services/floorcheck" },
      { title: "Layout redesign", href: "/services/layout-redesign" },
      { title: "Bottleneck diagnosis", href: "/services/bottleneck-diagnosis" },
      { title: "Simulation & testing", href: "/services/simulation" },
      { title: "Move planning", href: "/services/move-planning" },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About us", href: "/about" },
      { title: "How it works", href: "/how-it-works" },
      { title: "Pricing", href: "/pricing" },
      { title: "Insights", href: "/blog" },
      { title: "Contact", href: "/contact" },
    ],
  },
]
