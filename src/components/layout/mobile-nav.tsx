"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { ArrowUpRight, Menu, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { mainNav, siteConfig } from "@/content/site"
import { services } from "@/content/services"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LogoMark } from "@/components/layout/logo"
import { WhatsAppIcon } from "@/components/icons"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const [lastPath, setLastPath] = React.useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  const links = [{ title: "Home", href: "/" }, ...mainNav, { title: "Contact", href: "/contact" }]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex items-center gap-3 border-b px-6 py-5">
          <LogoMark />
          <SheetTitle className="tracking-[0.2em]">PAN AXIS</SheetTitle>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-6 py-6">
          <ul className="space-y-1">
            {links.map((item, i) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center justify-between border-b border-border/60 py-4 font-display text-4xl font-extrabold tracking-tight uppercase transition-colors",
                      active ? "text-highlight" : "text-foreground hover:text-highlight",
                    )}
                  >
                    {item.title}
                    <ArrowUpRight className="size-6 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </motion.li>
              )
            })}
          </ul>

          <p className="mt-10 text-xs font-bold tracking-[0.25em] text-muted-foreground">SERVICES</p>
          <ul className="mt-3 grid grid-cols-1 gap-1">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-3 rounded-xl py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  <service.icon className="size-4 text-highlight" />
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-2 border-t p-6">
          <Button asChild size="lg">
            <a href={siteConfig.phone.whatsapp} target="_blank" rel="noreferrer">
              <WhatsAppIcon className="size-4" />
              WhatsApp {siteConfig.phone.display}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={siteConfig.phone.href}>
              <Phone />
              Call us
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
