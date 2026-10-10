"use client";

import React from "react";
import { X, Sparkles, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { SingleDisasterAssessment, getRiskColorClass } from "@/lib/riskEngine";

interface ExplainableModalProps {
  assessment: SingleDisasterAssessment | null;
  districtName: string;
  onClose: () => void;
}

export default function ExplainableModal({
  assessment,
  districtName,
  onClose
}: ExplainableModalProps) {
  if (!assessment) return null;

  const colorStyles = getRiskColorClass(assessment.riskLevel);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Explainable AI (XAI): {assessment.disaster} Risk
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Diagnostic feature contribution analysis for <strong>{districtName}</strong> ({assessment.kannadaName})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Assessment Banner */}
        <div className={`mt-4 p-4 rounded-xl border ${colorStyles.border} ${colorStyles.bg} flex items-center justify-between`}>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              AI Risk Estimate Score
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {assessment.riskScore}%
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${colorStyles.badge}`}>
                {assessment.riskLevel} SUSCEPTIBILITY
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Model Engine</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {assessment.modelMethod}
            </span>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Confidence: {assessment.confidenceScore}%
            </div>
          </div>
        </div>

        {/* Factor Breakdown */}
        <div className="mt-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-500" />
            Top Contributing Meteorological & Physical Factors
          </h3>

          <div className="space-y-3">
            {assessment.contributingFactors.map((factor, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {factor.factor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                      {factor.observedValue}
                    </span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      ~{factor.weightPercent}% weight
                    </span>
                  </div>
                </div>

                {/* Contribution weight visual bar */}
                <div className="mt-2.5 w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${factor.weightPercent}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {factor.scientificRationale}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Rationale & Honesty Disclaimer */}
        <div className="mt-5 p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs space-y-1 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Academic Interpretation Guidelines</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
            Feature weights represent Scikit-Learn Gini importance across the historical dataset. Feature importance indicates statistical correlation within the ensemble decision trees and must not be misinterpreted as direct physical causality.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
}
