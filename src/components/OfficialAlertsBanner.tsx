"use client";

import React from "react";
import { OfficialAlert } from "@/data/officialAlerts";
import { AlertOctagon, AlertTriangle, ShieldCheck, ExternalLink, Info } from "lucide-react";

interface OfficialAlertsBannerProps {
  alerts: OfficialAlert[];
  districtName: string;
}

export default function OfficialAlertsBanner({ alerts, districtName }: OfficialAlertsBannerProps) {
  const hasAlerts = alerts.length > 0;

  return (
    <div className="space-y-3">
      {/* Distinction & Disclaimer Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-4 shadow-sm border border-indigo-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-xs uppercase tracking-wider text-indigo-300">
                Data Policy & Scientific Distinction
              </span>
              <span className="px-2 py-0.2 rounded-full text-[10px] bg-indigo-800 text-indigo-200 font-mono">
                Mandatory Notice
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              This system provides an <strong>AI-based regional risk assessment</strong> using historical and environmental datasets. 
              It does <strong>NOT</strong> claim to predict exact disaster occurrence or timing. 
              <strong> Official Government Warnings</strong> issued by IMD, KSNDMC, and KSDMA are published separately below and always take legal precedence.
            </p>
          </div>
        </div>
      </div>

      {/* Official Government Alerts Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Verified Government Alerts: {districtName}
            </h3>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {alerts.length} Active Notice{alerts.length === 1 ? "" : "s"}
          </span>
        </div>

        {hasAlerts ? (
          <div className="mt-3.5 space-y-3">
            {alerts.map(alert => {
              const isRed = alert.alertLevel === "RED_WARNING";
              const isOrange = alert.alertLevel === "ORANGE_ALERT";

              const badgeColor = isRed
                ? "bg-rose-100 text-rose-800 border-rose-300"
                : isOrange
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : "bg-yellow-100 text-yellow-800 border-yellow-300";

              return (
                <div
                  key={alert.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[11px] font-extrabold rounded-md border ${badgeColor}`}>
                        {alert.alertLevel.replace("_", " ")}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {alert.headline}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Valid until: {new Date(alert.expiresAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {alert.message}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Authority:</span>
                      <span>{alert.issuingAuthority}</span>
                    </div>
                    <a
                      href={alert.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-indigo-600 hover:underline font-semibold"
                    >
                      <span>Official Source Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center text-xs text-slate-500">
            No active emergency weather warnings for {districtName} from IMD Bengaluru or KSNDMC at this time.
          </div>
        )}
      </div>
    </div>
  );
}
