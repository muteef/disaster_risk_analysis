"use client";

import React, { useState } from "react";
import { VERIFIED_OFFICIAL_ALERTS, OfficialAlert } from "@/data/officialAlerts";
import { KARNATAKA_DISTRICTS } from "@/data/districts";
import { 
  BellRing, 
  ShieldCheck, 
  ExternalLink, 
  Filter, 
  AlertTriangle, 
  PlusCircle, 
  Calendar,
  CheckCircle2,
  Info
} from "lucide-react";

export default function AlertsPage() {
  const [alertsList, setAlertsList] = useState<OfficialAlert[]>(VERIFIED_OFFICIAL_ALERTS);
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState<string>("ALL");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>("ALL");

  // Admin Alert Creation Modal State
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [newHeadline, setNewHeadline] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newAuthority, setNewAuthority] = useState<OfficialAlert["issuingAuthority"]>("Karnataka State Natural Disaster Monitoring Centre (KSNDMC)");
  const [newLevel, setNewLevel] = useState<OfficialAlert["alertLevel"]>("ORANGE_ALERT");
  const [newDisasterType, setNewDisasterType] = useState<OfficialAlert["disasterType"]>("Heavy Rain");
  const [newDistrict, setNewDistrict] = useState("Kodagu");
  const [newSourceUrl, setNewSourceUrl] = useState("https://ksndmc.org/");
  const [adminSuccessNotice, setAdminSuccessNotice] = useState(false);

  // Filtered alerts
  const filteredAlerts = alertsList.filter(alert => {
    const matchesDistrict = selectedDistrictFilter === "ALL" || 
      alert.districts.some(d => d.toLowerCase() === selectedDistrictFilter.toLowerCase());
    const matchesLevel = selectedLevelFilter === "ALL" || alert.alertLevel === selectedLevelFilter;
    return matchesDistrict && matchesLevel;
  });

  const handleAddVerifiedAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeadline.trim() || !newMessage.trim()) return;

    const newAlert: OfficialAlert = {
      id: `alert-manual-${Date.now()}`,
      districts: [newDistrict],
      disasterType: newDisasterType,
      alertLevel: newLevel,
      headline: newHeadline.trim(),
      message: newMessage.trim(),
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      issuingAuthority: newAuthority,
      sourceUrl: newSourceUrl.trim() || "https://revenue.karnataka.gov.in/ksdma",
      isVerifiedGovernmentSource: true
    };

    setAlertsList([newAlert, ...alertsList]);
    setShowAdminModal(false);
    setNewHeadline("");
    setNewMessage("");
    setAdminSuccessNotice(true);
    setTimeout(() => setAdminSuccessNotice(false), 5000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Government Feeds Only</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
              Official Karnataka Disaster Alert Registry
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Real-time administrative alerts issued by IMD Bengaluru, KSNDMC, and KSDMA. 
              These warnings are legally binding and strictly distinguished from AI mathematical risk forecasts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdminModal(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-indigo-600 dark:text-white text-xs font-bold flex items-center gap-2 hover:opacity-90 shadow-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Admin: Record Verified Alert</span>
            </button>
          </div>
        </div>

        {/* Success toast */}
        {adminSuccessNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verified government bulletin recorded successfully and published to live registry.</span>
          </div>
        )}
      </div>

      {/* Distinction Reminder Alert */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          <strong>Academic & Operational Policy:</strong> Never confuse our Random Forest risk estimations (which reflect long-term terrain susceptibility) with these verified immediate advisories. Always obey official government evacuation notices broadcast here and via local district revenue authorities.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedDistrictFilter}
              onChange={(e) => setSelectedDistrictFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="ALL">All Districts ({KARNATAKA_DISTRICTS.length})</option>
              {KARNATAKA_DISTRICTS.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>

            <select
              value={selectedLevelFilter}
              onChange={(e) => setSelectedLevelFilter(e.target.value)}
              className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="ALL">All Warning Levels</option>
              <option value="RED_WARNING">Red Warning (Severe)</option>
              <option value="ORANGE_ALERT">Orange Alert (Moderate)</option>
              <option value="YELLOW_WATCH">Yellow Watch (Be Updated)</option>
            </select>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-500 self-end sm:self-auto">
          Showing {filteredAlerts.length} verified bulletin{filteredAlerts.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => {
            const isRed = alert.alertLevel === "RED_WARNING";
            const isOrange = alert.alertLevel === "ORANGE_ALERT";

            const badgeColor = isRed
              ? "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300"
              : isOrange
              ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300"
              : "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-300";

            return (
              <div
                key={alert.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className={`px-2.5 py-1 text-xs font-black rounded-lg border ${badgeColor}`}>
                      {alert.alertLevel.replace("_", " ")}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {alert.headline}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Issued: {new Date(alert.issuedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {alert.message}
                </p>

                {/* Districts Affected Chips */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Target Districts:</span>
                  {alert.districts.map(dst => (
                    <span
                      key={dst}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    >
                      {dst}
                    </span>
                  ))}
                </div>

                {/* Footer Attribution */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Source: <strong>{alert.issuingAuthority}</strong></span>
                  </div>
                  <a
                    href={alert.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                  >
                    <span>Inspect Original Bulletin</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 text-slate-500">
            No official bulletins match the selected district or severity filters.
          </div>
        )}
      </div>

      {/* Admin Alert Input Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              <span>Record Verified Government Alert</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Add verified IMD / KSNDMC bulletins for academic project defense & simulation.
            </p>

            <form onSubmit={handleAddVerifiedAlert} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target District
                </label>
                <select
                  value={newDistrict}
                  onChange={(e) => setNewDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {KARNATAKA_DISTRICTS.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Alert Level
                  </label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="YELLOW_WATCH">Yellow Watch</option>
                    <option value="ORANGE_ALERT">Orange Alert</option>
                    <option value="RED_WARNING">Red Warning</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Disaster Category
                  </label>
                  <select
                    value={newDisasterType}
                    onChange={(e) => setNewDisasterType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Heavy Rain">Heavy Rain</option>
                    <option value="Flood">Flood</option>
                    <option value="Landslide">Landslide</option>
                    <option value="Heatwave">Heatwave</option>
                    <option value="Thunderstorm">Thunderstorm</option>
                    <option value="Cyclone">Cyclone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Issuing Government Authority
                </label>
                <select
                  value={newAuthority}
                  onChange={(e) => setNewAuthority(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Karnataka State Natural Disaster Monitoring Centre (KSNDMC)">KSNDMC Bengaluru</option>
                  <option value="India Meteorological Department (IMD) Bengaluru">IMD Meteorological Centre Bengaluru</option>
                  <option value="Karnataka State Disaster Management Authority (KSDMA)">KSDMA Karnataka</option>
                  <option value="National Disaster Management Authority (NDMA) / SACHET">NDMA / SACHET Portal</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Bulletin Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Heavy Rainfall & Reservoir Discharge Warning"
                  value={newHeadline}
                  onChange={(e) => setNewHeadline(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Advisory Details
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Official advisory instructions for residents and disaster management cells..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Official Verification URL
                </label>
                <input
                  type="url"
                  placeholder="https://ksndmc.org/"
                  value={newSourceUrl}
                  onChange={(e) => setNewSourceUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-indigo-600 text-xs font-bold hover:opacity-90"
                >
                  Record & Publish Bulletin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
