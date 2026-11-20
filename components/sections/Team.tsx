"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ClipboardList,
  Flame,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  MessagesSquare,
  Send,
  Settings,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/cn";

const pages = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Contacts & Leads", icon: Users },
  { label: "Templates", icon: LayoutTemplate },
  { label: "Campaigns", icon: Send },
  { label: "Warm-up", icon: Flame },
  { label: "Conversations", icon: MessagesSquare },
  { label: "WhatsApp Gateway", icon: Smartphone },
  { label: "Audit Logs", icon: ClipboardList },
  { label: "Settings", icon: Settings },
];

const points = [
  {
    icon: Check,
    title: "Access down to the page",
    text: "Add team members and tick exactly which pages each one can open.",
  },
  {
    icon: ShieldCheck,
    title: "Two clear roles",
    text: "Admins can also manage the team. Members can't. A workspace admin can only give pages they can open themselves.",
  },
  {
    icon: LogOut,
    title: "Stay in control",
    text: "Suspend members, reset passwords, or sign someone out on every device.",
  },
  {
    icon: Zap,
    title: "Changes apply instantly",
    text: "Even to someone who is signed in right now.",
  },
];

/** A working demo: tick pages on the left, and the member's menu updates on the right. */
function PermissionsDemo() {
  const [allowed, setAllowed] = useState<string[]>(["Overview", "Conversations", "Contacts & Leads"]);
  const [role, setRole] = useState<"Member" | "Admin">("Member");

  const toggle = (label: string) =>
    setAllowed((current) => (current.includes(label) ? current.filter((l) => l !== label) : [...current, label]));

  return (
    <div className="rounded-3xl bg-white p-5 shadow-lift ring-1 ring-brand-200 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full bg-brand-100 font-display font-bold text-brand-800">
            S
          </span>
          <div>
            <p className="font-semibold text-ink">Sara</p>
            <p className="text-xs text-muted">Demo team member</p>
          </div>
        </div>
        <div role="group" aria-label="Role" className="flex rounded-full bg-slate-100 p-1">
          {(["Member", "Admin"] as const).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={role === r}
              onClick={() => setRole(r)}
              className="relative min-h-9 rounded-full px-4 text-sm font-semibold text-muted-strong"
            >
              {role === r ? (
                <motion.span
                  layoutId="role-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-brand-200"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              ) : null}
              <span className={cn("relative", role === r && "text-brand-800")}>{r}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Pages Sara can open</legend>
          <div className="mt-3 space-y-1">
            {pages.map((page) => {
              const on = allowed.includes(page.label);
              return (
                <label
                  key={page.label}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-2.5 text-[0.95rem] text-ink hover:bg-brand-50 has-focus-visible:outline-2 has-focus-visible:outline-brand-700"
                >
                  <input type="checkbox" checked={on} onChange={() => toggle(page.label)} className="peer sr-only" />
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-md transition-colors duration-200",
                      on ? "bg-brand-700 text-white" : "bg-white ring-1 ring-inset ring-slate-300",
                    )}
                  >
                    <motion.span animate={{ scale: on ? 1 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 22 }}>
                      <Check className="size-3.5" strokeWidth={3.5} />
                    </motion.span>
                  </span>
                  {page.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="rounded-2xl bg-brand-50 p-4 ring-1 ring-inset ring-brand-200">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="size-2 animate-pulse-dot rounded-full bg-brand-500" aria-hidden />
            Sara&apos;s menu, right now
          </p>
          <ul aria-live="polite" className="mt-3 space-y-1.5">
            <AnimatePresence initial={false}>
              {pages
                .filter((page) => allowed.includes(page.label))
                .map((page) => (
                  <motion.li
                    key={page.label}
                    layout
                    initial={{ opacity: 0, x: -16, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, x: 16, height: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="overflow-hidden"
                  >
                    <span className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-sm font-medium text-ink shadow-sm">
                      <page.icon className="size-4 text-brand-700" aria-hidden />
                      {page.label}
                    </span>
                  </motion.li>
                ))}
              {role === "Admin" ? (
                <motion.li
                  key="manage-team"
                  layout
                  initial={{ opacity: 0, x: -16, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 16, height: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="overflow-hidden"
                >
                  <span className="flex items-center gap-2.5 rounded-xl bg-brand-700 px-3 py-2.5 text-sm font-semibold text-white shadow-sm">
                    <ShieldCheck className="size-4" aria-hidden />
                    Manage the team
                  </span>
                </motion.li>
              ) : null}
            </AnimatePresence>
          </ul>
          {allowed.length === 0 && role === "Member" ? (
            <p className="mt-3 text-sm text-muted-strong">No pages ticked yet.</p>
          ) : null}
        </div>
      </div>
      <p className="mt-5 text-xs text-muted">Try it: tick a page or switch the role. Illustration with demo data.</p>
    </div>
  );
}

export function Team() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading align="left" title="Give every team member exactly the access they need" />
          <ul className="mt-9 space-y-6">
            {points.map((point, i) => (
              <li key={point.title}>
                <Reveal delay={i * 0.06} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                    <point.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{point.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{point.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <Reveal>
          <PermissionsDemo />
        </Reveal>
      </Container>
    </section>
  );
}
