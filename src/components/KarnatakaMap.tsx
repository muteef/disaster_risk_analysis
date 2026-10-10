"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { KARNATAKA_DISTRICTS, DistrictProfile, getDistrictById } from "@/data/districts";
import { computeDistrictRiskAssessment, getRiskColorClass } from "@/lib/riskEngine";

interface KarnatakaMapProps {
  selectedDistrict: DistrictProfile;
  onSelectDistrict: (district: DistrictProfile) => void;
  activeRiskType: "composite" | "flood" | "drought" | "landslide";
  onRiskTypeChange: (type: "composite" | "flood" | "drought" | "landslide") => void;
}

// Name normalization map from GeoJSON NAME_2 to our district IDs
const GEOJSON_NAME_MAP: Record<string, string> = {
  "bagalkot": "bagalkote",
  "bangalore rural": "bengaluru-rural",
  "bangalore urban": "bengaluru-urban",
  "belgaum": "belagavi",
  "bellary": "ballari",
  "bidar": "bidar",
  "bijapur": "vijayapura",
  "chamrajnagar": "chamarajanagar",
  "chikmagalur": "chikkamagaluru",
  "chitradurga": "chitradurga",
  "dakshina kannada": "dakshina-kannada",
  "davanagere": "davanagere",
  "dharwad": "dharwad",
  "gadag": "gadag",
  "gulbarga": "kalaburagi",
  "hassan": "hassan",
  "haveri": "haveri",
  "kodagu": "kodagu",
  "kolar": "kolar",
  "koppal": "koppal",
  "mandya": "mandya",
  "mysore": "mysuru",
  "raichur": "raichur",
  "shimoga": "shivamogga",
  "tumkur": "tumakuru",
  "udupi": "udupi",
  "uttara kannada": "uttara-kannada",
  "yadgir": "yadgir",
  "vijayanagara": "vijayanagara",
  "chikkaballapura": "chikkaballapura",
  "ramanagara": "ramanagara"
};

export default function KarnatakaMap({
  selectedDistrict,
  onSelectDistrict,
  activeRiskType,
  onRiskTypeChange
}: KarnatakaMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper to fetch score for any district based on activeRiskType
  const getDistrictScore = (d: DistrictProfile) => {
    const assessment = computeDistrictRiskAssessment(d);
    if (activeRiskType === "flood") return assessment.disasters.flood.riskScore;
    if (activeRiskType === "drought") return assessment.disasters.drought.riskScore;
    if (activeRiskType === "landslide") return assessment.disasters.landslide.riskScore;
    return assessment.compositeRiskIndex;
  };

  const getColorForScore = (score: number) => {
    if (score < 30) return "#10b981"; // Low (Emerald)
    if (score < 60) return "#f59e0b"; // Moderate (Amber)
    if (score < 80) return "#f97316"; // High (Orange)
    return "#ef4444";                 // Very High (Red)
  };

  // Load GeoJSON once
  useEffect(() => {
    fetch("/karnataka_districts.geojson")
      .then(res => res.json())
      .then(data => {
        setGeoData(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn("Could not load karnataka_districts.geojson:", err);
        setLoading(false);
      });
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Karnataka: lat 14.8, lng 75.8, zoom 7
    const map = L.map(mapContainerRef.current, {
      center: [14.65, 75.85],
      zoom: 7,
      minZoom: 6,
      maxZoom: 12,
      zoomControl: true,
      attributionControl: false
    });

    // Clean CartoDB Positron base tiles
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Render Polygons and Markers whenever geoData, activeRiskType, or selectedDistrict changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // 1. Update/Add GeoJSON Layer
    if (geojsonLayerRef.current) {
      map.removeLayer(geojsonLayerRef.current);
    }

    if (geoData) {
      const geoLayer = L.geoJSON(geoData, {
        style: (feature: any) => {
          const rawName = (feature?.properties?.NAME_2 || feature?.properties?.district || "").toLowerCase();
          const targetId = GEOJSON_NAME_MAP[rawName] || rawName;
          const district = getDistrictById(targetId);
          const isSelected = district?.id === selectedDistrict.id;

          const score = district ? getDistrictScore(district) : 35;
          const baseColor = getColorForScore(score);

          return {
            fillColor: baseColor,
            weight: isSelected ? 3 : 1.5,
            opacity: 1,
            color: isSelected ? "#1e293b" : "#64748b",
            dashArray: isSelected ? "" : "2",
            fillOpacity: isSelected ? 0.85 : 0.65
          };
        },
        onEachFeature: (feature: any, layer: L.Layer) => {
          const rawName = (feature?.properties?.NAME_2 || feature?.properties?.district || "").toLowerCase();
          const targetId = GEOJSON_NAME_MAP[rawName] || rawName;
          const district = getDistrictById(targetId);

          if (district) {
            const score = getDistrictScore(district);
            layer.bindTooltip(
              `<div class="font-sans text-xs">
                <div class="font-bold text-slate-900">${district.name} (${district.kannadaName})</div>
                <div class="text-slate-600">${activeRiskType.toUpperCase()} Risk: <span class="font-bold" style="color:${getColorForScore(score)}">${score}%</span></div>
              </div>`,
              { sticky: true, className: "rounded-lg shadow-md border-0 bg-white p-2" }
            );

            layer.on({
              click: () => {
                onSelectDistrict(district);
              },
              mouseover: (e: any) => {
                const target = e.target;
                target.setStyle({
                  weight: 2.5,
                  fillOpacity: 0.9
                });
              },
              mouseout: (e: any) => {
                geoLayer.resetStyle(e.target);
              }
            });
          }
        }
      }).addTo(map);

      geojsonLayerRef.current = geoLayer;
    }

    // 2. Render District Centroid Markers
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();

      KARNATAKA_DISTRICTS.forEach(d => {
        const isSelected = d.id === selectedDistrict.id;
        const score = getDistrictScore(d);
        const color = getColorForScore(score);

        const customIcon = L.divIcon({
          className: "custom-map-marker",
          html: `
            <div style="
              background-color: ${color};
              color: white;
              width: ${isSelected ? "28px" : "20px"};
              height: ${isSelected ? "28px" : "20px"};
              border-radius: 50%;
              border: 2px solid ${isSelected ? "#0f172a" : "#ffffff"};
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: ${isSelected ? "11px" : "9px"};
              font-weight: 700;
              transition: all 0.2s ease;
            ">
              ${score}
            </div>
          `,
          iconSize: [isSelected ? 28 : 20, isSelected ? 28 : 20],
          iconAnchor: [isSelected ? 14 : 10, isSelected ? 14 : 10]
        });

        const marker = L.marker([d.lat, d.lng], { icon: customIcon });
        marker.on("click", () => onSelectDistrict(d));
        marker.bindTooltip(`<b>${d.name}</b>: ${score}% risk`, { direction: "top" });
        markersLayerRef.current?.addLayer(marker);
      });
    }

    // Pan map smoothly to selected district centroid
    map.panTo([selectedDistrict.lat, selectedDistrict.lng], { animate: true, duration: 0.8 });

  }, [geoData, activeRiskType, selectedDistrict]);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      {/* Top Map Layer Selector Controls */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 flex-wrap">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Layer:</span>
        {(["composite", "flood", "drought", "landslide"] as const).map(type => (
          <button
            key={type}
            onClick={() => onRiskTypeChange(type)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all capitalize ${
              activeRiskType === type
                ? "bg-slate-900 text-white dark:bg-indigo-600 dark:text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Dynamic Map Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 text-xs">
        <div className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
          <span>{activeRiskType.toUpperCase()} Risk Scale</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm"></span>
            <span className="text-slate-600 dark:text-slate-300">0 – 29% (Low Risk)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm"></span>
            <span className="text-slate-600 dark:text-slate-300">30 – 59% (Moderate)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-orange-500 shadow-sm"></span>
            <span className="text-slate-600 dark:text-slate-300">60 – 79% (High Risk)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm"></span>
            <span className="text-slate-600 dark:text-slate-300">80 – 100% (Very High)</span>
          </div>
        </div>
      </div>

      {/* Selected District Badge overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 max-w-xs">
        <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Selected District</div>
        <div className="text-sm font-bold text-slate-900 dark:text-white">
          {selectedDistrict.name} <span className="text-xs font-normal text-slate-500">({selectedDistrict.kannadaName})</span>
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
          Zone: {selectedDistrict.region} • Elev: {selectedDistrict.elevationM}m
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-[1001] bg-slate-100/70 dark:bg-slate-900/70 flex items-center justify-center backdrop-blur-sm">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">
            Loading Karnataka GIS Boundary Layers...
          </div>
        </div>
      )}

      {/* Leaflet DOM element */}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
