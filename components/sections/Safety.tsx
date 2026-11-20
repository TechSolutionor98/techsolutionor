"use client";

import { motion } from "motion/react";
import { Check, OctagonX, Timer } from "lucide-react";
import { Container, CountUp, IllustrationNote, Reveal, SectionHeading, easeOut } from "@/components/ui";
import { campaignStats } from "@/components/mock/DashboardMock";

const controls = [
  { title: "A random gap between messages", text: "At least 60 seconds by default." },
  { title: "A daily limit per number", text: "100 messages a day by default." },
  { title: "Sending hours", text: "Messages only go out during the daytime." },
  { title: "Gradual ramp-up", text: "New numbers start slow, with warm-up built in." },
  { title: "Optional typing indicator", text: "Shown before each message, so sending feels human." },
  { title: "Varied wording", text: "Spin text and AI rewriting, so messages aren't identical." },
  { title: "Number check", text: "Each number is checked to be on WhatsApp before sending." },
  { title: "Automatic opt-out", text: "Anyone who replies \"stop\" or \"unsubscribe\" is never messaged again." },
  { title: "Pauses on reply", text: "Automation stops the moment someone replies." },
  { title: "Emergency stop", text: "For one business, or the whole platform, in one click." },
];

// Irregular gaps, in seconds, between the messages on the pacing lane.
const gaps = [64, 91, 72, 118, 67, 85];

/** Campaign progress mock: counts, a daily-limit ring and a lane showing uneven gaps. */
function PacePanel() {
  const total = gaps.reduce((a, b) => a + b, 0);
  const starts = gaps.map((_, i) => gaps.slice(0, i).reduce((a, b) => a + b, 0));
  const circumference = 2 * Math.PI * 42;

  return (
    <figure>
      <div
        role="img"
        aria-label="Illustration of campaign progress: 86 delivered, 61 read, 14 replied, 2 failed, with 86 of the 100 daily limit used and messages sent at uneven gaps of at least 60 seconds."
        className="rounded-3xl bg-white p-5 shadow-lift ring-1 ring-brand-200 sm:p-7"
      >
        <div aria-hidden>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-lg font-bold text-ink">Campaign progress</p>
              <p className="text-sm text-muted">Weekend offer · running</p>
            </div>
            <span className="flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 ring-1 ring-inset ring-rose-200">
              <OctagonX className="size-4" /> Emergency stop
            </span>
          </div>

          <div className="mt-6 grid grid-cols-[auto_1fr] items-center gap-6">
            <div className="relative size-28 sm:size-32">
              <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" strokeWidth="9" className="stroke-brand-100" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  strokeWidth="9"
                  strokeLinecap="round"
                  className="stroke-brand-600"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: circumference * (1 - 0.86) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 grid place-content-center text-center">
                <p className="font-display text-2xl font-extrabold leading-none text-ink">
                  <CountUp to={86} />
                </p>
                <p className="text-xs text-muted">of 100 today</p>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
              {campaignStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="flex items-center gap-1.5 text-xs text-muted">
                    <span className={`size-2 rounded-full ${stat.bar}`} />
                    {stat.label}
                  </dt>
                  <dd className={`font-display text-2xl font-extrabold ${stat.tone}`}>
                    <CountUp to={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-7 rounded-2xl bg-brand-50 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Timer className="size-4 text-brand-700" /> Sending pace: a different gap every time
            </p>
            <div className="relative mt-8 h-1.5 rounded-full bg-brand-200">
              {starts.map((start, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2"
                  style={{ left: `${(start / total) * 100}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.28, type: "spring", stiffness: 320, damping: 16 }}
                >
                  <span className="absolute -top-2 block size-4 -translate-x-1/2 rounded-full border-[3px] border-white bg-brand-600 shadow-sm" />
                  <span className="absolute -top-8 left-1 whitespace-nowrap text-[0.7rem] font-semibold text-brand-800">
                    {gaps[i]}s
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 flex justify-between text-xs text-muted-strong">
              <span>Sending hours open</span>
              <span>Never less than 60s apart</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption>
        <IllustrationNote className="mt-4" />
      </figcaption>
    </figure>
  );
}

export function Safety() {
  return (
    <section id="safety" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          title="Built to protect your number"
          lead="Safety controls run on every send. They lower the risk, for people who expect to hear from your business."
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <motion.ul
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -120px 0px" }}
            transition={{ staggerChildren: 0.07 }}
            className="grid gap-x-8 gap-y-5 sm:grid-cols-2"
          >
            {controls.map((control) => (
              <motion.li
                key={control.title}
                variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="flex gap-3"
              >
                <motion.span
                  variants={{ hidden: { scale: 0 }, shown: { scale: 1 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-700 text-white"
                >
                  <Check className="size-4" strokeWidth={3} aria-hidden />
                </motion.span>
                <div>
                  <h3 className="font-semibold text-ink">{control.title}</h3>
                  <p className="mt-0.5 text-[0.95rem] leading-relaxed text-muted">{control.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <div className="lg:sticky lg:top-28">
            <Reveal>
              <PacePanel />
            </Reveal>
          </div>
        </div>

        <Reveal className="mx-auto mt-14 max-w-3xl rounded-2xl bg-brand-50 p-6 text-center ring-1 ring-inset ring-brand-200">
          <p className="leading-relaxed text-muted-strong">
            Any automation on WhatsApp carries some risk, and no tool can honestly promise zero risk. Tech Watsapi is
            built to lower it. Message people who expect to hear from you, and warm up new numbers first.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
