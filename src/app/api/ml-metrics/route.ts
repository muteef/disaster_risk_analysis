import { NextResponse } from "next/server";
import metricsData from "@/data/model_metrics.json";
import lstmData from "@/data/lstm_comparison.json";

export async function GET() {
  try {
    return NextResponse.json({
      status: "success",
      datasetDescription: {
        source: "Karnataka State Natural Disaster Monitoring Centre (KSNDMC) & IMD Calibrated Benchmark",
        totalRecords: 3720,
        districtsCovered: 31,
        timeSpanYears: "2015-2025 (10-Year Climatological Window)",
        labelingPolicy: "DEMO DATASET - Statistically Constrained to Physical Karnataka Zones"
      },
      models: metricsData,
      deepLearningExtension: lstmData,
      benchmarkingStandard: "Stratified 75:25 Train/Test Split with Balanced Sub-Sampling"
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to load ML metrics", error: String(error) },
      { status: 500 }
    );
  }
}
