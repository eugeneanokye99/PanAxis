"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CircleCheck } from "lucide-react"

import { sessions } from "@/content/method"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SessionVisual } from "@/components/marketing/method-visuals"

/** "Four sessions. One standard method." — the A–D tabs on the home page. */
export function MethodTabs() {
  const [value, setValue] = React.useState<string>("A")

  return (
    <Tabs defaultValue="A" value={value} onValueChange={setValue} className="gap-10">
      <TabsList className="mx-auto max-w-full overflow-x-auto">
        {sessions.map((session) => (
          <TabsTrigger key={session.letter} value={session.letter} className="px-3 sm:px-5">
            <span className="grid size-5 place-items-center rounded-md bg-primary text-[11px] font-extrabold text-primary-foreground">
              {session.letter}
            </span>
            <span className="hidden sm:inline">{session.title}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {sessions.map((session) => {
        return (
          <TabsContent key={session.letter} value={session.letter}>
            <AnimatePresence mode="wait">
              <motion.div
                key={session.letter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
              >
                <div>
                  <p className="text-xs font-bold tracking-[0.28em] text-highlight">SESSION {session.letter}</p>
                  <h3 className="mt-3 font-display text-5xl leading-[0.9] font-extrabold uppercase sm:text-6xl">
                    {session.title}
                  </h3>
                  <p className="mt-5 text-lg leading-8 text-muted-foreground">{session.description}</p>
                  <ul className="mt-6 space-y-3">
                    {session.checklist.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                        className="flex items-start gap-3 text-sm font-medium"
                      >
                        <CircleCheck className="mt-0.5 size-4.5 shrink-0 text-success" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[2rem] bg-ink p-3 sm:p-4">
                  <SessionVisual letter={session.letter} />
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
