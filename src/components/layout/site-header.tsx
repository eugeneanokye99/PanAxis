"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { ArrowRight, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { mainNav, siteConfig } from "@/content/site"
import { services } from "@/content/services"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/logo"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)

  // Solid on scroll, tuck away when scrolling down, return when scrolling up.
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(current > 16)
    setHidden(current > previous && current > 320)
  })

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3"
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center 2xl:max-w-[94rem] justify-between gap-4 rounded-full border px-3 pl-4 transition-[background-color,border-color,box-shadow] duration-500 sm:pl-5",
          scrolled
            ? "border-border bg-background/80 shadow-[0_10px_40px_-20px_var(--glow)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.href === "/services" ? (
              <ServicesMenu key={item.href} active={pathname.startsWith("/services")} />
            ) : (
              <NavLink key={item.href} href={item.href} active={pathname.startsWith(item.href)}>
                {item.title}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">
              Free FloorCheck
              <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-foreground",
        active ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      {children}
    </Link>
  )
}

function ServicesMenu({ active }: { active: boolean }) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const panelId = React.useId()

  const show = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  // Close whenever the route changes.
  const [lastPath, setLastPath] = React.useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <div
      className="relative"
      onPointerEnter={show}
      onPointerLeave={hide}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false)
      }}
      onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative inline-flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-foreground",
          active || open ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {active && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        Services
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 w-[min(760px,90vw)] -translate-x-1/2 pt-4"
          >
            <div className="grid grid-cols-[1fr_15rem] gap-2 overflow-hidden rounded-3xl border bg-popover p-2 text-popover-foreground shadow-2xl">
              <ul className="grid grid-cols-2 gap-1 p-1">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group/item flex gap-3 rounded-2xl p-3 transition-colors hover:bg-accent focus-visible:bg-accent"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                        <service.icon className="size-4.5" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold">{service.title}</span>
                        <span className="mt-0.5 line-clamp-2 block text-xs leading-5 text-muted-foreground">
                          {service.short}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="group/promo relative flex flex-col justify-between overflow-hidden rounded-2xl bg-ink p-5 text-ink-foreground"
              >
                <div className="absolute inset-0 bg-grid opacity-60" />
                <div className="relative">
                  <p className="text-[10px] font-bold tracking-[0.25em] text-ink-highlight">START HERE</p>
                  <p className="mt-3 text-lg leading-snug font-bold">{siteConfig.offer.title}</p>
                  <p className="mt-2 text-xs leading-5 text-ink-muted">{siteConfig.offer.summary}</p>
                </div>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-highlight">
                  Book now
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/promo:translate-x-1" />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
