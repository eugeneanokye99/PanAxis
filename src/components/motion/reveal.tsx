"use client"

import * as React from "react"
import { motion, type HTMLMotionProps, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  y?: number
  x?: number
  blur?: boolean
}

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({ delay = 0, y = 28, x = 0, blur = false, className, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const containerVariants: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}

export function Stagger({
  stagger = 0.08,
  className,
  children,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={containerVariants}
      custom={stagger}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ className, ...props }: HTMLMotionProps<"div">) {
  return <motion.div variants={itemVariants} className={cn(className)} {...props} />
}
