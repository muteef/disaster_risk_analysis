"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldAlert, 
  MapPin, 
  SlidersHorizontal, 
  BookOpen, 
  BellRing, 
  BotMessageSquare, 
  FileText, 
  Menu, 
  X,
  PhoneCall
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Dashboard", icon: MapPin },
    { href: "/simulate", label: "Simulation Studio", icon: SlidersHorizontal },
    { href: "/awareness", label: "Safety Awareness", icon: BookOpen },
    { href: "/alerts", label: "Verified Alerts", icon: BellRing },
    { href: "/assistant", label: "AI Safety Assistant", icon: BotMessageSquare },
    { href: "/docs", label: "Project Docs", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Emergency Ticker */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px]">Academic Research System:</span>
          <span className="text-slate-300 truncate">
            Regional Disaster Risk Assessment & Awareness Platform for Karnataka (31 Districts Active)
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] shrink-0 font-medium">
          <div className="flex items-center gap-1.5 text-rose-300">
            <PhoneCall className="w-3 h-3 text-rose-400" />
            <span>Emergency SOS: <strong>112</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <span>State Control Room: <strong>1070</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                  Karnataka <span className="text-rose-600 dark:text-rose-400">Disaster AI</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                ಕರ್ನಾಟಕ ಪ್ರಾದೇಶಿಕ ವಿಪತ್ತು ಅಪಾಯ ಅಂದಾಜು ವ್ಯವಸ್ಥೆ
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-slate-800 dark:text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-rose-400" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-slate-800 dark:text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4 text-rose-500" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 px-2">
            <span>Emergency: <strong>112</strong></span>
            <span>State Control: <strong>1070</strong></span>
          </div>
        </div>
      )}
    </header>
  );
}
