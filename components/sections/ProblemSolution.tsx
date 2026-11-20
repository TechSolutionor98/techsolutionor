"use client";

import { motion } from "motion/react";
import { ArrowRight, Check, CircleAlert } from "lucide-react";
import { Container, SectionHeading, easeOut } from "@/components/ui";

const rows = [
  {
    problem: "Customers ask the same product questions all day, and slow replies lose sales.",
    solution: "The AI answers instantly from your real catalog, with prices, stock and the right link.",
  },
  {
    problem: "Sending campaigns by hand is slow, and sending too fast puts your number at risk.",
    solution: "Paced, personalised campaigns with daily limits, sending hours and warm-up built in.",
  },
  {
    problem: "Several people and several numbers make WhatsApp messy.",
    solution: "One shared inbox, several numbers, and team access you control page by page.",
  },
];

export function ProblemSolution() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="Three things that slow WhatsApp sales down"
          lead="And how Tech Watsapi solves each one."
        />

        <ul className="mt-14 space-y-5">
          {rows.map((row, i) => (
            <motion.li
              key={row.problem}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ staggerChildren: 0.18, delayChildren: i * 0.05 }}
              className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-5"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, x: -36 }, shown: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.65, ease: easeOut }}
                className="flex gap-4 rounded-2xl bg-slate-50 p-6 ring-1 ring-inset ring-slate-200/70"
              >
                <CircleAlert className="mt-0.5 size-6 shrink-0 text-slate-400" aria-hidden />
                <p className="text-lg leading-relaxed text-muted-strong">
                  <span className="sr-only">Problem: </span>
                  {row.problem}
                </p>
              </motion.div>

              <motion.div
                aria-hidden
                variants={{ hidden: { opacity: 0, scale: 0.4 }, shown: { opacity: 1, scale: 1 } }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="mx-auto grid size-11 shrink-0 place-items-center self-center rounded-full bg-brand-700 text-white shadow-soft"
              >
                <ArrowRight className="size-5 rotate-90 md:rotate-0" />
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, x: 36 }, shown: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.65, ease: easeOut }}
                className="flex gap-4 rounded-2xl bg-brand-100 p-6 shadow-soft ring-1 ring-inset ring-brand-200"
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-700 text-white">
                  <Check className="size-4" strokeWidth={3} aria-hidden />
                </span>
                <p className="text-lg font-medium leading-relaxed text-ink">
                  <span className="sr-only">Solution: </span>
                  {row.solution}
                </p>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
