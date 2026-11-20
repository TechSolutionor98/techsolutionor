/**
 * Everything that must be filled in before the page goes live (Part 5 of the brief).
 * Replace each placeholder here and it updates across the whole page.
 */
export const site = {
  name: "Tech Watsapi",
  maker: "Tech Solutionor",
  makerUrl: "https://techsolutionor.com",

  /** [DEMO_LINK]: booking page, contact form, or a wa.me/ link. Until set, buttons scroll to the final call to action. */
  demoLink: "#book-demo",
  /** [APP_URL]: where customers sign in to the app. */
  appUrl: "#",

  contactEmail: "[CONTACT_EMAIL]",
  contactPhone: "[CONTACT_PHONE]",
  officeAddress: "[OFFICE_ADDRESS]",

  /** Privacy Policy and Terms pages do not exist yet. */
  privacyUrl: "#",
  termsUrl: "#",

  year: 2026,

  title: "Tech Watsapi | WhatsApp Marketing & AI Sales Assistant by Tech Solutionor",
  description:
    "Link WhatsApp with a QR code, send safe personalised campaigns, and let AI answer customers from your real product list. Multi-business workspaces and team access. By Tech Solutionor.",
} as const;

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "AI Assistant", href: "#ai" },
  { label: "Safety", href: "#safety" },
  { label: "For Agencies", href: "#agencies" },
  { label: "FAQ", href: "#faq" },
] as const;
