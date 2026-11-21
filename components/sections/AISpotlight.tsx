"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Bot, BrainCircuit, EyeOff, Hand, KeyRound, Link2, PackageSearch, Plug } from "lucide-react";
import { Container, IllustrationNote, Reveal, SectionHeading } from "@/components/ui";
import { exampleChat } from "@/lib/chat";
import { cn } from "@/lib/cn";

const points = [
  {
    icon: PackageSearch,
    title: "Connect your product catalog",
    text: "Add your store's product API link, or type products in by hand. The catalog syncs automatically.",
  },
  {
    icon: Plug,
    title: "Works with any product API",
    text: "The AI reads everything your store says about a product: name, price, stock, description, specifications, variations and more.",
  },
  {
    icon: EyeOff,
    title: "Keeps business secrets",
    text: "Cost price, wholesale price and internal fields are never shown to customers.",
  },
  {
    icon: BrainCircuit,
    title: "Understands how customers really ask",
    text: "\"speaker\" finds \"Speakers\", \"BT\" means Bluetooth, and \"the 162 AED one\" means the product from the last reply. A budget is only used when the customer gives one.",
  },
  {
    icon: Link2,
    title: "Real links only",
    text: "It sends real product-page links from your store. If the AI ever tries to send a link that doesn't exist, the message is not sent and a person takes over.",
  },
  {
    icon: KeyRound,
    title: "Your choice of AI, your own key",
    text: "Works with Google Gemini (recommended), Groq as an automatic backup when Gemini is busy, and OpenAI. Each business uses its own AI key, tested before saving and never shown again.",
  },
];

const chats = [
  { name: "Sara", preview: "Ok send me the link of the 162…", active: true },
  { name: "Omar", preview: "Can you do a custom bulk order?", flag: true },
  { name: "Lina", preview: "Thanks, ordered!" },
  { name: "Yusuf", preview: "What colours does it come in?" },
];

/** Conversations inbox with the example chat open. Real, readable text. */
function InboxMock() {
  return (
    <figure className="relative">
      <div className="overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-brand-200">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5">
          <span className="size-3 rounded-full bg-rose-300" aria-hidden />
          <span className="size-3 rounded-full bg-amber-300" aria-hidden />
          <span className="size-3 rounded-full bg-brand-400" aria-hidden />
          <span className="ml-3 text-sm font-semibold text-ink">Conversations</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-800">
            <Bot className="size-3.5" aria-hidden /> AI auto-reply on
          </span>
        </div>

        <div className="grid sm:grid-cols-[13rem_1fr]">
          {/* Chat list, decorative */}
          <ul aria-hidden className="hidden border-r border-slate-100 bg-slate-50/60 sm:block">
            {chats.map((chat) => (
              <li
                key={chat.name}
                className={cn(
                  "flex items-center gap-3 border-b border-slate-100 px-4 py-3",
                  chat.active && "bg-brand-50",
                )}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                  {chat.name[0]}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{chat.name}</span>
                  {chat.flag ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-[0.65rem] font-semibold text-amber-900">
                      <Hand className="size-2.5" /> Needs a person
                    </span>
                  ) : (
                    <span className="block truncate text-xs text-muted">{chat.preview}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          {/* The example chat */}
          <motion.ol
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "0px 0px -120px 0px" }}
            transition={{ staggerChildren: 0.45, delayChildren: 0.2 }}
            className="flex flex-col gap-3 bg-[#efeae2] p-4 sm:p-5"
          >
            {exampleChat.map((m, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.95 },
                  shown: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className={cn(
                  "max-w-[88%] rounded-2xl px-4 py-2.5 text-[0.95rem] leading-relaxed text-ink shadow-sm",
                  m.from === "customer"
                    ? "origin-bottom-left self-start rounded-bl-md bg-white"
                    : "origin-bottom-right self-end rounded-br-md bg-[#d9fdd3]",
                )}
              >
                <span
                  className={cn(
                    "mb-0.5 flex items-center gap-1.5 text-xs font-bold",
                    m.from === "customer" ? "text-muted-strong" : "text-brand-800",
                  )}
                >
                  {m.from === "ai" ? <Bot className="size-3.5" aria-hidden /> : null}
                  {m.from === "customer" ? "Customer" : "Tech Watsapi AI"}
                </span>
                {m.text}
                {m.link ? <span className="mt-0.5 block break-all text-sky-800 underline">{m.link}</span> : null}
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>

      {/* Mascot peeking over the corner */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.5 }}
        className="absolute -top-[5.25rem] right-3 sm:-bottom-7 sm:-left-9 sm:right-auto sm:top-auto"
      >
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <Image
            src="/logo.png"
            alt="Tech Watsapi"
            width={900}
            height={353}
            className="h-14 sm:h-16 w-auto drop-shadow-[0_14px_18px_rgb(6_78_59/0.3)] object-contain"
          />
        </motion.div>
      </motion.div>

      <figcaption>
        <IllustrationNote className="mt-4 sm:text-right">
          Illustration. Product names, prices and links are demo data.
        </IllustrationNote>
      </figcaption>
    </figure>
  );
}

export function AISpotlight() {
  return (
    <section id="ai" className="relative overflow-hidden bg-brand-50 py-20 sm:py-28">
      <div aria-hidden className="absolute -left-40 top-20 size-[32rem] rounded-full bg-brand-200/50 blur-3xl" />
      <Container className="relative grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="pt-12 lg:sticky lg:top-28 lg:pt-14">
          <InboxMock />
        </div>

        <div>
          <SectionHeading
            align="left"
            title="An AI sales assistant that actually knows your products"
            lead="It answers from your real product data, sends only real links, and hands off to your team when it isn't sure."
          />
          <ul className="mt-10 space-y-6">
            {points.map((point, i) => (
              <li key={point.title}>
                <Reveal delay={i * 0.05} x={24} y={0} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand-700 shadow-soft ring-1 ring-inset ring-brand-200">
                    <point.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{point.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-strong">{point.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
