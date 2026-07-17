// Robust URL verifier: follows redirects, classifies each URL as
// GOOD (final 200/206 with image content-type) or BAD (redirect-to-404,
// non-image, etc). Writes a JSON map { url: true/false }.
//
// Usage: node scripts/verify-urls.mjs <input-file> <output-json>
import fs from "node:fs";
import { spawn } from "node:child_process";

const [inFile, outFile] = process.argv.slice(2);
const urls = fs.readFileSync(inFile, "utf8").split("\n").map(s => s.trim()).filter(Boolean);
console.log(`Verifying ${urls.length} URLs ...`);

const CONCURRENCY = 24;
const results = {};
let done = 0;
const start = Date.now();

function check(url) {
  return new Promise((resolve) => {
  // -L follow redirects; -r 0-0 fetch one byte; -w print code+type+effective url
  // --max-time safety so a hanging connection never stalls the batch.
  const args = ["-s", "-L", "-r", "0-0", "--max-time", "20", "-o", "/dev/null",
  "-w", "%{http_code}|%{content_type}|%{url_effective}", url];
  const p = spawn("curl", args, { windowsHide: true });
  let out = "";
  p.stdout.on("data", (d) => { out += d.toString(); });
  p.on("error", () => resolve(false));
  p.on("close", () => {
  const [codeStr, ctype, effUrl] = out.split("|");
  const code = Number(codeStr);
  const isImage = /^image\//i.test(ctype || "");
  // A 206/200 with image content-type is good. A 307->404 final is bad.
  // Redirect to a non-image (HTML 404 page) is bad.
  const good = (code === 200 || code === 206) && isImage;
  results[url] = good;
  done++;
  if (done % 50 === 0) {
  const pct = ((done / urls.length) * 100).toFixed(1);
  console.log(`${done}/${urls.length} (${pct}%) good=${Object.values(results).filter(Boolean).length} elapsed=${((Date.now()-start)/1000).toFixed(0)}s`);
  }
  resolve(good);
  });
  });
}

async function run() {
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
  await Promise.all(urls.slice(i, i + CONCURRENCY).map(check));
  }
  const goodCount = Object.values(results).filter(Boolean).length;
  console.log(`\nDONE: ${goodCount}/${urls.length} good`);
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
}
run();
