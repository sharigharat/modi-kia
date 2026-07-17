import type { Blog } from "./data";

export type BlogContent = {
  introduction: string;
  sections: { heading: string; body: string }[];
  conclusion: string;
};

export function getBlogContent(blog: Blog): BlogContent {
  return blogDetails[blog.slug] ?? fallbackContent(blog);
}

function fallbackContent(blog: Blog): BlogContent {
  return {
    introduction: blog.excerpt,
    sections: [
      {
        heading: blog.title,
        body: `This article is being updated with the latest information. For now, our team at Modi Kia is happy to answer any questions you have about this topic; just call us on ${"88790 20761"} or visit our Bhiwandi or Dombivli showroom.`,
      },
    ],
    conclusion:
      "Check back soon for the complete guide, or speak with our team today for personal advice.",
  };
}

const blogDetails: Record<string, BlogContent> = {
  /* ---- 1. Seltos vs Syros ---- */
  "seltos-vs-syros-which-kia-suv-suits-your-budget": {
    introduction:
      "If you are walking into the Modi Kia showroom in Bhiwandi or Dombivli with a budget of roughly Rs. 8 to 15 lakh, there is a good chance you are asking this exact question: Seltos or Syros? Both wear the Kia badge, both score a 5-star BNCAP safety rating, and both pack modern tech that punches above their price tag. But they are not the same SUV, and picking the wrong one can leave you with a car that feels either too basic or too expensive for your daily life. This guide breaks down the real differences, not the brochure headlines, so you can choose with confidence.",
    sections: [
      {
        heading: "Size and road presence: how different are they?",
        body: "The Seltos is physically the larger car. At just over 4.3 metres long and nearly 1.8 metres wide, it has a footprint that fills a parking bay and commands attention on the road. The Syros, at roughly 3.9 metres, is more compact and easier to thread through Bhiwandi's narrow lanes and crowded Dombivli streets. If your daily route includes tight apartment parking or congested market roads, the Syros will feel more at home. If you frequently drive on the highway and want the road presence of a bigger SUV, the Seltos is the natural choice.",
      },
      {
        heading: "Price and variants: what your money gets you",
        body: "The Syros starts at approximately Rs. 8.42 lakh (ex-showroom), making it a strong value proposition for buyers who want a modern Kia SUV without stretching into Seltos money. The Seltos begins around Rs. 10.99 lakh. That Rs. 2.5 lakh difference is significant; it could cover a couple of years of fuel, a comprehensive insurance upgrade, or an extended warranty. However, the Seltos offers more engine choices, including the potent 1.5L Turbo GDi petrol (160 PS), and a broader variant spread that includes the range-topping X-Line with ADAS Level 2+. The Syros counters with a very well-equipped cabin, including the Trinity Panoramic Display and Kia Connect 2.0, even on mid-spec trims. Our team at Modi Kia can walk you through the on-road price breakdown for both models so there are no surprises.",
      },
      {
        heading: "Engines, fuel type and real-world mileage",
        body: "Both SUVs offer petrol and diesel options, but the engine line-ups are tuned differently. The Seltos gets three engines, 1.5L Smartstream petrol (115 PS), 1.5L Turbo GDi petrol (160 PS), and 1.5L CRDi diesel (116 PS), paired with manual, IVT, iMT, DCT and automatic transmissions depending on the variant. The Syros uses a 1.0L turbo petrol (120 PS) and a 1.5L diesel (116 PS). In the real world, diesel variants of both SUVs return excellent highway mileage (18–21 kmpl), while the turbo petrols are spirited but thirstier around town. If fuel efficiency is your top concern, a diesel variant in either model is the way to go. Our Bhiwandi service team regularly sees both models in for periodic maintenance, and owners consistently report that the diesel engines deliver the best balance of power and economy for mixed driving in the Bhiwandi belt.",
      },
      {
        heading: "Interior, features and the family test",
        body: "Both cabins are modern and well-built, but the feeling behind the wheel is different. The Seltos feels like a premium SUV, wider seats, more shoulder room, and the option of a dual-pane panoramic sunroof and Bose 8-speaker audio. The Syros feels clever and space-efficient; the rear seat legroom is genuinely impressive for a sub-4-metre SUV, and the boot (at 465 litres) is larger than many cars in the segment above. For a family of four in Bhiwandi or Dombivli, the Syros does the job with ease. For a family that frequently carries five adults and luggage, the Seltos's extra width and larger boot (447 litres, but a more usable shape) make a real difference.",
      },
      {
        heading: "The verdict: which one should you pick?",
        body: "Choose the Syros if your priority is value, easy city manoeuvrability, and a feature-loaded cabin at a lower price point. Choose the Seltos if you want the larger footprint, more engine choices (especially the turbo petrol), and the full ADAS safety suite. Both are outstanding SUVs, and both are available for a test drive at Modi Kia's Bhiwandi and Dombivli showrooms. The best way to decide is to drive them back-to-back on the same day; we are happy to arrange that.",
      },
    ],
    conclusion:
      "Still undecided? Visit Modi Kia on the Kalyan–Bhiwandi Road or at our Dombivli showroom, and our team will help you compare the exact variant and on-road price that fits your budget. Call 88790 20761 to book a back-to-back test drive of the Seltos and Syros.",
  },

  /* ---- 2. Carens Clavis road-trip MPV ---- */
  "why-the-carens-clavis-is-the-family-road-trip-mpv-to-beat": {
    introduction:
      "Planning a family road trip from Bhiwandi to Lonavala, or a long-weekend escape to Mahabaleshwar? The car you pick makes the difference between a journey everyone remembers fondly and one where the kids are cranky before you cross the first toll plaza. The Kia Carens Clavis has quietly become the MPV that family buyers in the Bhiwandi–Dombivli region gravitate towards, and for good reason. Here is why it might be the perfect road-trip companion for your family.",
    sections: [
      {
        heading: "Seven real seats, zero compromises",
        body: "Many MPVs promise seven seats but deliver a third row that only works for children. The Carens Clavis is different. With a wheelbase of 2,780 mm and smart packaging, it offers genuine adult-usable space in all three rows. The second-row captain seats (on higher trims) slide and recline, and the one-touch tumble function makes third-row access effortless, even for grandparents. Boot space with all rows up is competitive for the segment, and with the third row folded flat, you get enough room for a week's worth of luggage for the whole family.",
      },
      {
        heading: "ADAS Level 2 on an Indian MPV is a game-changer",
        body: "Long highway drives can be tiring, and fatigue is a real safety risk. The Carens Clavis brings ADAS Level 2 with 20 autonomous features, including adaptive cruise control, lane-keep assist, forward collision avoidance, and high-beam assist, to a price point where this kind of tech was unheard of a few years ago. On the Mumbai–Pune Expressway or the Kalyan–Nashik Highway, these features genuinely reduce driver stress. The system is calibrated for Indian conditions, meaning it is not overly intrusive in stop-and-go traffic but delivers real assistance on open roads.",
      },
      {
        heading: "Comfort features that your family will actually use",
        body: "Beyond the headline safety tech, the Carens Clavis is packed with features that make long journeys feel shorter. The dual-pane panoramic sunroof floods the cabin with light and keeps passengers from feeling boxed in. The BOSE 8-speaker audio system provides crisp sound even at highway speeds. The Smart Pure Air Purifier with AQI display is a thoughtful touch given Maharashtra's variable air quality. Rear AC vents with dedicated controls keep all three rows comfortable. And with Kia Connect, you can pre-cool the cabin on a hot afternoon before anyone steps inside.",
      },
      {
        heading: "Powertrains built for the long haul",
        body: "Under the bonnet, the Carens Clavis offers three engine options: a 1.5L SmartStream turbo petrol, a 1.5L naturally-aspirated petrol, and a 1.5L CRDi diesel. For frequent highway users, the diesel with the 6-speed automatic is the pick of the range; it delivers strong mid-range torque for easy overtaking and excellent cruising efficiency. The turbo petrol paired with the 7-speed DCT is the enthusiast's choice, with quick, smooth gearshifts and plenty of highway punch. Either way, the Clavis rides on a suspension setup tuned for Indian road conditions, soaking up broken tarmac and expansion joints with composure.",
      },
      {
        heading: "Real-world ownership: what Modi Kia customers say",
        body: "We speak to Carens Clavis owners every day at our Bhiwandi service centre, and the feedback is consistent: this MPV delivers on its promise of comfort and space. Owners report highway fuel economy of around 17–19 kmpl from the diesel and 13–15 kmpl from the turbo petrol, depending on driving style. Service intervals are reasonable, and the availability of genuine Kia parts through our service department means maintenance is predictable. For families who do two or three long road trips a year plus daily city runs, the Clavis has proven to be a dependable and enjoyable ownership proposition.",
      },
    ],
    conclusion:
      "The Kia Carens Clavis is not just another MPV; it is a thoughtfully engineered family vehicle that prioritises safety, space and comfort in equal measure. See it in person at Modi Kia Bhiwandi or Dombivli, and take your family along for the test drive, because the second and third rows are where this car truly shines. Call 88790 20761 to book your test drive.",
  },

  /* ---- 3. Monsoon car-care tips ---- */
  "5-monsoon-car-care-tips-every-kia-owner-should-know": {
    introduction:
      "Monsoon in the Bhiwandi–Dombivli belt is not just heavy rain; it is waterlogged roads, reduced visibility, and the kind of relentless dampness that can take a toll on any car. Whether you drive a Kia Seltos, Sonet, Carens or an EV, a few preventive checks before and during the rainy season can save you from breakdowns, expensive repairs and unnecessary stress. Here are five practical tips every Kia owner should follow.",
    sections: [
      {
        heading: "1. Tyre tread and pressure: your only contact with the road",
        body: "Worn tyres and wet roads are a dangerous combination. The legal minimum tread depth in India is 1.6 mm, but for monsoon safety we recommend at least 3 mm. Check all five tyres (including the spare) for uneven wear, cracks or bulges. Tyre pressure also drops slightly in cooler, wet conditions; keep them inflated to the recommended PSI (you will find the sticker on the driver's door sill of your Kia). Our Modi Kia service centre in Bhiwandi can check your tyres and rotate them if needed during a routine visit.",
      },
      {
        heading: "2. Wiper blades: replace them before they fail",
        body: "Wiper blades are consumables that degrade faster in India's heat and dust. If your wipers leave streaks, chatter across the glass, or miss patches even after cleaning, replace them. A pair of genuine Kia wiper blades costs a fraction of what a single monsoon mishap could. Also, top up your windscreen washer fluid; monsoon spray from other vehicles combined with a dirty windscreen can reduce visibility to near-zero in seconds. Avoid using plain water; a proper washer fluid cuts through the oily film that builds up on the glass.",
      },
      {
        heading: "3. Brakes and underbody: the hidden risks",
        body: "Water and mud can accelerate corrosion on brake discs, callipers and the underbody. If you hear a grinding noise when braking after driving through standing water, it is usually surface rust on the discs; a few normal braking applications should clear it. However, if the noise persists, have your brakes inspected. The underbody is also vulnerable: mud and debris can trap moisture against metal components. A monsoon underbody check and anti-rust treatment at the Modi Kia service centre is a wise investment, especially if you regularly drive on waterlogged roads near the Bhiwandi creek or the Kalyan-Shilphata stretch.",
      },
      {
        heading: "4. Electricals and battery: dampness is the enemy",
        body: "High humidity can cause electrical gremlins, corroded battery terminals, moisture in connectors, and fogging inside headlamp or tail-lamp housings. Inspect your battery terminals for white or bluish corrosion; if you see any, a service technician can clean and protect them. Check that all lights, headlamps, fog lamps, indicators and brake lights, are working, because visibility is your best defence in a downpour. If you drive a Kia EV like the EV6, EV9 or Carens Clavis EV, the high-voltage battery and charging port are sealed against water ingress (IP-rated), but it is still worth keeping the charge port area clean and dry.",
      },
      {
        heading: "5. Emergency kit: be prepared before you need it",
        body: "Every car should carry a basic monsoon emergency kit, especially if you travel on highways like the Mumbai–Nashik or Kalyan–Ahmednagar routes. A reflective warning triangle, a working torch, a raincoat, a microfiber cloth for interior fogging, and the Modi Kia roadside assistance number saved on your phone (call 88790 20761) are the bare minimum. Keep a fully charged power bank in the glovebox. And if you do get stuck in deep water, do not attempt to restart the engine; call for assistance immediately. Restarting a flooded engine can cause hydrolock, which is an expensive and avoidable repair.",
      },
    ],
    conclusion:
      "A little monsoon prep goes a long way. Book a pre-monsoon check-up at the Modi Kia service centre in Bhiwandi; our technicians will inspect your tyres, brakes, wipers, battery, lights and underbody so you can drive through the rains with confidence. Call 88790 20761 or use the Book a Service form on our website.",
  },

  /* ---- 4. EV6 vs EV9 ---- */
  "ev6-or-ev9-choosing-your-first-kia-electric-suv": {
    introduction:
      "Kia's electric SUV line-up in India starts with two very different cars: the EV6, a sporty, five-seat crossover, and the EV9, a three-row flagship that redefines what an electric family vehicle can be. With on-road prices in Bhiwandi stretching from roughly Rs. 70 lakh to Rs. 1.4 crore, neither is a casual purchase. This guide breaks down the real differences so you can decide which one suits your life, and your garage.",
    sections: [
      {
        heading: "The fundamental difference: five seats vs six seats",
        body: "The EV6 is a five-seater with a coupe-like roofline, a driver-focused cockpit, and a genuinely sporty character. It is designed for someone who enjoys driving and wants an electric car that feels more like a grand tourer than an SUV. The EV9 is a six-seater (captain chairs in the second row) with three rows, a flat floor, and limousine-like space in the rear. If your household has more than four people, or you frequently carry passengers, the EV9 is the practical choice. If it is mostly you and one passenger, or a small family, the EV6 offers a more engaging experience.",
      },
      {
        heading: "Range and charging: close, but not identical",
        body: "The EV6 (84 kWh battery, AWD) claims up to 650+ km of range on a full charge, while the EV9 claims up to 561 km (ARAI MIDC). In real-world driving around Bhiwandi and on highway runs to Pune or Mumbai, both deliver around 450–500 km with sensible driving. Both use Kia's 800V ultra-fast charging architecture: the EV6 can charge from 10–80% in about 18 minutes on a 350 kW DC charger, while the EV9 takes about 24 minutes. At home, a 7.2 kW wall-box charger will replenish either car overnight. Our team at Modi Kia can connect you with certified installers for a home charging setup before your car arrives.",
      },
      {
        heading: "Performance: sprinter vs cruiser",
        body: "The EV6 AWD produces 605 Nm of torque and can switch between AWD and RWD in 0.4 seconds depending on driving conditions; it feels quick, planted and surprisingly agile for a car of its size. The EV9 AWD produces 700 Nm and 282.6 kW, but it weighs over 2.6 tonnes, so its performance is more about effortless, silent thrust than corner-carving agility. Think of the EV6 as a sporty executive express and the EV9 as a luxurious, high-tech lounge on wheels. Both will out-accelerate most petrol and diesel cars at the traffic light, but they deliver that speed in very different ways.",
      },
      {
        heading: "Tech and cabin experience",
        body: "Both cars feature Kia's panoramic curved display, dual 12.3-inch screens in the EV6 and a Trinity Panoramic Display in the EV9. Both come with Kia Connect with OTA updates, AR head-up displays, premium audio (Meridian in the EV6, Bose in the EV9), and comprehensive ADAS suites. The EV9 adds a few flagship touches: 10 airbags (vs 8 in the EV6), powered second-row captain seats with ventilation and heating, and a more spacious third-row experience. The EV6, meanwhile, has a more cockpit-like driving position and feels more connected to the road.",
      },
      {
        heading: "Cost of ownership: beyond the sticker price",
        body: "Both cars benefit from significantly lower running costs compared to their petrol or diesel equivalents. Electricity costs roughly Rs. 1–2 per km for home charging, versus Rs. 7–10 per km for a comparable diesel SUV. Maintenance is also simpler: no oil changes, fewer moving parts, and regenerative braking that reduces brake wear. Kia's 8-year / 1,60,000 km high-voltage battery warranty provides long-term peace of mind. The EV9's higher purchase price is offset by its greater versatility if you genuinely need three rows. If you do not, the EV6 offers the same core EV experience for significantly less money.",
      },
    ],
    conclusion:
      "The EV6 is the choice for driving enthusiasts and small families who want a premium electric experience without the bulk of a three-row SUV. The EV9 is for those who need maximum space, the latest tech, and the prestige of a flagship. Both are available for viewing at Modi Kia Bhiwandi; we recommend a test drive of both to feel the difference firsthand. Call 88790 20761 to schedule yours.",
  },

  /* ---- 5. Seltos engine guide ---- */
  "petrol-diesel-or-turbo-which-seltos-engine-is-right-for-you": {
    introduction:
      "The Kia Seltos offers one of the widest powertrain ranges in its segment: a naturally-aspirated 1.5L petrol, a turbocharged 1.5L GDi petrol, and a 1.5L CRDi diesel, each available with different transmissions. Choosing the right one is about matching the engine to your driving patterns, not just your budget. Here is a practical guide from the team at Modi Kia, based on what we see customers in Bhiwandi and Dombivli actually need.",
    sections: [
      {
        heading: "1.5L Smartstream petrol (115 PS): the sensible daily driver",
        body: "This is the engine for buyers who prioritise smoothness, refinement and low running costs. Paired with either a 6-speed manual or an IVT (Intelligent Variable Transmission), it delivers a relaxed driving experience that is perfect for city commutes and occasional highway runs. The IVT is particularly impressive in stop-and-go traffic; there are no gear shifts to feel, just seamless acceleration. Fuel economy is around 12–14 kmpl in the city and 16–18 kmpl on the highway. If your daily drive is within Bhiwandi with short highway stints, this engine does everything you need without any drama.",
      },
      {
        heading: "1.5L Turbo GDi petrol (160 PS): the enthusiast's choice",
        body: "This is the engine that puts a smile on your face. With 160 PS and 253 Nm of torque, the turbo petrol transforms the Seltos into a genuinely quick SUV, 0–100 km/h in the mid-8-second range. Available with a 6-speed iMT (clutchless manual) or a 7-speed DCT, the turbo petrol is the pick for buyers who enjoy driving and frequently use highways. The DCT is fast-shifting and responsive in Sport mode, while the iMT offers a more engaged experience without a clutch pedal. The trade-off is fuel economy: expect 9–11 kmpl in the city and 13–15 kmpl on the highway. If you love to drive and are willing to pay a bit more at the pump, this is the engine for you.",
      },
      {
        heading: "1.5L CRDi diesel (116 PS): the long-distance champion",
        body: "The diesel Seltos is the range king. With 250 Nm of torque available from low revs, it pulls strongly without needing to be revved hard, making it effortless on highways and efficient in the city. Available with a 6-speed manual or a 6-speed automatic, the diesel returns 16–19 kmpl in the city and 20–23 kmpl on the highway in real-world conditions, numbers that petrol variants can only dream of. If you drive more than 15,000 km a year, or regularly do Mumbai–Pune or Kalyan–Nashik runs, the diesel will save you significant money over time, even accounting for the slightly higher purchase price and service costs. Our service team in Bhiwandi sees diesel Seltos models regularly hitting major service intervals with no issues; they are built for the long haul.",
      },
      {
        heading: "Transmission choices: manual, iMT, IVT, DCT or automatic?",
        body: "The transmission you choose is as important as the engine. The 6-speed manual is robust and efficient, ideal if you enjoy shifting yourself. The IVT (petrol only) is the smoothest option for city driving. The 7-speed DCT (turbo petrol) offers quick, sporty shifts. The 6-speed automatic (diesel) is a conventional torque-converter unit that is reliable and smooth, though not as quick-shifting as the DCT. The 6-speed iMT (turbo petrol) is a clever middle ground: you shift gears manually but there is no clutch pedal, great for those who want involvement without left-leg fatigue in traffic.",
      },
      {
        heading: "Making the final call: a quick decision matrix",
        body: "If your monthly running is under 1,000 km and mostly in the city: pick the 1.5L petrol with IVT. If you love driving and want the quickest Seltos: pick the 1.5L turbo petrol with DCT. If you drive over 1,500 km a month with significant highway use: pick the 1.5L diesel with automatic. The best way to know for sure is to test drive all three at Modi Kia; we have all engine variants available for back-to-back comparison drives, so you can feel the difference yourself before committing.",
      },
    ],
    conclusion:
      "There is no wrong Seltos engine, only the wrong match for your driving life. Visit Modi Kia on the Kalyan–Bhiwandi Road or our Dombivli showroom, and let our team help you pick the powertrain that fits your routine and your budget. Call 88790 20761 to book a test drive.",
  },

  /* ---- 6. Kia service intervals ---- */
  "how-often-should-you-really-service-your-kia": {
    introduction:
      "One of the most common questions we hear at the Modi Kia service centre in Bhiwandi is: how often do I really need to bring my car in? The answer is not as simple as a single number; it depends on what you drive, how you drive it, and what Kia's own schedule recommends. Here is a clear, jargon-free breakdown of Kia's service intervals and what happens at each one.",
    sections: [
      {
        heading: "Kia's official service interval: 10,000 km or 12 months",
        body: "For most Kia petrol and diesel models sold in India, Seltos, Sonet, Syros, Carens and Carnival, the manufacturer-recommended service interval is every 10,000 kilometres or 12 months, whichever comes first. This is a standard practice across the industry, designed to catch wear items before they become real problems. If you drive less than 10,000 km in a year (common for city-only cars in Bhiwandi and Dombivli), you should still service your Kia annually. Engine oil degrades over time, not just distance, and brake fluid absorbs moisture even when the car is parked.",
      },
      {
        heading: "What happens at each service interval?",
        body: "The first service (1,000 km or 1 month) is a complimentary inspection, no parts are usually replaced, but our technicians check fluid levels, tighten fasteners and address any initial settling-in concerns. The first paid service (10,000 km or 12 months) includes an engine oil and filter change, a comprehensive inspection, and any software updates. Subsequent services follow a pattern: every 10,000 km or 12 months, with progressively more involved checks and replacements. Major services, typically at 30,000 km, 60,000 km and 90,000 km, include transmission fluid changes, brake fluid replacement, coolant flushing, and detailed underbody and suspension inspections. Our service advisors at Modi Kia Bhiwandi provide a transparent estimate before any work begins, so there are no surprises.",
      },
      {
        heading: "Kia EV service: simpler, but not zero-maintenance",
        body: "If you drive a Kia EV6, EV9 or Carens Clavis EV, the service schedule is less demanding. With no engine oil, spark plugs, fuel filters or timing belts to worry about, the main items are brake fluid, cabin air filter, coolant for the battery thermal management system, and tyre rotation. Kia recommends an annual inspection for EVs, with specific replacement intervals for consumables. The high-voltage battery itself is sealed and maintenance-free for its life, backed by an 8-year / 1,60,000 km warranty.",
      },
      {
        heading: "Signs your Kia needs attention between services",
        body: "Even with regular servicing, certain symptoms warrant an immediate visit. Unusual noises, squealing brakes, knocking from the suspension, or whining from the engine bay, should never be ignored. Warning lights on the instrument cluster (check engine, ABS, battery, TPMS) are your car telling you something is wrong. A drop in fuel economy or a change in how the car drives (pulling to one side, vibrations through the steering wheel, or a rough idle) are also cues that something needs attention. Our team at the Modi Kia service centre is equipped with Kia's diagnostic tools to read and resolve these issues quickly.",
      },
      {
        heading: "Why authorised service matters",
        body: "It can be tempting to save money at an independent garage, but there are real risks. Unauthorised mechanics may use non-genuine parts that do not meet Kia's specifications, potentially affecting safety, performance and fuel economy. They may also lack access to Kia's latest software updates and technical service bulletins, meaning known issues on your model might go unaddressed. More importantly, using non-genuine parts or unauthorised repairs can void your warranty. At the Modi Kia service centre in Bhiwandi, we use only genuine Kia parts, our technicians are factory-trained, and every service is documented, protecting your warranty and your car's resale value.",
      },
    ],
    conclusion:
      "A well-maintained Kia is a safe, efficient and reliable Kia. Stick to the 10,000 km / 12-month schedule, pay attention to what your car is telling you between services, and always use an authorised service centre. Book your next Kia service at Modi Kia Bhiwandi by calling 88790 20761 or using our online booking form; we also offer free pickup and drop for your convenience.",
  },

  /* ---- 7. Home charging Kia EV ---- */
  "home-charging-your-kia-ev-what-you-need-to-know": {
    introduction:
      "If you are considering a Kia EV6, EV9 or Carens Clavis EV, the single most important thing to plan, before you even book the car, is how you will charge it at home. Home charging is where 80–90% of EV charging happens for most owners, and getting it right makes the entire ownership experience effortless. Here is everything you need to know, from equipment and installation to cost and practical tips for apartment dwellers.",
    sections: [
      {
        heading: "Level 1 vs Level 2 charging: what is the difference?",
        body: "Level 1 charging uses a standard 15A, 230V three-pin socket, the kind most Indian homes already have. It delivers roughly 2–3 kW, which adds about 10–15 km of range per hour of charging. For the EV6's 84 kWh battery, a full charge from near-empty takes about 30–35 hours. Level 1 is fine as a backup, but not practical as your primary charging method. Level 2 charging uses a dedicated 7.2 kW wall-box charger installed by a certified electrician, usually on a 32A circuit. It adds about 35–45 km of range per hour, enough to fully charge an EV6 overnight (8–10 hours). This is the setup most EV owners use and what we recommend at Modi Kia.",
      },
      {
        heading: "Installation: what you need at home",
        body: "To install a 7.2 kW wall-box charger, you need a dedicated 32A MCB, proper earthing, and a suitable location, ideally inside a garage or under a covered carport. The charger itself should be IP65-rated for outdoor installation if it will be exposed to rain. Modi Kia works with certified installation partners who will survey your home in Bhiwandi or Dombivli, recommend the right setup, and complete the installation before your car is delivered. The cost of a good wall-box charger plus installation typically ranges from Rs. 40,000 to Rs. 70,000, depending on cable runs, existing electrical infrastructure, and the charger brand.",
      },
      {
        heading: "Running costs: how much does home charging actually cost?",
        body: "At Maharashtra's residential electricity tariff of roughly Rs. 8–10 per unit (kWh), charging an EV6 from 10% to 100% (about 75 kWh) costs approximately Rs. 600–750. That translates to about Rs. 1.20–1.50 per km, roughly one-fifth the per-km cost of a comparable diesel SUV. If your electricity provider offers a time-of-day tariff with lower night-time rates, you can reduce this further by scheduling charging during off-peak hours (a feature built into Kia Connect). Over 15,000 km a year, the fuel savings alone can exceed Rs. 1 lakh compared to a diesel vehicle.",
      },
      {
        heading: "Charging in an apartment: it is possible, with planning",
        body: "Apartment dwellers in Bhiwandi and Dombivli face an additional step: society approval. You will need permission from your housing society's managing committee to install a charger, and in some cases, to draw a dedicated line from your meter to your parking spot. Kia India provides a template letter and support documentation to help with this process. Some societies prefer a shared charging setup rather than individual installations; we have helped several apartment complexes in the region set up communal EV charging. Speak to our team at Modi Kia and we can guide you through the entire process.",
      },
      {
        heading: "Public charging as a backup, not a primary plan",
        body: "Kia's K-Charge app gives you access to over 11,000 charging points across India, and the network is growing every month. However, public charging should be your backup, not your daily routine. DC fast chargers cost Rs. 18–25 per kWh, significantly more than home electricity, and availability can be unpredictable during peak travel periods. A well-planned home charging setup means you leave every morning with a full (or 80%) charge and only use public chargers on long road trips. For the occasional highway run, the expanding network of chargers along the Mumbai–Pune Expressway, Mumbai–Nashik Highway and other major routes makes intercity EV travel increasingly practical.",
      },
    ],
    conclusion:
      "Home charging is the foundation of a happy EV ownership experience. Plan it early, invest in a proper Level 2 charger, and you will enjoy lower running costs, the convenience of a full charge every morning, and the peace of mind that your Kia EV is always ready to go. To discuss home charging or book a test drive of the EV6, EV9 or Carens Clavis EV, call Modi Kia on 88790 20761 or visit our Bhiwandi showroom.",
  },

  /* ---- 8. Carnival Limousine ---- */
  "the-carnival-limousine-is-a-luxury-mpv-right-for-your-family": {
    introduction:
      "The Kia Carnival Limousine sits at the very top of Kia India's line-up, a full-size luxury MPV with a price tag that starts around Rs. 59.45 lakh (ex-showroom) and climbs north of Rs. 70 lakh on-road. It is not a car for everyone, and that is precisely the point. If you are considering one, you are probably asking: does my family genuinely need a vehicle this large, this luxurious, and this expensive? Here is an honest assessment from the team at Modi Kia.",
    sections: [
      {
        heading: "The cabin: what 'luxury MPV' actually means",
        body: "Slide open the powered rear doors and step into the Carnival's second row, and the word 'MPV' suddenly feels inadequate. The two powered captain seats recline, slide, and offer ventilation, heating, and powered leg supports; this is business-class seating, not a people-carrier bench. The third row is a proper 3-seat bench with adult-adequate legroom, not a compromise. With all three rows up, the Carnival still offers useful boot space for weekend luggage. The dual panoramic sunroof, 12-speaker Bose surround sound, 3-zone climate control, and dual panoramic curved display with head-up display complete a cabin that rivals luxury sedans costing significantly more.",
      },
      {
        heading: "ADAS and safety: 33 features, 360° awareness",
        body: "The Carnival Limousine deploys one of the most comprehensive ADAS suites available in any Indian-market vehicle. Forward collision avoidance, blind-spot collision avoidance, rear cross-traffic collision avoidance, lane-keep assist, smart cruise control with stop-and-go, highway driving assist, and a 360° surround-view camera are all standard. For a vehicle that is over 5.1 metres long and nearly 2 metres wide, these features are not luxuries; they are genuine aids that make manoeuvring and highway driving far less stressful. Eight airbags and a reinforced body structure underpin the safety package.",
      },
      {
        heading: "Performance: the 2.2L diesel and 8-speed automatic",
        body: "The Carnival is powered by a 2.2-litre CRDi diesel engine (193 PS / 440 Nm) mated to an 8-speed automatic transmission. This powertrain is not about outright speed; it is about effortless, refined progress. The torque peak arrives low in the rev range and stays strong, meaning the Carnival never feels strained even with a full load of passengers and luggage. The 8-speed automatic is smooth and well-calibrated, keeping the engine in its sweet spot. Ride quality is excellent; the suspension absorbs expansion joints and broken tarmac with a maturity that smaller cars cannot match. On the Mumbai–Pune Expressway or a long-distance family trip, the Carnival is in its element.",
      },
      {
        heading: "Who is the Carnival Limousine really for?",
        body: "The Carnival makes sense for a specific buyer profile: a family that frequently travels with four to seven people, values rear-seat comfort above all else, and is willing to pay for the space, luxury and safety that no SUV under Rs. 1 crore can match. It is also a strong choice for business owners who need a chauffeur-driven vehicle that can transport clients or senior executives in genuine comfort. If you have a large family, a driver, and regularly do intercity trips, or if you simply want the most comfortable vehicle Kia sells in India, the Carnival Limousine is the answer. If your family is four or fewer and you do not have a driver, a top-spec Seltos or EV6 might serve you better for less money.",
      },
      {
        heading: "Owning a Carnival: what to expect",
        body: "The Carnival's running costs reflect its size and positioning. Fuel economy in mixed driving is around 10–13 kmpl, reasonable for a vehicle of this size but higher than smaller Kia models. Insurance, tyres and periodic maintenance are proportionally more expensive, but Kia's standard 3-year / unlimited km warranty provides peace of mind. Resale value for well-maintained Carnival models has been strong in India, reflecting the fact that there are few direct competitors at this price point. At Modi Kia, we stock genuine Carnival parts and our technicians are trained specifically on this flagship model, so service and support are always available.",
      },
    ],
    conclusion:
      "The Kia Carnival Limousine is not for everyone; and that is exactly why it exists. For the family that needs (and appreciates) this level of space, luxury and safety, there is genuinely nothing else on the market that delivers the same package at the same price. Visit Modi Kia Bhiwandi to experience the Carnival in person; the pictures do not do the cabin justice. Call 88790 20761 to book a private viewing and test drive.",
  },
};
