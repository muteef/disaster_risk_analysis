import { DISASTER_KNOWLEDGE_BASE, KARNATAKA_EMERGENCY_CONTACTS, DisasterGuideline } from "@/data/disasterKnowledge";
import { KARNATAKA_DISTRICTS } from "@/data/districts";
import { computeDistrictRiskAssessment } from "./riskEngine";

export interface AssistantMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  sources?: string[];
  suggestedPrompts?: string[];
}

export async function askDisasterAssistant(userQuery: string): Promise<{
  reply: string;
  sources: string[];
  suggestedPrompts: string[];
}> {
  const queryLower = userQuery.toLowerCase();

  // Check if an external Gemini API key is configured
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userQuery }]
            }
          ],
          systemInstruction: {
            parts: [{
              text: `You are the Karnataka AI Disaster Risk & Awareness Assistant.
STRICT GUIDELINES:
1. You are an academic AI assistant, NOT an official government emergency dispatch authority.
2. NEVER claim to predict the exact occurrence, timing, or severity of any disaster.
3. Clearly distinguish AI risk estimations from official government alerts issued by KSNDMC / IMD / KSDMA.
4. For all acute emergencies, direct the user immediately to call 112 (Karnataka Unified Emergency), 1070 (State Emergency Operations Centre), or 1077 (District Control Room).
5. Only provide verified disaster management advice conforming to NDMA and KSDMA safety guidelines.
6. Always cite the verified disaster management authority at the conclusion of your response.`
            }]
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const geminiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiReply) {
          return {
            reply: geminiReply,
            sources: ["Google Gemini AI with Karnataka Disaster Management Knowledge Base", "NDMA / KSDMA Guidelines"],
            suggestedPrompts: [
              "What emergency supplies should I keep for floods?",
              "What are the warning signs of a landslide in Kodagu?",
              "How to deal with extreme heat in Kalaburagi?",
              "What does the 30-30 rule mean for lightning?"
            ]
          };
        }
      }
    } catch (e) {
      console.warn("External Gemini API call failed, falling back to built-in RAG engine:", e);
    }
  }

  // Built-in Deterministic RAG & Safety Knowledge Engine
  return generateLocalRAGResponse(queryLower, userQuery);
}

function generateLocalRAGResponse(queryLower: string, rawQuery: string): {
  reply: string;
  sources: string[];
  suggestedPrompts: string[];
} {
  // 1. Check for specific disaster type
  let matchedDisaster: DisasterGuideline | null = null;
  if (queryLower.includes("flood") || queryLower.includes("waterlog") || queryLower.includes("inundat") || queryLower.includes("rain")) {
    matchedDisaster = DISASTER_KNOWLEDGE_BASE.flood;
  } else if (queryLower.includes("landslide") || queryLower.includes("ghat") || queryLower.includes("mudslide") || queryLower.includes("slope")) {
    matchedDisaster = DISASTER_KNOWLEDGE_BASE.landslide;
  } else if (queryLower.includes("drought") || queryLower.includes("water short") || queryLower.includes("dry") || queryLower.includes("borewell")) {
    matchedDisaster = DISASTER_KNOWLEDGE_BASE.drought;
  } else if (queryLower.includes("lightning") || queryLower.includes("thunder") || queryLower.includes("damini") || queryLower.includes("strike")) {
    matchedDisaster = DISASTER_KNOWLEDGE_BASE.lightning;
  } else if (queryLower.includes("heat") || queryLower.includes("sunstroke") || queryLower.includes("temperature")) {
    matchedDisaster = DISASTER_KNOWLEDGE_BASE.heatwave;
  } else if (queryLower.includes("earthquake") || queryLower.includes("quake") || queryLower.includes("tremor") || queryLower.includes("seismic")) {
    matchedDisaster = DISASTER_KNOWLEDGE_BASE.earthquake;
  } else if (queryLower.includes("cyclone") || queryLower.includes("wind") || queryLower.includes("gale") || queryLower.includes("storm")) {
    matchedDisaster = DISASTER_KNOWLEDGE_BASE.cyclone;
  }

  // 2. Check for district inquiries
  const matchedDistrict = KARNATAKA_DISTRICTS.find(d =>
    queryLower.includes(d.name.toLowerCase()) || queryLower.includes(d.id.toLowerCase())
  );

  if (matchedDistrict && matchedDisaster) {
    const assessment = computeDistrictRiskAssessment(matchedDistrict);
    const disasterAssessment = assessment.disasters[matchedDisaster.type as keyof typeof assessment.disasters];

    return {
      reply: `### Assessment & Safety Guidelines for ${matchedDistrict.name}: ${matchedDisaster.title}

**AI Risk Estimate**: ${disasterAssessment.riskScore}% (${disasterAssessment.riskLevel} Risk)
*Notice: This is a data-driven risk susceptibility score calculated by our Random Forest model and does not claim to predict exact event timing or replace official government warnings.*

#### Key Contributing Factors in ${matchedDistrict.name}:
${disasterAssessment.contributingFactors.map(f => `• **${f.factor}**: ${f.observedValue} (${f.scientificRationale})`).join("\n")}

#### Immediate Safety Action (During Emergency):
${matchedDisaster.phases.during.map(d => `• ${d}`).join("\n")}

#### Critical Do's and Don'ts:
• **DO**: ${matchedDisaster.dos[0]}
• **DON'T**: ${matchedDisaster.donts[0]}

> **Emergency Notice**: For immediate life-safety emergencies in ${matchedDistrict.name}, dial **112** (Unified Emergency) or **1077** (District Disaster Control Room).`,
      sources: matchedDisaster.authoritativeSources,
      suggestedPrompts: [
        `What emergency kit is recommended for ${matchedDistrict.name}?`,
        `View official government alerts for ${matchedDistrict.name}`,
        `What are the warning signs of a ${matchedDisaster.type}?`
      ]
    };
  }

  if (matchedDistrict && !matchedDisaster) {
    const assessment = computeDistrictRiskAssessment(matchedDistrict);
    return {
      reply: `### Regional Disaster Profile: ${matchedDistrict.name} (${matchedDistrict.kannadaName})

**Region**: ${matchedDistrict.region}  
**Elevation**: ${matchedDistrict.elevationM} m | **Mean Annual Rainfall**: ${matchedDistrict.avgAnnualRainfallMm} mm  
**Overall AI Composite Risk**: **${assessment.compositeRiskIndex}% (${assessment.overallLevel})**

#### Multi-Hazard Susceptibility Breakdown:
• **Flood Risk**: ${assessment.disasters.flood.riskScore}% (${assessment.disasters.flood.riskLevel})  
• **Landslide Risk**: ${assessment.disasters.landslide.riskScore}% (${assessment.disasters.landslide.riskLevel})  
• **Drought Risk**: ${assessment.disasters.drought.riskScore}% (${assessment.disasters.drought.riskLevel})  
• **Lightning Risk**: ${assessment.disasters.lightning.riskScore}% (${assessment.disasters.lightning.riskLevel})  
• **Heatwave Risk**: ${assessment.disasters.heatwave.riskScore}% (${assessment.disasters.heatwave.riskLevel})  
• **Earthquake Zone**: ${assessment.disasters.earthquake.summaryNote}

*Disclaimer: These figures represent AI regional susceptibility estimations based on historical and topographical parameters, not certified real-time government evacuation orders.*`,
      sources: ["Karnataka State Natural Disaster Monitoring Centre (KSNDMC)", "District Disaster Management Plan (DDMP)"],
      suggestedPrompts: [
        `How to prepare for floods in ${matchedDistrict.name}?`,
        `Landslide safety precautions for ${matchedDistrict.name}`,
        `Show official alerts for ${matchedDistrict.name}`
      ]
    };
  }

  if (matchedDisaster) {
    // Check specific sub-topics
    if (queryLower.includes("kit") || queryLower.includes("supplies") || queryLower.includes("bag")) {
      return {
        reply: `### Essential Emergency Preparedness Kit for ${matchedDisaster.title}

According to official NDMA and KSDMA disaster mitigation frameworks, households in vulnerable zones should assemble a 72-hour survival kit:

${matchedDisaster.emergencyKitList.map((item, idx) => `${idx + 1}. **${item}**`).join("\n")}

#### Additional Guidelines:
• Store the emergency grab-bag in an easily accessible location known to all family members.  
• Rotate potable water and canned food supplies every 6 months.  
• Ensure prescription medications are renewed before expiration dates.`,
        sources: matchedDisaster.authoritativeSources,
        suggestedPrompts: [
          `What should I do during a ${matchedDisaster.type}?`,
          `What are the warning signs of a ${matchedDisaster.type}?`,
          `Which Karnataka districts are most prone to ${matchedDisaster.type}?`
        ]
      };
    }

    if (queryLower.includes("during") || queryLower.includes("what should i do") || queryLower.includes("action")) {
      return {
        reply: `### Action Protocol During a ${matchedDisaster.title}

#### Immediate Safety Actions:
${matchedDisaster.phases.during.map(step => `• ${step}`).join("\n")}

#### Critical Do's & Don'ts:
**DO:**
${matchedDisaster.dos.map(item => `✓ ${item}`).join("\n")}

**DON'T:**
${matchedDisaster.donts.map(item => `✗ ${item}`).join("\n")}

> **Important**: Always comply immediately with evacuation orders broadcast by local revenue officials, Police, or NDRF teams. For rescue assistance, call **112** or **1070**.`,
        sources: matchedDisaster.authoritativeSources,
        suggestedPrompts: [
          `What are the warning signs before a ${matchedDisaster.type}?`,
          `What emergency supplies are needed?`,
          `How is ${matchedDisaster.type} risk assessed by the AI model?`
        ]
      };
    }

    return {
      reply: `### Disaster Awareness Overview: ${matchedDisaster.title} (${matchedDisaster.kannadaTitle})

**Scientific Definition:**  
${matchedDisaster.scientificMeaning}

#### Major Contributing Factors in Karnataka:
${matchedDisaster.causesInKarnataka.map(c => `• ${c}`).join("\n")}

#### Early Warning Signs:
${matchedDisaster.warningSigns.map(w => `• ${w}`).join("\n")}

#### Preparedness Protocol:
• **Before**: ${matchedDisaster.phases.before[0]}
• **During**: ${matchedDisaster.phases.during[0]}
• **After**: ${matchedDisaster.phases.after[0]}

> **Emergency Assistance**: Call the Karnataka State Disaster Control Room at **1070** or Unified Emergency at **112**.`,
      sources: matchedDisaster.authoritativeSources,
      suggestedPrompts: [
        `What should I do during a ${matchedDisaster.type}?`,
        `Emergency kit checklist for ${matchedDisaster.type}`,
        `How to prepare for floods in Kodagu?`
      ]
    };
  }

  // General Emergency Inquiry
  return {
    reply: `### Karnataka Disaster Risk & Awareness AI Assistant

I am trained on verified disaster management frameworks published by the **National Disaster Management Authority (NDMA)**, **Karnataka State Disaster Management Authority (KSDMA)**, and **KSNDMC**.

#### How I Can Assist You:
1. **Regional Risk Inquiries**: Inquire about any of Karnataka's 31 districts (e.g., *"What is the flood and landslide risk in Kodagu?"*).
2. **Disaster Safety Protocols**: Ask for verified Before, During, and After safety guidelines for **Flood, Landslide, Drought, Lightning, Heatwave, Earthquake, or Cyclone**.
3. **Emergency Checklists**: Learn how to prepare a 72-hour family survival grab-bag.
4. **Emergency Helplines**: Access official 24x7 control room contacts for Karnataka.

#### Emergency SOS Numbers in Karnataka:
• **112**: All-in-One Emergency Response Support System (Police, Fire, Medical)  
• **1070**: State Emergency Operations Centre (SEOC, Bengaluru)  
• **1077**: District Emergency Operations Centre (DEOC, Collectorate)  
• **9243345433**: KSNDMC Varuna Mitra Weather Advisory (Toll-Free)

*Important: This AI system provides educational and risk awareness information. In a real-life emergency, always prioritize directives from official authorities and emergency responders.*`,
    sources: ["National Disaster Management Authority (NDMA)", "Karnataka State Natural Disaster Monitoring Centre (KSNDMC)"],
    suggestedPrompts: [
      "What should I do during a flood?",
      "How to prepare for a landslide in Kodagu?",
      "What emergency supplies should I keep?",
      "What are the lightning safety rules?"
    ]
  };
}
