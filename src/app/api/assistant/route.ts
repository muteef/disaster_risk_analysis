import { NextRequest, NextResponse } from "next/server";
import { askDisasterAssistant } from "@/lib/geminiAssistant";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { status: "error", message: "Query text is required." },
        { status: 400 }
      );
    }

    const result = await askDisasterAssistant(query.trim());

    return NextResponse.json({
      status: "success",
      query: query.trim(),
      reply: result.reply,
      sources: result.sources,
      suggestedPrompts: result.suggestedPrompts,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Error processing assistant query", error: String(error) },
      { status: 500 }
    );
  }
}
