"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  Activity,
  ClipboardList,
  Flame,
  LayoutDashboard,
  LayoutTemplate,
  MessagesSquare,
  Send,
  Settings,
  Smartphone,
  Users,
} from "lucide-react";
import { CountUp } from "@/components/ui";
import { cn } from "@/lib/cn";

const nav = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Contacts & Leads", icon: Users },
  { label: "Templates", icon: LayoutTemplate },
  { label: "Campaigns", icon: Send },
  { label: "Warm-up", icon: Flame },
  { label: "Conversations", icon: MessagesSquare },
  { label: "WhatsApp Gateway", icon: Smartphone },
  { label: "Audit Logs", icon: ClipboardList },
  { label: "Settings", icon: Settings },
];

export const campaignStats = [
  { label: "Delivered", value: 86, tone: "text-brand-700", bar: "bg-brand-500" },
  { label: "Read", value: 61, tone: "text-sky-700", bar: "bg-sky-500" },
  { label: "Replied", value: 14, tone: "text-violet-700", bar: "bg-violet-500" },
  { label: "Failed", value: 2, tone: "text-rose-700", bar: "bg-rose-500" },
];

const activity = [
  { text: "Reply received, automation stopped for this contact", time: "now" },
  { text: "AI answered a product question", time: "1m" },
  { text: "Chat flagged: Needs a person", time: "4m" },
];

/**
 * Mock of the Overview page. Sized in em so the whole screen scales with its container.
 * Demo data only.
 */
export function DashboardMock() {
  return (
    <div aria-hidden className="flex h-full w-full bg-white text-left leading-[1.35] text-ink">
      <aside className="flex w-[14.5em] shrink-0 flex-col gap-[0.25em] border-r border-slate-100 bg-brand-50 p-[1em]">
        <div className="mb-[1em] flex items-center">
          <Image src="/logo.png" alt="Tech Watsapi" width={900} height={353} className="h-[2.2em] w-auto object-contain" />
        </div>
        {nav.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-[0.7em] rounded-[0.6em] px-[0.7em] py-[0.5em]",
              item.active ? "bg-white font-semibold text-brand-800 shadow-sm" : "text-muted-strong",
            )}
          >
            <item.icon className="size-[1.2em] shrink-0" strokeWidth={2} />
            <span className="truncate text-[0.95em]">{item.label}</span>
          </div>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-[1em] p-[1.4em]">
        <div className="flex items-center justify-between">
          <p className="font-display text-[1.5em] font-extrabold tracking-tight">Overview</p>
          <span className="flex items-center gap-[0.5em] rounded-full bg-brand-100 px-[0.8em] py-[0.3em] text-[0.85em] font-semibold text-brand-800">
            <span className="size-[0.55em] animate-pulse-dot rounded-full bg-brand-500" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-4 gap-[0.8em]">
          {campaignStats.map((s) => (
            <div key={s.label} className="rounded-[0.9em] border border-slate-100 bg-white p-[0.9em] shadow-sm">
              <p className="text-[0.85em] text-muted">{s.label}</p>
              <CountUp to={s.value} className={cn("font-display text-[2em] font-extrabold leading-none", s.tone)} />
            </div>
          ))}
        </div>

        <div className="rounded-[0.9em] border border-slate-100 p-[1em] shadow-sm">
          <div className="flex items-center justify-between gap-[1em]">
            <div className="min-w-0">
              <p className="truncate text-[1.05em] font-semibold">Weekend offer</p>
              <p className="text-[0.85em] text-muted">Campaign running · 86 of 100 today</p>
            </div>
            <span className="shrink-0 rounded-full bg-slate-100 px-[0.8em] py-[0.3em] text-[0.8em] font-medium text-muted-strong">
              Next message in about 70s
            </span>
          </div>
          <div className="mt-[0.8em] h-[0.6em] overflow-hidden rounded-full bg-brand-100">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-brand-500 to-brand-700"
              initial={{ width: "0%" }}
              whileInView={{ width: "86%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden rounded-[0.9em] border border-slate-100 p-[1em] shadow-sm">
          <p className="mb-[0.5em] flex items-center gap-[0.5em] text-[0.95em] font-semibold">
            <Activity className="size-[1.1em] text-brand-700" /> Recent activity
          </p>
          {activity.map((a) => (
            <div
              key={a.text}
              className="flex items-center justify-between gap-[1em] border-t border-slate-100 py-[0.5em] text-[0.88em]"
            >
              <span className="truncate text-muted-strong">{a.text}</span>
              <span className="shrink-0 text-muted">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
