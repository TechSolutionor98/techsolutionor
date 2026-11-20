"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import {
  ChartNoAxesCombined,
  Flame,
  LayoutTemplate,
  MessagesSquare,
  Send,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container, SectionHeading, easeOut } from "@/components/ui";

const features: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Smartphone,
    title: "WhatsApp numbers",
    text: "Link a number in seconds by scanning a QR code. Add several numbers, pick a default, and see live connection status.",
  },
  {
    icon: Users,
    title: "Contacts & Leads",
    text: "Import Excel or CSV, organise with tags and lists, and let opt-outs be tracked automatically.",
  },
  {
    icon: LayoutTemplate,
    title: "Templates",
    text: "Build messages from drag-and-drop blocks with {{first_name}} personalisation, spin text and images.",
  },
  {
    icon: Send,
    title: "Campaigns",
    text: "Choose a template, an audience and a pace. Schedule, pause or resume, and watch Delivered, Read, Replied and Failed live.",
  },
  {
    icon: Sparkles,
    title: "AI message variation",
    text: "Optionally, AI rewrites every message uniquely. Same meaning, different wording, and the opt-out line always stays.",
  },
  {
    icon: MessagesSquare,
    title: "Conversations",
    text: "A shared inbox for every linked number. Reply by hand or switch on AI auto-reply, with handoff to a person.",
  },
  {
    icon: Flame,
    title: "Warm-up",
    text: "New numbers chat with each other on a schedule that starts slow and ramps up daily, before campaigns begin.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Overview & Audit Logs",
    text: "Live stats and campaign progress, plus a record of every send, reply, handoff, connection and admin action.",
  },
];

function FeatureCard({ icon: Icon, title, text, index }: (typeof features)[number] & { index: number }) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, rgb(16 185 129 / 0.16), transparent 75%)`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: easeOut }}
      whileHover={{ y: -6 }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      onPointerLeave={() => {
        x.set(-200);
        y.set(-200);
      }}
      className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft ring-1 ring-inset ring-slate-200/80 transition-shadow duration-300 hover:shadow-lift hover:ring-brand-300"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      <div className="relative">
        <span className="grid size-12 place-items-center rounded-xl bg-brand-100 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
          <Icon className="size-6" aria-hidden />
        </span>
        <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{text}</p>
      </div>
    </motion.li>
  );
}

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container>
        <SectionHeading title="Everything you need to market and sell on WhatsApp" />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
