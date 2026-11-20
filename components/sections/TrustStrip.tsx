import { Building2, PackageSearch, QrCode, ShieldCheck } from "lucide-react";
import { Container, Reveal } from "@/components/ui";

const points = [
  { icon: Building2, text: "A product by Tech Solutionor" },
  { icon: QrCode, text: "No paid WhatsApp Business API needed" },
  { icon: PackageSearch, text: "AI that answers from your real product list" },
  { icon: ShieldCheck, text: "Every business fully separate" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why businesses choose Tech Watsapi" className="border-y border-brand-100 bg-white">
      <Container>
        <ul className="grid grid-cols-1 divide-y divide-brand-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {points.map((p, i) => (
            <li key={p.text}>
              <Reveal delay={i * 0.08} y={14} className="flex items-center gap-3 py-5 sm:px-3 lg:justify-center">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <span className="text-[0.95rem] font-semibold leading-snug text-ink">{p.text}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
