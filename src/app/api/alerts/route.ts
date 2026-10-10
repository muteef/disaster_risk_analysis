import { NextRequest, NextResponse } from "next/server";
import { VERIFIED_OFFICIAL_ALERTS, getAlertsForDistrict } from "@/data/officialAlerts";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get("district");
    const level = searchParams.get("level");

    let alerts = VERIFIED_OFFICIAL_ALERTS;

    if (district) {
      alerts = getAlertsForDistrict(district);
    }

    if (level) {
      alerts = alerts.filter(a => a.alertLevel.toLowerCase() === level.toLowerCase());
    }

    return NextResponse.json({
      status: "success",
      totalAlerts: alerts.length,
      alerts,
      officialNotice: "Official Government Alerts are sourced directly from IMD Bengaluru, KSNDMC, and NDMA/SACHET. They are strictly separate from AI predictive risk estimations."
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to retrieve official alerts", error: String(error) },
      { status: 500 }
    );
  }
}
