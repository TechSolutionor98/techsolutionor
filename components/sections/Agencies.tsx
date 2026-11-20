"use client";

import { motion } from "motion/react";
import { Building2, Contact, Crown, ScrollText, SlidersHorizontal, Smartphone, UserCog, Users } from "lucide-react";
import { Container, Reveal, SectionHeading, easeOut } from "@/components/ui";

const workspaces = ["Business A", "Business B", "Business C"];
const owns = [
  { icon: Smartphone, label: "Numbers" },
  { icon: Contact, label: "Contacts" },
  { icon: Users, label: "Team" },
];

/** One Super Admin above three separate business workspaces. */
function Diagram() {
  return (
    <figure
      role="img"
      aria-label="Diagram: one Super Admin controls three separate business workspaces. Each workspace has its own numbers, contacts and team."
      className="mx-auto w-full max-w-2xl"
    >
      <div aria-hidden>
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="relative mx-auto flex w-fit items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-[0_0_60px_-8px_rgb(52_211_153/0.7)]"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-brand-700 text-white">
            <Crown className="size-5" />
          </span>
          <span>
            <span className="block font-display text-lg font-extrabold leading-tight text-ink">Super Admin</span>
            <span className="block text-xs text-muted">Every workspace, user and rule</span>
          </span>
        </motion.div>

        {/* Connectors: centre to the middle of each of the three equal columns */}
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 300 56" preserveAspectRatio="none" className="block h-14 w-full" fill="none">
            {[50, 150, 250].map((x) => (
              <path
                key={x}
                d={`M150 0 C150 34, ${x} 22, ${x} 56`}
                stroke="#6ee7b7"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </motion.div>

        <div className="grid grid-cols-3">
          {workspaces.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.12, ease: easeOut }}
              className="px-1 sm:px-2"
            >
              <div className="h-full rounded-2xl border border-dashed border-brand-300/60 bg-white/[0.07] p-2.5 backdrop-blur sm:p-4">
                <p className="flex items-center gap-1.5 font-display text-[0.8rem] font-bold text-white sm:text-base">
                  <Building2 className="hidden size-4 shrink-0 text-brand-300 sm:block" />
                  {name}
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {owns.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-1.5 rounded-lg bg-white/10 px-1.5 py-1.5 text-[0.7rem] font-medium text-brand-50 sm:gap-2 sm:px-2.5 sm:text-sm"
                    >
                      <item.icon className="size-3.5 shrink-0 text-brand-300 sm:size-4" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-brand-100/80">No business can see another&apos;s data.</p>
      </div>
    </figure>
  );
}

const rows = [
  { name: "Demo Electronics", team: 4, numbers: 3, contacts: "2,140", running: 1, sent: 86, status: "Active" },
  { name: "Demo Fashion", team: 2, numbers: 1, contacts: "860", running: 0, sent: 0, status: "Paused" },
  { name: "Demo Auto Parts", team: 6, numbers: 2, contacts: "3,415", running: 2, sent: 143, status: "Active" },
];

/** Super Admin workspace table. Demo data. */
function AdminTable() {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl bg-white shadow-lift">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5">
          <p className="font-display font-bold text-ink">Workspaces</p>
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">Super Admin</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-muted">
              <th scope="col" className="px-4 py-2.5 font-medium sm:px-5">Workspace</th>
              <th scope="col" className="hidden px-3 py-2.5 font-medium md:table-cell lg:hidden">Team</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Numbers</th>
              <th scope="col" className="hidden px-3 py-2.5 font-medium sm:table-cell">Contacts</th>
              <th scope="col" className="hidden px-3 py-2.5 font-medium md:table-cell lg:hidden">Running</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Sent today</th>
              <th scope="col" className="px-4 py-2.5 font-medium sm:px-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: easeOut }}
                className="border-t border-slate-100 text-ink"
              >
                <th scope="row" className="px-4 py-3.5 font-semibold sm:px-5">{row.name}</th>
                <td className="hidden px-3 py-3.5 md:table-cell lg:hidden">{row.team}</td>
                <td className="px-3 py-3.5">{row.numbers}</td>
                <td className="hidden px-3 py-3.5 sm:table-cell">{row.contacts}</td>
                <td className="hidden px-3 py-3.5 md:table-cell lg:hidden">{row.running}</td>
                <td className="px-3 py-3.5">{row.sent}</td>
                <td className="px-4 py-3.5 sm:px-5">
                  <span
                    className={
                      row.status === "Active"
                        ? "rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-800"
                        : "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900"
                    }
                  >
                    {row.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-4 text-xs text-brand-100/75">Illustration with demo data.</figcaption>
    </figure>
  );
}

const powers = [
  {
    icon: Building2,
    title: "Workspaces",
    text: "Create, open, rename, suspend or delete them. See each one's team size, numbers, contacts, running campaigns and messages sent today.",
  },
  {
    icon: SlidersHorizontal,
    title: "Control any workspace",
    text: "Pause its sending, start or stop its warm-up, turn AI on or off for each number, or trigger an emergency stop.",
  },
  {
    icon: UserCog,
    title: "People",
    text: "Add users to any workspace, move them between workspaces, set their pages, reset passwords, sign them out everywhere, or suspend them.",
  },
  {
    icon: ScrollText,
    title: "Defaults and activity",
    text: "Set default settings for new workspaces once, optionally apply them to all existing ones, and keep a platform-wide activity log.",
  },
];

const rules = [
  "Minimum gap between messages",
  "Maximum messages per number per day",
  "Allowed sending hours",
  "Forced typing indicator",
  "Forced ramp-up",
  "Warm-up limits",
  "Maximum numbers per workspace",
  "Maximum team members per workspace",
  "AI allowed or not",
  "Sharing the platform's AI key",
];

export function Agencies() {
  return (
    <section id="agencies" className="on-dark relative isolate overflow-hidden bg-brand-950 py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_0%,rgb(16_185_129/0.35),transparent_70%),radial-gradient(40%_35%_at_90%_80%,rgb(5_150_105/0.3),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]"
      />
      <Container>
        <SectionHeading
          dark
          title="One platform. Every client. Full control."
          lead="Each business gets its own private workspace, with its own numbers, contacts, templates, campaigns, chats, settings, AI key and team. A Super Admin controls them all."
        />

        <div className="mt-14">
          <Diagram />
        </div>

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h3 className="font-display text-2xl font-extrabold text-white">The Super Admin console</h3>
            </Reveal>
            <ul className="mt-7 space-y-6">
              {powers.map((power, i) => (
                <li key={power.title}>
                  <Reveal delay={i * 0.06} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-inset ring-white/15">
                      <power.icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h4 className="font-display text-lg font-bold text-white">{power.title}</h4>
                      <p className="mt-1 leading-relaxed text-brand-100/80">{power.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <Reveal>
              <AdminTable />
            </Reveal>
            <div>
              <Reveal>
                <h3 className="font-display text-xl font-extrabold text-white">
                  Platform rules that apply to every workspace
                </h3>
              </Reveal>
              <motion.ul
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ staggerChildren: 0.05 }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {rules.map((rule) => (
                  <motion.li
                    key={rule}
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, shown: { opacity: 1, scale: 1 } }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="rounded-full bg-white/10 px-3.5 py-2 text-sm font-medium text-brand-50 ring-1 ring-inset ring-white/15"
                  >
                    {rule}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
