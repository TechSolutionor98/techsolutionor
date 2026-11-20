"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  CalendarCheck,
  Fingerprint,
  KeyRound,
  Layers,
  Lock,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
  Plus,
  ScrollText,
} from "lucide-react";
import { ButtonLink, Container, Reveal, SectionHeading, easeOut } from "@/components/ui";
import { cn } from "@/lib/cn";
import { navLinks, site } from "@/lib/site";

/* ---------- Security ---------- */

const security = [
  {
    icon: Lock,
    title: "Protected sign-in",
    text: "Passwords are stored hashed (bcrypt), and sessions use secure, http-only cookies.",
  },
  { icon: Layers, title: "Separate by design", text: "Every workspace's data is kept separate." },
  { icon: KeyRound, title: "Private AI keys", text: "AI keys are never shown back after saving." },
  {
    icon: ScrollText,
    title: "A full record",
    text: "A full audit log, plus suspend and emergency-stop controls.",
  },
  {
    icon: MonitorSmartphone,
    title: "Nothing to install",
    text: "It runs in any modern browser, on desktop and on phone.",
  },
];

export function Security() {
  return (
    <section className="bg-brand-50 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading align="left" title="Your data, kept separate and secure" />
            <Reveal delay={0.1}>
              <motion.div
                aria-hidden
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="mt-8 grid size-20 place-items-center rounded-3xl bg-white text-brand-700 shadow-lift ring-1 ring-brand-200"
              >
                <Fingerprint className="size-10" />
              </motion.div>
            </Reveal>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {security.map((item, i) => (
              <li key={item.title} className={cn(i === 0 && "sm:col-span-2")}>
                <Reveal
                  delay={i * 0.06}
                  className="h-full rounded-2xl bg-white p-6 shadow-soft ring-1 ring-inset ring-brand-200/70"
                >
                  <item.icon className="size-6 text-brand-700" aria-hidden />
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Pricing ---------- */

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <Container>
        <Reveal className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white p-8 text-center shadow-lift ring-1 ring-brand-200 sm:p-14">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-brand-400 via-brand-600 to-brand-800"
          />
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Pricing</h2>
          <p className="mx-auto mt-4 max-w-xl text-xl leading-relaxed text-muted-strong text-pretty">
            Plans for single businesses and agencies. Talk to us for pricing.
          </p>
          <ButtonLink href={site.demoLink} size="lg" className="mt-8">
            <CalendarCheck className="size-5" aria-hidden />
            Book a demo
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- FAQ ---------- */

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Do I need the WhatsApp Business API?",
    a: (
      <p>
        No. You link your existing WhatsApp or WhatsApp Business number by scanning a QR code, the same way WhatsApp
        Web works.
      </p>
    ),
  },
  {
    q: "Will my number get banned?",
    a: (
      <>
        <p>
          Any automation on WhatsApp carries some risk, and no tool can honestly promise zero risk. Tech Watsapi is
          built to lower it, with:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>a random gap between messages;</li>
          <li>a daily limit per number;</li>
          <li>sending hours and warm-up for new numbers;</li>
          <li>varied wording;</li>
          <li>automatic opt-out.</li>
        </ul>
        <p className="mt-3">Message people who expect to hear from you, and warm up new numbers first.</p>
      </>
    ),
  },
  {
    q: "How does the AI know my products?",
    a: (
      <p>
        Connect your store&apos;s product API, or add products by hand. The AI reads names, prices, stock,
        descriptions and specifications, and replies with real product links. It never shows your cost or wholesale
        prices.
      </p>
    ),
  },
  {
    q: "What if the AI doesn't know the answer?",
    a: <p>It doesn&apos;t guess. The chat is marked &quot;Needs a person&quot; and your team replies from the inbox.</p>,
  },
  {
    q: "Which AI does it use?",
    a: (
      <p>
        Google Gemini (recommended), with Groq as an automatic backup. OpenAI is also supported. Each business uses
        its own AI key.
      </p>
    ),
  },
  {
    q: "Can I use more than one number?",
    a: <p>Yes. Link several numbers, choose a default, and pick which number sends each campaign.</p>,
  },
  {
    q: "Can my team use it?",
    a: <p>Yes. Add team members and choose exactly which pages each person can open. Changes apply instantly.</p>,
  },
  {
    q: "I'm an agency. Can I manage several clients?",
    a: (
      <p>
        Yes. Each client gets its own private workspace. As Super Admin you control every workspace, user and rule
        from one console.
      </p>
    ),
  },
  {
    q: "Can I import my contacts?",
    a: <p>Yes, from Excel (.xlsx, .xls) or CSV, or by pasting a list.</p>,
  },
  {
    q: "What happens when someone replies \"stop\"?",
    a: <p>They&apos;re opted out automatically and won&apos;t be messaged again.</p>,
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-brand-50 py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading title="Frequently asked questions" />
        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={Math.min(i, 5) * 0.04} y={16}>
                <div
                  className={cn(
                    "rounded-2xl bg-white ring-1 ring-inset transition-shadow duration-300",
                    isOpen ? "shadow-soft ring-brand-300" : "ring-brand-200/70",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-button-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-display text-[1.05rem] font-bold text-ink sm:px-6"
                    >
                      {faq.q}
                      <motion.span
                        aria-hidden
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300",
                          isOpen ? "bg-brand-700 text-white" : "bg-brand-100 text-brand-800",
                        )}
                      >
                        <Plus className="size-4" strokeWidth={2.5} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: easeOut }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 leading-relaxed text-muted-strong sm:px-6">{faq.a}</div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Final call to action ---------- */

export function FinalCTA() {
  return (
    <section id="book-demo" className="on-dark px-4 py-20 sm:px-6 sm:py-24">
      <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-linear-to-br from-brand-700 via-brand-800 to-brand-950 px-6 py-16 text-center shadow-lift sm:px-12 sm:py-20">
        {/* Slow drifting glow */}
        <motion.div
          aria-hidden
          animate={{ x: ["-10%", "10%", "-10%"], y: ["0%", "12%", "0%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 -top-32 -z-10 size-[28rem] rounded-full bg-brand-400/35 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ x: ["8%", "-8%", "8%"], y: ["0%", "-10%", "0%"] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-20 -z-10 size-[30rem] rounded-full bg-brand-500/30 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-6 w-fit"
        >
          <Image
            src="/favicon.png"
            alt=""
            width={256}
            height={256}
            className="size-24 drop-shadow-[0_16px_24px_rgb(0_0_0/0.35)]"
          />
        </motion.div>
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl">
          Ready to sell more on WhatsApp?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100/90">
          See Tech Watsapi with your own numbers, contacts and products.
        </p>
        <ButtonLink href={site.demoLink} variant="light" size="lg" className="mt-9">
          <CalendarCheck className="size-5" aria-hidden />
          Book a demo
        </ButtonLink>
      </Reveal>
    </section>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white pb-10 pt-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Image src="/logo.png" alt="Tech Watsapi" width={900} height={353} className="h-14 w-auto" />
            <p className="mt-4 text-muted-strong">
              A product by{" "}
              <a
                href={site.makerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
              >
                Tech Solutionor
              </a>
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display font-bold text-ink">Explore</h2>
            <ul className="mt-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-9 items-center text-muted-strong hover:text-brand-700">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display font-bold text-ink">Contact</h2>
            <ul className="mt-3 space-y-2.5 text-muted-strong">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden />
                <span className="break-all">{site.contactEmail}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden />
                <span>{site.contactPhone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden />
                <span>{site.officeAddress}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-100 pt-6">
          <div className="flex flex-col gap-3 text-sm text-muted-strong sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {site.year} {site.maker}
            </p>
            <ul className="flex gap-6">
              <li>
                <a href={site.privacyUrl} className="inline-flex min-h-9 items-center hover:text-brand-700">
                  Privacy
                </a>
              </li>
              <li>
                <a href={site.termsUrl} className="inline-flex min-h-9 items-center hover:text-brand-700">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <p className="mt-4 max-w-4xl text-xs leading-relaxed text-muted">
            WhatsApp is a trademark of Meta Platforms, Inc. Tech Watsapi is an independent product by Tech Solutionor
            and is not affiliated with, endorsed by or sponsored by Meta or WhatsApp.
          </p>
        </div>
      </Container>
    </footer>
  );
}
