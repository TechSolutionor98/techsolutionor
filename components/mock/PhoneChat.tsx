"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { exampleChat } from "@/lib/chat";
import { cn } from "@/lib/cn";

const transcript = exampleChat
  .map((m) => `${m.from === "customer" ? "Customer" : "Tech Watsapi AI"}: ${m.text} ${m.link ?? ""}`)
  .join(" ");

/**
 * The customer's phone: the example chat plays out message by message, then loops.
 * Sized in em so it scales with its container (set font-size on the parent).
 */
export function PhoneChat({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const play = async () => {
      await wait(0);
      if (cancelled) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCount(exampleChat.length);
        return;
      }
      while (!cancelled) {
        setCount(0);
        setTyping(false);
        await wait(900);
        for (let i = 0; i < exampleChat.length; i++) {
          if (cancelled) return;
          if (exampleChat[i].from === "ai") {
            setTyping(true);
            await wait(1500);
            if (cancelled) return;
            setTyping(false);
          } else {
            await wait(700);
            if (cancelled) return;
          }
          setCount(i + 1);
          await wait(1100);
        }
        await wait(6000);
      }
    };
    play();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Illustration of a customer chatting with the Tech Watsapi AI on a phone. ${transcript}`}
      className={cn(
        "relative aspect-[9/18.5] w-full rounded-[3.2em] bg-ink p-[0.8em] shadow-lift ring-1 ring-black/10",
        className,
      )}
    >
      <div aria-hidden className="flex h-full flex-col overflow-hidden rounded-[2.5em] bg-[#efeae2] leading-[1.35]">
        {/* Chat header */}
        <div className="flex items-center gap-[0.8em] bg-brand-800 px-[1.2em] pb-[0.9em] pt-[2.2em] text-white">
          <div className="grid size-[2.6em] place-items-center rounded-full bg-white/20 font-display text-[1.1em] font-bold">
            D
          </div>
          <div className="min-w-0">
            <p className="truncate text-[1.2em] font-semibold">Demo Store</p>
            <p className="text-[0.9em] text-brand-100">{typing ? "typing…" : "online"}</p>
          </div>
        </div>

        {/* Messages, newest at the bottom */}
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-[0.7em] overflow-hidden px-[0.9em] py-[1em]">
          <AnimatePresence initial={false}>
            {exampleChat.slice(0, count).map((m, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className={cn(
                  "max-w-[86%] rounded-[1.1em] px-[0.9em] py-[0.65em] text-[1.05em] shadow-sm",
                  m.from === "customer"
                    ? "origin-bottom-right self-end rounded-br-[0.3em] bg-[#d9fdd3] text-ink"
                    : "origin-bottom-left self-start rounded-bl-[0.3em] bg-white text-ink",
                )}
              >
                {m.text}
                {m.link ? <span className="mt-[0.3em] block break-all text-sky-700 underline">{m.link}</span> : null}
              </motion.div>
            ))}
            {typing ? (
              <motion.div
                key="typing"
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="flex gap-[0.35em] self-start rounded-[1.1em] rounded-bl-[0.3em] bg-white px-[1em] py-[0.9em] shadow-sm"
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="size-[0.55em] animate-typing rounded-full bg-slate-400"
                    style={{ animationDelay: `${d * 0.16}s` }}
                  />
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-[0.6em] px-[0.9em] pb-[1.2em]">
          <div className="flex-1 rounded-full bg-white px-[1.1em] py-[0.7em] text-[1em] text-slate-400">Message</div>
          <div className="size-[2.6em] rounded-full bg-brand-600" />
        </div>
      </div>
      {/* Speaker notch */}
      <div aria-hidden className="absolute left-1/2 top-[1.3em] h-[1.1em] w-[5.5em] -translate-x-1/2 rounded-full bg-ink" />
    </div>
  );
}
