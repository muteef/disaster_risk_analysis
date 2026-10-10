"use client";

import React, { useState } from "react";
import { KARNATAKA_DISTRICTS, DistrictProfile } from "@/data/districts";
import { computeDistrictRiskAssessment, SingleDisasterAssessment } from "@/lib/riskEngine";
import { getAlertsForDistrict } from "@/data/officialAlerts";
import MapWrapper from "@/components/MapWrapper";
import RiskCard from "@/components/RiskCard";
import ExplainableModal from "@/components/ExplainableModal";
import HistoricalCharts from "@/components/HistoricalCharts";
import OfficialAlertsBanner from "@/components/OfficialAlertsBanner";
import Link from "next/link";
import { 
  ShieldCheck, 
  MapPin, 
  SlidersHorizontal, 
  BotMessageSquare, 
  BookOpen, 
  Sparkles,
  PhoneCall,
  Info,
  Droplets,
  Thermometer,
  Wind,
  Compass
} from "lucide-react";

export default function DashboardPage() {
  // Default to Kodagu (high-profile disaster-prone district in Western Ghats)
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictProfile>(
    KARNATAKA_DISTRICTS.find(d => d.id === "kodagu") || KARNATAKA_DISTRICTS[0]
  );

  const [activeRiskLayer, setActiveRiskLayer] = useState<"composite" | "flood" | "drought" | "landslide">("composite");
  const [modalAssessment, setModalAssessment] = useState<SingleDisasterAssessment | null>(null);

  // Compute live multi-hazard risk assessment
  const assessment = computeDistrictRiskAssessment(selectedDistrict);
  const districtAlerts = getAlertsForDistrict(selectedDistrict.name);

  return (
    <div className="space-y-8 pb-16">
      {/* 1. HERO & DISTRICT SELECTOR SECTION */}
      <section className="bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Hazard Regional AI Susceptibility Framework</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Karnataka Regional Disaster Risk Assessment
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Synthesizing historical telemetry, topographical elevation, and meteorology across all 31 Karnataka districts. 
              Trained on Random Forest ensembles for Flood, Drought, and Landslides.
            </p>
          </div>

          {/* District Dropdown Selector */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 min-w-[280px]">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Select Karnataka District (31 Total)</span>
            </label>
            <select
              value={selectedDistrict.id}
              onChange={(e) => {
                const found = KARNATAKA_DISTRICTS.find(d => d.id === e.target.value);
                if (found) setSelectedDistrict(found);
              }}
              className="w-full text-sm font-bold bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {KARNATAKA_DISTRICTS.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.kannadaName}) — {d.region}
                </option>
              ))}
            </select>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Basin: {selectedDistrict.riverBasins[0]}</span>
              <span>Elevation: {selectedDistrict.elevationM} m</span>
            </div>
          </div>
        </div>

        {/* Quick Regional Status Badges */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/60 dark:border-slate-800">
          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Compass className="w-3 h-3 text-indigo-500" /> Agro-Climatic Zone
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block truncate">
              {selectedDistrict.region}
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Droplets className="w-3 h-3 text-blue-500" /> Mean Annual Rain
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block">
              {selectedDistrict.avgAnnualRainfallMm} mm / year
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-amber-500" /> Current Baseline Temp
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block">
              {selectedDistrict.baselineWeather.temperature}°C (RH {selectedDistrict.baselineWeather.humidity}%)
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-rose-500" /> Composite Risk Index
            </span>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">
              {assessment.compositeRiskIndex}% ({assessment.overallLevel})
            </span>
          </div>
        </div>
      </section>

      {/* 2. OFFICIAL GOVERNMENT ALERTS vs AI DISTINCTION BANNER */}
      <section>
        <OfficialAlertsBanner 
          alerts={districtAlerts} 
          districtName={selectedDistrict.name} 
        />
      </section>

      {/* 3. INTERACTIVE KARNATAKA GIS MAP SECTION */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-600" />
              Interactive Karnataka GIS Hazard Map
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any district polygon or marker to load real-time AI risk profiles and historical records.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Currently Focused: <strong className="text-slate-900 dark:text-white">{selectedDistrict.name}</strong>
          </div>
        </div>

        <MapWrapper
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
          activeRiskType={activeRiskLayer}
          onRiskTypeChange={setActiveRiskLayer}
        />
      </section>

      {/* 4. MULTI-DISASTER AI RISK ESTIMATES (7 DISASTERS) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Multi-Hazard AI Risk Estimates: {selectedDistrict.name}
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                Data-Driven
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Individual susceptibility models evaluated for current meteorological and topographical indicators.
            </p>
          </div>

          <Link
            href="/simulate"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 self-start sm:self-auto transition"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Open Simulation Studio</span>
          </Link>
        </div>

        {/* Disaster Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <RiskCard 
            assessment={assessment.disasters.flood} 
            onExplain={setModalAssessment} 
          />
          <RiskCard 
            assessment={assessment.disasters.drought} 
            onExplain={setModalAssessment} 
          />
          <RiskCard 
            assessment={assessment.disasters.landslide} 
            onExplain={setModalAssessment} 
          />
          <RiskCard 
            assessment={assessment.disasters.lightning} 
            onExplain={setModalAssessment} 
          />
          <RiskCard 
            assessment={assessment.disasters.heatwave} 
            onExplain={setModalAssessment} 
          />
          <RiskCard 
            assessment={assessment.disasters.earthquake} 
            onExplain={setModalAssessment} 
          />
          <RiskCard 
            assessment={assessment.disasters.cyclone} 
            onExplain={setModalAssessment} 
          />

          {/* Quick AI Assistant Card in Grid */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm border border-indigo-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BotMessageSquare className="w-6 h-6 text-indigo-400" />
                <h3 className="font-bold text-sm">Need Safety Advice?</h3>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Consult our RAG-powered AI safety assistant for emergency procedures, checklists, or questions regarding {selectedDistrict.name}.
              </p>
            </div>
            <Link
              href="/assistant"
              className="mt-4 w-full py-2 px-3 text-center rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold transition shadow-sm"
            >
              Ask AI Assistant
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HISTORICAL ANALYTICS & CLIMATOLOGY CHARTS (CHART.JS) */}
      <section>
        <HistoricalCharts district={selectedDistrict} />
      </section>

      {/* 6. EMERGENCY CONTACTS FOR KARNATAKA */}
      <section className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <PhoneCall className="w-5 h-5 text-rose-600" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Verified Karnataka Emergency Control Rooms & Helplines
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Unified Emergency SOS</span>
            <span className="text-lg font-black text-rose-600 block mt-0.5">112</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">Police, Fire, and Ambulance</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">State Disaster Control Room</span>
            <span className="text-lg font-black text-amber-600 block mt-0.5">1070</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">State Emergency Operations (SEOC)</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">District Disaster Cell</span>
            <span className="text-lg font-black text-indigo-600 block mt-0.5">1077</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">Deputy Commissioner Control Room</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">KSNDMC Varuna Mitra</span>
            <span className="text-lg font-black text-emerald-600 block mt-0.5">9243345433</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">24x7 Weather & Rainfall Advisory</p>
          </div>
        </div>
      </section>

      {/* Explainable AI Modal */}
      <ExplainableModal
        assessment={modalAssessment}
        districtName={selectedDistrict.name}
        onClose={() => setModalAssessment(null)}
      />
    </div>
  );
}
