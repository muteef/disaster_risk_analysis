"use client";

import React from "react";
import { 
  Waves, 
  SunMedium, 
  Mountain, 
  Zap, 
  Flame, 
  Activity, 
  Wind,
  HelpCircle,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { SingleDisasterAssessment, getRiskColorClass } from "@/lib/riskEngine";

interface RiskCardProps {
  assessment: SingleDisasterAssessment;
  onExplain: (assessment: SingleDisasterAssessment) => void;
}

const DISASTER_ICONS: Record<string, React.ElementType> = {
  Flood: Waves,
  Drought: SunMedium,
  Landslide: Mountain,
  Lightning: Zap,
  Heatwave: Flame,
  Earthquake: Activity,
  Cyclone: Wind
};

export default function RiskCard({ assessment, onExplain }: RiskCardProps) {
  const Icon = DISASTER_ICONS[assessment.disaster] || AlertTriangle;
  const colorStyles = getRiskColorClass(assessment.riskLevel);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorStyles.bg} ${colorStyles.text}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {assessment.disaster}
                </h3>
                <span className="text-xs text-slate-400 font-normal">
                  ({assessment.kannadaName})
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                {assessment.modelMethod === "Random Forest ML Regressor" ? "ML Model" : "Hazard Profile"}
              </span>
            </div>
          </div>

          {/* Risk Level Badge */}
          <span className={`px-2.5 py-1 text-xs font-extrabold rounded-lg border ${colorStyles.badge}`}>
            {assessment.riskLevel}
          </span>
        </div>

        {/* Big Percentage Score Display */}
        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {assessment.riskScore}%
            </span>
            <span className="text-xs font-semibold text-slate-400 ml-1.5">
              AI Risk Estimate
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {assessment.confidenceScore}% conf.
          </span>
        </div>

        {/* Dynamic Risk Gauge / Bar */}
        <div className="mt-2.5 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${assessment.riskScore}%`,
              backgroundColor: colorStyles.hex
            }}
          />
        </div>

        {/* Top Contributing Factor Teaser */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
            <strong className="text-slate-700 dark:text-slate-200">Key Driver:</strong>{" "}
            {assessment.contributingFactors[0]?.factor || "Topographical baseline"} (
            {assessment.contributingFactors[0]?.observedValue})
          </div>
        </div>
      </div>

      {/* Action Footer: XAI Explainer Trigger */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 uppercase font-semibold">
          Explainable AI
        </span>
        <button
          onClick={() => onExplain(assessment)}
          className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
        >
          <span>Factors breakdown</span>
          <TrendingUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
