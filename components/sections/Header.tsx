"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";
import { cn } from "@/lib/cn";
import { navLinks, site } from "@/lib/site";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-white/85 shadow-[0_1px_0_rgb(6_78_59/0.08),0_10px_30px_-18px_rgb(6_78_59/0.35)] backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#top" className="flex shrink-0 items-center" aria-label="Tech Watsapi, back to top">
          <Image src="/logo.png" alt="Tech Watsapi" width={900} height={353} priority className="h-11 w-auto" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-medium text-muted-strong transition-colors hover:bg-brand-100 hover:text-brand-800"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={site.appUrl}
            className="hidden min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-semibold text-ink hover:text-brand-700 sm:inline-flex"
          >
            Sign in
          </a>
          <ButtonLink href={site.demoLink}>Book a demo</ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full text-ink hover:bg-brand-100 lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
            className="overflow-hidden border-t border-brand-100 lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
              {[...navLinks, { label: "Sign in", href: site.appUrl }].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-ink hover:bg-brand-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
