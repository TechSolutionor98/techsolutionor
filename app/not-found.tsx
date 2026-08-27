import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col justify-center items-center bg-slate-50 pt-20 pb-12">
        <div className="text-center px-4">
          <AlertCircle size={100} className="mx-auto text-blue-600 mb-8 opacity-20" />
          <h1 className="text-7xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-6">Page Not Found</h2>
          <p className="text-slate-500 mb-10 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link 
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg inline-block"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
