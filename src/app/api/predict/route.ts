import { NextRequest, NextResponse } from "next/server";
import { getDistrictById } from "@/data/districts";
import { computeDistrictRiskAssessment, CustomWeatherOverrides } from "@/lib/riskEngine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { district: districtName, weatherOverrides } = body;

    if (!districtName) {
      return NextResponse.json(
        { status: "error", message: "District name is required in request body." },
        { status: 400 }
      );
    }

    const district = getDistrictById(districtName);
    if (!district) {
      return NextResponse.json(
        { status: "error", message: `District '${districtName}' not found in Karnataka registry.` },
        { status: 404 }
      );
    }

    const assessment = computeDistrictRiskAssessment(
      district,
      weatherOverrides as CustomWeatherOverrides
    );

    return NextResponse.json({
      status: "success",
      district: district.name,
      simulationActive: Boolean(weatherOverrides),
      weatherApplied: {
        ...district.baselineWeather,
        ...(weatherOverrides || {})
      },
      risk: {
        flood: assessment.disasters.flood.riskScore,
        drought: assessment.disasters.drought.riskScore,
        landslide: assessment.disasters.landslide.riskScore,
        lightning: assessment.disasters.lightning.riskScore,
        heatwave: assessment.disasters.heatwave.riskScore,
        earthquake: assessment.disasters.earthquake.riskScore,
        cyclone: assessment.disasters.cyclone.riskScore
      },
      risk_level: {
        flood: assessment.disasters.flood.riskLevel,
        drought: assessment.disasters.drought.riskLevel,
        landslide: assessment.disasters.landslide.riskLevel,
        lightning: assessment.disasters.lightning.riskLevel,
        heatwave: assessment.disasters.heatwave.riskLevel,
        earthquake: assessment.disasters.earthquake.riskLevel,
        cyclone: assessment.disasters.cyclone.riskLevel
      },
      compositeRiskIndex: assessment.compositeRiskIndex,
      overallLevel: assessment.overallLevel,
      assessmentDetails: assessment
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to run prediction simulation", error: String(error) },
      { status: 500 }
    );
  }
}
