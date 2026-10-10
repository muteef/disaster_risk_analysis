export interface DisasterGuideline {
  type: string;
  title: string;
  kannadaTitle: string;
  scientificMeaning: string;
  causesInKarnataka: string[];
  warningSigns: string[];
  phases: {
    before: string[];
    during: string[];
    after: string[];
  };
  dos: string[];
  donts: string[];
  emergencyKitList: string[];
  authoritativeSources: string[];
}

export const DISASTER_KNOWLEDGE_BASE: Record<string, DisasterGuideline> = {
  flood: {
    type: "flood",
    title: "Flood & Urban Inundation",
    kannadaTitle: "ಪ್ರವಾಹ ಮತ್ತು ನಗರ ಜಲಾವೃತ",
    scientificMeaning: "A flood is an overflow of water that submerges land that is usually dry. In Karnataka, floods range from riverine overflow along the Krishna and Cauvery basins to rapid urban flash floods in Bengaluru and coastal inundation in Udupi/Dakshina Kannada.",
    causesInKarnataka: [
      "Intense monsoonal precipitation and cloudbursts over the Western Ghats (Catchment of Krishna, Cauvery, Tunga-Bhadra).",
      "Massive sudden discharges from upstream reservoirs (e.g., Almatti, KRS, Tungabhadra, Kabini dams).",
      "Urban concretization, encroachment of storm water drains (rajakaluves), and loss of interconnected lake networks (e.g., Bengaluru Urban).",
      "High tide backwater push in low-lying coastal estuaries of Karwar, Mangaluru, and Udupi."
    ],
    warningSigns: [
      "Rapid, continuous rise in local river water levels or sudden muddy discoloration.",
      "Backflow of storm drainage water into ground-floor dwellings.",
      "Official Yellow/Orange/Red reservoir discharge alerts issued by KSNDMC or IMD.",
      "Unusual bubbling or standing water accumulation in low-lying depressions."
    ],
    phases: {
      before: [
        "Identify high-ground relief centers and evacuation routes designated by the District Disaster Management Authority (DDMA).",
        "Elevate electrical switches, circuit panels, and critical appliances at least 1.5 meters above ground level.",
        "Store vital identity documents (Aadhaar, property deeds, ration cards) in waterproof pouches or secure cloud backups.",
        "Keep emergency battery torches, battery banks, and portable radio receivers ready."
      ],
      during: [
        "Immediately move children, elderly, and pets to the upper floors or official flood relief shelters.",
        "Turn off the primary electricity mains breaker and domestic LPG cylinder regulator valves.",
        "NEVER drive or wade through standing flood waters ('Turn Around, Don't Drown' - 15 cm of moving water can knock an adult; 30 cm can float a vehicle).",
        "Avoid touching downed electric utility cables or metal poles standing in pooled water."
      ],
      after: [
        "Do not consume tap or flood-affected water without rolling boiling for a minimum of 3-5 minutes.",
        "Inspect electrical wiring and gas fittings through certified technicians before switching on main power.",
        "Watch out for venomous snakes, centipedes, and insects seeking shelter in domestic furniture and crevices.",
        "Disinfect dwellings using bleaching powder or approved sanitizing solutions to prevent waterborne leptospirosis and cholera."
      ]
    },
    dos: [
      "Drink only boiled or chlorine-treated water.",
      "Monitor official KSNDMC Varuna Mitra bulletins (Toll-Free 9243345433).",
      "Keep cattle untied so they can swim to natural high ground in rural areas.",
      "Cooperate with NDRF and SDRF evacuation teams immediately upon directive."
    ],
    donts: [
      "Do NOT enter flood waters on foot, bicycles, or two-wheelers.",
      "Do NOT spread unverified WhatsApp rumors about dam breaches without official KSDMA confirmation.",
      "Do NOT eat food items that have come in contact with flood waters.",
      "Do NOT operate electrical switches while standing on wet surfaces."
    ],
    emergencyKitList: [
      "3-day non-perishable dry ration (flattened rice / avalakki, roasted gram, biscuits, jaggery)",
      "Bottled drinking water (minimum 3 liters per person per day)",
      "Water purification tablets (Chlorine / Halazone)",
      "High-output LED flashlight with extra batteries",
      "First-aid kit with antiseptic lotion, sterile bandages, and ORS packets",
      "Prescription medications for 7 days (blood pressure, diabetes, asthma)",
      "Multi-purpose whistle to signal rescue personnel"
    ],
    authoritativeSources: [
      "Karnataka State Natural Disaster Monitoring Centre (KSNDMC)",
      "National Disaster Management Authority (NDMA) Flood Guidelines",
      "Central Water Commission (CWC) Flood Forecasting Division"
    ]
  },
  landslide: {
    type: "landslide",
    title: "Landslide & Slope Debris Flow",
    kannadaTitle: "ಭೂಕುಸಿತ ಮತ್ತು ಬೆಟ್ಟದ ಮಣ್ಣು ಕುಸಿತ",
    scientificMeaning: "A landslide is the downward and outward movement of slope-forming materials including rock, soil, or artificial fill under the influence of gravity. In Karnataka, catastrophic debris flows predominantly occur in the Western Ghats (Kodagu, Chikkamagaluru, Uttara Kannada, Dakshina Kannada, Hassan).",
    causesInKarnataka: [
      "Prolonged antecedent rainfall (>150mm over 48 hours) causing soil pore-water pressure saturation along steep slip planes.",
      "Unscientific hill-cutting for road widening, linear infrastructure, and slope terracing without retaining walls.",
      "Deforestation of natural deep-rooted shola vegetation and conversion into commercial monoculture plantations.",
      "Steep natural slope angles (>20° to 35°) in fragile charnockite and lateritic Western Ghat terrains."
    ],
    warningSigns: [
      "Sudden cracks appearing in plaster walls, house foundations, retaining walls, or concrete roads on slopes.",
      "Trees, utility poles, or perimeter fences visibly tilting downslope ('drunken trees').",
      "Sudden muddiness or blockage of hill streams, followed by an ominous rumbling sound.",
      "Doors and window frames sticking or jamming due to foundation shifting."
    ],
    phases: {
      before: [
        "Avoid building homes directly under steep hill escarpments or within the natural discharge fan of mountain gullies.",
        "Ensure surface stormwater drains above slopes are kept free of debris and diverted away from unstable slope faces.",
        "Plant native soil-binding bamboo and deep-rooted vetiver grass on exposed embankment slopes.",
        "Familiarize household members with designated community safe shelters located outside debris flow trajectories."
      ],
      during: [
        "If you suspect or hear a landslide rumbling, evacuate uphill or laterally out of the flow path immediately.",
        "If escape is impossible, curl into a tight ball under sturdy furniture and protect your head.",
        "Stay clear of steep embankments, river banks, and bridges downstream of the landslide area."
      ],
      after: [
        "Stay away from the slide area; secondary collapses and post-slide debris avalanches frequently follow.",
        "Check for injured or trapped persons near the slide perimeter without directly entering unstable slide masses.",
        "Report broken utility lines (power, water, LPG) immediately to local authorities.",
        "Seek structural engineering inspection before re-occupying buildings situated near landslide crowns."
      ]
    },
    dos: [
      "Evacuate proactively if cumulative 72-hour rainfall exceeds 200mm in vulnerable ghat areas.",
      "Heed early warning bulletins issued by the Geological Survey of India (GSI) and KSNDMC.",
      "Keep emergency escape routes clear of vehicular blockages.",
      "Assist elderly neighbors and persons with disabilities to safer lower-gradient terrain."
    ],
    donts: [
      "Do NOT remain inside houses situated directly beneath unstable hill slopes during torrential rains.",
      "Do NOT excavate toe support of slopes during monsoon season.",
      "Do NOT cross bridges when swollen mountain torrents are carrying heavy logs and mud.",
      "Do NOT attempt to clear landslide debris on highways yourself without NDRF/PWD earthmovers."
    ],
    emergencyKitList: [
      "Emergency high-decibel whistle and signal mirror",
      "Heavy-duty waterproof torch and solar-rechargeable headlamp",
      "Compact emergency thermal blanket",
      "First-aid trauma bandages, tourniquet, and antiseptic wipes",
      "Sturdy walking boots and rain ponchos",
      "High-energy protein bars and glucose powder",
      "Copies of identity documents in waterproof ziploc bags"
    ],
    authoritativeSources: [
      "Geological Survey of India (GSI) Landslide Hazard Zonation",
      "Karnataka State Disaster Management Authority (KSDMA) Malenadu Action Plan",
      "National Institute of Disaster Management (NIDM)"
    ]
  },
  drought: {
    type: "drought",
    title: "Meteorological & Agricultural Drought",
    kannadaTitle: "ಬರಗಾಲ ಮತ್ತು ನೀರಿನ ಕೊರತೆ",
    scientificMeaning: "Drought is an extended period of deficient precipitation relative to the multi-year statistical average, resulting in soil moisture depletion, hydrological streamflow deficits, and agricultural crop failure. In Karnataka, the dry North Interior zone represents India's second largest arid zone after Rajasthan.",
    causesInKarnataka: [
      "Deficiency or prolonged hiatus in the Southwest Monsoon (June-September), exacerbated by El Niño oscillations.",
      "Overexploitation of deep borewells and rapid depletion of subterranean aquifers in central and northern taluks.",
      "High ambient summer temperatures (>40°C) driving extreme evapotranspiration in shallow black cotton soils.",
      "Poor groundwater recharge due to loss of traditional minor irrigation tanks and stepwells."
    ],
    warningSigns: [
      "Failure of seasonal sowing during Rohini/Mrigashira rain nakshatras.",
      "Noticeable wilting, leaf scorching, and moisture stress in standing crops (jowar, bajra, pulses).",
      "Sharp drop in village open-well water levels and drying of minor irrigation tanks.",
      "Rapid spikes in fodder prices and distress sale of livestock in taluk agricultural mandis."
    ],
    phases: {
      before: [
        "Implement rainwater harvesting, farm ponds (Krishi Hondas), and rooftop recharge pits before monsoon onset.",
        "Adopt climate-resilient crop varieties (finger millet/ragi, minor millets, drought-hardy pulses).",
        "Install micro-irrigation systems (drip and sprinkler) to reduce agricultural water consumption by 50-60%.",
        "Maintain community fodder banks and silaged cattle reserves in panchayats."
      ],
      during: [
        "Prioritize available domestic water supplies strictly for human drinking, sanitation, and livestock hydration.",
        "Apply organic mulching on soil beds to retard evaporative moisture loss from root zones.",
        "Utilize MGNREGS water-conservation and desilting works for community livelihood support.",
        "Report acute drinking water shortages to the taluk control room for tanker delivery arrangements."
      ],
      after: [
        "Desilt village tanks, kalyanis, and check dams before the onset of the succeeding monsoon.",
        "Plant native agroforestry windbreaks to check soil erosion and restore microclimate humidity.",
        "Review crop insurance claims under Pradhan Mantri Fasal Bima Yojana (PMFBY) through the Karnataka Samrakshane portal."
      ]
    },
    dos: [
      "Practice strict water recycling for gardening and domestic sanitation.",
      "Avail drought mitigation benefits and subsidized fodder from government cattle camps (Goshalas).",
      "Adopt drought-resilient millets (Siridhanya) supported by the Karnataka Agriculture Department.",
      "Maintain village tank bunds and desilted feeder channels collectively."
    ],
    donts: [
      "Do NOT cultivate high-water-demand cash crops (sugarcane, paddy) during severe hydrological drought years.",
      "Do NOT sink unauthorized ultra-deep borewells (>1000 ft) that exhaust fossil aquifers.",
      "Do NOT waste treated domestic water for washing vehicles or courtyards.",
      "Do NOT abandon milch cattle; take them to designated taluk Goshalas."
    ],
    emergencyKitList: [
      "Food-grade covered water storage barrels (200-liter capacity)",
      "Electrolyte replenishment powders (ORS / Electral)",
      "Water testing chemical kits to detect excessive fluorides/nitrates in deep borewell water",
      "Non-electric gravity-based ceramic water filter",
      "Emergency cash reserve for essential fodder and water procurement"
    ],
    authoritativeSources: [
      "Karnataka State Natural Disaster Monitoring Centre (KSNDMC) Drought Monitoring Cell",
      "Department of Agriculture, Government of Karnataka",
      "National Drought Management Guidelines, NDMA"
    ]
  },
  lightning: {
    type: "lightning",
    title: "Lightning & Thunderstorm Hazard",
    kannadaTitle: "ಮಿಂಚು ಮತ್ತು ಸಿಡಿಲು ಅಪಾಯ",
    scientificMeaning: "Lightning is an intense electrostatic discharge between electrically charged regions of a cumulonimbus cloud or between the cloud and the earth's surface. In Karnataka, pre-monsoon convective thunderstorms (April-May) claim significant human and cattle casualties in open rural farmlands.",
    causesInKarnataka: [
      "Strong thermal convective updrafts during intense pre-monsoon heatwave conditions.",
      "Interaction between maritime moisture plumes and continental dry air over the Deccan plateau.",
      "Absence of lightning arresters in rural open fields, farm sheds, and religious structures."
    ],
    warningSigns: [
      "Rapid vertical development of towering dark cumulonimbus thunderheads ('anvil clouds').",
      "Audible distant thunder ('30-30 Rule': If time between flash and thunder is under 30 seconds, lightning is within striking distance).",
      "Static electricity causing body hair to stand on end in open fields."
    ],
    phases: {
      before: [
        "Install standard lightning protection arresters conforming to IS/IEC 62305 on all multi-story buildings and farm sheds.",
        "Download the Damini Lightning Early Warning App developed by IITM Pune.",
        "Prune dead or overhanging tree branches located close to homes and utility wires."
      ],
      during: [
        "Immediately seek shelter inside an enclosed masonry building or a hard-topped metallic motor vehicle.",
        "If caught in an open field with NO shelter, adopt the 'Lightning Crouch': squat low on balls of your feet, tuck head between knees, cover ears, minimize contact with ground.",
        "Stay away from isolated tall trees, metal fences, tractors, electric towers, and bodies of water.",
        "Unplug sensitive electronic devices and avoid using corded landline telephones."
      ],
      after: [
        "A lightning strike victim does NOT carry an electrical charge; administer immediate CPR and mouth-to-mouth resuscitation without hesitation.",
        "Call emergency 112 immediately for emergency medical transport.",
        "Check for thermal entry and exit burns and treat for shock."
      ]
    },
    dos: [
      "Observe the 30-30 Rule: Stay indoors until 30 minutes after hearing the last thunder clap.",
      "Crouch low if stranded in an open field, keeping feet together to minimize ground voltage gradient.",
      "Immediately administer CPR to unconscious lightning strike victims."
    ],
    donts: [
      "NEVER take shelter under tall, isolated trees in agricultural fields.",
      "Do NOT hold metallic umbrellas, scythes, crowbars, or fishing rods during lightning activity.",
      "Do NOT bathe, shower, or wash dishes during an active lightning storm.",
      "Do NOT lie flat on the ground (this increases contact with ground electric currents)."
    ],
    emergencyKitList: [
      "Battery-operated transistor radio for weather updates",
      "Automated External Defibrillator (AED) in community centers",
      "Thermal burn dressings and antiseptic burn ointments",
      "Insulated rubber gloves and torch"
    ],
    authoritativeSources: [
      "Indian Institute of Tropical Meteorology (IITM) Damini Network",
      "National Disaster Management Authority (NDMA) Lightning Safety Advisory",
      "KSNDMC Lightning Early Warning Sensor Network"
    ]
  },
  heatwave: {
    type: "heatwave",
    title: "Heatwave & Extreme Thermal Stress",
    kannadaTitle: "ಶಾಖದ ಅಲೆ ಮತ್ತು ಬಿಸಿಗಾಳಿ",
    scientificMeaning: "A heatwave is a prolonged period of excessively high ambient air temperatures (typically ≥40°C for plains in Kalaburagi, Raichur, Ballari, Vijayapura) accompanied by high thermal discomfort that causes severe clinical dehydration, heat exhaustion, and fatal heat stroke.",
    causesInKarnataka: [
      "Advection of dry hot continental air from central India over northern Karnataka taluks during April-May.",
      "Persistent anti-cyclonic weather patterns that suppress convective cloud formation and allow unimpeded solar insolation.",
      "Urban heat island (UHI) phenomenon in dense metropolitan agglomerations like Bengaluru."
    ],
    warningSigns: [
      "High body temperature (>104°F / 40°C), absence of sweating, red hot dry skin, throbbing headache, dizziness, nausea, confusion, and loss of consciousness (Heat Stroke Emergency)."
    ],
    phases: {
      before: [
        "Apply cool-roof white reflective coatings on terraces to reduce indoor temperatures by 3-5°C.",
        "Plant shade-giving trees along residential peripheries.",
        "Schedule strenuous agricultural labor and construction works during cooler early morning (6 AM - 10 AM) and evening hours."
      ],
      during: [
        "Drink ample water, butter milk (majjige), tender coconut water, and ORS solution even before feeling thirsty.",
        "Wear loose, light-colored, lightweight cotton clothing, wide-brimmed hats, and UV-filtering sunglasses.",
        "NEVER leave infants, young children, or pets unattended inside locked parked vehicles."
      ],
      after: [
        "If someone suffers heat exhaustion, move them immediately to a shaded ventilated room.",
        "Loosen clothing and sponge their body with cool water or apply ice packs to the neck, armpits, and groin.",
        "Rush immediately to the nearest primary health center (PHC) if the victim becomes delirious or vomits."
      ]
    },
    dos: [
      "Drink traditional cooling fluids (lemon water with salt, ragi ambli, majjige).",
      "Keep cattle in well-ventilated covered sheds and provide cool drinking water at all times.",
      "Carry an umbrella or damp cotton cloth on your head when stepping outdoors between 11 AM and 4 PM."
    ],
    donts: [
      "Do NOT step out into direct sun between 12:00 PM and 3:30 PM unless strictly necessary.",
      "Do NOT consume dehydrating beverages such as alcohol, excessively caffeinated drinks, or heavy carbonated sodas.",
      "Do NOT engage in heavy outdoor workouts during peak afternoon hours."
    ],
    emergencyKitList: [
      "Oral Rehydration Salts (ORS) packets",
      "Digital oral/axillary thermometer",
      "Reusable instant cold gel compresses",
      "Insulated 2-liter water flask"
    ],
    authoritativeSources: [
      "India Meteorological Department (IMD) Heatwave Warnings",
      "Karnataka Health & Family Welfare Department Heat Action Plan",
      "NDMA National Heat Action Framework"
    ]
  },
  earthquake: {
    type: "earthquake",
    title: "Seismic Tremor & Ground Shaking",
    kannadaTitle: "ಭೂಕಂಪ ಮತ್ತು ಭೂಮಿ ನಡುಗುವಿಕೆ",
    scientificMeaning: "An earthquake is a sudden shaking of the ground caused by the passage of seismic waves through earth rocks, released when stored elastic strain along geological faults exceeds the frictional strength of the rock. Karnataka lies largely in Stable Continental Region (Zone II and Zone III).",
    causesInKarnataka: [
      "Intraplate seismic stress release along pre-existing deep faults (e.g., Bellary fault, Mandya shear zone).",
      "Reservoir-induced seismicity (RIS) near large hydro-dams during heavy seasonal impoundment cycles.",
      "Localized subsurface tectonic readjustments causing micro-tremors in Kodagu and coastal taluks."
    ],
    warningSigns: [
      "Sudden rattling of windows and glass panes, swinging ceiling fixtures, vibration resembling a heavy truck passing, followed by sharp lateral or vertical ground movement."
    ],
    phases: {
      before: [
        "Secure heavy furniture (tall wardrobes, bookshelves, water heaters) to wall studs with L-brackets.",
        "Ensure residential construction adheres to Bureau of Indian Standards (BIS) seismic code IS 1893:2016.",
        "Identify safe drop zones in every room (under sturdy wooden dining tables or against interior load-bearing walls)."
      ],
      during: [
        "DROP, COVER, and HOLD ON! Drop to your hands and knees, take cover under a sturdy table or desk, and hold on until shaking stops.",
        "If in bed, stay there and protect your head and neck with a pillow.",
        "If outdoors, move immediately away from buildings, electrical cables, glass facades, and brick chimneys."
      ],
      after: [
        "Expect aftershocks; evacuate damaged buildings calmly using stairs (NEVER use elevators).",
        "Check for gas leaks; do not light matches or flick electric switches if a gas odor is detected.",
        "Check community members for injuries and render first aid."
      ]
    },
    dos: [
      "Drop, Cover, and Hold On during active ground shaking.",
      "Stay calm and avoid panicking or rushing towards crowded exit doorways simultaneously.",
      "Turn off the main gas regulator valve after ground movement ceases."
    ],
    donts: [
      "Do NOT rush outdoors while ground is actively shaking (falling masonry and glass pose the highest injury risk).",
      "Do NOT stand in doorways unless known to be strongly reinforced load-bearing frames.",
      "Do NOT use elevators during or immediately after seismic events."
    ],
    emergencyKitList: [
      "Sturdy hard hat / safety helmet",
      "Heavy-duty leather work gloves",
      "Multi-tool / adjustable wrench to shut off main gas/water valves",
      "LED emergency lantern",
      "Whistle to signal rescue search dogs and sonar detectors"
    ],
    authoritativeSources: [
      "National Centre for Seismology (NCS), Ministry of Earth Sciences",
      "Bureau of Indian Standards (BIS) Seismic Zonation Map of India",
      "NDMA Earthquake Disaster Management Guidelines"
    ]
  },
  cyclone: {
    type: "cyclone",
    title: "Coastal Cyclone & High-Velocity Winds",
    kannadaTitle: "ಕರಾವಳಿ ಚಂಡಮಾರುತ ಮತ್ತು ಬಿರುಗಾಳಿ",
    scientificMeaning: "A tropical cyclone is a low-pressure weather system with organized thunderstorm activity producing high-velocity sustained gale winds (>65 km/h) and severe storm surges along the coastline. In Karnataka, the Arabian Sea coast (Uttara Kannada, Udupi, Dakshina Kannada) is affected by cyclonic depressions.",
    causesInKarnataka: [
      "Depressions and cyclonic storms originating in the southeast Arabian Sea (e.g., Cyclones Tauktae, Kyarr, Nisarga).",
      "Squall lines and pre-monsoon convective wind shear across the coastal shelf.",
      "Storm surges pushing ocean tides 2-4 meters above normal sea level into low-lying coastal estuaries."
    ],
    warningSigns: [
      "Squally winds increasing progressively in strength, ominous low-level cloud cover, and heavy ocean swells.",
      "IMD Cyclone Warning Bulletins and hoisting of port danger signal flags (Signal No. 3 to 10 at Mangaluru and Karwar ports)."
    ],
    phases: {
      before: [
        "Board up or tape large glass windows with heavy adhesive film.",
        "Move mechanized fishing vessels, trawlers, and country boats to secure inland tidal basins.",
        "Clear loose rooftop items (asbestos sheets, solar water heater tanks, antennae) that could become deadly airborne projectiles.",
        "Proactively move to cyclone multipurpose shelters (MPCS) constructed along the coastal belt if living in katcha dwellings."
      ],
      during: [
        "Remain strictly indoors in the strongest central masonry room of the house.",
        "Beware of the 'Eye of the Cyclone': A sudden deceptive calm does NOT mean the storm is over; winds will suddenly resume in the opposite direction with violent force.",
        "Disconnect domestic electrical appliances from wall outlets."
      ],
      after: [
        "Remain in safe shelters until official 'All Clear' announcement is broadcast by the District Administration.",
        "Watch out for fallen live electric cables lying in puddle water.",
        "Avoid fishing or venturing into choppy sea surf for at least 48 hours post-cyclone."
      ]
    },
    dos: [
      "Heed all coastal warnings and port signals issued by IMD and the Karnataka Fisheries Department.",
      "Keep fully charged mobile phones and power banks in protective waterproof cases.",
      "Strictly observe total fishing bans during Arabian Sea cyclonic advisories."
    ],
    donts: [
      "Do NOT venture out to sea or stand on beach promenades to watch high tidal waves.",
      "Do NOT take shelter inside temporary tin-sheet or thatch roof sheds.",
      "Do NOT venture out during the temporary calm of the cyclone eye."
    ],
    emergencyKitList: [
      "Battery-powered AM/FM emergency weather radio",
      "High-lumen waterproof LED lantern",
      "Heavy-duty plastic tarpaulins and nylon tie-down ropes",
      "Emergency canned rations and potable water",
      "First-aid emergency kit"
    ],
    authoritativeSources: [
      "India Meteorological Department (IMD) Cyclone Warning Division",
      "Indian National Centre for Ocean Information Services (INCOIS)",
      "Karnataka Coastal Disaster Management Cell"
    ]
  }
};

export const KARNATAKA_EMERGENCY_CONTACTS = [
  { name: "State Emergency Operation Centre (SEOC)", number: "1070", description: "Karnataka 24x7 State Disaster Control Room", tollFree: true },
  { name: "District Emergency Operation Centre (DEOC)", number: "1077", description: "District-level Disaster Control Room", tollFree: true },
  { name: "Karnataka Unified Emergency Helpline", number: "112", description: "Police, Fire, and Ambulance SOS", tollFree: true },
  { name: "KSNDMC Varuna Mitra Weather Helpline", number: "9243345433", description: "24x7 Interactive Rainfall & Weather Advisory", tollFree: false },
  { name: "Ambulance Emergency Medical Services", number: "108", description: "Arogya Kavacha Medical Emergency Ambulance", tollFree: true },
  { name: "State Fire & Emergency Services", number: "101", description: "Rescue & Fire Brigade Dispatch", tollFree: true },
  { name: "Karnataka Coastal Security Police", number: "1093", description: "Marine & Coastal Distress Helpline", tollFree: true }
];
