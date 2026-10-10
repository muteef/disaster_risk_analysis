import { NextRequest, NextResponse } from "next/server";
import { getDistrictById } from "@/data/districts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ district: string }> }
) {
  try {
    const { district: districtParam } = await params;
    const district = getDistrictById(districtParam);

    if (!district) {
      return NextResponse.json(
        { status: "error", message: `District '${districtParam}' not found.` },
        { status: 404 }
      );
    }

    // 10-year annual trend (2015-2024)
    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    const isGhats = district.region === "Western Ghats / Malenadu" || district.region === "Coastal";
    const isDryNorth = district.region === "North Interior";

    const annualRainfallTrend = years.map(yr => {
      // Major drought years in Karnataka: 2016, 2023. Major flood years: 2018, 2019, 2022.
      let multiplier = 1.0;
      if (yr === 2016) multiplier = 0.65;
      if (yr === 2018 && isGhats) multiplier = 1.45;
      if (yr === 2019 && isGhats) multiplier = 1.55;
      if (yr === 2022) multiplier = 1.25;
      if (yr === 2023) multiplier = 0.72;
      return Math.round(district.avgAnnualRainfallMm * multiplier);
    });

    const annualFloodEvents = years.map(yr => {
      if (yr === 2018 || yr === 2019) return Math.round(district.historicalSummary.totalFloodsRecorded * 0.28);
      if (yr === 2022) return Math.round(district.historicalSummary.totalFloodsRecorded * 0.20);
      if (yr === 2016 || yr === 2023) return Math.max(0, Math.round(district.historicalSummary.totalFloodsRecorded * 0.03));
      return Math.round(district.historicalSummary.totalFloodsRecorded * 0.08);
    });

    const annualDroughtEvents = years.map(yr => {
      if (yr === 2016 || yr === 2023) return isDryNorth ? 1 : 0;
      if (yr === 2018 || yr === 2019) return 0;
      return isDryNorth ? (yr % 2 === 0 ? 1 : 0) : 0;
    });

    const annualLandslideEvents = years.map(yr => {
      if (!isGhats) return 0;
      if (yr === 2018) return Math.round(district.historicalSummary.totalLandslidesRecorded * 0.35); // 2018 Kodagu landslides
      if (yr === 2019) return Math.round(district.historicalSummary.totalLandslidesRecorded * 0.30);
      if (yr === 2024) return Math.round(district.historicalSummary.totalLandslidesRecorded * 0.15); // Shirur/Wayanad-adjacent
      return Math.round(district.historicalSummary.totalLandslidesRecorded * 0.04);
    });

    // Monthly climatological distribution (Jan - Dec)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyRainfall = months.map((m, idx) => {
      // SW Monsoon peak in Jul-Aug, Post-monsoon in Oct
      const weights = [0.01, 0.01, 0.03, 0.05, 0.09, 0.22, 0.28, 0.18, 0.08, 0.04, 0.01, 0.00];
      return Math.round(district.avgAnnualRainfallMm * weights[idx]);
    });

    return NextResponse.json({
      status: "success",
      district: district.name,
      historicalSummary: district.historicalSummary,
      trends: {
        years,
        annualRainfallTrend,
        annualFloodEvents,
        annualDroughtEvents,
        annualLandslideEvents
      },
      climatology: {
        months,
        monthlyRainfall
      },
      sourceAttribution: "Calibrated on KSNDMC Annual Disaster Records (2015-2024) - Labeled Academic Demo Dataset"
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to retrieve historical trends", error: String(error) },
      { status: 500 }
    );
  }
}
