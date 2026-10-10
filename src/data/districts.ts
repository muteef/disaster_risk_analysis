export interface DistrictProfile {
  id: string;
  name: string;
  kannadaName: string;
  region: "Coastal" | "Western Ghats / Malenadu" | "North Interior" | "South Interior";
  lat: number;
  lng: number;
  elevationM: number;
  avgSlopeDeg: number;
  areaSqKm: number;
  population: number;
  riverBasins: string[];
  avgAnnualRainfallMm: number;
  seismicZone: "Zone II" | "Zone III";
  baselineWeather: {
    rainfall24h: number; // mm
    rainfall7d: number;  // mm
    temperature: number; // °C
    soilMoisture: number;// %
    humidity: number;    // %
    windSpeed: number;   // km/h
    consecutiveDryDays: number;
    season: "Monsoon" | "Post-Monsoon" | "Summer" | "Winter";
  };
  historicalSummary: {
    totalFloodsRecorded: number;
    totalDroughtsRecorded: number;
    totalLandslidesRecorded: number;
    totalLightningCasualties: number;
    highRiskSeason: string;
  };
}

export const KARNATAKA_DISTRICTS: DistrictProfile[] = [
  // --- Western Ghats & Coastal Zone ---
  {
    id: "kodagu",
    name: "Kodagu",
    kannadaName: "ಕೊಡಗು",
    region: "Western Ghats / Malenadu",
    lat: 12.4244,
    lng: 75.7382,
    elevationM: 1050,
    avgSlopeDeg: 28.5,
    areaSqKm: 4102,
    population: 554500,
    riverBasins: ["Cauvery", "Barapole", "Lakshmantirtha"],
    avgAnnualRainfallMm: 2718,
    seismicZone: "Zone III",
    baselineWeather: {
      rainfall24h: 88.5,
      rainfall7d: 312.0,
      temperature: 21.5,
      soilMoisture: 88.0,
      humidity: 92.0,
      windSpeed: 24.0,
      consecutiveDryDays: 0,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 34,
      totalDroughtsRecorded: 3,
      totalLandslidesRecorded: 58,
      totalLightningCasualties: 14,
      highRiskSeason: "Southwest Monsoon (July - August)"
    }
  },
  {
    id: "dakshina-kannada",
    name: "Dakshina Kannada",
    kannadaName: "ದಕ್ಷಿಣ ಕನ್ನಡ",
    region: "Coastal",
    lat: 12.8703,
    lng: 74.8806,
    elevationM: 62,
    avgSlopeDeg: 12.0,
    areaSqKm: 4559,
    population: 2089649,
    riverBasins: ["Netravati", "Gurupura", "Nandini"],
    avgAnnualRainfallMm: 3950,
    seismicZone: "Zone III",
    baselineWeather: {
      rainfall24h: 76.0,
      rainfall7d: 280.0,
      temperature: 27.8,
      soilMoisture: 84.0,
      humidity: 94.0,
      windSpeed: 32.0,
      consecutiveDryDays: 0,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 42,
      totalDroughtsRecorded: 2,
      totalLandslidesRecorded: 26,
      totalLightningCasualties: 22,
      highRiskSeason: "Southwest Monsoon (June - August)"
    }
  },
  {
    id: "udupi",
    name: "Udupi",
    kannadaName: "ಉಡುಪಿ",
    region: "Coastal",
    lat: 13.3409,
    lng: 74.7421,
    elevationM: 45,
    avgSlopeDeg: 10.5,
    areaSqKm: 3582,
    population: 1177361,
    riverBasins: ["Sita", "Swarna", "Varahi"],
    avgAnnualRainfallMm: 4100,
    seismicZone: "Zone III",
    baselineWeather: {
      rainfall24h: 82.0,
      rainfall7d: 295.0,
      temperature: 28.0,
      soilMoisture: 85.0,
      humidity: 93.0,
      windSpeed: 29.0,
      consecutiveDryDays: 0,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 39,
      totalDroughtsRecorded: 1,
      totalLandslidesRecorded: 19,
      totalLightningCasualties: 18,
      highRiskSeason: "Southwest Monsoon (June - July)"
    }
  },
  {
    id: "uttara-kannada",
    name: "Uttara Kannada",
    kannadaName: "ಉತ್ತರ ಕನ್ನಡ",
    region: "Coastal",
    lat: 14.7953,
    lng: 74.6869,
    elevationM: 480,
    avgSlopeDeg: 24.0,
    areaSqKm: 10291,
    population: 1437169,
    riverBasins: ["Kali", "Sharavathi", "Aghanashini", "Gangavali"],
    avgAnnualRainfallMm: 3450,
    seismicZone: "Zone III",
    baselineWeather: {
      rainfall24h: 72.0,
      rainfall7d: 260.0,
      temperature: 26.2,
      soilMoisture: 82.0,
      humidity: 91.0,
      windSpeed: 25.0,
      consecutiveDryDays: 0,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 37,
      totalDroughtsRecorded: 4,
      totalLandslidesRecorded: 44,
      totalLightningCasualties: 20,
      highRiskSeason: "Southwest Monsoon (July - August)"
    }
  },
  {
    id: "chikkamagaluru",
    name: "Chikkamagaluru",
    kannadaName: "ಚಿಕ್ಕಮಗಳೂರು",
    region: "Western Ghats / Malenadu",
    lat: 13.3161,
    lng: 75.7720,
    elevationM: 1090,
    avgSlopeDeg: 26.0,
    areaSqKm: 7201,
    population: 1137961,
    riverBasins: ["Bhadra", "Tunga", "Hemavathi"],
    avgAnnualRainfallMm: 2150,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 64.0,
      rainfall7d: 220.0,
      temperature: 22.0,
      soilMoisture: 80.0,
      humidity: 89.0,
      windSpeed: 18.0,
      consecutiveDryDays: 0,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 28,
      totalDroughtsRecorded: 6,
      totalLandslidesRecorded: 49,
      totalLightningCasualties: 12,
      highRiskSeason: "Southwest Monsoon (July - August)"
    }
  },
  {
    id: "shivamogga",
    name: "Shivamogga",
    kannadaName: "ಶಿವಮೊಗ್ಗ",
    region: "Western Ghats / Malenadu",
    lat: 13.9299,
    lng: 75.5681,
    elevationM: 640,
    avgSlopeDeg: 18.0,
    areaSqKm: 8477,
    population: 1752759,
    riverBasins: ["Sharavathi", "Tunga", "Bhadra", "Varada"],
    avgAnnualRainfallMm: 1980,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 58.0,
      rainfall7d: 210.0,
      temperature: 24.5,
      soilMoisture: 78.0,
      humidity: 88.0,
      windSpeed: 16.0,
      consecutiveDryDays: 0,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 31,
      totalDroughtsRecorded: 5,
      totalLandslidesRecorded: 32,
      totalLightningCasualties: 16,
      highRiskSeason: "Southwest Monsoon (July - August)"
    }
  },
  {
    id: "hassan",
    name: "Hassan",
    kannadaName: "ಹಾಸನ",
    region: "Western Ghats / Malenadu",
    lat: 13.0033,
    lng: 76.1004,
    elevationM: 950,
    avgSlopeDeg: 16.0,
    areaSqKm: 6814,
    population: 1776421,
    riverBasins: ["Hemavathi", "Yagachi", "Cauvery"],
    avgAnnualRainfallMm: 1150,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 34.0,
      rainfall7d: 130.0,
      temperature: 24.0,
      soilMoisture: 68.0,
      humidity: 80.0,
      windSpeed: 15.0,
      consecutiveDryDays: 1,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 20,
      totalDroughtsRecorded: 11,
      totalLandslidesRecorded: 22,
      totalLightningCasualties: 19,
      highRiskSeason: "Southwest Monsoon (July - August)"
    }
  },

  // --- North Interior Karnataka (Arid, Drought & Heatwave Prone) ---
  {
    id: "kalaburagi",
    name: "Kalaburagi",
    kannadaName: "ಕಲಬುರಗಿ",
    region: "North Interior",
    lat: 17.3297,
    lng: 76.8343,
    elevationM: 454,
    avgSlopeDeg: 3.2,
    areaSqKm: 10951,
    population: 2566326,
    riverBasins: ["Bhima", "Kagina"],
    avgAnnualRainfallMm: 750,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 2.0,
      rainfall7d: 8.0,
      temperature: 38.5,
      soilMoisture: 22.0,
      humidity: 34.0,
      windSpeed: 19.0,
      consecutiveDryDays: 24,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 14,
      totalDroughtsRecorded: 38,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 42,
      highRiskSeason: "Pre-Monsoon & Summer (March - May)"
    }
  },
  {
    id: "vijayapura",
    name: "Vijayapura",
    kannadaName: "ವಿಜಯಪುರ",
    region: "North Interior",
    lat: 16.8302,
    lng: 75.7100,
    elevationM: 593,
    avgSlopeDeg: 2.8,
    areaSqKm: 10541,
    population: 2177331,
    riverBasins: ["Krishna", "Doni"],
    avgAnnualRainfallMm: 590,
    seismicZone: "Zone III",
    baselineWeather: {
      rainfall24h: 1.0,
      rainfall7d: 4.0,
      temperature: 39.2,
      soilMoisture: 18.0,
      humidity: 30.0,
      windSpeed: 17.0,
      consecutiveDryDays: 32,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 9,
      totalDroughtsRecorded: 44,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 31,
      highRiskSeason: "Summer & Dry Months (March - May)"
    }
  },
  {
    id: "raichur",
    name: "Raichur",
    kannadaName: "ರಾಯಚೂರು",
    region: "North Interior",
    lat: 16.2076,
    lng: 77.3463,
    elevationM: 407,
    avgSlopeDeg: 3.0,
    areaSqKm: 8383,
    population: 1928812,
    riverBasins: ["Krishna", "Tungabhadra"],
    avgAnnualRainfallMm: 620,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 3.0,
      rainfall7d: 11.0,
      temperature: 39.8,
      soilMoisture: 20.0,
      humidity: 32.0,
      windSpeed: 16.0,
      consecutiveDryDays: 28,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 16,
      totalDroughtsRecorded: 41,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 38,
      highRiskSeason: "April - May (Heatwave) / Aug (River Flood)"
    }
  },
  {
    id: "ballari",
    name: "Ballari",
    kannadaName: "ಬಳ್ಳಾರಿ",
    region: "North Interior",
    lat: 15.1394,
    lng: 76.9214,
    elevationM: 495,
    avgSlopeDeg: 4.5,
    areaSqKm: 4252,
    population: 1401000,
    riverBasins: ["Tungabhadra", "Hagari"],
    avgAnnualRainfallMm: 610,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 2.0,
      rainfall7d: 6.0,
      temperature: 39.0,
      soilMoisture: 19.0,
      humidity: 35.0,
      windSpeed: 20.0,
      consecutiveDryDays: 29,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 12,
      totalDroughtsRecorded: 40,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 29,
      highRiskSeason: "March - May (Heatwave)"
    }
  },
  {
    id: "bagalkote",
    name: "Bagalkote",
    kannadaName: "ಬಾಗಲಕೋಟೆ",
    region: "North Interior",
    lat: 16.1875,
    lng: 75.6983,
    elevationM: 533,
    avgSlopeDeg: 3.5,
    areaSqKm: 6593,
    population: 1889752,
    riverBasins: ["Ghataprabha", "Malaprabha", "Krishna"],
    avgAnnualRainfallMm: 560,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 5.0,
      rainfall7d: 14.0,
      temperature: 37.0,
      soilMoisture: 24.0,
      humidity: 38.0,
      windSpeed: 15.0,
      consecutiveDryDays: 22,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 18,
      totalDroughtsRecorded: 39,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 25,
      highRiskSeason: "Monsoon (Krishna backwaters) / Summer"
    }
  },
  {
    id: "yadgir",
    name: "Yadgir",
    kannadaName: "ಯಾದಗಿರಿ",
    region: "North Interior",
    lat: 16.7621,
    lng: 77.1378,
    elevationM: 389,
    avgSlopeDeg: 2.5,
    areaSqKm: 5270,
    population: 1174271,
    riverBasins: ["Krishna", "Bhima"],
    avgAnnualRainfallMm: 680,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 2.5,
      rainfall7d: 9.0,
      temperature: 38.8,
      soilMoisture: 21.0,
      humidity: 33.0,
      windSpeed: 16.0,
      consecutiveDryDays: 26,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 15,
      totalDroughtsRecorded: 37,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 30,
      highRiskSeason: "Summer (Heatwave) & River Flash Floods"
    }
  },
  {
    id: "koppal",
    name: "Koppal",
    kannadaName: "ಕೊಪ್ಪಳ",
    region: "North Interior",
    lat: 15.3458,
    lng: 76.1554,
    elevationM: 530,
    avgSlopeDeg: 3.8,
    areaSqKm: 5559,
    population: 1389920,
    riverBasins: ["Tungabhadra"],
    avgAnnualRainfallMm: 570,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 1.5,
      rainfall7d: 5.0,
      temperature: 38.2,
      soilMoisture: 21.0,
      humidity: 36.0,
      windSpeed: 18.0,
      consecutiveDryDays: 27,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 10,
      totalDroughtsRecorded: 42,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 26,
      highRiskSeason: "Summer Drought (March - June)"
    }
  },
  {
    id: "bidar",
    name: "Bidar",
    kannadaName: "ಬೀದರ್",
    region: "North Interior",
    lat: 17.9104,
    lng: 77.5199,
    elevationM: 615,
    avgSlopeDeg: 4.0,
    areaSqKm: 5448,
    population: 1700018,
    riverBasins: ["Manjra", "Karanja"],
    avgAnnualRainfallMm: 840,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 4.0,
      rainfall7d: 12.0,
      temperature: 37.5,
      soilMoisture: 28.0,
      humidity: 42.0,
      windSpeed: 15.0,
      consecutiveDryDays: 20,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 12,
      totalDroughtsRecorded: 34,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 35,
      highRiskSeason: "Pre-monsoon Lightning & Summer Dryness"
    }
  },
  {
    id: "gadag",
    name: "Gadag",
    kannadaName: "ಗದಗ",
    region: "North Interior",
    lat: 15.4319,
    lng: 75.6355,
    elevationM: 655,
    avgSlopeDeg: 3.6,
    areaSqKm: 4656,
    population: 1064570,
    riverBasins: ["Malaprabha", "Tungabhadra"],
    avgAnnualRainfallMm: 610,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 2.0,
      rainfall7d: 7.0,
      temperature: 36.8,
      soilMoisture: 22.0,
      humidity: 39.0,
      windSpeed: 21.0,
      consecutiveDryDays: 25,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 8,
      totalDroughtsRecorded: 41,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 20,
      highRiskSeason: "March - May Drought Cycle"
    }
  },
  {
    id: "dharwad",
    name: "Dharwad",
    kannadaName: "ಧಾರವಾಡ",
    region: "North Interior",
    lat: 15.4589,
    lng: 75.0078,
    elevationM: 750,
    avgSlopeDeg: 5.2,
    areaSqKm: 4260,
    population: 1847023,
    riverBasins: ["Malaprabha", "Bennihalla"],
    avgAnnualRainfallMm: 780,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 8.0,
      rainfall7d: 28.0,
      temperature: 33.5,
      soilMoisture: 35.0,
      humidity: 52.0,
      windSpeed: 17.0,
      consecutiveDryDays: 14,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 15,
      totalDroughtsRecorded: 28,
      totalLandslidesRecorded: 2,
      totalLightningCasualties: 21,
      highRiskSeason: "Bennihalla Flash Floods (August - September)"
    }
  },
  {
    id: "belagavi",
    name: "Belagavi",
    kannadaName: "ಬೆಳಗಾವಿ",
    region: "North Interior",
    lat: 15.8497,
    lng: 74.4977,
    elevationM: 762,
    avgSlopeDeg: 7.5,
    areaSqKm: 13415,
    population: 4779661,
    riverBasins: ["Krishna", "Ghataprabha", "Malaprabha"],
    avgAnnualRainfallMm: 920,
    seismicZone: "Zone III",
    baselineWeather: {
      rainfall24h: 42.0,
      rainfall7d: 165.0,
      temperature: 26.0,
      soilMoisture: 72.0,
      humidity: 82.0,
      windSpeed: 19.0,
      consecutiveDryDays: 0,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 38,
      totalDroughtsRecorded: 24,
      totalLandslidesRecorded: 8,
      totalLightningCasualties: 32,
      highRiskSeason: "Krishna River Basin Inundation (July - August)"
    }
  },
  {
    id: "haveri",
    name: "Haveri",
    kannadaName: "ಹಾವೇರಿ",
    region: "North Interior",
    lat: 14.7970,
    lng: 75.3970,
    elevationM: 605,
    avgSlopeDeg: 4.8,
    areaSqKm: 4823,
    population: 1597668,
    riverBasins: ["Varada", "Kumadvathi", "Tungabhadra"],
    avgAnnualRainfallMm: 760,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 12.0,
      rainfall7d: 45.0,
      temperature: 32.0,
      soilMoisture: 42.0,
      humidity: 60.0,
      windSpeed: 15.0,
      consecutiveDryDays: 9,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 19,
      totalDroughtsRecorded: 30,
      totalLandslidesRecorded: 1,
      totalLightningCasualties: 19,
      highRiskSeason: "Varada River Flooding (August)"
    }
  },
  {
    id: "vijayanagara",
    name: "Vijayanagara",
    kannadaName: "ವಿಜಯನಗರ",
    region: "North Interior",
    lat: 15.2750,
    lng: 76.3888,
    elevationM: 510,
    avgSlopeDeg: 4.2,
    areaSqKm: 5644,
    population: 1353000,
    riverBasins: ["Tungabhadra"],
    avgAnnualRainfallMm: 600,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 2.0,
      rainfall7d: 7.0,
      temperature: 38.0,
      soilMoisture: 20.0,
      humidity: 37.0,
      windSpeed: 17.0,
      consecutiveDryDays: 27,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 11,
      totalDroughtsRecorded: 39,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 22,
      highRiskSeason: "Summer Heatwave & Dam Overflow Alert"
    }
  },

  // --- South Interior Karnataka ---
  {
    id: "bengaluru-urban",
    name: "Bengaluru Urban",
    kannadaName: "ಬೆಂಗಳೂರು ನಗರ",
    region: "South Interior",
    lat: 12.9716,
    lng: 77.5946,
    elevationM: 920,
    avgSlopeDeg: 4.0,
    areaSqKm: 2196,
    population: 9621551,
    riverBasins: ["Vrishabhavathi", "Arkavathi", "Dakshina Pinakini"],
    avgAnnualRainfallMm: 970,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 45.0,
      rainfall7d: 110.0,
      temperature: 25.5,
      soilMoisture: 65.0,
      humidity: 78.0,
      windSpeed: 14.0,
      consecutiveDryDays: 1,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 48,
      totalDroughtsRecorded: 8,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 11,
      highRiskSeason: "Urban Flash Floods (September - November)"
    }
  },
  {
    id: "bengaluru-rural",
    name: "Bengaluru Rural",
    kannadaName: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
    region: "South Interior",
    lat: 13.2274,
    lng: 77.5746,
    elevationM: 910,
    avgSlopeDeg: 4.5,
    areaSqKm: 2295,
    population: 990923,
    riverBasins: ["Arkavathi", "Dakshina Pinakini"],
    avgAnnualRainfallMm: 880,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 18.0,
      rainfall7d: 52.0,
      temperature: 27.0,
      soilMoisture: 48.0,
      humidity: 68.0,
      windSpeed: 13.0,
      consecutiveDryDays: 5,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 14,
      totalDroughtsRecorded: 20,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 17,
      highRiskSeason: "Post-Monsoon (October - November)"
    }
  },
  {
    id: "mysuru",
    name: "Mysuru",
    kannadaName: "ಮೈಸೂರು",
    region: "South Interior",
    lat: 12.2958,
    lng: 76.6394,
    elevationM: 770,
    avgSlopeDeg: 5.0,
    areaSqKm: 6854,
    population: 3001127,
    riverBasins: ["Cauvery", "Kabini", "Lakshmantirtha"],
    avgAnnualRainfallMm: 820,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 22.0,
      rainfall7d: 68.0,
      temperature: 26.5,
      soilMoisture: 55.0,
      humidity: 72.0,
      windSpeed: 14.0,
      consecutiveDryDays: 3,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 26,
      totalDroughtsRecorded: 18,
      totalLandslidesRecorded: 3,
      totalLightningCasualties: 24,
      highRiskSeason: "Kabini/Cauvery Inundation (August)"
    }
  },
  {
    id: "mandya",
    name: "Mandya",
    kannadaName: "ಮಂಡ್ಯ",
    region: "South Interior",
    lat: 12.5218,
    lng: 76.8951,
    elevationM: 678,
    avgSlopeDeg: 3.8,
    areaSqKm: 4961,
    population: 1805769,
    riverBasins: ["Cauvery", "Shimsha", "Hemavathi"],
    avgAnnualRainfallMm: 710,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 16.0,
      rainfall7d: 49.0,
      temperature: 28.0,
      soilMoisture: 50.0,
      humidity: 66.0,
      windSpeed: 13.0,
      consecutiveDryDays: 6,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 22,
      totalDroughtsRecorded: 26,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 20,
      highRiskSeason: "KRS Dam Outflow Spikes (August)"
    }
  },
  {
    id: "tumakuru",
    name: "Tumakuru",
    kannadaName: "ತುಮಕೂರು",
    region: "South Interior",
    lat: 13.3409,
    lng: 77.1006,
    elevationM: 822,
    avgSlopeDeg: 5.5,
    areaSqKm: 10597,
    population: 2675349,
    riverBasins: ["Shimsha", "Jayamangali"],
    avgAnnualRainfallMm: 690,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 9.0,
      rainfall7d: 32.0,
      temperature: 30.5,
      soilMoisture: 38.0,
      humidity: 58.0,
      windSpeed: 15.0,
      consecutiveDryDays: 12,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 11,
      totalDroughtsRecorded: 35,
      totalLandslidesRecorded: 1,
      totalLightningCasualties: 28,
      highRiskSeason: "Pre-monsoon Drought & Lightning"
    }
  },
  {
    id: "kolar",
    name: "Kolar",
    kannadaName: "ಕೋಲಾರ",
    region: "South Interior",
    lat: 13.1362,
    lng: 78.1291,
    elevationM: 822,
    avgSlopeDeg: 4.2,
    areaSqKm: 3969,
    population: 1536401,
    riverBasins: ["Palar", "Dakshina Pinakini"],
    avgAnnualRainfallMm: 740,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 4.0,
      rainfall7d: 15.0,
      temperature: 32.0,
      soilMoisture: 28.0,
      humidity: 48.0,
      windSpeed: 16.0,
      consecutiveDryDays: 18,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 8,
      totalDroughtsRecorded: 39,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 23,
      highRiskSeason: "Severe Groundwater Drought"
    }
  },
  {
    id: "chikkaballapura",
    name: "Chikkaballapura",
    kannadaName: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
    region: "South Interior",
    lat: 13.4355,
    lng: 77.7315,
    elevationM: 915,
    avgSlopeDeg: 6.2,
    areaSqKm: 4524,
    population: 1255104,
    riverBasins: ["Uttara Pinakini", "Palar", "Chitravathi"],
    avgAnnualRainfallMm: 720,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 5.0,
      rainfall7d: 18.0,
      temperature: 31.0,
      soilMoisture: 30.0,
      humidity: 50.0,
      windSpeed: 15.0,
      consecutiveDryDays: 16,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 9,
      totalDroughtsRecorded: 37,
      totalLandslidesRecorded: 1,
      totalLightningCasualties: 21,
      highRiskSeason: "Summer Agricultural Drought"
    }
  },
  {
    id: "ramanagara",
    name: "Ramanagara",
    kannadaName: "ರಾಮನಗರ",
    region: "South Interior",
    lat: 12.7214,
    lng: 77.2809,
    elevationM: 747,
    avgSlopeDeg: 7.0,
    areaSqKm: 3556,
    population: 1082636,
    riverBasins: ["Arkavathi", "Kanva"],
    avgAnnualRainfallMm: 860,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 24.0,
      rainfall7d: 65.0,
      temperature: 27.5,
      soilMoisture: 56.0,
      humidity: 71.0,
      windSpeed: 14.0,
      consecutiveDryDays: 4,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 18,
      totalDroughtsRecorded: 22,
      totalLandslidesRecorded: 2,
      totalLightningCasualties: 15,
      highRiskSeason: "Arkavathi Basin Overflow (September)"
    }
  },
  {
    id: "chamarajanagar",
    name: "Chamarajanagar",
    kannadaName: "ಚಾಮರಾಜನಗರ",
    region: "South Interior",
    lat: 11.9261,
    lng: 76.9437,
    elevationM: 662,
    avgSlopeDeg: 8.5,
    areaSqKm: 5101,
    population: 1020791,
    riverBasins: ["Cauvery", "Suvarnavathi"],
    avgAnnualRainfallMm: 760,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 14.0,
      rainfall7d: 44.0,
      temperature: 29.0,
      soilMoisture: 46.0,
      humidity: 64.0,
      windSpeed: 13.0,
      consecutiveDryDays: 8,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 16,
      totalDroughtsRecorded: 31,
      totalLandslidesRecorded: 4,
      totalLightningCasualties: 25,
      highRiskSeason: "Pre-Monsoon & Post-Monsoon Flash Inundation"
    }
  },
  {
    id: "davanagere",
    name: "Davanagere",
    kannadaName: "ದಾವಣಗೆರೆ",
    region: "South Interior",
    lat: 14.4644,
    lng: 75.9218,
    elevationM: 602,
    avgSlopeDeg: 3.9,
    areaSqKm: 5924,
    population: 1945497,
    riverBasins: ["Tungabhadra"],
    avgAnnualRainfallMm: 650,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 11.0,
      rainfall7d: 38.0,
      temperature: 31.5,
      soilMoisture: 40.0,
      humidity: 62.0,
      windSpeed: 16.0,
      consecutiveDryDays: 11,
      season: "Monsoon"
    },
    historicalSummary: {
      totalFloodsRecorded: 17,
      totalDroughtsRecorded: 32,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 22,
      highRiskSeason: "Tungabhadra River Basin Floods (August)"
    }
  },
  {
    id: "chitradurga",
    name: "Chitradurga",
    kannadaName: "ಚಿತ್ರದುರ್ಗ",
    region: "South Interior",
    lat: 14.2251,
    lng: 76.3980,
    elevationM: 732,
    avgSlopeDeg: 5.0,
    areaSqKm: 8440,
    population: 1659456,
    riverBasins: ["Vedavathi", "Tungabhadra"],
    avgAnnualRainfallMm: 570,
    seismicZone: "Zone II",
    baselineWeather: {
      rainfall24h: 3.0,
      rainfall7d: 10.0,
      temperature: 35.0,
      soilMoisture: 25.0,
      humidity: 45.0,
      windSpeed: 18.0,
      consecutiveDryDays: 23,
      season: "Summer"
    },
    historicalSummary: {
      totalFloodsRecorded: 7,
      totalDroughtsRecorded: 42,
      totalLandslidesRecorded: 0,
      totalLightningCasualties: 31,
      highRiskSeason: "Chronic Meteorological Drought"
    }
  }
];

export function getDistrictById(id: string): DistrictProfile | undefined {
  return KARNATAKA_DISTRICTS.find(d => d.id === id.toLowerCase() || d.name.toLowerCase() === id.toLowerCase());
}
