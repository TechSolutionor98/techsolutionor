import Link from "next/link";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-white text-slate-900 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#41B349]/10 border border-[#41B349]/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#34953C]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#2d8234]">
            Error 404 • Page Not Found
          </span>
        </div>

        {/* 404 Visual Display - Clean & Sharp */}
        <div className="mb-6 select-none">
          <h1 
            className="text-8xl sm:text-9xl md:text-[13rem] font-black tracking-tighter leading-none text-slate-900"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            4<span className="text-[#34953C]">0</span>4
          </h1>
        </div>

        {/* Heading & Subtitle */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Lost in Cyberspace?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed">
          The page you are looking for might have been removed, renamed, or temporarily unavailable. Let&apos;s get you back on track.
        </p>

        {/* Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#34953C] hover:bg-[#2d8234] transition-colors duration-200"
          >
            <Home size={18} />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors duration-200"
          >
            <Compass size={18} className="text-[#34953C]" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
