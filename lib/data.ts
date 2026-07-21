/* ============================================================
   Content model for the Modi Kia landing page.
   Car lineup, images, pricing, engine and transmission specs are
   sourced directly from the official Kia India site (kia.com/in)
   so the dealership page matches the parent brand's own data.
   NAP/location facts come from modi-kia-kalyan.com. Portrait/
   showroom photos use stock stand-ins where noted.
   ============================================================ */

/* Genuine Kia India product photography (full-frame shots, not
   transparent cutouts) used where a real photo is needed rather than a
   floating product cutout — e.g. the test-drive interior panel and blog
   thumbnails, which render with object-cover and would show through as
   blank/white behind a transparent PNG. */
const official = (path: string) => `https://www.kia.com${path}`;

/* Stock stand-ins for people and showroom buildings. */
const stock = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Indian numbering (lakh/crore) grouping, e.g. 1090700 -> "10,90,700".
   priceINR: 0 marks a pre-booking model with no published ex-showroom
   price yet (see Syros EV) — shown as "Coming Soon" rather than "₹0". */
export const formatINR = (n: number) => (n > 0 ? `₹${n.toLocaleString("en-IN")}` : "Coming Soon");

export const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
};

/* Front-three-quarter (~45°) product cutouts on a clean white studio
   background, pulled from kia.com's own 360° exterior viewer for each
   model (one fixed frame per model, not the interactive spinner). Used
   for the car cards and the coverflow carousel, which render with
   object-contain and expect a floating cutout, not a full photo. Every
   URL was fetched and visually confirmed to show the correct angle —
   frame numbering isn't consistent across models, since each model's
   360 rig starts its sequence at a different reference angle. */
const modelShot = {
  seltos: "/360/exterior/seltos/ebb/09-d.png",
  sonet: "/360/exterior/sonet/gwp/09-d.png",
  syros: "/360/exterior/syros/ebb/09-d.png",
  carens: "/360/exterior/carens/mpb/09-d.png",
  carensClavis: "/360/exterior/carens-clavis/isg/09-d.png",
  carensClavisEv: "/360/exterior/carens-clavis-ev/ism/09-d.png",
  carnival: "/360/exterior/carnival/gwp/09-d.png",
  // Frame 13/44 (not 04/48) deliberately: these are the real photographed
  // frames facing the opposite direction, so the "EV6/EV9 GT-line" number
  // plate text on the bumper still reads correctly.
  ev6: "/360/exterior/ev6/swp/13-d.png",
  ev9: "/360/exterior/ev9/obg/44-d.png",
  syrosEv: "/360/exterior/syros-ev/ebb/09-d.png",
};

/* Cinematic, full-bleed lifestyle photography (one per model), originally
   sourced from each model's own page on kia.com/in — the same photography
   Kia's own homepage hero carousel uses. Kept separate from modelShot
   above: the hero renders full-bleed with object-cover, so it needs a
   real scene photo, not a white-background product cutout.
   Downloaded locally into public/hero-images/ so the homepage hero no
   longer hotlinks the manufacturer's CDN. */
const heroShot = {
  seltos: "/hero-images/seltos.jpg",
  sonet: "/hero-images/sonet.jpg",
  syros: "/hero-images/syros.jpg",
  carens: "/hero-images/carens.jpg",
  carensClavis: "/hero-images/carens-clavis.jpg",
  carensClavisEv: "/hero-images/carens-clavis-ev.jpg",
  carnival: "/hero-images/carnival.jpg",
  // Swapped from the original ev6/ev9 banners: those carried baked-in
  // marketing stat callouts ("Ready in a Flash", "Multi-charging
  // Compatibility" etc). These "Explore the range" card photos are the
  // same official photography with no text burned into the image.
  ev6: "/hero-images/ev6.jpg",
  ev9: "/hero-images/ev9.jpg",
};

/* Local hero video clips, supplied directly and copied into
   public/hero-videos/. Only models with a matching clip get one; the
   rest keep their static heroShot photo. */
const heroVideo = {
  sonet: "/hero-videos/sonet.mp4",
  carensClavisEv: "/hero-videos/carens-clavis-ev.mp4",
  carnival: "/hero-videos/carnival.mp4",
  ev6: "/hero-videos/ev6.mp4",
};

/* Homepage hero carousel banners — now served from public/hero-images/
   (see heroShot above) rather than hotlinked from kia.com. */
const banner = (path: string) => path;

/* ---- Canonical business identity (NAP), used everywhere + in schema ---- */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.modikia.co.in";

export const company = {
  name: "Modi Kia",
  tagline: "Movement that Inspires",
  phone: "88790 20761",
  phoneE164: "+918879020761",
  // NOTE: verify before launch — not published on the source site.
  email: "contact@modikia.co.in",
  primaryAddress: {
    street: "Kalyan - Bhiwandi Rd, Near Mahanagar CNG Station, Sapna Industrial Estate, Pimpalghar",
    locality: "Bhiwandi",
    region: "Maharashtra",
    postalCode: "421302",
    country: "IN",
  },
  // NOTE: confirm exact opening hours with the dealership before launch.
  hours: "Mon to Sun, 9:00 AM to 8:00 PM",
  hoursSpec: { days: "Mo-Su", opens: "09:00", closes: "20:00" },
  // Locations and service area sourced from gautammodigroup.com — the
  // group's official business directory. Pimpalghar (Bhiwandi) houses both
  // the showroom and the service department; Dombivli is a sales showroom.
  areasServed: ["Bhiwandi", "Dombivli"],
  // NOTE: Modi Kia does not publish sales/service volume figures the way
  // modihyundai.co.in did. These are placeholder figures only — replace
  // with real numbers (or remove the stat block) before launch.
  stats: {
    carsSold: "1,000+",
    usedCarsSold: "500+",
    satisfaction: "95%",
    servicesDone: "5,000+",
  },
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
    youtube: "https://www.youtube.com/",
    linkedin: "https://www.linkedin.com/",
  },
};

export const nav = {
  phone: company.phone,
  location: "Bhiwandi",
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Find a car", href: "/cars" },
    { label: "Service", href: "/locate-service-centre" },
    { label: "Locate Us", href: "/locate-us" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact-us" },
  ],
};

/* ---- About Us page content ----
   Dealership facts sourced from modi-kia-kalyan.com. Parent group facts
   (values, brand portfolio, workforce/sales growth) sourced from
   gautammodigroup.com. Kia Motors India brand facts sourced from
   kia.com/in's own "About Us" / India-plant pages, cross-checked against
   Kia's public dealer directory (CarDekho) where kia.com itself did not
   publish a network count. */
export const aboutHeroImage = "/showrooms/locate-us.webp";
export const aboutCultureImage = "/about/culture.jpg";

export const groupInfo = {
  name: "Gautam Modi Group",
  url: "https://gautammodigroup.com",
  founded:
    "Grown over decades from a 100-member team to a 3,500+ strong organisation.",
  growth:
    "Monthly sales have scaled from over 500 to more than 1,500 units, reflecting sustained market leadership and customer trust.",
  brands: ["Kia", "Hyundai", "Audi", "Mahindra", "MG"],
  ventures: [
    { name: "Krishiv Insurance", text: "Insurance solutions for vehicle owners." },
    { name: "ThinkKarz", text: "The group's premium pre-owned vehicle brand." },
  ],
  values: [
    {
      title: "Exploring New Horizons",
      text: "Embracing new opportunities for growth and innovation.",
    },
    {
      title: "Nurturing Talents",
      text: "Empowering and developing our people to help them excel.",
    },
    {
      title: "Process with Tenacity",
      text: "Converting strategy into consistent, effective action.",
    },
    {
      title: "Grandiose Experience",
      text: "Creating meaningful experiences through recognition and service.",
    },
  ],
  headquarters:
    "Neo Vikram Building, Andheri Link Rd, Sahakar Nagar, Azad Nagar, Andheri West, Mumbai, Maharashtra 400053",
};

export const kiaIndiaFacts = {
  tagline: "Movement that Inspires",
  founded: 2019,
  plant: "Manufacturing plant in Anantapur, Andhra Pradesh, a 536-acre, US$2 billion facility with capacity for around 300,000 vehicles a year.",
  // NOTE: Kia's own site does not publish a live sales/service-point count.
  // This figure is sourced from CarDekho's third-party dealer directory,
  // not from kia.com directly — confirm the current count before launch.
  network: "582+ dealer touchpoints across 368+ cities in India (per CarDekho's dealer directory).",
  milestone: "Kia India began mass production of the Seltos at Anantapur in July 2019 and has since crossed 6.3 lakh+ dispatches, including exports.",
  csr: [
    {
      title: "Kia India CSR",
      text: "Kia India runs community and road-safety focused CSR initiatives alongside its Anantapur manufacturing operations.",
    },
    {
      title: "Kia Connect",
      text: "Kia's connected-car platform brings remote vehicle control, safety alerts and over-the-air updates to eligible models.",
    },
  ],
};

export const aboutFaqData = [
  {
    question: "Who owns Modi Kia?",
    answer:
      "Modi Kia is owned and operated by the Gautam Modi Group, an automotive business group that also represents Hyundai, Audi, Mahindra and MG in India.",
  },
  {
    question: "Is Modi Kia an authorised Kia dealership?",
    answer:
      "Yes. Modi Kia is an authorised Kia India dealership, with sales showrooms in Bhiwandi (Kalyan–Bhiwandi Road) and Dombivli (Kalyan-Shilphata Road), and a dedicated service department on the Kalyan–Bhiwandi Road in Bhiwandi, Maharashtra.",
  },
  {
    question: "What can I do at Modi Kia?",
    answer:
      "Modi Kia handles new Kia car sales, test drives, exchange/trade-in for pre-owned vehicles, financing and a dedicated service department, from its Bhiwandi and Dombivli showrooms and Bhiwandi service department.",
  },
  {
    question: "Which areas does Modi Kia serve?",
    answer:
      "Modi Kia serves Bhiwandi, Dombivli and the surrounding region from its showrooms in Bhiwandi and Dombivli, and its service department on the Kalyan–Bhiwandi Road.",
  },
  {
    question: "When did Kia enter the Indian market?",
    answer:
      "Kia Motors India began mass production at its Anantapur, Andhra Pradesh plant in July 2019, starting with the Seltos, and has since grown to a nationwide dealer network.",
  },
];

export type Slide = {
  model: string;
  slug: string;
  badge: string;
  headline: string;
  sub: string;
  price: string;
  image: string;
  alt: string;
  video?: string;
};

export const heroSlides: Slide[] = [
  {
    model: "Kia SELTOS",
    slug: "seltos",
    badge: "Best-Selling SUV",
    headline: "The all-new Seltos",
    sub: "Badass. Forever.",
    price: "10.99",
    image: banner(heroShot.seltos),
    alt: "Kia Seltos SUV, official campaign image",
  },
  {
    model: "Kia SONET",
    slug: "sonet",
    badge: "Compact SUV",
    headline: "New Sonet",
    sub: "The Wild. Reborn.",
    price: "7.41",
    image: banner(heroShot.sonet),
    video: heroVideo.sonet,
    alt: "Kia Sonet compact SUV, official product image",
  },
  {
    model: "Kia SYROS",
    slug: "syros",
    badge: "5-Star BNCAP",
    headline: "Presenting The 2026 Kia Syros.",
    sub: "Made for your worlds. And everyone in it.",
    price: "8.42",
    image: banner(heroShot.syros),
    alt: "Kia Syros SUV, official product image",
  },
  {
    model: "Kia CARENS",
    slug: "carens",
    badge: "6 & 7 Seater MPV",
    headline: "Kia Carens",
    sub: "From a different world.",
    price: "11.02",
    image: banner(heroShot.carens),
    alt: "Kia Carens MPV, official showroom image",
  },
  {
    model: "Kia CARENS CLAVIS",
    slug: "carens-clavis",
    badge: "Premium 7-Seater",
    headline: "The Carens Clavis",
    sub: "For epic journeys.",
    price: "11.27",
    image: banner(heroShot.carensClavis),
    alt: "Kia Carens Clavis premium MPV, official product image",
  },
  {
    model: "Kia CARENS CLAVIS EV",
    slug: "carens-clavis-ev",
    badge: "All-Electric MPV",
    headline: "Kia Carens Clavis EV",
    sub: "It's an E.We.",
    price: "18.01",
    image: banner(heroShot.carensClavisEv),
    video: heroVideo.carensClavisEv,
    alt: "Kia Carens Clavis EV electric MPV, official product image",
  },
  {
    model: "Kia CARNIVAL",
    slug: "carnival",
    badge: "Luxury MPV",
    headline: "The new Kia Carnival Limousine",
    sub: "Your own luxury liner.",
    price: "59.45",
    image: banner(heroShot.carnival),
    video: heroVideo.carnival,
    alt: "Kia Carnival Limousine luxury MPV, official banner image",
  },
  {
    model: "Kia EV6",
    slug: "ev6",
    badge: "The Electric Superstar",
    headline: "Kia EV6",
    sub: "The Electric Superstar.",
    price: "65.90",
    image: banner(heroShot.ev6),
    video: heroVideo.ev6,
    alt: "Kia EV6 electric SUV, official campaign image",
  },
  {
    model: "Kia EV9",
    slug: "ev9",
    badge: "Flagship Electric SUV",
    headline: "The Kia EV9",
    sub: "The World's Most Inspiring Electric. Ever.",
    price: "129.91",
    image: banner(heroShot.ev9),
    alt: "Kia EV9 flagship electric SUV, official showroom image",
  },
];

export type CarCategory = "SUV" | "MPV" | "Electric";

export type CarColor = { name: string; hex: string; image: string; code: string };

export type Car = {
  name: string;
  slug: string;
  type: string;
  category: CarCategory;
  price: string;
  priceINR: number;
  engine: string;
  transmission: string;
  blurb: string;
  cta: string;
  fuel: string;
  image: string;
  alt: string;
  seating: string;
  mileage: string;
  bootSpace: string;
  highlights: string[];
  colors: CarColor[];
};

export type DetailSpec = { label: string; value: string };

export type CarDetail = {
  overview: string;
  idealFor: string;
  performance: string[];
  safety: string[];
  adas?: string[];
  interior: string[];
  exterior: string[];
  infotainment: string[];
  comfort: string[];
  variants: string[];
  specifications: DetailSpec[];
  warranty: string;
  sourceUrl: string;
};

export type GalleryImage = { src: string; alt: string; label: string };

const lakh = (inr: number) => (inr / 100000).toFixed(2);

const slugify = (n: string) => n.toLowerCase().replace(/\s+/g, "-");

/* Real per-colour renders: kia.com's colour swatches keep the same
   hash/frame as the model's default shot in modelShot above and only
   swap the exterior colour-code segment of the URL, so each named paint
   here is confirmed pulled from that same live 360° asset — every code
   below was clicked through on the model's own page and curl-verified
   (HTTP 200) rather than guessed. Paints with no rendered asset for this
   trim (e.g. dual-tones, a couple of matte/gunmetal finishes) are left
   out rather than shown with a swatch that doesn't actually change the
   photo. */
const withColour = (baseImage: string, code: string) =>
  baseImage.replace(/\/exterior\/([^\/]+)\/([^\/]+)\//, `/exterior/$1/${code}/`);

const kiaColours = (
  baseImage: string,
  defs: [name: string, hex: string, code: string][],
): CarColor[] => defs.map(([name, hex, code]) => ({ name, hex, code, image: withColour(baseImage, code) }));

/* Full lineup, pricing, engine and transmission specs sourced directly
   from the official kia.com/in model pages (fetched and confirmed live
   for this build). Fields not published by Kia's own pages (e.g. exact
   ARAI mileage/boot space for some models) carry an honest placeholder
   note rather than an invented number. */
export const cars: Car[] = [
  {
    name: "Seltos",
    slug: slugify("Seltos"),
    type: "SUV",
    category: "SUV",
    price: lakh(1099900),
    priceINR: 1099900,
    engine: "1.5L Smartstream Petrol, 1.5L Turbo GDi Petrol, 1.5L CRDi VGT Diesel",
    transmission: "6-Speed Manual & IVT, 6iMT & 7-Speed DCT, 6-Speed Manual & 6-Speed AT",
    fuel: "Petrol · Diesel",
    blurb: "Bolder, bigger, and unmistakably badass, Kia's flagship SUV for India.",
    cta: "Explore the Seltos",
    image: modelShot.seltos,
    alt: "Kia Seltos SUV, official product shot",
    colors: kiaColours(modelShot.seltos, [
      ["Frost Blue", "#4A6FA5", "ebb"],
      ["Ivory Silver Gloss", "#C7C9C7", "isg"],
      ["Imperial Blue", "#1B2A4A", "mpb"],
      ["Morning Haze", "#B9B7AE", "dm9"],
      ["Aurora Black Pearl", "#14151A", "abp"],
      ["Gravity Gray", "#55585C", "kdg"],
      ["Magma Red", "#9E2B25", "ar2"],
      ["Pewter Olive", "#6E6B5E", "ewe"],
      ["Glacier White Pearl", "#F2F1EC", "gwp"],
    ]),
    seating: "5",
    mileage: "Confirm current ARAI-certified mileage by variant with Modi Kia.",
    bootSpace: "447 litres",
    highlights: [
      "ADAS Level 2+ with 28 autonomous features (GTX/X-Line)",
      "5-star BNCAP safety rating, 6 airbags standard",
      "12.3\" HD touchscreen navigation cockpit with head-up display",
      "Dual Pane Panoramic Sunroof and Bose 8-speaker sound system",
    ],
  },
  {
    name: "Sonet",
    slug: slugify("Sonet"),
    type: "Compact SUV",
    category: "SUV",
    price: lakh(740900),
    priceINR: 740900,
    engine: "1.2L Petrol, 1.0L Turbo GDi Petrol, 1.5L CRDi VGT Diesel",
    transmission: "5-Speed Manual, 6-Speed Manual, 6iMT, 7-Speed DCT, 6-Speed AT",
    fuel: "Petrol · Diesel",
    blurb: "The Wild. Reborn, Kia's compact SUV with big-SUV technology.",
    cta: "Explore the Sonet",
    image: modelShot.sonet,
    alt: "Kia Sonet compact SUV, official product shot",
    colors: kiaColours(modelShot.sonet, [
      ["Glacier White Pearl", "#F2F1EC", "gwp"],
      ["Gravity Grey", "#55585C", "kdg"],
      ["Aurora Black Pearl", "#14151A", "abp"],
      ["Pewter Olive", "#6E6B5E", "ewe"],
      ["Imperial Blue", "#1B2A4A", "mpb"],
      ["Magma Red", "#9E2B25", "ar2"],
    ]),
    seating: "5",
    mileage: "Confirm current ARAI-certified mileage by variant with Modi Kia.",
    bootSpace: "Confirm exact boot capacity by variant with Modi Kia.",
    highlights: [
      "ADAS Level 1 with 10 autonomous features",
      "360° camera with blind view monitor",
      "10.25\" HD touchscreen navigation and Star Map LED tail lamps",
      "Kia Connect with 70+ smart features, 6 airbags standard",
    ],
  },
  {
    name: "Syros",
    slug: slugify("Syros"),
    type: "SUV",
    category: "SUV",
    price: lakh(841900),
    priceINR: 841900,
    engine: "1.0L Turbo Petrol (120 PS), 1.5L CRDi VGT Diesel (116 PS)",
    transmission: "7-Speed DCT (petrol), 6-Speed Automatic (diesel), manual options",
    fuel: "Petrol · Diesel",
    blurb: "Something for Everyone, a genre-bending SUV built around space and tech.",
    cta: "Explore the Syros",
    image: modelShot.syros,
    alt: "Kia Syros SUV, official product shot",
    colors: kiaColours(modelShot.syros, [
      ["Frost Blue", "#4A6FA5", "ebb"],
      ["Ivory Silver Gloss", "#C7C9C7", "isg"],
      ["Ivory Silver Matte", "#C7C9C7", "ism"],
      ["Gravity Gray", "#55585C", "kdg"],
      ["Imperial Blue", "#1B2A4A", "mpb"],
      ["Magma Red", "#9E2B25", "ar2"],
      ["Pewter Olive", "#6E6B5E", "ewe"],
      ["Glacier White Pearl", "#F2F1EC", "gwp"],
      ["Aurora Black Pearl", "#14151A", "abp"],
    ]),
    seating: "5",
    mileage: "Confirm current ARAI-certified mileage by variant with Modi Kia.",
    bootSpace: "Confirm exact boot capacity by variant with Modi Kia.",
    highlights: [
      "5-star BNCAP safety rating with a 20-feature standard safety pack",
      "Trinity Panoramic Display: 12.3\" touchscreen + 12\" cluster + 5\" AC control",
      "Kia Connect 2.0 with 80+ features and OTA updates",
      "Dual Pane Panoramic Sunroof and Harman Kardon 8-speaker audio",
    ],
  },
  {
    name: "Carens",
    slug: slugify("Carens"),
    type: "MPV",
    category: "MPV",
    price: lakh(1101900),
    priceINR: 1101900,
    engine: "1.5L Smartstream Petrol, 1.5L CRDi VGT Diesel",
    transmission: "Manual, DCT & Automatic (by engine)",
    fuel: "Petrol · Diesel",
    blurb: "From a different world, Kia's 6/7-seat family MPV.",
    cta: "Explore the Carens",
    image: modelShot.carens,
    alt: "Kia Carens MPV, official product shot",
    colors: kiaColours(modelShot.carens, [
      ["Imperial Blue", "#1B2A4A", "mpb"],
      ["Aurora Black Pearl", "#14151A", "abp"],
      ["Clear White", "#F4F4F2", "ud"],
    ]),
    seating: "6 / 7",
    mileage: "Confirm current ARAI-certified mileage by variant with Modi Kia.",
    bootSpace: "Confirm exact boot capacity by variant with Modi Kia.",
    highlights: [
      "15 safety features including 6 airbags standard",
      "One-touch second-row tumble for easy third-row access",
      "8.0\" touchscreen with wireless Android Auto & Apple CarPlay",
      "Semi-leatherette seats across 6 and 7-seat layouts",
    ],
  },
  {
    name: "Carens Clavis",
    slug: slugify("Carens Clavis"),
    type: "Premium MPV",
    category: "MPV",
    price: lakh(1126900),
    priceINR: 1126900,
    engine: "SmartStream G1.5 T-GDi Petrol, G1.5 Petrol, 1.5L CRDi VGT Diesel",
    transmission: "6MT / 6iMT / 7-Speed DCT (petrol), 6MT / 6-Speed AT (diesel)",
    fuel: "Petrol · Diesel",
    blurb: "For epic journeys, the premium, new-generation Carens.",
    cta: "Explore the Carens Clavis",
    image: modelShot.carensClavis,
    alt: "Kia Carens Clavis premium MPV, official product shot",
    colors: kiaColours(modelShot.carensClavis, [
      ["Ivory Silver Gloss", "#C7C9C7", "isg"],
      ["Imperial Blue", "#1B2A4A", "mpb"],
      ["Pewter Olive", "#6E6B5E", "ewe"],
      ["Aurora Black Pearl", "#14151A", "abp"],
      ["Gravity Gray", "#55585C", "kdg"],
      ["Glacier White Pearl", "#F2F1EC", "gwp"],
    ]),
    seating: "7",
    mileage: "Confirm current ARAI-certified mileage by variant with Modi Kia.",
    bootSpace: "Confirm exact boot capacity by variant with Modi Kia.",
    highlights: [
      "ADAS Level 2 with 20 autonomous safety functions",
      "Dual Pane Panoramic Sunroof and 26.62\" Dual Panoramic Display",
      "18 standard safety features including 6 airbags",
      "BOSE 8-speaker audio and a Smart Pure Air Purifier with AQI display",
    ],
  },
  {
    name: "Carens Clavis EV",
    slug: slugify("Carens Clavis EV"),
    type: "Electric MPV",
    category: "Electric",
    price: lakh(1800500),
    priceINR: 1800500,
    engine: "Electric Motor, 42 kWh or 51.4 kWh battery",
    transmission: "Single-Speed Reduction Gear",
    fuel: "Electric",
    blurb: "It's an E.We, Kia's first electric MPV for Indian families.",
    cta: "Explore the Carens Clavis EV",
    image: modelShot.carensClavisEv,
    alt: "Kia Carens Clavis EV electric MPV, official product shot",
    colors: kiaColours(modelShot.carensClavisEv, [
      ["Ivory Silver Matte", "#C7C9C7", "ism"],
      ["Imperial Blue", "#1B2A4A", "mpb"],
      ["Pewter Olive", "#6E6B5E", "ewe"],
      ["Glacier White Pearl", "#F2F1EC", "gwp"],
      ["Gravity Grey", "#55585C", "kdg"],
      ["Aurora Black Pearl", "#14151A", "abp"],
    ]),
    seating: "6 / 7",
    mileage: "Up to 490 km range (51.4 kWh extended-range battery, MIDC)",
    bootSpace: "25 litre front trunk; rear boot varies by seat configuration.",
    highlights: [
      "10–80% DC charge in about 39 minutes",
      "ADAS Level 2 with 20 autonomous safety features",
      "Vehicle-to-Load (V2L) capability and access to 11,000+ charging points via the K-Charge app",
      "Dual panoramic display, BOSE sound and a panoramic sunroof",
    ],
  },
  {
    name: "Carnival",
    slug: slugify("Carnival"),
    type: "Luxury MPV",
    category: "MPV",
    price: lakh(5944516),
    priceINR: 5944516,
    engine: "2.2L CRDi Diesel",
    transmission: "8-Speed Automatic",
    fuel: "Diesel",
    blurb: "Your own luxury liner, Kia's flagship 7-seat luxury MPV.",
    cta: "Explore the Carnival",
    image: modelShot.carnival,
    alt: "Kia Carnival Limousine luxury MPV, official product shot",
    colors: kiaColours(modelShot.carnival, [
      ["Glacier White Pearl", "#F2F1EC", "gwp"],
      ["Fusion Black", "#101114", "fsb"],
    ]),
    seating: "7 (2+2+3)",
    mileage: "Confirm current ARAI-certified mileage by variant with Modi Kia.",
    bootSpace: "Confirm exact boot capacity by variant with Modi Kia.",
    highlights: [
      "33 autonomous ADAS features, including 360° camera and lane keep assist",
      "Powered second-row relaxation seats with ventilation, heating and leg support",
      "12-speaker Bose surround sound and a wide electric dual sunroof",
      "3-zone climate control, dual panoramic curved display and head-up display",
    ],
  },
  {
    name: "EV6",
    slug: slugify("EV6"),
    type: "Electric SUV",
    category: "Electric",
    price: lakh(6590000),
    priceINR: 6590000,
    engine: "Dual Permanent Magnet Synchronous Motors, 84 kWh battery",
    transmission: "Single-Speed Reduction Gear, All-Wheel Drive",
    fuel: "Electric",
    blurb: "The Electric Superstar, Kia's flagship electric SUV.",
    cta: "Explore the EV6",
    image: modelShot.ev6,
    alt: "Kia EV6 electric SUV, official product shot",
    colors: kiaColours(modelShot.ev6, [
      ["Snow White Pearl", "#F4F4F2", "swp"],
      ["Wolf Grey", "#6B6E70", "klm"],
      ["Aurora Black Pearl", "#14151A", "abp"],
      ["Runway Red", "#C0392B", "cr5"],
    ]),
    seating: "5",
    mileage: "Up to 650+ km range (84 kWh battery, claimed)",
    bootSpace: "Confirm exact boot capacity by variant with Modi Kia.",
    highlights: [
      "605 Nm dual-motor AWD, switches to RWD in 0.4 seconds",
      "800V ultra-fast charging: 10–80% in about 18 minutes on a 350kW charger",
      "Dual 12.3\" panoramic curved display with AR head-up display",
      "25+ ADAS 2.0 features and Vehicle-to-Load (3.6kW)",
    ],
  },
  {
    name: "EV9",
    slug: slugify("EV9"),
    type: "Electric SUV",
    category: "Electric",
    price: lakh(12991312),
    priceINR: 12991312,
    engine: "Dual Permanent Magnet Synchronous Motors, high-voltage battery",
    transmission: "Single-Speed Reduction Gear, All-Wheel Drive",
    fuel: "Electric",
    blurb: "The world's most inspiring electric. Ever, Kia's 7-seat electric flagship.",
    cta: "Explore the EV9",
    image: modelShot.ev9,
    alt: "Kia EV9 flagship electric SUV, official product shot",
    colors: kiaColours(modelShot.ev9, [
      ["Ocean Blue", "#1F4E79", "obg"],
      ["Aurora Black Pearl", "#14151A", "abp"],
      ["Snow White Pearl", "#F4F4F2", "swp"],
      ["Panthera Metal", "#6B6355", "p2m"],
      ["Pebble Gray", "#9C9C94", "dfg"],
    ]),
    seating: "6 (captain seats)",
    mileage: "Up to 561 km range (ARAI MIDC, claimed)",
    bootSpace: "333 litres (VDA) + 52–90 litre front trunk",
    highlights: [
      "282.6 kW power / 700 Nm dual-motor AWD",
      "10–80% DC charge in about 24 minutes on a 350kW charger",
      "Trinity Panoramic Display and 10 airbags",
      "ADAS Level 2 with 27 autonomous features, Kia Connect 2.0 with OTA updates",
    ],
  },
  {
    name: "Syros EV",
    slug: slugify("Syros EV"),
    type: "Electric SUV",
    category: "Electric",
    // Not yet on sale — Kia has opened pre-booking but has not published an
    // ex-showroom price. formatINR() shows "Coming Soon" for priceINR: 0
    // rather than a fabricated figure.
    price: "",
    priceINR: 0,
    engine: "Permanent Magnet Synchronous Motor, high-voltage battery",
    transmission: "Single-Speed Reduction Gear",
    fuel: "Electric",
    blurb: "Superior beyond belief, Kia's newest electric SUV, now open for pre-booking.",
    cta: "Explore the Syros EV",
    image: modelShot.syrosEv,
    alt: "Kia Syros EV electric SUV, official product shot",
    colors: kiaColours(modelShot.syrosEv, [
      ["Frost Blue", "#6E93A8", "ebb"],
      ["Ivory Silver Gloss", "#C7C9C7", "isg"],
      ["Aurora Black Pearl", "#14151A", "abp"],
      ["Glacier White Pearl", "#F4F4F2", "gwp"],
      ["Gravity Grey", "#4B4E52", "kdg"],
      ["Magma Red", "#C0392B", "ar2"],
      ["Pewter Olive", "#6E6B5E", "ewe"],
    ]),
    seating: "5",
    mileage: "Best-in-segment 526 km range (ARAI MIDC-Full, claimed)",
    bootSpace: "465 litres",
    highlights: [
      "Best-in-segment 171 PS power and 526 km certified range",
      "10–80% DC fast charging in approximately 39 minutes",
      "76.20 cm (30\") Trinity Panoramic Display with Kia Connect 2.0 and OTA updates",
      "Lifetime battery warranty and Assured Buyback programme",
    ],
  },
];

export const trust = [
  {
    icon: "shield",
    title: "Authorised Kia Dealer",
    text: "Every car, part and accessory is 100% genuine, sourced directly from Kia India.",
  },
  {
    icon: "users",
    title: "Part of the Gautam Modi Group",
    text: "Backed by a group with decades of authorised multi-brand dealership experience.",
  },
  {
    icon: "network",
    title: "Showrooms & Service, Close to You",
    text: "Sales showrooms in Bhiwandi and Dombivli, plus a dedicated service department on the Kalyan–Bhiwandi Road.",
  },
  {
    icon: "rupee",
    title: "Easy Finance & Exchange",
    text: "Flexible EMI plans, fast loan approvals, and instant exchange value on your old car.",
  },
  {
    icon: "wrench",
    title: "Expert Service",
    text: "Trained technicians who work with genuine Kia parts to keep your car running smoothly.",
  },
];

export type Offer = {
  title: string;
  amount: string;
  caption: string;
  icon: string;
};

export const offers: Offer[] = [
  {
    title: "Cash Discount",
    amount: "₹50,000",
    caption: "Instant savings on select Kia models this season.",
    icon: "gift",
  },
  {
    title: "Exchange Bonus",
    amount: "₹40,000",
    caption: "Extra value when you trade in your old car.",
    icon: "car",
  },
  {
    title: "Corporate Benefit",
    amount: "₹40,000",
    caption: "Special pricing for corporate and fleet buyers.",
    icon: "users",
  },
];

export const services = [
  {
    icon: "wrench",
    title: "Periodic Maintenance",
    text: "Manufacturer-recommended service schedules, done right the first time.",
  },
  {
    icon: "shield",
    title: "Kia Genuine Parts",
    text: "Only authentic, warranty-backed Kia parts, never aftermarket substitutes.",
  },
  {
    icon: "truck",
    title: "Free Pickup & Drop",
    text: "We collect your car for service and drop it back, at no extra cost.",
  },
  {
    icon: "road",
    title: "Roadside Assistance",
    text: "Stuck on the road? Our service team is a call away.",
  },
  {
    icon: "badge",
    title: "Extended Warranty",
    text: "Extend your protection well beyond the standard three-year cover.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
};

/* NOTE: demo reviews with stock avatars. Replace with real, attributable
   customer reviews before launch; do not build AggregateRating schema
   from these placeholder figures. */
export const testimonials: Testimonial[] = [
  {
    name: "Rahul Mehta",
    role: "Seltos owner",
    rating: 5,
    text: "The team walked me through every variant without any pressure. Delivery was on time and the car was spotless.",
    avatar: "/testimonials/avatar-1.jpg",
  },
  {
    name: "Sneha Iyer",
    role: "Sonet owner",
    rating: 5,
    text: "Booking to delivery was smooth and completely transparent. The finance desk got me a rate I did not expect.",
    avatar: "/testimonials/avatar-2.jpg",
  },
  {
    name: "Amit Verma",
    role: "Carens owner",
    rating: 5,
    text: "Service here is genuinely a step above. They explained the work, shared photos and stuck to the estimate.",
    avatar: "/testimonials/avatar-3.jpg",
  },
  {
    name: "Priya Nair",
    role: "Syros owner",
    rating: 5,
    text: "As a first-time buyer I had endless questions. They were patient and helped me pick the right car for my budget.",
    avatar: "/testimonials/avatar-4.jpg",
  },
  {
    name: "Karan Malhotra",
    role: "Carens Clavis owner, Bhiwandi",
    rating: 5,
    text: "The Carens Clavis handover was flawless. Great attention to detail and no last-minute surprises on the on-road price.",
    avatar: "/testimonials/avatar-5.jpg",
  },
  {
    name: "Deepa Rao",
    role: "Carnival owner, Bhiwandi",
    rating: 5,
    text: "Serviced my Carnival at the Bhiwandi centre. Quick, courteous, and the free pickup and drop saved me a whole day.",
    avatar: "/testimonials/avatar-6.jpg",
  },
  {
    name: "Farhan Shaikh",
    role: "EV6 owner, Dombivli",
    rating: 5,
    text: "Booked from the Kalyan–Bhiwandi Road showroom. They were upfront about the waiting period and kept me updated the whole way.",
    avatar: "/testimonials/avatar-7.jpg",
  },
  {
    name: "Anjali Desai",
    role: "Seltos owner, Bhiwandi",
    rating: 5,
    text: "Loved how patient they were with a first-time buyer. The finance options were explained clearly, no jargon.",
    avatar: "/testimonials/avatar-8.jpg",
  },
];

export const faqData = [
  {
    question: "How do I book a test drive at Modi Kia?",
    answer:
      "You can book a test drive online using the form on this page, or by calling us on 88790 20761. Once you share your details, our team will confirm your preferred date, time and location, at our showroom or your home.",
  },
  {
    question: "Do you offer car finance and exchange?",
    answer:
      "Yes. We work with leading banks to offer flexible EMI plans and quick loan approvals, plus instant exchange value on your existing car when you buy your next Kia.",
  },
  {
    question: "Can I book my car service online?",
    answer:
      "Yes. Use Book a Service from the menu or footer to choose your model, preferred service slot and a convenient date, and our team will call to confirm.",
  },
  {
    question: "What is the warranty period on a new Kia car?",
    answer:
      "New Kia cars come with a standard 3-year/unlimited-km manufacturer warranty (electric-vehicle high-voltage batteries additionally carry an 8-year/1,60,000km cover), with optional extended warranty plans available. Our sales team can confirm exact coverage for your chosen model.",
  },
  {
    question: "Do you accept trade-ins for old cars?",
    answer:
      "Yes. We evaluate your current vehicle and offer an exchange bonus you can apply against your new Kia's on-road price.",
  },
  {
    question: "Which areas does Modi Kia serve?",
    answer:
      "We have sales showrooms in Bhiwandi (Kalyan–Bhiwandi Road) and Dombivli (Kalyan-Shilphata Road), and a service department on the Kalyan–Bhiwandi Road, serving Bhiwandi, Dombivli and the surrounding region.",
  },
  {
    question: "What documents do I need to buy a car from Modi Kia?",
    answer:
      "You will typically need photo ID, address proof, passport-size photographs and PAN details. Our team will guide you through the exact paperwork for cash or finance purchases.",
  },
];

export type Blog = {
  slug: string;
  date: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  excerpt: string;
  readTime: string;
};

export const blogs: Blog[] = [
  {
    slug: "seltos-vs-syros-which-kia-suv-suits-your-budget",
    date: "24 Jun 2026",
    category: "Models",
    title: "Seltos vs Syros: which Kia SUV suits your budget?",
    image: "/showrooms/seltos-blog.jpg",
    alt: "Kia Seltos exterior styling",
    excerpt:
      "Two of Kia's most popular SUVs, separated by size, price and tech. We compare variants, features and real-world value to help you pick the right one.",
    readTime: "6 min read",
  },
  {
    slug: "why-the-carens-clavis-is-the-family-road-trip-mpv-to-beat",
    date: "18 Jun 2026",
    category: "Ownership",
    title: "Why the Carens Clavis is the family road-trip MPV to beat",
    image: "/showrooms/carens-clavis-blog.jpg",
    alt: "Kia Carens Clavis on a family road trip",
    excerpt:
      "ADAS Level 2, a panoramic sunroof and genuine 7-seat flexibility make the Carens Clavis our pick for comfortable, stress-free family journeys.",
    readTime: "5 min read",
  },
  {
    slug: "5-monsoon-car-care-tips-every-kia-owner-should-know",
    date: "09 Jun 2026",
    category: "Service",
    title: "5 Monsoon Car-Care Tips Every Kia Owner Should Know",
    image: "/showrooms/monsoon-blog.jpg",
    alt: "Kia Sonet SUV in the monsoon, car-care tips",
    excerpt:
      "From tyre tread to wiper blades and underbody checks, a quick monsoon prep checklist to keep your Kia safe and reliable through the rains.",
    readTime: "4 min read",
  },
  {
    slug: "ev6-or-ev9-choosing-your-first-kia-electric-suv",
    date: "02 Jun 2026",
    category: "Electric",
    title: "EV6 or EV9: choosing your first Kia electric SUV",
    image: "/showrooms/ev-mobility-blog.jpg",
    alt: "Kia EV6 electric SUV parked outdoors",
    excerpt:
      "Kia's two flagship electrics serve very different buyers. We break down range, charging, seating and price to help you decide where to start.",
    readTime: "7 min read",
  },
  {
    slug: "petrol-diesel-or-turbo-which-seltos-engine-is-right-for-you",
    date: "26 May 2026",
    category: "Ownership",
    title: "Petrol, diesel or turbo: which Seltos engine is right for you?",
    image: "/showrooms/seltos-blog.jpg",
    alt: "Kia Seltos engine options compared",
    excerpt:
      "The Seltos offers three distinct powertrains. Here's how to match your daily driving, highway runs and fuel budget to the right engine.",
    readTime: "6 min read",
  },
  {
    slug: "how-often-should-you-really-service-your-kia",
    date: "14 May 2026",
    category: "Service",
    title: "How often should you really service your Kia?",
    image: "/showrooms/service-blog.jpg",
    alt: "Kia Carens scheduled maintenance",
    excerpt:
      "Kia's service schedule explained in plain terms, what happens at each interval, what to watch for, and how to avoid unnecessary bills.",
    readTime: "5 min read",
  },
  {
    slug: "home-charging-your-kia-ev-what-you-need-to-know",
    date: "03 May 2026",
    category: "Electric",
    title: "Home charging your Kia EV: what you need to know",
    image: "/showrooms/home-charging-blog.png",
    alt: "Kia electric vehicle charging at home",
    excerpt:
      "A practical guide to home wall-box chargers, socket charging, installation and running costs for Kia EV owners in apartments and independent houses.",
    readTime: "6 min read",
  },
  {
    slug: "the-carnival-limousine-is-a-luxury-mpv-right-for-your-family",
    date: "21 Apr 2026",
    category: "Models",
    title: "Kia Carnival Limousine: Redefining luxury travel in Bhiwandi",
    image: "/showrooms/carnival-blog.jpg",
    alt: "Kia Carnival Limousine luxury MPV",
    excerpt:
      "First-class rear seats, 33 ADAS features and a whisper-quiet cabin. We look at who the Carnival Limousine is really built for.",
    readTime: "5 min read",
  },
];

export type Location = {
  name: string;
  type: "Showroom" | "Service Centre";
  city: string;
  address: string;
  phone: string;
  image: string;
  mapsUrl: string;
};

/* Real Modi Kia outlets (source: gautammodigroup.com/business — the
   group's official business directory; names below are copied verbatim
   from that listing). The Pimpalghar (Bhiwandi) location houses both the
   showroom and the service department, so it is listed once as a
   Showroom and once as a Service Centre (same address).
   Photos are the real branch photography published for each individual
   listing on gautammodigroup.com/business. */
export const locations: Location[] = [
  {
    name: "Kia Car Showroom Pimpalghar",
    type: "Showroom",
    city: "Bhiwandi",
    address: "Ground Floor, Kalyan - Bhiwandi Rd, Near Mahanagar CNG Station, Sapna Industrial Estate, Pimpalghar, Bhiwandi, Maharashtra 421302",
    phone: "88790 20761",
    image: "/locations/kia-pimpalghar-showroom-v2.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Kalyan%20-%20Bhiwandi%20Rd%2C%20Near%20Mahanagar%20CNG%20Station%2C%20Sapna%20Industrial%20Estate%2C%20Pimpalghar%2C%20Bhiwandi%2C%20Maharashtra%20421302&travelmode=driving",
  },
  {
    name: "Kia Car Showroom Dombivli",
    type: "Showroom",
    city: "Dombivli",
    address: "B-1, Parvati Heights, Shop No 02, Ground Floor, Kalyan-Shilphata Rd, Padle, Dombivli, Thane, Maharashtra 421204",
    phone: "88790 20761",
    image: "/locations/kia-dombivli-showroom-v2.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=B-1%2C%20Parvati%20Heights%2C%20Shop%20No%2002%2C%20Ground%20Floor%2C%20Kalyan-Shilphata%20Rd%2C%20Padle%2C%20Dombivli%2C%20Thane%2C%20Maharashtra%20421204&travelmode=driving",
  },
  {
    name: "Kia Service Centre Pimpalghar",
    type: "Service Centre",
    city: "Bhiwandi",
    address: "Ground Floor, Kalyan - Bhiwandi Rd, Near Mahanagar CNG Station, Sapna Industrial Estate, Pimpalghar, Bhiwandi, Maharashtra 421302",
    phone: "88790 20761",
    image: "/locations/kia-pimpalghar-service-v2.webp",
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Kalyan%20-%20Bhiwandi%20Rd%2C%20Near%20Mahanagar%20CNG%20Station%2C%20Sapna%20Industrial%20Estate%2C%20Pimpalghar%2C%20Bhiwandi%2C%20Maharashtra%20421302&travelmode=driving",
  },
];

/* Curated subset for the footer's "Popular Cars" column, so it doesn't
   list every model. */
const popularNames = ["Seltos", "Sonet", "Syros", "Carens", "Carnival", "EV6"];
export const popularCars = popularNames
  .map((n) => cars.find((c) => c.name === n))
  .filter((c): c is Car => Boolean(c));

export const testDriveImage = "/showrooms/home-test-drive.jpg";
export const serviceHeroImage = "/showrooms/kia-service-hero.webp";
export const carModels = cars.map((c) => c.name);
export const cityOptions = ["Bhiwandi", "Dombivli"];
/* Friendlier display labels for cityOptions in location dropdowns, while
   the underlying value stays the plain city name used for matching
   against `locations[].city` and for schema addressLocality. */
export const cityLabels: Record<string, string> = {
  Bhiwandi: "Kalyan-Bhiwandi Road",
  Dombivli: "Dombivli",
};
export const serviceCentres = locations.filter((l) => l.type === "Service Centre");
