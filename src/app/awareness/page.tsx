"use client";

import React, { useState } from "react";
import { DISASTER_KNOWLEDGE_BASE, DisasterGuideline, KARNATAKA_EMERGENCY_CONTACTS } from "@/data/disasterKnowledge";
import { 
  Waves, 
  SunMedium, 
  Mountain, 
  Zap, 
  Flame, 
  Activity, 
  Wind,
  CheckCircle,
  XCircle,
  ShieldCheck,
  PhoneCall,
  Clock,
  Briefcase,
  AlertTriangle
} from "lucide-react";

const DISASTER_ICONS: Record<string, React.ElementType> = {
  flood: Waves,
  drought: SunMedium,
  landslide: Mountain,
  lightning: Zap,
  heatwave: Flame,
  earthquake: Activity,
  cyclone: Wind
};

export default function AwarenessPage() {
  const disasterKeys = Object.keys(DISASTER_KNOWLEDGE_BASE);
  const [activeDisasterKey, setActiveDisasterKey] = useState<string>("flood");
  const [activePhaseTab, setActivePhaseTab] = useState<"before" | "during" | "after">("before");

  const currentDisaster: DisasterGuideline = DISASTER_KNOWLEDGE_BASE[activeDisasterKey];
  const Icon = DISASTER_ICONS[activeDisasterKey] || AlertTriangle;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Authoritative NDMA & KSDMA Safety Framework</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
          Karnataka Disaster Awareness & Preparedness Guide
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Standardized operating procedures, early warning indicators, and life-safety guidelines calibrated for Karnataka's 7 major natural hazards.
        </p>

        {/* Disaster Type Navigation Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {disasterKeys.map(key => {
            const item = DISASTER_KNOWLEDGE_BASE[key];
            const ItemIcon = DISASTER_ICONS[key] || AlertTriangle;
            const isActive = activeDisasterKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveDisasterKey(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-indigo-600 dark:text-white shadow-md"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                <ItemIcon className="w-4 h-4" />
                <span>{item.title.split("&")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Detailed Guidelines */}
        <div className="lg:col-span-2 space-y-6">
          {/* Meaning & Causes */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {currentDisaster.title}
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {currentDisaster.kannadaTitle}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Scientific Definition
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentDisaster.scientificMeaning}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Primary Triggers in Karnataka
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {currentDisaster.causesInKarnataka.map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Early Warning Indicators & Signs</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentDisaster.warningSigns.map((sign, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-200">
                    {sign}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3 Phases: Before, During, After */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                Action Protocols Across Event Phases
              </h3>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                {(["before", "during", "after"] as const).map(phase => (
                  <button
                    key={phase}
                    onClick={() => setActivePhaseTab(phase)}
                    className={`px-3 py-1 rounded-lg capitalize transition ${
                      activePhaseTab === phase
                        ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {phase}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {currentDisaster.phases[activePhaseTab].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Do's & Don'ts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DO's */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-3xl p-5 border border-emerald-200/80 dark:border-emerald-900/40 space-y-3">
              <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Recommended Actions (DO&apos;S)
              </h3>
              <ul className="space-y-2 text-xs text-emerald-950 dark:text-emerald-200">
                {currentDisaster.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'TS */}
            <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-3xl p-5 border border-rose-200/80 dark:border-rose-900/40 space-y-3">
              <h3 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                Hazardous Pitfalls (DON&apos;TS)
              </h3>
              <ul className="space-y-2 text-xs text-rose-950 dark:text-rose-200">
                {currentDisaster.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Col: Emergency Grab Bag & Control Rooms */}
        <div className="space-y-6">
          {/* Emergency Kit Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                72-Hour Family Grab-Bag Kit
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              NDMA recommended supply checklist for {currentDisaster.title.split("&")[0]}:
            </p>

            <div className="space-y-2">
              {currentDisaster.emergencyKitList.map((kitItem, idx) => (
                <label key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-100 transition">
                  <input type="checkbox" className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500" />
                  <span>{kitItem}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Emergency Helplines */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-rose-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Karnataka State Helplines
              </h3>
            </div>
            <div className="space-y-2.5 text-xs">
              {KARNATAKA_EMERGENCY_CONTACTS.slice(0, 4).map(contact => (
                <div key={contact.number} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{contact.name}</div>
                    <div className="text-[11px] text-slate-400">{contact.description}</div>
                  </div>
                  <a
                    href={`tel:${contact.number}`}
                    className="font-mono font-black text-rose-400 text-base hover:underline"
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Authoritative Sources Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
            <span className="font-bold uppercase text-slate-700 dark:text-slate-300 block">Verified Standards Reference:</span>
            {currentDisaster.authoritativeSources.map((src, idx) => (
              <div key={idx}>• {src}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
