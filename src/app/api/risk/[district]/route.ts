import { NextRequest, NextResponse } from "next/server";
import { getDistrictById } from "@/data/districts";
import { computeDistrictRiskAssessment } from "@/lib/riskEngine";
import { getAlertsForDistrict } from "@/data/officialAlerts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ district: string }> }
) {
  try {
    const { district: districtParam } = await params;
    const district = getDistrictById(districtParam);

    if (!district) {
      return NextResponse.json(
        {
          status: "error",
          message: `District '${districtParam}' not found. Please provide a valid Karnataka district name.`
        },
        { status: 404 }
      );
    }

    const assessment = computeDistrictRiskAssessment(district);
    const officialAlerts = getAlertsForDistrict(district.name);

    return NextResponse.json({
      status: "success",
      district: district.name,
      kannadaName: district.kannadaName,
      region: district.region,
      elevation: district.elevationM,
      slope: district.avgSlopeDeg,
      baselineWeather: district.baselineWeather,
      assessment,
      officialAlerts,
      isRealDataOrDemo: "CALIBRATED_RESEARCH_DEMO_DATA_KSNDMC_STANDARD"
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to compute risk assessment", error: String(error) },
      { status: 500 }
    );
  }
}
