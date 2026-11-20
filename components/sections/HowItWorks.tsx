"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Check, FileSpreadsheet, Hand, Tag, Wifi } from "lucide-react";
import { Container, SectionHeading, easeOut } from "@/components/ui";
import { cn } from "@/lib/cn";

const steps = [
  {
    title: "Link your number.",
    text: "Scan a QR code from WhatsApp → Linked Devices. Done in seconds.",
  },
  {
    title: "Add your contacts.",
    text: "Import Excel or CSV, then tag and group them.",
  },
  {
    title: "Create a campaign.",
    text: "Build a personalised message, choose who gets it, and set a safe pace.",
  },
  {
    title: "Let AI handle replies.",
    text: "It answers from your product list, and your team takes over whenever a person is needed.",
  },
];

/* ---------- Step visuals ---------- */

/** Decorative QR-style pattern. It is not a real, scannable code. */
function QrVisual() {
  const size = 21;
  const isFinder = (r: number, c: number) => (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
  const finderOn = (r: number, c: number) => {
    const lr = r % (size - 7);
    const lc = c >= size - 7 ? c - (size - 7) : c;
    const edge = lr === 0 || lr === 6 || lc === 0 || lc === 6;
    const core = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
    return edge || core;
  };
  const cells: { r: number; c: number }[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const on = isFinder(r, c) ? finderOn(r, c) : (r * 7 + c * 13 + ((r * c) % 5) + ((r + c) % 3)) % 3 === 0;
      if (on) cells.push({ r, c });
    }
  }
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="relative rounded-2xl bg-white p-4 shadow-lift ring-1 ring-brand-100">
        <svg viewBox={`0 0 ${size} ${size}`} className="size-44 text-ink sm:size-52" aria-hidden>
          {cells.map(({ r, c }) => (
            <rect key={`${r}-${c}`} x={c} y={r} width={1.02} height={1.02} fill="currentColor" />
          ))}
        </svg>
        <div className="absolute inset-x-3 h-1 animate-scan rounded-full bg-brand-500 shadow-[0_0_18px_4px_rgb(16_185_129/0.55)]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 18 }}
        className="flex items-center gap-2 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white"
      >
        <Wifi className="size-4" aria-hidden /> Number connected
      </motion.div>
    </div>
  );
}

const contactRows = [
  { name: "Sara", tags: ["Customer", "Dubai"] },
  { name: "Omar", tags: ["Lead"] },
  { name: "Lina", tags: ["Customer", "Repeat"] },
  { name: "Yusuf", tags: ["Enquiry"] },
];

function ContactsVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="flex items-center gap-3 self-start rounded-xl bg-white px-4 py-3 shadow-soft ring-1 ring-brand-100"
      >
        <FileSpreadsheet className="size-6 text-brand-700" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-ink">contacts.xlsx</p>
          <p className="text-xs text-muted">Imported</p>
        </div>
        <Check className="ml-2 size-5 text-brand-600" strokeWidth={3} aria-hidden />
      </motion.div>
      <div className="overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-brand-100">
        {contactRows.map((row, i) => (
          <motion.div
            key={row.name}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.14, duration: 0.5, ease: easeOut }}
            className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-0"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
              {row.name[0]}
            </span>
            <span className="text-sm font-semibold text-ink">{row.name}</span>
            <span className="ml-auto flex flex-wrap justify-end gap-1.5">
              {row.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-800 ring-1 ring-inset ring-brand-200"
                >
                  <Tag className="size-3" aria-hidden />
                  {tag}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const greetings = ["Hi", "Hello", "Hey"];
const names = ["Sara", "Omar", "Lina"];

function CampaignVisual() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-brand-100">
        <p className="text-xs font-medium text-muted">Template</p>
        <p className="mt-1 font-mono text-[0.8rem] leading-relaxed text-muted-strong">
          {"{Hi|Hello|Hey} {{first_name}}, our weekend offer is live."}
        </p>
      </div>
      <div className="self-end rounded-2xl rounded-br-md bg-[#d9fdd3] px-4 py-3 shadow-lift">
        <p className="text-xs font-medium text-brand-800">Each person gets their own version</p>
        <p className="mt-1 text-[0.95rem] text-ink">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={tick}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="inline-block font-semibold"
            >
              {greetings[tick % 3]} {names[tick % 3]},
            </motion.span>
          </AnimatePresence>{" "}
          our weekend offer is live.
        </p>
      </div>
      <dl className="grid grid-cols-3 gap-2 text-center">
        {[
          { k: "Gap", v: "60s+" },
          { k: "Daily limit", v: "100" },
          { k: "Hours", v: "Daytime" },
        ].map((item, i) => (
          <motion.div
            key={item.k}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: easeOut }}
            className="rounded-xl bg-white px-2 py-3 shadow-soft ring-1 ring-brand-100"
          >
            <dt className="text-xs text-muted">{item.k}</dt>
            <dd className="font-display text-lg font-extrabold text-brand-800">{item.v}</dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}

function RepliesVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[0.95rem] text-ink shadow-soft"
      >
        Is the speaker in stock?
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.45, ease: easeOut }}
        className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-[#d9fdd3] px-4 py-3 text-[0.95rem] text-ink shadow-soft"
      >
        <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-brand-800">
          <Bot className="size-3.5" aria-hidden /> AI reply, from your catalog
        </span>
        Yes, it&apos;s in stock. Here&apos;s the link.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.45, ease: easeOut }}
        className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[0.95rem] text-ink shadow-soft"
      >
        Can you do a custom bulk order?
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 18 }}
        className="flex items-center gap-2 self-center rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900 ring-1 ring-inset ring-amber-300"
      >
        <Hand className="size-4" aria-hidden /> Needs a person. Your team takes over.
      </motion.div>
    </div>
  );
}

const visuals = [QrVisual, ContactsVisual, CampaignVisual, RepliesVisual];

function VisualFrame({ index, className }: { index: number; className?: string }) {
  const Visual = visuals[index];
  return (
    <div
      aria-hidden
      className={cn(
        "relative h-[25rem] overflow-hidden rounded-3xl bg-linear-to-br from-brand-100 via-brand-50 to-white p-6 ring-1 ring-inset ring-brand-200 sm:p-8",
        className,
      )}
    >
      <Visual />
    </div>
  );
}

/* ---------- Section ---------- */

export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="bg-brand-50 py-20 sm:py-28">
      <Container>
        <SectionHeading title="How it works" lead="Four steps from a new number to an AI that answers for you." />

        <div className="mt-14 lg:grid lg:grid-cols-2 lg:gap-16">
          <ol className="relative space-y-12 lg:space-y-0">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="lg:flex lg:min-h-[62vh] lg:items-center"
              >
                <div className="w-full">
                  <div
                    className={cn(
                      "flex gap-5 transition-opacity duration-500",
                      active === i ? "lg:opacity-100" : "lg:opacity-35",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-2xl font-display text-xl font-extrabold transition-colors duration-500",
                        "bg-brand-700 text-white",
                        active !== i && "lg:bg-white lg:text-brand-700 lg:ring-1 lg:ring-brand-200",
                      )}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-md text-lg leading-relaxed text-muted-strong">{step.text}</p>
                    </div>
                  </div>
                  {/* On small screens each step carries its own visual */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="mt-6 lg:hidden"
                  >
                    <VisualFrame index={i} />
                  </motion.div>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* On large screens one visual stays pinned and changes with the active step */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-14rem)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -24, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  <VisualFrame index={active} className="h-[26rem] shadow-soft" />
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex justify-center gap-2" aria-hidden>
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      active === i ? "w-8 bg-brand-700" : "w-1.5 bg-brand-300",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
