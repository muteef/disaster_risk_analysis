import { NextResponse } from "next/server";
import { KARNATAKA_DISTRICTS } from "@/data/districts";
import { computeDistrictRiskAssessment } from "@/lib/riskEngine";

export async function GET() {
  try {
    const districtsSummary = KARNATAKA_DISTRICTS.map(district => {
      const assessment = computeDistrictRiskAssessment(district);
      return {
        id: district.id,
        name: district.name,
        kannadaName: district.kannadaName,
        region: district.region,
        lat: district.lat,
        lng: district.lng,
        elevationM: district.elevationM,
        avgSlopeDeg: district.avgSlopeDeg,
        areaSqKm: district.areaSqKm,
        population: district.population,
        compositeRiskIndex: assessment.compositeRiskIndex,
        overallLevel: assessment.overallLevel,
        risks: {
          flood: assessment.disasters.flood.riskScore,
          drought: assessment.disasters.drought.riskScore,
          landslide: assessment.disasters.landslide.riskScore,
          lightning: assessment.disasters.lightning.riskScore,
          heatwave: assessment.disasters.heatwave.riskScore,
          earthquake: assessment.disasters.earthquake.riskScore,
          cyclone: assessment.disasters.cyclone.riskScore
        }
      };
    });

    return NextResponse.json({
      status: "success",
      totalDistricts: districtsSummary.length,
      districts: districtsSummary
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to retrieve districts", error: String(error) },
      { status: 500 }
    );
  }
}
