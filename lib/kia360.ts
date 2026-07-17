/* Config for the interactive 360° exterior/interior viewer, sourced from
   kia.com/in's own model pages. Every model publishes its 360° assets
   under a per-model "hash" (a specific trim+colour configuration) with
   two independent sub-folders:
     - exterior/{colourCode}/{01..72}-d.png  — a 72-frame turntable spin
     - interior/{trimCode}/01-d.jpg          — a single 4000×2000
       equirectangular panorama (not a frame sequence) for a drag-to-look-
       around cabin view

   Every hash/colourCode/trimCode pair below was fetched directly from
   each model's own "our-vehicles/{slug}.html" page (not a cross-
   referenced "frequently compared" widget, which can point at a
   different, incompletely-rendered trim) and confirmed live (HTTP 200).
   All 10 models use the same 72-frame exterior sequence, except EV9
   which is missing frame 60 on Kia's own CDN (a genuine gap, not a
   mistake here) — frame 59 is reused in its place. */

const KIA_360_BASE = "https://www.kia.com/content/dam/kia2/in/en/images/360vr";

export type Kia360Config = {
  /** Path segment kia.com uses for this model under /images/360vr/ */
  model: string;
  hash: string;
  exteriorColor: string;
  interiorTrim: string;
};

export const EXTERIOR_FRAME_COUNT = 72;

export const kia360Config: Record<string, Kia360Config> = {
  seltos: { model: "new_seltos", hash: "1mw5k8g1ugg205", exteriorColor: "ebb", interiorTrim: "ofw" },
  sonet: { model: "sonet", hash: "sxw5k2g1uhh078", exteriorColor: "gb2", interiorTrim: "sa" },
  syros: { model: "syros", hash: "8ww5k2g1upp121", exteriorColor: "ebb", interiorTrim: "ewr" },
  carens: { model: "carens", hash: "tyw7d6617dd408", exteriorColor: "mpb", interiorTrim: "wk" },
  "carens-clavis": { model: "clavis", hash: "tyw7k8g1utt202", exteriorColor: "isg", interiorTrim: "wk" },
  "carens-clavis-ev": { model: "clavis_ev", hash: "xyw7zhz7ztt021", exteriorColor: "ism", interiorTrim: "wk" },
  carnival: { model: "carnival", hash: "8tb72hc5jgg000", exteriorColor: "gwp", interiorTrim: "bm1" },
  ev6: { model: "ev6", hash: "asw5ycz7zkk876", exteriorColor: "swp", interiorTrim: "wk" },
  ev9: { model: "ev9", hash: "dow7ybz7zhh325", exteriorColor: "obg", interiorTrim: "rbq" },
  "syros-ev": { model: "syros_ev", hash: "8bw5zhz7zpp078", exteriorColor: "ism", interiorTrim: "ofw" },
};

export function has360(slug: string): boolean {
  return slug in kia360Config;
}

/** 1-indexed frame (1..EXTERIOR_FRAME_COUNT), wrapping around. Pass
 * colourCode to render the currently-selected paint (from car.colors)
 * instead of the model's default — same hash, same frame set, kia.com
 * only ever swaps this one path segment when you pick a different colour. */
export function exteriorFrameUrl(slug: string, frame: number, colourCode?: string): string | undefined {
  const cfg = kia360Config[slug];
  if (!cfg) return undefined;
  let n = ((frame - 1) % EXTERIOR_FRAME_COUNT) + 1;
  if (n <= 0) n += EXTERIOR_FRAME_COUNT;
  if (slug === "ev9" && n === 60) n = 59; // missing on Kia's own CDN
  const padded = String(n).padStart(2, "0");
  return `${KIA_360_BASE}/${cfg.model}/${cfg.hash}/exterior/${colourCode ?? cfg.exteriorColor}/${padded}-d.png`;
}

export function interiorPanoUrl(slug: string): string | undefined {
  const cfg = kia360Config[slug];
  if (!cfg) return undefined;
  return `${KIA_360_BASE}/${cfg.model}/${cfg.hash}/interior/${cfg.interiorTrim}/01-d.jpg`;
}
