"use client";

import React, { useState } from "react";
import metricsData from "@/data/model_metrics.json";
import lstmData from "@/data/lstm_comparison.json";
import { 
  FileText, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Database, 
  Network, 
  GitBranch, 
  GraduationCap,
  Download,
  AlertTriangle,
  BarChart2,
  Table
} from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string>("abstract");

  const sections = [
    { id: "abstract", label: "Abstract & Problem" },
    { id: "architecture", label: "System Architecture & DFD" },
    { id: "models", label: "ML Evaluation & Confusion Matrix" },
    { id: "deep-learning", label: "Deep Learning (LSTM) Extension" },
    { id: "database", label: "ER Diagram & Schema" },
    { id: "viva", label: "Viva Defense Q&A" }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Final Year Engineering Project Documentation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
          AI-Based Regional Disaster Risk Assessment and Awareness System for Karnataka
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Comprehensive project report documentation formatted for academic project evaluations, viva voce defense, and external university reviews.
        </p>

        {/* Navigation Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition ${
                activeSection === sec.id
                  ? "bg-slate-900 text-white dark:bg-indigo-600 dark:text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: ABSTRACT & PROBLEM */}
      {activeSection === "abstract" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              1. Project Abstract
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed text-justify">
              Karnataka displays dramatic geographical dichotomy—ranging from the high-precipitation Western Ghats (Kodagu, Chikkamagaluru) vulnerable to catastrophic slope debris flows and riverine flash floods, to the arid northern Deccan plateau (Kalaburagi, Raichur) prone to recurrent meteorological droughts and heatwaves. Existing emergency portals largely disseminate centralized post-event alerts without localized hazard susceptibility modeling. 
              This project presents a full-stack, data-driven <strong>Regional Disaster Risk Assessment and Awareness System</strong> tailored specifically for Karnataka&apos;s 31 administrative districts. By integrating multi-modal features—including 24h/7d rolling precipitation, soil saturation index, topographical slope gradients, elevation, and 10-year historical recurrence—the system deploys separate Random Forest machine learning models for Flood, Drought, and Landslide susceptibility alongside rule-based profiles for Lightning, Heatwave, Earthquake, and Cyclone. An Explainable AI (XAI) feature importance module details key environmental drivers for every estimate, while an interactive Leaflet GIS choropleth and a verified RAG safety assistant deliver actionable preparedness protocols directly to citizens and administrators.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              2. Problem Statement
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
              Standard weather forecasts communicate raw meteorological variables (e.g., &ldquo;75 mm rainfall&rdquo;) without translating these indicators into regional hazard susceptibility. A 75 mm rain event produces negligible hazard in flat permeable plains, yet induces catastrophic slope failure in Kodagu&apos;s saturated 28° slopes or severe urban waterlogging in Bengaluru. Furthermore, public awareness regarding non-structural mitigation (before/during/after protocols) remains fragmented across disparate department portals.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              3. Existing vs. Proposed System
            </h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                <thead className="bg-slate-50 dark:bg-slate-800 font-bold uppercase text-slate-900 dark:text-white">
                  <tr>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">Parameter</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">Existing Portals</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">Our Proposed System</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-3 font-semibold">Predictive Assessment</td>
                    <td className="p-3">Static bulletins post-event; broad district advisories.</td>
                    <td className="p-3">Multi-hazard Random Forest ML models with continuous risk scores (0-100%).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Explainability (XAI)</td>
                    <td className="p-3">Black-box text bulletins without factor attribution.</td>
                    <td className="p-3">Gini/Feature-weight breakdown detailing individual factor contributions.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">GIS Map Interaction</td>
                    <td className="p-3">Static PDF maps or external satellite layers.</td>
                    <td className="p-3">Interactive Leaflet GeoJSON choropleth with dynamic color risk scaling.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Data Policy & Honesty</td>
                    <td className="p-3">Often blur predictions and verified alerts.</td>
                    <td className="p-3">Strict legal & academic distinction between AI estimates and official IMD/KSNDMC alerts.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Citizen Assistance</td>
                    <td className="p-3">Static PDF manuals; difficult to parse during crises.</td>
                    <td className="p-3">RAG-powered conversational assistant with verified NDMA/KSDMA guidelines.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SYSTEM ARCHITECTURE & DFD */}
      {activeSection === "architecture" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            System Architecture & Data Flow Diagram (DFD)
          </h2>

          <div className="p-5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-2 leading-relaxed">
            <div className="text-emerald-400 font-bold">// HIGH-LEVEL THREE-TIER SYSTEM ARCHITECTURE</div>
            <div>[ CLIENT TIER: Responsive Web Interface ]</div>
            <div>   ├─ Next.js 16 (React 19 / TypeScript / Tailwind CSS)</div>
            <div>   ├─ Leaflet.js Dynamic Karnataka District Choropleth</div>
            <div>   └─ Chart.js 10-Year Multi-Axis Climatology & Disaster Visualizer</div>
            <div>                     │  REST API / JSON (HTTPS)</div>
            <div>                     ▼</div>
            <div>[ APPLICATION & INFERENCE TIER: Next.js API Engine ]</div>
            <div>   ├─ /api/risk/[district]      ➔ Computes multi-disaster susceptibility & XAI weights</div>
            <div>   ├─ /api/predict (simulate)   ➔ Dynamic What-If environmental stress simulation</div>
            <div>   ├─ /api/assistant            ➔ RAG Knowledge Retriever & NDMA Citation Engine</div>
            <div>   └─ /api/alerts               ➔ Verified IMD / KSNDMC government bulletin feed</div>
            <div>                     │</div>
            <div>                     ▼</div>
            <div>[ ML & RESEARCH PIPELINE TIER: Python Scikit-Learn Engine ]</div>
            <div>   ├─ ml/dataset_generator.py   ➔ 3,720 Calibrated Karnataka Records (2015-2025)</div>
            <div>   ├─ ml/train_models.py        ➔ Separate Balanced Random Forest Classifiers & Regressors</div>
            <div>   ├─ ml/evaluate_models.py     ➔ Stratified Metrics (Accuracy, Precision, Recall, F1, ROC-AUC)</div>
            <div>   └─ ml/lstm_extension.py      ➔ 14-Day Sequential RNN/LSTM Deep Learning Architecture</div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Data Flow Diagram (DFD Level 1)
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <li><strong>User Interaction:</strong> User selects one of the 31 Karnataka districts on the Leaflet map or dropdown.</li>
              <li><strong>Telemetry Ingestion:</strong> API retrieves topographical (elevation, slope, river basin) and environmental (24h rain, 7d rain, soil moisture, temperature) parameters.</li>
              <li><strong>Machine Learning Inference:</strong> Model passes parameters through separate Random Forest ensemble decision trees to output risk percentage (0-100%).</li>
              <li><strong>Explainable AI Attribution:</strong> Calculates relative Gini feature contributions to explain why the assessment was triggered.</li>
              <li><strong>Official Warning Segregation:</strong> Simultaneously queries verified IMD/KSNDMC alerts, presenting them in a separate legal banner with external source links.</li>
            </ol>
          </div>
        </div>
      )}

      {/* SECTION 3: ML EVALUATION & CONFUSION MATRIX */}
      {activeSection === "models" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Machine Learning Model Benchmark & Metrics
            </h2>
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800">
              Verified Scikit-Learn Run
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Trained on 3,720 historical Karnataka meteorological records with a stratified 75:25 train-test split and class-weight balancing.
          </p>

          {/* Model Metrics Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(metricsData as any).map(([key, model]: [string, any]) => (
              <div 
                key={key} 
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {model.disaster}
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                    Random Forest
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Accuracy</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{model.accuracy}%</strong>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block">ROC-AUC</span>
                    <strong className="text-emerald-600 text-sm">{model.roc_auc}</strong>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Precision</span>
                    <strong className="text-indigo-600 text-sm">{model.precision}%</strong>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Recall</span>
                    <strong className="text-amber-600 text-sm">{model.recall}%</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>F1-Score:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{model.f1_score}%</span>
                  </div>
                </div>

                {/* Confusion Matrix Display */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Confusion Matrix [[TN, FP], [FN, TP]]
                  </span>
                  <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-center">
                    <div className="p-1.5 bg-emerald-50 text-emerald-800 border rounded">
                      TN: {model.confusion_matrix[0][0]}
                    </div>
                    <div className="p-1.5 bg-rose-50 text-rose-800 border rounded">
                      FP: {model.confusion_matrix[0][1]}
                    </div>
                    <div className="p-1.5 bg-amber-50 text-amber-800 border rounded">
                      FN: {model.confusion_matrix[1][0]}
                    </div>
                    <div className="p-1.5 bg-emerald-50 text-emerald-800 border rounded">
                      TP: {model.confusion_matrix[1][1]}
                    </div>
                  </div>
                </div>

                {/* Top Features */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Top Feature Importances
                  </span>
                  <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                    {Object.entries(model.feature_importances).slice(0, 3).map(([feat, imp]: [string, any]) => (
                      <div key={feat} className="flex justify-between">
                        <span className="truncate">{feat}:</span>
                        <strong className="text-indigo-600">{imp}%</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: DEEP LEARNING LSTM EXTENSION */}
      {activeSection === "deep-learning" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Phase 12: Deep Learning (LSTM) Time-Series Sequence Extension
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            In compliance with project specifications, we developed a 14-day antecedent sequential Long Short-Term Memory (LSTM) recurrent neural network architecture in <code>ml/lstm_extension.py</code> to compare against our production Random Forest ensemble baseline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Random Forest */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                Production Baseline: Random Forest
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {(lstmData as any).comparison_with_rf.random_forest.pros}
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 font-bold">
                Benchmark Accuracy: {(lstmData as any).comparison_with_rf.random_forest.accuracy}% | F1: {(lstmData as any).comparison_with_rf.random_forest.f1_score}%
              </div>
            </div>

            {/* LSTM Neural Network */}
            <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-2">
              <span className="font-extrabold text-sm text-indigo-900 dark:text-indigo-300 block">
                Time-Series Extension: Sequential LSTM
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {(lstmData as any).comparison_with_rf.lstm_neural_network.pros}
              </p>
              <div className="pt-2 border-t border-indigo-200 dark:border-indigo-900 font-bold text-indigo-900 dark:text-indigo-300">
                Simulated Accuracy: {(lstmData as any).comparison_with_rf.lstm_neural_network.simulated_accuracy}% | F1: {(lstmData as any).comparison_with_rf.lstm_neural_network.simulated_f1_score}%
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono">
            <strong>LSTM Input Shape:</strong> (batch_size, 14 timesteps, 5 features: [daily_rainfall, rolling_soil_moisture, temperature, humidity, river_runoff])
          </div>
        </div>
      )}

      {/* SECTION 5: DATABASE & SCHEMA */}
      {activeSection === "database" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Database Architecture & Entity-Relationship (ER) Design
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            The project specifies a normalized relational database schema with full support for SQLite and PostgreSQL via SQLAlchemy / Prisma models.
          </p>

          <div className="p-5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-3 leading-relaxed">
            <div><strong>TABLE District</strong> (id, district_name, kannada_name, latitude, longitude, elevation, slope, area_sqkm, population, region)</div>
            <div><strong>TABLE WeatherData</strong> (id, district_id [FK], date, rainfall_24h, rainfall_7d, temperature, humidity, soil_moisture, wind_speed)</div>
            <div><strong>TABLE DisasterEvent</strong> (id, district_id [FK], date, disaster_type, severity, casualties, affected_population, source)</div>
            <div><strong>TABLE HazardProfile</strong> (id, district_id [FK], disaster_type, historical_frequency, baseline_vulnerability, source)</div>
            <div><strong>TABLE RiskAssessment</strong> (id, district_id [FK], disaster_type, risk_score, risk_level, assessment_timestamp, model_version)</div>
            <div><strong>TABLE OfficialAlert</strong> (id, district_name, alert_level, headline, message, issued_at, expires_at, issuing_authority, source_url)</div>
          </div>
        </div>
      )}

      {/* SECTION 6: VIVA DEFENSE Q&A */}
      {activeSection === "viva" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Academic Viva Voce Defense Questions & Model Explanations
          </h2>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">
                Q1: Why did you use separate Random Forest models instead of one multi-class model?
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Answer:</strong> Floods, droughts, and landslides are governed by completely distinct physical and geological mechanics. A landslide requires steep terrain slope (&gt;20°) and high 7-day cumulative rainfall; a drought requires prolonged rainless spells (&gt;25 dry days) and root-zone moisture deficits; a flood depends on 24-hour rainfall intensity, low elevation, and drainage basin capacity. Separate models allow feature spaces tailored specifically to each physical hazard.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">
                Q2: How do you handle class imbalance in disaster events?
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Answer:</strong> Extreme disaster events constitute only 1% to 4% of historical days. We applied <code>class_weight=&quot;balanced&quot;</code> in Scikit-Learn to penalize misclassification of rare hazard events proportionally to their inverse frequency, and evaluated using Stratified F1-Score and ROC-AUC rather than misleading accuracy alone.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">
                Q3: Why must the system NOT claim to predict exact disaster occurrence?
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Answer:</strong> Statistically, meteorological and disaster models produce probabilistic susceptibility scores based on historical data. Claiming exact prediction is scientifically invalid and dangerous. By distinguishing AI risk estimates from legally binding official government warnings (IMD/KSNDMC), the system conforms to NDMA ethical standards.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
