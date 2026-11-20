import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/logo.png", width: 900, height: 353, alt: "Tech Watsapi logo" }],
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#10B981",
  width: "device-width",
  initialScale: 1,
};

export default function WAMarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-brand-800 focus:shadow-lift"
      >
        Skip to content
      </a>
      <Providers>{children}</Providers>
    </div>
  );
}
