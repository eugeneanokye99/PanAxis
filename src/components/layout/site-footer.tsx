import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"

import { footerNav, siteConfig } from "@/content/site"
import { Logo } from "@/components/layout/logo"
import { CurrentYear } from "@/components/layout/current-year"
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/icons"
import { NewsletterForm } from "@/components/marketing/newsletter-form"
import { Heartbeat } from "@/components/motion/heartbeat"

const socials = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: LinkedInIcon },
  { label: "Instagram", href: siteConfig.socials.instagram, icon: InstagramIcon },
  { label: "WhatsApp", href: siteConfig.socials.whatsapp, icon: WhatsAppIcon },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative container-page">
        <div className="grid gap-10 border-b border-ink-border py-16 md:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Heartbeat className="mb-8 h-8 w-48 text-ink-success" />
            <p className="font-display text-5xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl">
              Get more out of the floor <span className="text-ink-highlight">you already have.</span>
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full bg-primary py-3 pr-3 pl-7 text-lg font-bold text-primary-foreground transition-shadow hover:shadow-[0_20px_60px_-20px_var(--glow)]"
            >
              Book a free FloorCheck
              <span className="grid size-11 place-items-center rounded-full bg-ink text-ink-highlight transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
            <p className="mt-4 text-sm text-ink-muted">{siteConfig.offer.summary}</p>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <div className="space-y-5">
            <Logo tone="ink" />
            <p className="max-w-xs text-sm leading-6 text-ink-muted">
              Doctors for factories. We don&apos;t sell machines — we help you get more from the ones you already have.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={siteConfig.phone.href} className="inline-flex items-center gap-3 transition-colors hover:text-ink-highlight">
                  <Phone className="size-4 text-ink-highlight" />
                  {siteConfig.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-3 transition-colors hover:text-ink-highlight">
                  <Mail className="size-4 text-ink-highlight" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-3">
                <MapPin className="size-4 text-ink-highlight" />
                {siteConfig.location}
              </li>
            </ul>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-bold tracking-[0.25em] text-ink-highlight">{group.title.toUpperCase()}</p>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-muted transition-colors hover:text-ink-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-ink-highlight">FLOOR NOTES</p>
            <p className="mt-5 text-sm leading-6 text-ink-muted">
              Short, practical notes on flow, layout and getting more from your factory floor.
            </p>
            <NewsletterForm className="mt-5" />
            <ul className="mt-6 flex gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-full border border-ink-border text-ink-muted transition-colors hover:border-ink-highlight hover:text-ink-highlight"
                  >
                    <social.icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink-border py-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.legalName}. All rights reserved.
          </p>
          <p>{siteConfig.location} · Results vary by factory.</p>
        </div>
      </div>
    </footer>
  )
}
