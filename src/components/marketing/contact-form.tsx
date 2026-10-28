"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, CircleCheck, Loader2 } from "lucide-react"

import { contactSchema, interestOptions, sizeOptions, type ContactValues } from "@/lib/validations"
import { submitContact } from "@/app/(marketing)/contact/actions"
import { Button } from "@/components/ui/button"
import { Input, Select, Textarea } from "@/components/ui/input"
import { FieldMessage, Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

export function ContactForm() {
  const searchParams = useSearchParams()
  const requested = searchParams.get("interest")
  const defaultInterest = interestOptions.some((o) => o.value === requested) ? requested! : "floorcheck"
  const [sent, setSent] = React.useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { interest: defaultInterest, size: undefined, message: "" },
  })

  async function onSubmit(values: ContactValues) {
    const result = await submitContact(values)
    if (!result.ok) {
      toast.error("We couldn't send that.", { description: result.error })
      return
    }
    toast.success("Request received.", { description: "An engineer will call or WhatsApp you within one working day." })
    reset()
    setSent(true)
  }

  return (
    <div className="relative rounded-[2rem] border bg-card p-6 shadow-[0_30px_80px_-40px_var(--glow)] sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[32rem] flex-col items-center justify-center text-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-success/15 text-success">
              <CircleCheck className="size-8" />
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">Thank you — we&apos;re on it.</h2>
            <p className="mt-3 max-w-sm text-muted-foreground">
              An engineer will contact you within one working day to arrange your FloorCheck.
            </p>
            <Button variant="outline" className="mt-8" onClick={() => setSent(false)}>
              Send another request
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-5 sm:grid-cols-2"
          >
            <Field label="Your name" error={errors.name?.message} id="name">
              <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
            </Field>
            <Field label="Company / factory" error={errors.company?.message} id="company">
              <Input id="company" autoComplete="organization" aria-invalid={!!errors.company} {...register("company")} />
            </Field>
            <Field label="Email" error={errors.email?.message} id="email">
              <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
            </Field>
            <Field label="Phone / WhatsApp" error={errors.phone?.message} id="phone">
              <Input id="phone" type="tel" autoComplete="tel" placeholder="026 000 0000" aria-invalid={!!errors.phone} {...register("phone")} />
            </Field>
            <Field label="Team size" error={errors.size?.message} id="size">
              <Select id="size" defaultValue="" aria-invalid={!!errors.size} {...register("size")}>
                <option value="" disabled>
                  Choose…
                </option>
                {sizeOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="I'm interested in" error={errors.interest?.message} id="interest">
              <Select id="interest" aria-invalid={!!errors.interest} {...register("interest")}>
                {interestOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Tell us about your floor (optional)" error={errors.message?.message} id="message" className="sm:col-span-2">
              <Textarea
                id="message"
                placeholder="What do you make, and what's slowing you down? Late orders, crowded floor, a machine always waiting…"
                aria-invalid={!!errors.message}
                {...register("message")}
              />
            </Field>
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-muted-foreground">
                We reply within one working day. Your details are only used to arrange your visit.
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting} className="shrink-0">
                {isSubmitting ? <Loader2 className="animate-spin" /> : null}
                {isSubmitting ? "Sending…" : "Book my FloorCheck"}
                {!isSubmitting && <ArrowRight className="transition-transform group-hover/button:translate-x-1" />}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string
  label: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">{children}</div>
      <FieldMessage className="mt-1.5">{error}</FieldMessage>
    </div>
  )
}

export function ContactFormSkeleton() {
  return <div className="min-h-[36rem] animate-pulse rounded-[2rem] border bg-card" />
}
