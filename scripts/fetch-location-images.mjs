/* One-off script: downloads real Modi Hyundai branch photos from a
   source URL, resizes and compresses them with sharp, and saves them
   into public/locations/ so the site serves them locally and instantly
   instead of depending on a remote CDN at request time. Add new
   entries to `sources` below and run: node scripts/fetch-location-images.mjs */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "locations");

const sources = {
  "santacruz-showroom": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/03/Untitled-design-24-300x150.png",
  "vasai-showroom": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Vasai-Showroom-scaled.png",
  "virar-showroom": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Virar-Showroom-scaled.png",
  "thane-showroom": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Thane-Showroom-scaled.png",
  "h-promise-thane-showroom": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/03/Untitled-design-30.png",
  "wada-showroom": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Service-and-sales-Wada-scaled.png",
  "wada-service": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/03/Untitled-design-24-300x150.png",
  "chunabhatti-service": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Service-Chunnabhatti-scaled.png",
  "thane-service": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Thane-Service-scaled.png",
  "vasai-service": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Vasai-Service-scaled.png",
  "virar-service": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-Virar-Service-scaled.png",
  "thane-raghunath-service": "https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/02/Hyundai-raghunath-nagar-service-scaled.png",
};

await mkdir(outDir, { recursive: true });

for (const [name, url] of Object.entries(sources)) {
  const dest = path.join(outDir, `${name}.webp`);
  process.stdout.write(`Fetching ${name}... `);
  const start = Date.now();
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`FAILED (${res.status})`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const out = await sharp(buf)
    .resize({ width: 640, height: 640, fit: "cover" })
    .webp({ quality: 72 })
    .toBuffer();
  await writeFile(dest, out);
  console.log(
    `${(buf.length / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB in ${Date.now() - start}ms`,
  );
}

console.log("Done.");
