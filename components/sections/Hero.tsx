"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowDown, CalendarCheck } from "lucide-react";
import { ButtonLink, Container, easeOut } from "@/components/ui";
import { DashboardMock } from "@/components/mock/DashboardMock";
import { PhoneChat } from "@/components/mock/PhoneChat";
import { site } from "@/lib/site";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const headline = "Sell more on WhatsApp, with an AI that knows your products.";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const reduced = useReducedMotion();

  // Devices lean toward the pointer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -5]), { stiffness: 110, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, -2]), { stiffness: 110, damping: 18 });
  const phoneX = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 110, damping: 18 });

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28 lg:pt-40"
    >
      {/* Soft green wash and the 3D bubbles sit behind everything */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(60%_55%_at_75%_30%,#d1fae5_0%,transparent_70%),radial-gradient(45%_40%_at_10%_10%,#e7f8f1_0%,transparent_70%),linear-gradient(#ffffff,#f3fbf7)]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-35 sm:opacity-90">
        <HeroScene active={inView && !reduced} />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.08fr] lg:gap-10">
        <div className="relative">
          <motion.a
            href={site.makerUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="inline-flex min-h-9 items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-medium text-brand-800 ring-1 ring-brand-200 backdrop-blur hover:ring-brand-500"
          >
            <span className="size-2 animate-pulse-dot rounded-full bg-brand-500" />A product by Tech Solutionor
          </motion.a>

          <h1 className="mt-6 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4rem]">
            {headline.split(" ").map((word, i) => (
              <span key={i}>
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: "0.5em", filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.055, ease: easeOut }}
                >
                  {word}
                </motion.span>{" "}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: easeOut }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-strong text-pretty"
          >
            Link your number with a QR code, send personalised campaigns at a safe pace, and let AI answer customer
            questions from your real product list, handing off to your team when it matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: easeOut }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href={site.demoLink} size="lg">
              <CalendarCheck className="size-5" aria-hidden />
              Book a demo
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary" size="lg">
              See how it works
              <ArrowDown className="size-4" aria-hidden />
            </ButtonLink>
          </motion.div>
        </div>

        {/* Laptop with the dashboard, phone with the AI chat */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: easeOut }}
          className="relative mx-auto w-full max-w-xl pb-10 [perspective:1600px] lg:max-w-none"
        >
          <motion.div style={{ rotateX, rotateY }} className="relative [transform-style:preserve-3d]">
            <div
              role="img"
              aria-label="Illustration of the Tech Watsapi dashboard on a laptop: an Overview page with Delivered, Read, Replied and Failed counts, a running campaign and recent activity."
              className="@container w-[90%]"
            >
              <div className="text-[1.5625cqw]">
                <div className="aspect-[16/10.4] overflow-hidden rounded-t-[1.4em] border-[0.6em] border-b-0 border-ink bg-ink shadow-lift">
                  <div className="h-full overflow-hidden rounded-t-[0.7em]">
                    <DashboardMock />
                  </div>
                </div>
                <div className="relative -mx-[5%] h-[1.1em] rounded-b-[1.2em] bg-linear-to-b from-slate-200 to-slate-400 shadow-lift">
                  <div className="absolute left-1/2 top-0 h-[0.4em] w-[9em] -translate-x-1/2 rounded-b-[0.6em] bg-slate-400/70" />
                </div>
              </div>
            </div>

            <motion.div
              style={{ x: phoneX, z: 70 }}
              className="@container absolute -bottom-10 right-0 w-[36%] sm:w-[33%]"
            >
              <motion.div
                className="text-[4.1667cqw]"
                animate={reduced ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneChat />
              </motion.div>
            </motion.div>
          </motion.div>
          <p className="mt-14 text-center text-xs text-muted lg:text-left">Illustration with demo data.</p>
        </motion.div>
      </Container>
    </section>
  );
}
