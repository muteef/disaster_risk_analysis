"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { DistrictProfile } from "@/data/districts";
import { Calendar, BarChart3, CloudRain } from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HistoricalChartsProps {
  district: DistrictProfile;
}

export default function HistoricalCharts({ district }: HistoricalChartsProps) {
  const [historyData, setHistoryData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"annual" | "monthly">("annual");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/history/${district.id}`)
      .then(res => res.json())
      .then(data => {
        setHistoryData(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn("Failed to load historical data:", err);
        setLoading(false);
      });
  }, [district.id]);

  if (loading || !historyData) {
    return (
      <div className="w-full h-80 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center animate-pulse">
        <span className="text-xs font-semibold text-slate-400">
          Loading Historical Meteorological & Disaster Trends for {district.name}...
        </span>
      </div>
    );
  }

  // 1. Annual Trend Chart: Dual Axis (Rainfall Bar + Disasters Line)
  const annualChartData = {
    labels: historyData.trends.years.map(String),
    datasets: [
      {
        type: "bar" as const,
        label: "Annual Rainfall (mm)",
        data: historyData.trends.annualRainfallTrend,
        backgroundColor: "rgba(59, 130, 246, 0.4)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1.5,
        borderRadius: 6,
        yAxisID: "yRain"
      },
      {
        type: "line" as const,
        label: "Recorded Floods",
        data: historyData.trends.annualFloodEvents,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgb(239, 68, 68)",
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 4,
        yAxisID: "yEvents"
      },
      {
        type: "line" as const,
        label: "Recorded Landslides",
        data: historyData.trends.annualLandslideEvents,
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgb(249, 115, 22)",
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.35,
        pointRadius: 3,
        yAxisID: "yEvents"
      }
    ]
  };

  const annualChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: { boxWidth: 12, font: { size: 11, family: "sans-serif" } }
      },
      tooltip: {
        padding: 10,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleFont: { size: 12, weight: "bold" },
        bodyFont: { size: 11 }
      }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      yRain: {
        type: "linear",
        display: true,
        position: "left",
        title: { display: true, text: "Rainfall (mm)", font: { size: 11 } },
        grid: { color: "rgba(226, 232, 240, 0.5)" }
      },
      yEvents: {
        type: "linear",
        display: true,
        position: "right",
        title: { display: true, text: "Disaster Events", font: { size: 11 } },
        grid: { drawOnChartArea: false },
        min: 0
      }
    }
  };

  // 2. Monthly Climatology Chart
  const monthlyChartData = {
    labels: historyData.climatology.months,
    datasets: [
      {
        label: "Mean Monthly Precipitation (mm)",
        data: historyData.climatology.monthlyRainfall,
        backgroundColor: "rgba(99, 102, 241, 0.35)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgb(99, 102, 241)"
      }
    ]
  };

  const monthlyChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y} mm precipitation`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        title: { display: true, text: "Precipitation (mm)", font: { size: 11 } },
        grid: { color: "rgba(226, 232, 240, 0.5)" }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            Historical Trends & Meteorological Analytics
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Calibrated 10-year patterns for {district.name} ({district.kannadaName})
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("annual")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeTab === "annual"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Annual Trend (2015-2024)
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              activeTab === "monthly"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            Monthly Climatology
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="mt-4 h-[320px] w-full">
        {activeTab === "annual" ? (
          <Bar data={annualChartData as any} options={annualChartOptions} />
        ) : (
          <Line data={monthlyChartData as any} options={monthlyChartOptions} />
        )}
      </div>

      {/* Historical Summary Metric Badges */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">10-Yr Floods</span>
          <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
            {district.historicalSummary.totalFloodsRecorded} events
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">10-Yr Droughts</span>
          <span className="text-base font-extrabold text-amber-600 dark:text-amber-400">
            {district.historicalSummary.totalDroughtsRecorded} declared
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">10-Yr Landslides</span>
          <span className="text-base font-extrabold text-rose-600 dark:text-rose-400">
            {district.historicalSummary.totalLandslidesRecorded} slips
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Peak Risk Season</span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block mt-0.5">
            {district.historicalSummary.highRiskSeason}
          </span>
        </div>
      </div>
    </div>
  );
}
