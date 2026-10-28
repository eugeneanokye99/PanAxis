"use server"

import { contactSchema, type ContactValues } from "@/lib/validations"

export type ContactResult = { ok: true } | { ok: false; error: string }

export async function submitContact(values: ContactValues): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form and try again." }
  }

  // TODO: deliver the enquiry (email provider or CRM). Until then it is only logged on the server.
  console.info("[contact] new FloorCheck enquiry", {
    company: parsed.data.company,
    interest: parsed.data.interest,
    size: parsed.data.size,
  })

  return { ok: true }
}
