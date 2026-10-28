"use client"

import * as React from "react"
import { ArrowRight, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/toast"

export function NewsletterForm({ className }: { className?: string }) {
  const [pending, setPending] = React.useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = new FormData(form).get("email")?.toString() ?? ""
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.")
      return
    }
    setPending(true)
    // TODO: connect to the mailing list provider.
    await new Promise((resolve) => setTimeout(resolve, 700))
    setPending(false)
    form.reset()
    toast.success("You're on the list.", { description: "Practical factory-flow notes, about once a month." })
  }

  return (
    <form onSubmit={onSubmit} className={cn("relative", className)} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@factory.com"
        className="h-12 w-full rounded-full border border-ink-border bg-ink-card pr-14 pl-5 text-sm text-ink-foreground outline-none placeholder:text-ink-muted/70 focus-visible:border-ink-highlight focus-visible:ring-4 focus-visible:ring-ink-highlight/20"
      />
      <button
        type="submit"
        disabled={pending}
        aria-label="Subscribe"
        className="absolute top-1.5 right-1.5 grid size-9 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
      </button>
    </form>
  )
}
