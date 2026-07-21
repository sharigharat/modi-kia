import type { Car, CarDetail } from "./data";

/* Kia India's published warranty terms (kia.com/in/service/service-and-
   maintenance/warranty.html): 36 months / unlimited km standard cover.
   EV high-voltage battery: 96 months / 1,60,000 km. */
const passengerCarWarranty =
  "3 years / unlimited km standard Kia warranty. Extended warranty and roadside-assistance plans can be selected at delivery; ask Modi Kia to confirm current plan terms for your variant.";

const evWarranty =
  "3 years / unlimited km standard vehicle warranty, plus an 8-year / 1,60,000 km high-voltage battery warranty (repairs to restore at least 70% of original capacity). Extended protection options are available; confirm current terms and exclusions with Modi Kia.";

type DetailInput = Omit<CarDetail, "warranty"> & { warranty?: string };

const detail = (input: DetailInput): CarDetail => ({
  ...input,
  warranty: input.warranty ?? passengerCarWarranty,
});

/*
 * Buyer-facing facts are maintained separately from card data. They have
 * been checked against the linked kia.com/in model highlight pages.
 * Equipment, paint and price can change by variant.
 */
export const carDetails: Record<string, CarDetail> = {
  seltos: detail({
    overview:
      "SELTOS is Kia's flagship India SUV: a bigger, bolder redesign with a genuinely premium cabin, a broad choice of petrol and diesel powertrains, and one of the most complete safety and ADAS packages in its segment.",
    idealFor: "SUV buyers who want a premium cabin, strong engine choice and top-tier safety tech in one package.",
    performance: [
      "1.5L Smartstream petrol: 84.4 kW with 6-speed manual or IVT.",
      "1.5L Turbo GDi petrol: 117.5 kW / 253 Nm with 6iMT or 7-speed DCT.",
      "1.5L CRDi VGT diesel: 85 kW / 250 Nm with 6-speed manual or 6-speed automatic.",
    ],
    safety: [
      "5-star BNCAP safety rating with 6 airbags standard across the range.",
      "360° camera with Blind View Monitor and a smart dashcam (front & rear) on higher trims.",
      "Digital Key lets you unlock and start the car from a compatible smartphone.",
    ],
    adas: [
      "ADAS Level 2+ with 28 autonomous features on GTX/X-Line variants.",
      "Forward collision avoidance, lane-keeping and lane-following assistance, and smart cruise control on equipped trims.",
    ],
    interior: [
      "12.3\" HD touchscreen navigation cockpit paired with a head-up display on higher trims.",
      "Ventilated seats and a 10-way power driver's seat are available on top variants.",
      "447-litre boot for everyday and weekend luggage.",
    ],
    exterior: [
      "Redesigned front fascia with a bolder grille and updated LED lighting signature.",
      "10 exterior colour choices, including an X-Line-exclusive Matte Graphite finish.",
    ],
    infotainment: [
      "12.3\" HD touchscreen with navigation, plus a fully digital driver's cluster.",
      "Bose 8-speaker premium sound system and OTA software updates on eligible trims.",
    ],
    comfort: [
      "Dual Pane Panoramic Sunroof from the HTK(O) trim upward.",
      "Ventilated front seats and automatic climate control are available higher in the range.",
    ],
    variants: [
      "HTE, HTK, HTK+, HTX, HTX+, GTX and X-Line span the petrol, turbo-petrol and diesel range.",
      "GTX and X-Line carry the fullest ADAS, sunroof, camera and audio equipment; ask for a live trim-wise quotation.",
    ],
    specifications: [
      { label: "Length", value: "4,460 mm" },
      { label: "Seating", value: "5" },
      { label: "Boot space", value: "447 L" },
      { label: "Starting price", value: "₹10,99,900 (ex-showroom)" },
      { label: "Safety rating", value: "5-star BNCAP" },
      { label: "Claimed efficiency", value: "Confirm ARAI mileage by variant with Modi Kia." },
    ],
    sourceUrl: "https://www.kia.com/in/our-vehicles/seltos.html",
  }),
  sonet: detail({
    overview:
      "SONET is Kia's compact SUV, built to feel like a much bigger car inside, with segment-leading safety tech, a big touchscreen and turbo-petrol performance in a city-friendly footprint.",
    idealFor: "Urban buyers who want a compact SUV with genuine safety tech and a strong feature list.",
    performance: [
      "1.2L petrol makes 61 kW / 115 Nm with a 5-speed manual for relaxed daily use.",
      "1.0L Turbo GDi petrol makes 88 kW / 172 Nm, offered with 6iMT or 7-speed DCT.",
      "1.5L CRDi VGT diesel makes 85 kW / 250 Nm, with 6-speed manual or 6-speed automatic.",
    ],
    safety: [
      "6 airbags standard, with ADAS Level 1 (10 autonomous features) on eligible trims.",
      "360° camera with Blind View Monitor helps with parking and low-speed manoeuvres.",
    ],
    adas: [
      "Forward collision warning, lane departure warning and other Level 1 ADAS features on equipped versions.",
    ],
    interior: [
      "10.25\" HD touchscreen navigation and a fully digital driver's display on higher trims.",
      "Ventilated front seats and a 4-way power driver's seat are available on top variants.",
    ],
    exterior: [
      "Star Map LED tail lamps and a bold SUV stance distinguish the Sonet's exterior design.",
      "Seven exterior colours including single-tone and Matte Graphite finishes.",
    ],
    infotainment: [
      "10.25\" HD touchscreen with Kia Connect (70+ smart features) on eligible trims.",
      "Bose 7-speaker sound system available on higher variants.",
    ],
    comfort: [
      "Electric sunroof and automatic climate control offered on selected trims.",
      "DCT/automatic options suit stop-start traffic; manual keeps the entry price lower.",
    ],
    variants: [
      "HTE, HTK, HTK+, HTX and HTX+ span the petrol, turbo-petrol and diesel range.",
      "Confirm which trims carry ADAS, the panoramic camera and Kia Connect for your preferred engine/gearbox combination.",
    ],
    specifications: [
      { label: "Seating", value: "5" },
      { label: "Starting price", value: "₹7,40,900 (ex-showroom)" },
      { label: "ADAS", value: "Level 1, 10 autonomous features" },
      { label: "Boot space", value: "Confirm with Modi Kia by variant." },
      { label: "Claimed efficiency", value: "Confirm ARAI mileage by variant with Modi Kia." },
    ],
    sourceUrl: "https://www.kia.com/in/our-vehicles/sonet.html",
  }),
  syros: detail({
    overview:
      "SYROS is Kia's newest sub-4-metre-adjacent SUV, built around a Trinity Panoramic Display, a 5-star BNCAP safety rating and Kia's most advanced connected-car software, Kia Connect 2.0.",
    idealFor: "Buyers who want the newest Kia cabin technology and top-tier safety in a compact SUV footprint.",
    performance: [
      "1.0L turbo petrol: 120 PS / 172 Nm with a 7-speed DCT automatic.",
      "1.5L CRDi VGT diesel: 116 PS / 250 Nm with a 6-speed automatic option.",
      "Manual transmission choices are also available depending on trim.",
    ],
    safety: [
      "5-star BNCAP safety rating with a 20-feature standard safety pack, including 6 airbags.",
      "Level 2 ADAS is available on the top trim.",
    ],
    adas: [
      "Level 2 ADAS suite on the top trim, details to be confirmed against the current variant chart.",
    ],
    interior: [
      "Trinity Panoramic Display: a 12.3\" touchscreen, 12\" digital cluster and 5\" AC control panel in one glass surface.",
      "Sliding and reclining rear seats add flexibility for passengers or cargo.",
    ],
    exterior: [
      "16-inch and 17-inch alloy wheel options depending on trim.",
      "Nine exterior colours including Ivory Silver in both gloss and matte finishes.",
    ],
    infotainment: [
      "Kia Connect 2.0 with 80+ smart features and over-the-air software updates.",
      "Harman Kardon 8-speaker premium audio on higher trims.",
    ],
    comfort: [
      "Dual Pane Panoramic Sunroof available on select trims.",
      "Automatic climate control and connected convenience features vary by variant.",
    ],
    variants: [
      "Trim names and exact ADAS/sunroof availability should be confirmed against Kia's current Syros variant chart.",
    ],
    specifications: [
      { label: "Seating", value: "5" },
      { label: "Starting price", value: "₹8,41,900 (ex-showroom)" },
      { label: "Safety rating", value: "5-star BNCAP" },
      { label: "Display", value: "Trinity Panoramic Display (12.3\" + 12\" + 5\")" },
      { label: "Boot space", value: "Confirm with Modi Kia by variant." },
    ],
    sourceUrl: "https://www.kia.com/in/our-vehicles/syros.html",
  }),
  carens: detail({
    overview:
      "CARENS is Kia's practical 6/7-seat family MPV: class-leading cabin space, an easy one-touch second-row tumble for third-row access, and a straightforward petrol/diesel engine choice.",
    idealFor: "Families who need genuine 6 or 7-seat flexibility with an MPV's easier third-row access.",
    performance: [
      "Smartstream 1.5L petrol and 1.5L CRDi VGT diesel engines cover both efficiency and long-distance driving.",
      "DCT and automatic transmission variants are available alongside manual gearboxes.",
    ],
    safety: [
      "6 airbags standard across all variants, alongside ESC, VSM, BAS, HAC, DBC and ABS.",
      "All-wheel disc brakes and a rear-view camera with dynamic guidelines feature across the range.",
      "15 safety features are fitted as standard.",
    ],
    interior: [
      "60:40 split second-row seats that slide, recline and tumble for third-row access.",
      "Roof-flushed 2nd and 3rd row AC vents with 4-stage blower control.",
      "Multiple power sockets with 5 USB-C charging ports across the cabin.",
    ],
    exterior: [
      "Three exterior colours: Imperial Blue, Aurora Black Pearl and Clear White.",
      "MPV-forward styling with a tall stance for easy cabin access.",
    ],
    infotainment: [
      "8.0\" touchscreen with wireless Android Auto and Apple CarPlay.",
      "12.5\" LCD instrument cluster with a 10.6cm colour TFT display.",
    ],
    comfort: [
      "Semi-leatherette seats and a dashcam with dual front/rear cameras on higher trims.",
      "6 or 7-seat layouts to suit family size and luggage needs.",
    ],
    variants: [
      "Premium and Premium (O) trims span 6 and 7-seat configurations across petrol and diesel engines.",
      "Confirm the exact transmission and ADAS-adjacent safety equipment for your preferred trim with Modi Kia.",
    ],
    specifications: [
      { label: "Seating", value: "6 / 7" },
      { label: "Starting price", value: "₹11,01,900 (ex-showroom)" },
      { label: "Touchscreen", value: "8.0\" (20.32 cm)" },
      { label: "Airbags", value: "6 standard" },
      { label: "Boot space", value: "Confirm with Modi Kia by variant." },
    ],
    sourceUrl: "https://www.kia.com/in/our-vehicles/carens.html",
  }),
  "carens-clavis": detail({
    overview:
      "CARENS CLAVIS is the premium, next-generation Carens: a Dual Pane Panoramic Sunroof, a 26.62-inch dual panoramic display and Level 2 ADAS bring the MPV formula upmarket.",
    idealFor: "Families who want the Carens' space with a more premium cabin, ADAS and cleaner cabin air.",
    performance: [
      "SmartStream G1.5 T-GDi petrol: 117.5 kW / 253 Nm with 6MT, 6iMT or 7-speed DCT.",
      "SmartStream G1.5 petrol: 84.4 kW / 143.8 Nm with 6-speed manual.",
      "1.5L CRDi VGT diesel: 85 kW / 250 Nm with 6-speed manual or 6-speed automatic.",
    ],
    safety: [
      "18 standard safety features including 6 airbags.",
      "ADAS Level 2 with 20 autonomous safety functions.",
    ],
    adas: [
      "20 Level 2 ADAS functions, spanning forward collision, lane-keeping and cruise-assist features on equipped trims.",
    ],
    interior: [
      "26.62\" Dual Panoramic Display spanning the driver cluster and infotainment screen.",
      "Smart Pure Air Purifier with an AQI (air quality index) display.",
    ],
    exterior: [
      "Dual Pane Panoramic Sunroof and a more premium, upright MPV silhouette than the standard Carens.",
      "Seven exterior colours including Dark Gun Metal and Ivory Silver Gloss.",
    ],
    infotainment: [
      "Kia Connect 2.0 connected-car platform.",
      "BOSE 8-speaker premium sound system on higher trims.",
    ],
    comfort: [
      "7-seat cabin with generous legroom across all three rows.",
      "Dual Pane Panoramic Sunroof and Smart Pure Air Purifier improve long-journey comfort.",
    ],
    variants: [
      "Petrol (naturally aspirated and turbo) and diesel engines are paired with manual, iMT, DCT and automatic gearbox options depending on trim.",
      "Confirm ADAS and sunroof availability against the current Carens Clavis variant chart.",
    ],
    specifications: [
      { label: "Seating", value: "7" },
      { label: "Starting price", value: "₹11,26,900 (ex-showroom)" },
      { label: "Display", value: "26.62\" Dual Panoramic Display" },
      { label: "ADAS", value: "Level 2, 20 autonomous features" },
      { label: "Boot space", value: "Confirm with Modi Kia by variant." },
    ],
    sourceUrl: "https://www.kia.com/in/our-vehicles/carens-clavis.html",
  }),
  "carens-clavis-ev": detail({
    overview:
      "CARENS CLAVIS EV brings Kia's premium MPV formula to electric power, with a choice of two battery sizes, fast DC charging and the same Dual Pane Panoramic Sunroof and dual-display cabin as the ICE Clavis.",
    idealFor: "Families moving to their first electric MPV who want genuine 6/7-seat flexibility and fast charging.",
    performance: [
      "42 kWh battery: up to 404 km range (MIDC).",
      "51.4 kWh extended-range battery: up to 490 km range (MIDC).",
      "Single-speed reduction gear drive with paddle-shifter-controlled regenerative braking (i-Pedal).",
    ],
    safety: [
      "6 airbags standard, with ADAS Level 2 (20 autonomous safety features).",
      "Protected, liquid-cooled battery pack packaged within the floor structure.",
    ],
    adas: [
      "20-feature Level 2 ADAS suite, shared with the ICE Carens Clavis.",
    ],
    interior: [
      "67.62 cm dual panoramic display spanning the cluster and infotainment screen.",
      "25-litre front trunk for charging cables or small bags.",
    ],
    exterior: [
      "Seven exterior colours including Ivory Silver Matte and Dark Gun Metal.",
      "Dual Pane Panoramic Sunroof shared with the ICE Carens Clavis.",
    ],
    infotainment: [
      "Kia Connect 2.0 with EV-specific features such as charging status and range monitoring.",
      "BOSE premium sound system on higher trims.",
    ],
    comfort: [
      "Vehicle-to-Load (V2L) lets the car power external devices and equipment.",
      "6-seat captain-chair or 7-seat layouts, both with a Dual Pane Panoramic Sunroof.",
    ],
    variants: [
      "42 kWh and 51.4 kWh extended-range battery options; standard purchase or Battery-as-a-Service (BaaS) ownership models are both offered.",
      "Confirm current on-road pricing and the BaaS per-km rate with Modi Kia.",
    ],
    specifications: [
      { label: "Seating", value: "6 / 7" },
      { label: "Battery options", value: "42 kWh / 51.4 kWh" },
      { label: "Claimed range", value: "Up to 404 km / 490 km (MIDC)" },
      { label: "DC charge (10–80%)", value: "About 39 minutes" },
      { label: "Starting price", value: "₹18,00,500 (ex-showroom) or ₹12.85L under BaaS" },
    ],
    warranty: evWarranty,
    sourceUrl: "https://www.kia.com/in/our-vehicles/carens-clavis-ev.html",
  }),
  carnival: detail({
    overview:
      "CARNIVAL (Carnival Limousine) is Kia's flagship luxury MPV: a 7-seat, 2+2+3 cabin with powered relaxation seating, an extensive ADAS suite and a genuinely premium features list built for chauffeured or family luxury travel.",
    idealFor: "Buyers who want first-class, 7-seat luxury travel with an extensive safety and comfort feature list.",
    performance: [
      "2.2L CRDi diesel engine paired with an 8-speed automatic transmission and paddle shifters.",
    ],
    safety: [
      "33 autonomous ADAS features, including 360° camera and lane keep assist.",
      "8 airbags across the cabin.",
    ],
    adas: [
      "33-feature ADAS suite spanning collision avoidance, lane-keeping, blind-spot and cruise-assist functions.",
    ],
    interior: [
      "Second-row powered relaxation seats with ventilation, heating and extendable leg support.",
      "3-zone automatic climate control with individual temperature management.",
      "2+2+3 seating for 7 passengers across three rows.",
    ],
    exterior: [
      "Wide electric dual sunroof and an imposing, formal MPV silhouette.",
      "Two exterior colours: Glacier White Pearl and Fusion Black.",
    ],
    infotainment: [
      "Dual panoramic curved display system and a head-up display unit.",
      "12-speaker Bose premium surround sound system.",
    ],
    comfort: [
      "Smart power sliding doors with hands-free operation.",
      "Wireless smartphone charging and an 18-inch diamond-cut alloy wheel design.",
    ],
    variants: [
      "Carnival Limousine is offered as a single, fully loaded flagship trim in India; confirm current colour and accessory stock with Modi Kia.",
    ],
    specifications: [
      { label: "Seating", value: "7 (2+2+3)" },
      { label: "Transmission", value: "8-speed automatic" },
      { label: "ADAS", value: "33 autonomous features" },
      { label: "Starting price", value: "₹59,44,516 (ex-showroom, all-India)" },
      { label: "Boot space", value: "Confirm with Modi Kia by variant." },
    ],
    sourceUrl: "https://www.kia.com/in/our-vehicles/carnival.html",
  }),
  ev6: detail({
    overview:
      "EV6 is Kia's dedicated electric-architecture flagship SUV: an 84 kWh battery, 800V ultra-fast charging and a genuinely sporty dual-motor AWD drivetrain wrapped in Kia's most futuristic design.",
    idealFor: "Premium EV buyers who want long range, ultra-fast charging and genuine driving performance.",
    performance: [
      "Dual permanent-magnet synchronous motors deliver 605 Nm with all-wheel drive.",
      "AWD can switch to RWD in 0.4 seconds to balance efficiency and traction.",
      "800V architecture allows a 10–80% DC charge in about 18 minutes on a 350kW charger.",
    ],
    safety: [
      "25+ ADAS 2.0 safety systems across the range.",
      "Protected, floor-integrated 84 kWh battery pack with EV-specific structural reinforcement.",
    ],
    adas: [
      "25+ ADAS 2.0 features, including forward collision avoidance, lane-following and smart cruise functions.",
    ],
    interior: [
      "Dual 12.3\" panoramic curved display with Augmented Reality head-up display.",
      "Remote folding rear seats and a wide electric sunroof.",
      "1,300-litre boot capacity with the rear seats folded.",
    ],
    exterior: [
      "Four exterior colours: Snow White Pearl, Wolf Grey, Aurora Black Pearl and Runway Red.",
      "Distinctive pixel-inspired EV design language shared across Kia's global EV range.",
    ],
    infotainment: [
      "Dual 12.3\" curved displays with navigation and connected-car functions.",
      "Meridian Premium Sound system with 14 speakers.",
    ],
    comfort: [
      "Vehicle-to-Load (V2L) with 3.6kW output powers external devices and equipment.",
      "Remote folding rear seats add cargo flexibility without opening the boot.",
    ],
    variants: [
      "EV6 is offered as a premium, highly equipped all-wheel-drive EV in India.",
      "Kia has not published an official India starting price on kia.com/in; confirm current on-road pricing with Modi Kia.",
    ],
    specifications: [
      { label: "Seating", value: "5" },
      { label: "Battery", value: "84 kWh" },
      { label: "Claimed range", value: "650+ km" },
      { label: "Torque", value: "605 Nm" },
      { label: "Boot space", value: "1,300 L (seats folded)" },
      { label: "DC charge (10–80%)", value: "About 18 minutes on a 350kW charger" },
      { label: "Starting price", value: "₹65.90 Lakh*, indicative, confirm current on-road pricing with Modi Kia" },
    ],
    warranty: evWarranty,
    sourceUrl: "https://www.kia.com/in/our-vehicles/ev6.html",
  }),
  ev9: detail({
    overview:
      "EV9 is Kia's flagship 7-seat electric SUV: a Trinity Panoramic Display, 10 airbags, 561km of claimed range and ultra-fast 800V charging, built as the halo model for Kia's Indian EV lineup.",
    idealFor: "Premium 7-seat EV buyers who want a flagship electric SUV with long range and fast charging.",
    performance: [
      "Dual motor all-wheel drive delivers 282.6 kW and 700 Nm.",
      "Supports both 400V and 800V ultra-fast charging.",
      "10–80% DC charge takes about 24 minutes on a 350kW charger.",
    ],
    safety: [
      "10 airbags and ADAS Level 2 with 27 autonomous features.",
      "Digital IRVM with a rear camera view for a wider, unobstructed field of vision.",
    ],
    adas: [
      "27-feature Level 2 ADAS suite spanning collision avoidance, lane-keeping and cruise-assist functions.",
    ],
    interior: [
      "Trinity Panoramic Display: 12.3\" cluster + 5\" HVAC control + 12.3\" infotainment touchscreen.",
      "Second-row captain seats with relaxation and massage functions.",
      "Dual sunroof and a shift-by-wire column selector.",
    ],
    exterior: [
      "Five exterior colours including Ocean Blue Pearl and Panthera Metal.",
      "Boxy, flagship SUV proportions shared with Kia's global EV9.",
    ],
    infotainment: [
      "Kia Connect 2.0 with over-the-air software updates.",
      "Trinity Panoramic Display across cluster, HVAC and infotainment.",
    ],
    comfort: [
      "Vehicle-to-Load (V2L) with 3.68kW output.",
      "3-zone automatic climate control and second-row captain-seat massage function.",
    ],
    variants: [
      "EV9 is offered as a fully loaded, 6-seat captain-chair flagship trim in India.",
      "Confirm current colour and accessory stock with Modi Kia.",
    ],
    specifications: [
      { label: "Seating", value: "6 (captain seats)" },
      { label: "Power / torque", value: "282.6 kW / 700 Nm" },
      { label: "Claimed range", value: "561 km (ARAI MIDC)" },
      { label: "Boot space", value: "333 L (VDA) + 52–90 L frunk" },
      { label: "DC charge (10–80%)", value: "About 24 minutes on a 350kW charger" },
      { label: "Starting price", value: "₹1,29,91,312 (ex-showroom, all-India)" },
    ],
    warranty: evWarranty,
    sourceUrl: "https://www.kia.com/in/our-vehicles/ev9.html",
  }),
};

carDetails["syros-ev"] = detail({
  overview:
    "Syros EV is Kia's newest electric SUV, currently open for pre-booking ahead of its India launch. It pairs a best-in-segment certified range with the bold Syros SUV design, a Trinity Panoramic Display and a lifetime battery warranty aimed at removing the usual doubts around going electric.",
  idealFor: "Early adopters and first-time EV buyers who want to pre-book Kia's newest electric SUV ahead of launch.",
  performance: [
    "Best-in-segment 171 PS power from a permanent magnet synchronous motor.",
    "Best-in-segment 526 km certified range (ARAI MIDC-Full).",
    "10% to 80% DC fast charging in approximately 39 minutes on a 100 kW charger.",
  ],
  safety: [
    "Full safety and ADAS feature lists were not yet published by Kia at the time of this build, confirm the final specification with Modi Kia before booking.",
    "Kia's official Syros EV page lists dedicated Safety and ADAS sections; ask Modi Kia for the current pre-booking brochure for exact figures.",
  ],
  interior: [
    "Best-in-segment 2nd row space with ventilated seats.",
    "Dual Pane Panoramic Sunroof and 64-colour ambient mood lighting with LED footwell lamps (X-Line only).",
    "465-litre boot for everyday and weekend luggage.",
  ],
  exterior: [
    "Shares the bold Syros SUV design language, offered in Tech Line and X-Line trims.",
    "Colour choices include Frost Blue, Aurora Black Pearl, Glacier White Pearl, Gravity Grey and Magma Red, subject to change before launch.",
  ],
  infotainment: [
    "76.20 cm (30\") Trinity Panoramic Display Panel with voice command.",
    "Kia Connect 2.0 with OTA updates, Digital Key and an EV Route Planner.",
  ],
  comfort: [
    "Ventilated front seats and a spacious, best-in-segment 2nd row.",
    "K-Charge unifies 20,300+ charging points on the MyKia App for easy route and charge planning.",
  ],
  variants: [
    "Tech Line and X-Line trims are expected; final variant-wise equipment has not been published yet.",
    "Pre-book now to secure priority delivery once Kia confirms pricing and variant details.",
  ],
  specifications: [
    { label: "Power", value: "171 PS (best-in-segment, claimed)" },
    { label: "Claimed range", value: "526 km (ARAI MIDC-Full)" },
    { label: "DC fast charge (10–80%)", value: "~39 minutes on a 100 kW charger" },
    { label: "Boot space", value: "465 L" },
    { label: "Display", value: "76.20 cm (30\") Trinity Panoramic Display" },
    { label: "Ownership", value: "Lifetime high-voltage battery warranty + Assured Buyback" },
  ],
  warranty:
    "Kia is offering a Lifetime* high-voltage battery warranty on the Syros EV, plus an Assured Buyback programme. *Terms, conditions and exact coverage should be confirmed with Modi Kia before booking, as final terms had not been published at the time of this build.",
  sourceUrl: "https://www.kia.com/in/our-vehicles/syros-ev.html",
});

export function getCarDetail(car: Car): CarDetail {
  const researched = carDetails[car.slug];
  if (researched) return researched;

  const isElectric = car.category === "Electric";
  return detail({
    overview: `${car.blurb} This guide brings the core ownership facts together so you can compare the Kia ${car.name} on space, efficiency, powertrain choice and everyday equipment before a test drive.`,
    idealFor: `${car.type} buyers looking for a Kia that matches their driving needs, budget and preferred fuel type.`,
    performance: [
      `${car.engine}.`,
      `Transmission choices: ${car.transmission}.`,
      `${isElectric ? "Range and charging time depend on battery choice, charger output, state of charge and conditions." : `Claimed efficiency: ${car.mileage}.`}`,
    ],
    safety: [
      "Safety equipment varies by variant; ask for the latest Kia feature chart and a trim-wise quotation.",
      "Confirm the exact airbag count, stability-control features, camera and parking-assistance equipment on your preferred version.",
      "ISOFIX and tyre-pressure monitoring availability should be checked if these are important to your family use.",
    ],
    interior: [
      `${car.seating}-seat layout with ${car.bootSpace.toLowerCase()} of quoted luggage space.`,
      "Request a showroom walkaround to compare seat comfort, rear-room and storage with your regular passengers and luggage.",
    ],
    exterior: [
      `${car.type} body style with the colour choices shown above.`,
      "Paint, wheel design and exterior lighting vary by selected variant and may change with Kia's current line-up.",
    ],
    infotainment: [
      "Screen size, smartphone integration, connected-car functions and audio system vary by trim.",
      "Have the advisor demonstrate the exact infotainment system on the version you are considering.",
    ],
    comfort: [
      "Compare manual and automatic options against your daily traffic, highway distance and driving preference.",
      "Check climate control, rear ventilation, cruise control and convenience features on the current variant chart.",
    ],
    variants: [
      `Available powertrains: ${car.engine}.`,
      `Available transmissions: ${car.transmission}.`,
      "Colour and feature availability is subject to selected variant and current stock. Modi Kia can prepare a side-by-side comparison.",
    ],
    specifications: [
      { label: "Seating", value: car.seating },
      { label: "Fuel", value: car.fuel },
      { label: "Engine / motor", value: car.engine },
      { label: "Transmission", value: car.transmission },
      { label: "Mileage / range", value: car.mileage },
      { label: "Boot space", value: car.bootSpace },
    ],
    warranty: isElectric ? evWarranty : passengerCarWarranty,
    sourceUrl: `https://www.kia.com/in/our-vehicles/${car.slug}.html`,
  });
}

export function getCarBrochure(car: Car): string | undefined {
  const base = "https://www.kia.com";
  switch (car.slug) {
    case "seltos":
      return `${base}/content/dam/kia2/in/en/our-vehicles/new-seltos/showroom/brochure/Kia_Seltos_Brochure_Desktop_2026.pdf`;
    case "sonet":
      return `${base}/content/dam/kia2/in/en/our-vehicles/showroom/sonet/brochure/Sonet_Wild_Reborn_Brochure_2026_Desktop.pdf`;
    case "syros":
    case "syros-ev": // Fallback to Syros for EV if separate not published
      return `${base}/content/dam/kia2/in/en/our-vehicles/syros/Kia_Syros_Brochure_2026_Desktop.pdf`;
    case "carens":
      return `${base}/content/dam/kia2/in/en/our-vehicles/showroom/Brochures/Carens_Leaflet.pdf`;
    case "carens-clavis":
      return `${base}/content/dam/kia2/in/en/our-vehicles/kia-clavis/broc/Kia_Carens_Clavis_Brochure_Desktop.pdf`;
    case "carens-clavis-ev":
      return `${base}/content/dam/kia2/in/en/our-vehicles/kia-carens-clavis-ev/showroom/Kia_Carens_Clavis_EV_Brochure_Desktop.pdf`;
    case "carnival":
      return `${base}/content/dam/kia2/in/en/our-vehicles/carnival/Kia_Carnival_Brochure_Desktop.pdf`;
    case "ev9":
      return `${base}/content/dam/kia2/in/en/our-vehicles/showroom/ev9/Kia_EV9_Brochure_Desktop.pdf`;
    default:
      return undefined;
  }
}
