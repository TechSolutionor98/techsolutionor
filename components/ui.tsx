"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";
import { cn } from "@/lib/cn";

export const easeOut = [0.21, 0.6, 0.35, 1] as const;

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  title,
  lead,
  align = "center",
  dark = false,
  className,
}: {
  title: string;
  lead?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <h2
        className={cn(
          "font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className={cn("mt-4 text-lg leading-relaxed text-pretty", dark ? "text-brand-100/85" : "text-muted")}>
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

type ButtonVariant = "primary" | "secondary" | "light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-700 text-white shadow-[0_10px_24px_-10px_rgb(4_120_87/0.7)] hover:bg-brand-800 hover:-translate-y-0.5",
  secondary: "bg-white text-ink ring-1 ring-inset ring-slate-200 hover:ring-brand-500 hover:text-brand-800",
  light: "bg-white text-brand-800 shadow-lift hover:-translate-y-0.5 hover:bg-brand-50",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
} & Omit<React.ComponentProps<"a">, "href" | "className" | "children">) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition duration-200 active:translate-y-0",
        size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-[0.95rem]",
        buttonStyles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Counts up from zero the first time it scrolls into view. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (value) => {
        node.textContent = Math.round(value).toString();
      },
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
}

export function IllustrationNote({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs text-muted", className)}>{children ?? "Illustration with demo data."}</p>
  );
}
