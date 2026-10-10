"use client";

import dynamic from "next/dynamic";
import React from "react";
import { DistrictProfile } from "@/data/districts";

interface MapWrapperProps {
  selectedDistrict: DistrictProfile;
  onSelectDistrict: (district: DistrictProfile) => void;
  activeRiskType: "composite" | "flood" | "drought" | "landslide";
  onRiskTypeChange: (type: "composite" | "flood" | "drought" | "landslide") => void;
}

const DynamicKarnatakaMap = dynamic(() => import("./KarnatakaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center animate-pulse">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Initializing Leaflet GIS Karnataka Engine...
        </p>
      </div>
    </div>
  )
});

export default function MapWrapper(props: MapWrapperProps) {
  return <DynamicKarnatakaMap {...props} />;
}
