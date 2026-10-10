"use client";

import React, { useState } from "react";
import { KARNATAKA_DISTRICTS, DistrictProfile } from "@/data/districts";
import { computeDistrictRiskAssessment, SingleDisasterAssessment } from "@/lib/riskEngine";
import RiskCard from "@/components/RiskCard";
import ExplainableModal from "@/components/ExplainableModal";
import { 
  SlidersHorizontal, 
  RefreshCw, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  CalendarDays, 
  Wind,
  Sparkles,
  Info
} from "lucide-react";

export default function SimulatePage() {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictProfile>(
    KARNATAKA_DISTRICTS.find(d => d.id === "kodagu") || KARNATAKA_DISTRICTS[0]
  );

  // Simulation Overrides
  const [rainfall24h, setRainfall24h] = useState<number>(selectedDistrict.baselineWeather.rainfall24h);
  const [rainfall7d, setRainfall7d] = useState<number>(selectedDistrict.baselineWeather.rainfall7d);
  const [temperature, setTemperature] = useState<number>(selectedDistrict.baselineWeather.temperature);
  const [soilMoisture, setSoilMoisture] = useState<number>(selectedDistrict.baselineWeather.soilMoisture);
  const [consecutiveDryDays, setConsecutiveDryDays] = useState<number>(selectedDistrict.baselineWeather.consecutiveDryDays);
  const [windSpeed, setWindSpeed] = useState<number>(selectedDistrict.baselineWeather.windSpeed);

  const [modalAssessment, setModalAssessment] = useState<SingleDisasterAssessment | null>(null);

  // Compute simulated risk
  const simulatedAssessment = computeDistrictRiskAssessment(selectedDistrict, {
    rainfall24h,
    rainfall7d,
    temperature,
    soilMoisture,
    consecutiveDryDays,
    windSpeed
  });

  // Reset to district baseline
  const handleResetToBaseline = () => {
    setRainfall24h(selectedDistrict.baselineWeather.rainfall24h);
    setRainfall7d(selectedDistrict.baselineWeather.rainfall7d);
    setTemperature(selectedDistrict.baselineWeather.temperature);
    setSoilMoisture(selectedDistrict.baselineWeather.soilMoisture);
    setConsecutiveDryDays(selectedDistrict.baselineWeather.consecutiveDryDays);
    setWindSpeed(selectedDistrict.baselineWeather.windSpeed);
  };

  // Change district and sync baseline
  const handleDistrictChange = (districtId: string) => {
    const found = KARNATAKA_DISTRICTS.find(d => d.id === districtId);
    if (found) {
      setSelectedDistrict(found);
      setRainfall24h(found.baselineWeather.rainfall24h);
      setRainfall7d(found.baselineWeather.rainfall7d);
      setTemperature(found.baselineWeather.temperature);
      setSoilMoisture(found.baselineWeather.soilMoisture);
      setConsecutiveDryDays(found.baselineWeather.consecutiveDryDays);
      setWindSpeed(found.baselineWeather.windSpeed);
    }
  };

  // Preset Scenario Presets
  const applyPreset = (preset: "monsoon_surge" | "severe_drought" | "heatwave_peak" | "cyclone_squall") => {
    if (preset === "monsoon_surge") {
      setRainfall24h(165);
      setRainfall7d(440);
      setSoilMoisture(96);
      setConsecutiveDryDays(0);
      setTemperature(22);
    } else if (preset === "severe_drought") {
      setRainfall24h(0);
      setRainfall7d(0);
      setConsecutiveDryDays(45);
      setSoilMoisture(15);
      setTemperature(41);
    } else if (preset === "heatwave_peak") {
      setTemperature(43.5);
      setSoilMoisture(18);
      setRainfall24h(0);
      setConsecutiveDryDays(30);
    } else if (preset === "cyclone_squall") {
      setWindSpeed(68);
      setRainfall24h(130);
      setRainfall7d(260);
      setSoilMoisture(89);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive What-If Simulation Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
              Dynamic Meteorological Scenario Simulator
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Adjust environmental indicators to evaluate how our machine learning models respond to extreme precipitation, prolonged dry spells, or temperature anomalies in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleResetToBaseline}
              className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Baseline</span>
            </button>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 flex-wrap text-xs">
          <span className="font-semibold text-slate-400">Quick Test Scenarios:</span>
          <button
            onClick={() => applyPreset("monsoon_surge")}
            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium border border-blue-200 transition"
          >
            🌧️ Monsoon Surge (165mm/24h)
          </button>
          <button
            onClick={() => applyPreset("severe_drought")}
            className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium border border-amber-200 transition"
          >
            ☀️ Severe Drought (45 Dry Days)
          </button>
          <button
            onClick={() => applyPreset("heatwave_peak")}
            className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium border border-rose-200 transition"
          >
            🔥 Heatwave Peak (43.5°C)
          </button>
          <button
            onClick={() => applyPreset("cyclone_squall")}
            className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 font-medium border border-teal-200 transition"
          >
            💨 Coastal Gale Squall (68 km/h)
          </button>
        </div>
      </div>

      {/* Simulator Controls & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Sliders */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Select Test District
            </label>
            <select
              value={selectedDistrict.id}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full text-sm font-bold bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-indigo-500"
            >
              {KARNATAKA_DISTRICTS.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.region})
                </option>
              ))}
            </select>
          </div>

          {/* Slider 1: 24h Rainfall */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                24h Precipitation
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{rainfall24h} mm</span>
            </div>
            <input
              type="range"
              min={0}
              max={250}
              step={2}
              value={rainfall24h}
              onChange={(e) => setRainfall24h(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 mm (Dry)</span>
              <span>115 mm (Heavy)</span>
              <span>250 mm (Extreme)</span>
            </div>
          </div>

          {/* Slider 2: 7d Rainfall */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
                7-Day Cumulative Rain
              </span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{rainfall7d} mm</span>
            </div>
            <input
              type="range"
              min={0}
              max={600}
              step={5}
              value={rainfall7d}
              onChange={(e) => setRainfall7d(Number(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 mm</span>
              <span>250 mm</span>
              <span>600 mm</span>
            </div>
          </div>

          {/* Slider 3: Soil Moisture */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Droplets className="w-3.5 h-3.5 text-teal-500" />
                Soil Saturation %
              </span>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{soilMoisture}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={99}
              step={1}
              value={soilMoisture}
              onChange={(e) => setSoilMoisture(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10% (Wilting)</span>
              <span>50% (Normal)</span>
              <span>99% (Fully Saturated)</span>
            </div>
          </div>

          {/* Slider 4: Temperature */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                Ambient Temperature
              </span>
              <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{temperature}°C</span>
            </div>
            <input
              type="range"
              min={16}
              max={46}
              step={0.5}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-amber-600 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>16°C</span>
              <span>35°C</span>
              <span>46°C (Severe Heat)</span>
            </div>
          </div>

          {/* Slider 5: Consecutive Dry Days */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <CalendarDays className="w-3.5 h-3.5 text-orange-500" />
                Consecutive Rainless Days
              </span>
              <span className="font-mono text-orange-600 dark:text-orange-400 font-bold">{consecutiveDryDays} days</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={1}
              value={consecutiveDryDays}
              onChange={(e) => setConsecutiveDryDays(Number(e.target.value))}
              className="w-full accent-orange-600 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0 (Monsoon)</span>
              <span>20 (Dry Spell)</span>
              <span>60 (Drought Crisis)</span>
            </div>
          </div>

          {/* Slider 6: Wind Speed */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <Wind className="w-3.5 h-3.5 text-purple-500" />
                Sustained Wind Velocity
              </span>
              <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{windSpeed} km/h</span>
            </div>
            <input
              type="range"
              min={5}
              max={85}
              step={2}
              value={windSpeed}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
              className="w-full accent-purple-600 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5 km/h</span>
              <span>40 km/h</span>
              <span>85 km/h (Gale Force)</span>
            </div>
          </div>
        </div>

        {/* Right Col: Live Recalculated Output Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Simulated Output For:
              </span>
              <h2 className="text-base font-bold text-white">
                {selectedDistrict.name} ({selectedDistrict.kannadaName})
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Composite Risk</span>
              <div className="text-xl font-extrabold text-rose-400">
                {simulatedAssessment.compositeRiskIndex}% ({simulatedAssessment.overallLevel})
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <RiskCard 
              assessment={simulatedAssessment.disasters.flood} 
              onExplain={setModalAssessment} 
            />
            <RiskCard 
              assessment={simulatedAssessment.disasters.drought} 
              onExplain={setModalAssessment} 
            />
            <RiskCard 
              assessment={simulatedAssessment.disasters.landslide} 
              onExplain={setModalAssessment} 
            />
            <RiskCard 
              assessment={simulatedAssessment.disasters.lightning} 
              onExplain={setModalAssessment} 
            />
            <RiskCard 
              assessment={simulatedAssessment.disasters.heatwave} 
              onExplain={setModalAssessment} 
            />
            <RiskCard 
              assessment={simulatedAssessment.disasters.cyclone} 
              onExplain={setModalAssessment} 
            />
          </div>
        </div>
      </div>

      {/* Explainable Modal */}
      <ExplainableModal
        assessment={modalAssessment}
        districtName={selectedDistrict.name}
        onClose={() => setModalAssessment(null)}
      />
    </div>
  );
}
