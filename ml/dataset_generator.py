"""
Karnataka Disaster Risk Assessment System
Data Generation Pipeline for Research & Academic Demonstration
--------------------------------------------------------------
DATA POLICY NOTICE:
This script generates a statistically grounded DEMO DATASET representing 
Karnataka historical meteorological, topographical, and disaster event patterns (2015-2025).
It is explicitly labeled as 'DEMO_DATASET_KSNDMC_IMD_CALIBRATED' and is stored in 'data/demo/'.
In production, this module can be replaced with verified KSNDMC/IMD archives.
"""

import os
import numpy as np
import pandas as pd

# 31 Districts of Karnataka with geographical and climatic baselines
DISTRICT_PROFILES = {
    # Coastal & Western Ghats (High Rainfall, Landslide & Flash Flood Prone)
    "Kodagu": {"zone": "Western_Ghats", "elevation": 1050, "slope": 28.5, "base_rain": 2700, "flood_vuln": 0.75, "landslide_vuln": 0.88, "drought_vuln": 0.15},
    "Dakshina Kannada": {"zone": "Coastal", "elevation": 60, "slope": 12.0, "base_rain": 3800, "flood_vuln": 0.82, "landslide_vuln": 0.65, "drought_vuln": 0.10},
    "Udupi": {"zone": "Coastal", "elevation": 45, "slope": 10.5, "base_rain": 4000, "flood_vuln": 0.85, "landslide_vuln": 0.60, "drought_vuln": 0.08},
    "Uttara Kannada": {"zone": "Coastal_Ghats", "elevation": 480, "slope": 24.0, "base_rain": 3200, "flood_vuln": 0.80, "landslide_vuln": 0.82, "drought_vuln": 0.12},
    "Chikkamagaluru": {"zone": "Western_Ghats", "elevation": 1090, "slope": 26.0, "base_rain": 2100, "flood_vuln": 0.70, "landslide_vuln": 0.85, "drought_vuln": 0.20},
    "Shivamogga": {"zone": "Western_Ghats", "elevation": 640, "slope": 18.0, "base_rain": 1900, "flood_vuln": 0.78, "landslide_vuln": 0.72, "drought_vuln": 0.22},
    "Hassan": {"zone": "Transition", "elevation": 950, "slope": 16.0, "base_rain": 1150, "flood_vuln": 0.60, "landslide_vuln": 0.58, "drought_vuln": 0.35},

    # North Interior Karnataka (Arid/Semi-Arid, Drought & Heatwave Prone)
    "Kalaburagi": {"zone": "North_Interior", "elevation": 454, "slope": 3.2, "base_rain": 750, "flood_vuln": 0.35, "landslide_vuln": 0.05, "drought_vuln": 0.82},
    "Vijayapura": {"zone": "North_Interior", "elevation": 593, "slope": 2.8, "base_rain": 590, "flood_vuln": 0.30, "landslide_vuln": 0.02, "drought_vuln": 0.88},
    "Raichur": {"zone": "North_Interior", "elevation": 407, "slope": 3.0, "base_rain": 620, "flood_vuln": 0.40, "landslide_vuln": 0.03, "drought_vuln": 0.85},
    "Ballari": {"zone": "North_Interior", "elevation": 495, "slope": 4.5, "base_rain": 610, "flood_vuln": 0.35, "landslide_vuln": 0.04, "drought_vuln": 0.84},
    "Bagalkote": {"zone": "North_Interior", "elevation": 533, "slope": 3.5, "base_rain": 560, "flood_vuln": 0.45, "landslide_vuln": 0.03, "drought_vuln": 0.86},
    "Yadgir": {"zone": "North_Interior", "elevation": 389, "slope": 2.5, "base_rain": 680, "flood_vuln": 0.38, "landslide_vuln": 0.02, "drought_vuln": 0.83},
    "Koppal": {"zone": "North_Interior", "elevation": 530, "slope": 3.8, "base_rain": 570, "flood_vuln": 0.32, "landslide_vuln": 0.03, "drought_vuln": 0.85},
    "Bidar": {"zone": "North_Interior", "elevation": 615, "slope": 4.0, "base_rain": 840, "flood_vuln": 0.40, "landslide_vuln": 0.05, "drought_vuln": 0.75},
    "Gadag": {"zone": "North_Interior", "elevation": 655, "slope": 3.6, "base_rain": 610, "flood_vuln": 0.30, "landslide_vuln": 0.03, "drought_vuln": 0.82},
    "Dharwad": {"zone": "Transition", "elevation": 750, "slope": 5.2, "base_rain": 780, "flood_vuln": 0.42, "landslide_vuln": 0.10, "drought_vuln": 0.65},
    "Belagavi": {"zone": "Transition", "elevation": 762, "slope": 7.5, "base_rain": 920, "flood_vuln": 0.65, "landslide_vuln": 0.30, "drought_vuln": 0.58},
    "Haveri": {"zone": "Transition", "elevation": 605, "slope": 4.8, "base_rain": 760, "flood_vuln": 0.50, "landslide_vuln": 0.08, "drought_vuln": 0.68},
    "Vijayanagara": {"zone": "North_Interior", "elevation": 510, "slope": 4.2, "base_rain": 600, "flood_vuln": 0.38, "landslide_vuln": 0.04, "drought_vuln": 0.80},

    # South Interior Karnataka (Plateau, Mixed Agricultural & Urban Basin)
    "Bengaluru Urban": {"zone": "South_Interior", "elevation": 920, "slope": 4.0, "base_rain": 970, "flood_vuln": 0.68, "landslide_vuln": 0.02, "drought_vuln": 0.40},
    "Bengaluru Rural": {"zone": "South_Interior", "elevation": 910, "slope": 4.5, "base_rain": 880, "flood_vuln": 0.45, "landslide_vuln": 0.03, "drought_vuln": 0.52},
    "Mysuru": {"zone": "South_Interior", "elevation": 770, "slope": 5.0, "base_rain": 820, "flood_vuln": 0.52, "landslide_vuln": 0.06, "drought_vuln": 0.50},
    "Mandya": {"zone": "South_Interior", "elevation": 678, "slope": 3.8, "base_rain": 710, "flood_vuln": 0.55, "landslide_vuln": 0.02, "drought_vuln": 0.60},
    "Tumakuru": {"zone": "South_Interior", "elevation": 822, "slope": 5.5, "base_rain": 690, "flood_vuln": 0.42, "landslide_vuln": 0.05, "drought_vuln": 0.72},
    "Kolar": {"zone": "South_Interior", "elevation": 822, "slope": 4.2, "base_rain": 740, "flood_vuln": 0.35, "landslide_vuln": 0.03, "drought_vuln": 0.78},
    "Chikkaballapura": {"zone": "South_Interior", "elevation": 915, "slope": 6.2, "base_rain": 720, "flood_vuln": 0.38, "landslide_vuln": 0.05, "drought_vuln": 0.76},
    "Ramanagara": {"zone": "South_Interior", "elevation": 747, "slope": 7.0, "base_rain": 860, "flood_vuln": 0.58, "landslide_vuln": 0.08, "drought_vuln": 0.55},
    "Chamarajanagar": {"zone": "South_Interior", "elevation": 662, "slope": 8.5, "base_rain": 760, "flood_vuln": 0.45, "landslide_vuln": 0.15, "drought_vuln": 0.65},
    "Davanagere": {"zone": "Transition", "elevation": 602, "slope": 3.9, "base_rain": 650, "flood_vuln": 0.48, "landslide_vuln": 0.04, "drought_vuln": 0.70},
    "Chitradurga": {"zone": "Central_Dry", "elevation": 732, "slope": 5.0, "base_rain": 570, "flood_vuln": 0.35, "landslide_vuln": 0.04, "drought_vuln": 0.82}
}

def generate_district_dataset(samples_per_district=120, seed=42):
    """
    Generate synthetic yet physically constrained historical observations (2015-2025).
    Includes seasonal variations (Southwest Monsoon Jun-Sep, Northeast Monsoon Oct-Dec, Summer Mar-May, Winter Jan-Feb).
    """
    np.random.seed(seed)
    records = []
    
    months = np.random.choice(range(1, 13), size=samples_per_district * len(DISTRICT_PROFILES))
    idx = 0

    for district, prof in DISTRICT_PROFILES.items():
        for _ in range(samples_per_district):
            month = months[idx]
            idx += 1
            
            # Monsoon factor (Jun-Sep = heavy, Oct-Nov = moderate post-monsoon, Mar-May = hot/dry)
            is_monsoon = 1 if month in [6, 7, 8, 9] else 0
            is_post_monsoon = 1 if month in [10, 11] else 0
            is_summer = 1 if month in [3, 4, 5] else 0
            
            # Base rainfall by season & district profile
            monthly_fraction = 0.22 if is_monsoon else (0.10 if is_post_monsoon else (0.03 if is_summer else 0.01))
            rain_mean = prof["base_rain"] * monthly_fraction / 30.0
            
            # Daily rainfall & rolling cumulative windows
            rainfall_24h = max(0.0, np.random.exponential(scale=max(1.0, rain_mean)))
            # Occasional extreme cloudburst events during monsoon
            if is_monsoon and np.random.rand() < 0.08:
                rainfall_24h += np.random.uniform(50.0, 180.0)
                
            rainfall_7d = rainfall_24h + np.random.uniform(2.0, 6.0) * rainfall_24h * np.random.uniform(0.6, 1.4)
            rainfall_anomaly = np.random.normal(loc=0.0, scale=35.0)
            
            # Temperature (°C)
            base_temp = 34.0 if is_summer else (26.0 if is_monsoon else 24.0)
            if prof["elevation"] > 800:
                base_temp -= (prof["elevation"] - 800) / 180.0  # Lapse rate
            temperature = np.random.normal(loc=base_temp, scale=2.5)
            
            # Soil Moisture (%)
            base_sm = 75.0 if is_monsoon else (35.0 if is_summer else 45.0)
            soil_moisture = np.clip(base_sm + (rainfall_7d / 15.0) + np.random.normal(0, 5), 10.0, 98.0)
            
            # Humidity (%)
            humidity = np.clip(60.0 + (rainfall_24h * 0.4) + (20.0 if prof["zone"] == "Coastal" else 0.0) + np.random.normal(0, 5), 25.0, 99.0)
            
            # Consecutive Dry Days
            if is_monsoon:
                consecutive_dry_days = np.random.choice([0, 1, 2, 3], p=[0.6, 0.25, 0.1, 0.05])
            else:
                consecutive_dry_days = int(np.clip(np.random.exponential(scale=14.0), 0, 75))
                
            # River Proximity / Elevation Index
            elevation = prof["elevation"] + np.random.uniform(-30, 30)
            slope = prof["slope"] + np.random.uniform(-2, 2)
            
            # ---------------- Target Labels & Probabilistic Triggers ----------------
            # 1. Flood Risk Label: High 24h & 7d rainfall, high soil saturation, low elevation / river basin
            flood_score = (
                (rainfall_24h / 120.0) * 0.35 +
                (rainfall_7d / 400.0) * 0.30 +
                (soil_moisture / 100.0) * 0.20 +
                prof["flood_vuln"] * 0.15
            )
            flood_label = 1 if flood_score > 0.48 or (rainfall_24h > 115.0) else 0

            # 2. Drought Risk Label: Low rainfall, high consecutive dry days, high temperature, North Interior
            drought_score = (
                (consecutive_dry_days / 45.0) * 0.40 +
                (max(0, 38.0 - soil_moisture) / 30.0) * 0.30 +
                prof["drought_vuln"] * 0.20 +
                (max(0, temperature - 32.0) / 10.0) * 0.10
            )
            drought_label = 1 if drought_score > 0.52 and not is_monsoon else 0

            # 3. Landslide Risk Label: High 7d rainfall, steep slope (>18°), saturated soil, Western Ghats
            landslide_score = (
                (slope / 32.0) * 0.40 +
                (rainfall_7d / 350.0) * 0.30 +
                (soil_moisture / 100.0) * 0.15 +
                prof["landslide_vuln"] * 0.15
            )
            landslide_label = 1 if (landslide_score > 0.55 and slope > 15.0 and rainfall_7d > 120.0) else 0

            records.append({
                "district": district,
                "zone": prof["zone"],
                "month": month,
                "is_monsoon": is_monsoon,
                "rainfall_24h": round(rainfall_24h, 2),
                "rainfall_7d": round(rainfall_7d, 2),
                "rainfall_anomaly": round(rainfall_anomaly, 2),
                "temperature": round(temperature, 2),
                "soil_moisture": round(soil_moisture, 2),
                "humidity": round(humidity, 2),
                "consecutive_dry_days": consecutive_dry_days,
                "elevation": round(elevation, 1),
                "slope": round(slope, 1),
                "flood_occurred": flood_label,
                "flood_risk_score": round(np.clip(flood_score * 100, 0, 100), 1),
                "drought_occurred": drought_label,
                "drought_risk_score": round(np.clip(drought_score * 100, 0, 100), 1),
                "landslide_occurred": landslide_label,
                "landslide_risk_score": round(np.clip(landslide_score * 100, 0, 100), 1),
                "dataset_type": "DEMO_DATA_KSNDMC_CALIBRATED"
            })

    df = pd.DataFrame(records)
    out_path = os.path.join("data", "demo", "karnataka_disaster_demo_dataset.csv")
    df.to_csv(out_path, index=False)
    print(f"Generated {len(df)} records across 31 Karnataka districts.")
    print(f"Saved dataset to: {out_path}")
    print("Class Distributions:")
    print(f" - Flood Events: {df['flood_occurred'].sum()} ({df['flood_occurred'].mean()*100:.1f}%)")
    print(f" - Drought Events: {df['drought_occurred'].sum()} ({df['drought_occurred'].mean()*100:.1f}%)")
    print(f" - Landslide Events: {df['landslide_occurred'].sum()} ({df['landslide_occurred'].mean()*100:.1f}%)")
    return df

if __name__ == "__main__":
    generate_district_dataset()
