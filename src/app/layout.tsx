import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Karnataka Disaster AI | Regional Disaster Risk Assessment & Awareness System",
  description: "AI-based regional multi-hazard disaster risk assessment and awareness platform for Karnataka's 31 districts. Combining Scikit-learn ML models, Leaflet GIS, and verified NDMA/KSDMA safety guidance.",
  keywords: ["Karnataka Disaster Management", "KSNDMC", "IMD", "Disaster AI", "Flood Risk", "Landslide", "Drought", "Kodagu", "Bengaluru"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased font-sans">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              AI-Based Regional Disaster Risk Assessment and Awareness System for Karnataka
            </p>
            <p className="max-w-2xl mx-auto text-[11px] text-slate-400">
              Academic Project Demonstration. Risk scores are data-driven estimates derived from historical meteorological patterns. Official alerts issued by IMD, KSNDMC, and KSDMA take legal priority.
            </p>
            <div className="pt-2 flex items-center justify-center gap-4 text-[11px] font-medium text-slate-600 dark:text-slate-400">
              <span>Emergency SOS: <strong>112</strong></span>
              <span>•</span>
              <span>State Emergency Operations: <strong>1070</strong></span>
              <span>•</span>
              <span>KSNDMC Varuna Mitra: <strong>9243345433</strong></span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
