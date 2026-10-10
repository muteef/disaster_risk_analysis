# AI-Based Regional Disaster Risk Assessment and Awareness System for Karnataka

> **Final-Year Engineering Project & Academic Research Platform**  
> Developed for comprehensive multi-hazard susceptibility assessment across all **31 districts of Karnataka, India**.

---

## 📌 1. Project Overview

The **AI-Based Regional Disaster Risk Assessment and Awareness System for Karnataka** is a full-stack, machine-learning-driven platform engineered to assess, visualize, and communicate regional disaster susceptibility. 

Karnataka encompasses vast ecological and topographical diversity—ranging from the high-precipitation Western Ghats (Kodagu, Chikkamagaluru) prone to deadly landslides and flash floods, to the semi-arid northern Deccan plains (Kalaburagi, Raichur, Vijayapura) subjected to recurrent agricultural droughts and severe heatwaves. 

This platform bridges the gap between raw meteorological data and localized hazard impact by providing:
1. **Interactive Leaflet GIS Mapping** with dynamic risk choropleth color-coding across Karnataka.
2. **Dedicated Machine Learning Models (Random Forest)** for Flood, Drought, and Landslide hazards.
3. **Hazard Profiles** for Lightning, Heatwave, Earthquake (Zone II/III), and Arabian Sea Cyclones.
4. **Explainable AI (XAI)** revealing top contributing meteorological and physical factors.
5. **Chart.js 10-Year Historical Analytics** (annual trends, event frequency, and monthly rainfall climatology).
6. **Strict Distinction Between AI Risk Estimates and Official Government Warnings** (IMD / KSNDMC / KSDMA).
7. **RAG-Powered AI Disaster Safety Assistant** citing verified NDMA / KSDMA safety guidelines.
8. **Interactive What-If Simulation Studio** to test how risk scales under extreme monsoon or drought conditions.

---

## ⚖️ 2. Critical Academic & Data Policy

> **MANDATORY LEGAL & SCIENTIFIC NOTICE**:  
> This system provides an **AI-based regional susceptibility assessment** based on historical patterns, terrain morphology, and environmental telemetry.  
> It does **NOT** claim to predict the exact occurrence, location, or timing of any disaster.  
> **Official government alerts** issued by the India Meteorological Department (IMD) and Karnataka State Natural Disaster Monitoring Centre (KSNDMC) are strictly segregated in a dedicated banner and always take legal precedence.

---

## 💻 3. Technology Stack

- **Frontend & Full-Stack Framework**: Next.js 16 (App Router, Turbopack, React 19, TypeScript)
- **Styling & UI**: Tailwind CSS (Dark/Light mode support, modern card glassmorphism)
- **GIS Mapping**: Leaflet.js (`react-leaflet`, custom GeoJSON choropleth layers)
- **Data Visualization**: Chart.js & `react-chartjs-2` (Dual-axis bar/line plots and climatology graphs)
- **Icons**: Lucide React
- **Machine Learning Suite (Python)**:
  - Python 3.13
  - Scikit-Learn (Random Forest Ensemble Classifiers & Regressors with balanced class weights)
  - Pandas & NumPy
  - Joblib (Model persistence)
- **Deep Learning Extension**: Sequential LSTM (Long Short-Term Memory) time-series architecture for antecedent 14-day rainfall sequences (`ml/lstm_extension.py`)
- **AI Safety Assistant**: RAG knowledge retriever grounded in official NDMA / KSDMA operating procedures, with optional Google Gemini API support via `GEMINI_API_KEY`.

---

## 📁 4. Project Directory Structure

```
c:/projects/
├── public/
│   └── karnataka_districts.geojson  # GeoJSON district boundary polygons
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout & Navigation header
│   │   ├── page.tsx                 # Main Dashboard (Map, 7 Disaster Cards, Trends)
│   │   ├── simulate/page.tsx        # Interactive What-If Simulation Studio
│   │   ├── awareness/page.tsx       # 7 Hazard Safety Guides (Before/During/After, Grab-Bag)
│   │   ├── alerts/page.tsx          # Verified Government Bulletins & Admin Recorder
│   │   ├── assistant/page.tsx       # RAG AI Conversational Assistant
│   │   ├── docs/page.tsx            # Academic Documentation & Viva Defense Report
│   │   └── api/
│   │       ├── districts/route.ts   # GET /api/districts
│   │       ├── risk/[district]/     # GET /api/risk/[district]
│   │       ├── history/[district]/  # GET /api/history/[district]
│   │       ├── alerts/route.ts      # GET /api/alerts
│   │       ├── predict/route.ts     # POST /api/predict (Simulation)
│   │       ├── assistant/route.ts   # POST /api/assistant (Chat)
│   │       └── ml-metrics/route.ts  # GET /api/ml-metrics
│   ├── components/
│   │   ├── Navbar.tsx               # Responsive Header with Emergency Hotline Badges
│   │   ├── KarnatakaMap.tsx         # Leaflet GIS Map with Risk Choropleth
│   │   ├── MapWrapper.tsx           # Dynamic SSR-safe Leaflet Wrapper
│   │   ├── RiskCard.tsx             # Multi-hazard Risk Meter & XAI Trigger
│   │   ├── ExplainableModal.tsx     # XAI Gini Factor Breakdown Modal
│   │   ├── HistoricalCharts.tsx     # Chart.js 10-Yr Trends & Monthly Climatology
│   │   └── OfficialAlertsBanner.tsx # Segregated Official Government Alerts Banner
│   ├── data/
│   │   ├── districts.ts             # 31 Karnataka Districts with Geographical Profiles
│   │   ├── disasterKnowledge.ts     # NDMA / KSDMA Safety Protocols & Helplines
│   │   ├── officialAlerts.ts        # Verified IMD / KSNDMC Bulletins
│   │   ├── model_metrics.json       # Genuine Scikit-Learn Training Metrics
│   │   └── lstm_comparison.json     # Deep Learning LSTM Architecture Comparison
│   └── lib/
│       ├── riskEngine.ts            # Probabilistic Multi-Hazard Risk Inference Engine
│       └── geminiAssistant.ts       # RAG Knowledge Engine & Gemini API Client
├── ml/
│   ├── dataset_generator.py         # Calibrated 3,720 Karnataka Disaster Record Generator
│   ├── train_models.py              # Random Forest Model Training Pipeline
│   ├── evaluate_models.py           # Evaluation Benchmark & Confusion Matrix Printer
│   └── lstm_extension.py            # 14-Day Recurrent Deep Learning Sequence Model
├── models/
│   ├── flood_classifier.pkl         # Serialized Flood Random Forest Classifier
│   ├── flood_regressor.pkl          # Serialized Flood Continuous Risk Regressor
│   ├── drought_classifier.pkl       # Serialized Drought Model
│   ├── drought_regressor.pkl        # Serialized Drought Continuous Regressor
│   ├── landslide_classifier.pkl     # Serialized Landslide Classifier
│   └── landslide_regressor.pkl      # Serialized Landslide Continuous Regressor
├── data/
│   └── demo/
│       └── karnataka_disaster_demo_dataset.csv  # 3,720 Calibrated Records
├── package.json
└── README.md
```

---

## 🚀 5. How to Run the Application on Windows 11 (VS Code)

### Step 1: Open the Project in VS Code
Open VS Code, press `Ctrl + ~` to open the integrated PowerShell terminal, and ensure you are in the project folder:
```powershell
cd c:\projects
```

### Step 2: Run the Development Server
```powershell
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🔬 6. How to Re-Train and Evaluate the Python ML Models (For Project Viva)

If your external examiner or college professor asks you to demonstrate the machine learning code in Python, execute the following commands in the terminal:

### 1. Re-generate the Calibrated Dataset:
```powershell
python ml/dataset_generator.py
```
*Output: Generates 3,720 records across all 31 Karnataka districts with physically constrained monsoonal patterns.*

### 2. Train the Random Forest Models:
```powershell
python ml/train_models.py
```
*Output: Trains balanced Random Forest ensembles, saves `.pkl` binaries into `models/`, and exports metrics to `src/data/model_metrics.json`.*

### 3. Print the Academic Evaluation Report:
```powershell
python ml/evaluate_models.py
```
*Output: Displays test accuracy, precision, recall, F1-scores, confusion matrices, and top Gini feature importances.*

### 4. Run the Deep Learning LSTM Extension:
```powershell
python ml/lstm_extension.py
```
*Output: Demonstrates the 14-day antecedent recurrent sequence architecture and compares it against the Random Forest baseline.*

---

## 📊 7. Verified Machine Learning Benchmark Results

| Hazard Model | ML Algorithm | Test Accuracy | Precision | Recall | F1-Score | ROC-AUC | Top Factor (Weight %) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Flood** | Random Forest (Balanced) | **99.78%** | 96.77% | 96.77% | **96.77%** | 0.9999 | 24h Rain (37.7%), 7d Rain (34.2%) |
| **Drought** | Random Forest (Balanced) | **97.85%** | 63.04% | 90.62% | **74.36%** | 0.9937 | Consecutive Dry Days (73.8%), Soil Moisture (10.2%) |
| **Landslide**| Random Forest (Balanced) | **99.78%** | 90.91% | 90.91% | **90.91%** | 0.9998 | 7d Rain (43.7%), 24h Rain (29.5%), Slope (18.2%) |

### Confusion Matrix Results
- **Flood Model**: `[[898, 1], [1, 30]]` (30 True Positives, 1 False Positive)
- **Drought Model**: `[[881, 17], [3, 29]]` (29 True Positives, 17 False Positives)
- **Landslide Model**: `[[918, 1], [1, 10]]` (10 True Positives, 1 False Positive)

---

## 🌐 8. REST API Endpoints

- `GET /api/districts` — Lists all 31 Karnataka districts with summary coordinates, elevation, and composite risk index.
- `GET /api/risk/:district` — Detailed multi-hazard assessment and explainable AI factors for a specified district (e.g., `/api/risk/Kodagu`).
- `GET /api/history/:district` — 10-year historical disaster event counts and monthly rainfall trends for Chart.js.
- `GET /api/alerts` — Verified official government bulletins with district and severity filtering (`?district=Kodagu&level=ORANGE_ALERT`).
- `POST /api/predict` — Dynamic what-if simulation with customizable rainfall, temperature, and soil moisture overrides.
- `POST /api/assistant` — RAG-powered disaster safety chatbot answering queries with verified NDMA citations.
- `GET /api/ml-metrics` — Returns genuine Scikit-Learn training evaluation metrics and confusion matrices.

---

## 📞 9. Official Karnataka Emergency Contacts

- **Unified Emergency Support (Police/Fire/Ambulance)**: `112`
- **Karnataka State Emergency Operations Centre (SEOC)**: `1070`
- **District Emergency Operations Centre (DEOC)**: `1077`
- **KSNDMC Varuna Mitra Weather Helpline (24x7)**: `9243345433`
- **Arogya Kavacha Ambulance**: `108`

---

## 🎓 10. Academic Project Presentation Summary

When presenting this project for your final-year college evaluation or viva:
1. Open the **Dashboard (`/`)**: Show the interactive Leaflet map of Karnataka, click on **Kodagu** (observe high landslide & flood risk due to Western Ghats slope and heavy rainfall), then click on **Kalaburagi** (observe high drought and heatwave risk due to the arid northern climate).
2. Click **&quot;Factors Breakdown&quot;** on any risk card to demonstrate **Explainable AI (XAI)**.
3. Open the **Simulation Studio (`/simulate`)**: Show how dialing up 24h rainfall to 150mm dynamically triggers a flood alert.
4. Open the **Project Docs (`/docs`)**: Walk the examiners through the **System Architecture**, **DFD**, **ER Diagram**, and the **Confusion Matrix & ML Evaluation Table**.
5. Open the **AI Safety Assistant (`/assistant`)**: Demonstrate how it provides verified NDMA safety protocols without hallucination.
