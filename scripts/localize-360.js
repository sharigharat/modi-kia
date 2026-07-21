const fs = require('fs');
const path = require('path');
const https = require('https');

const KIA360_FILE = path.join(__dirname, '../lib/kia360.ts');
const DATA_FILE = path.join(__dirname, '../lib/data.ts');
const PUBLIC_DIR = path.join(__dirname, '../public');
const CONCURRENCY = 25; // number of concurrent downloads

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    
    function req(u) {
      https.get(u, (response) => {
        if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location) {
           let redirectUrl = response.headers.location;
           if (!redirectUrl.startsWith('http')) {
             redirectUrl = new URL(redirectUrl, u).toString();
           }
           response.resume();
           return req(redirectUrl);
        }
        
        if (response.statusCode === 200) {
          const file = fs.createWriteStream(dest);
          response.pipe(file);
          file.on('finish', () => file.close(resolve));
        } else {
          response.resume();
          reject(new Error(`Status ${response.statusCode}`));
        }
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }
    
    req(url);
  });
}

async function main() {
  console.log("Parsing config files...");
  
  const kia360Content = fs.readFileSync(KIA360_FILE, 'utf8');
  const configRegex = /"?([a-zA-Z0-9-]+)"?:\s*{\s*model:\s*"([^"]+)",\s*hash:\s*"([^"]+)",\s*exteriorColor:\s*"([^"]+)",\s*interiorTrim:\s*"([^"]+)"\s*}/g;
  const configs = {};
  let match;
  while ((match = configRegex.exec(kia360Content)) !== null) {
    configs[match[1]] = {
      model: match[2],
      hash: match[3],
      exteriorColor: match[4],
      interiorTrim: match[5]
    };
  }

  const dataContent = fs.readFileSync(DATA_FILE, 'utf8');
  // Match colors: kiaColours(modelShot.modelName, [...])
  const colorsRegex = /colors:\s*kiaColours\(\w+\.([a-zA-Z0-9]+),\s*\[([\s\S]*?)\]\)/g;
  const cars = {};
  
  // Create a mapping from camelCase (modelShot key) to slug format (kebab-case)
  // because configs keys are in kebab-case (e.g., carens-clavis-ev)
  const camelToKebab = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

  while ((match = colorsRegex.exec(dataContent)) !== null) {
    const camelModel = match[1];
    const slug = camelToKebab(camelModel);
    
    const colorBlock = match[2];
    const colorCodes = [];
    const colorRegex = /\["[^"]+",\s*"[^"]+",\s*"([^"]+)"\]/g;
    let cMatch;
    while ((cMatch = colorRegex.exec(colorBlock)) !== null) {
      colorCodes.push(cMatch[1]);
    }
    cars[slug] = colorCodes;
  }

  const queue = [];
  const KIA_360_BASE = "https://www.kia.com/content/dam/kia2/in/en/images/360vr";

  for (const [slug, cfg] of Object.entries(configs)) {
    const colors = cars[slug] || [cfg.exteriorColor];
    
    // interior
    const interiorUrl = `${KIA_360_BASE}/${cfg.model}/${cfg.hash}/interior/${cfg.interiorTrim}/01-d.jpg`;
    const interiorDest = path.join(PUBLIC_DIR, '360', 'interior', slug, '01-d.jpg');
    queue.push({ url: interiorUrl, dest: interiorDest });

    // exterior
    for (const colorCode of colors) {
      for (let frame = 1; frame <= 72; frame++) {
        const padded = frame.toString().padStart(2, '0');
        const exteriorUrl = `${KIA_360_BASE}/${cfg.model}/${cfg.hash}/exterior/${colorCode}/${padded}-d.png`;
        const exteriorDest = path.join(PUBLIC_DIR, '360', 'exterior', slug, colorCode, `${padded}-d.png`);
        queue.push({ url: exteriorUrl, dest: exteriorDest });
      }
    }
  }

  console.log(`Built download queue with ${queue.length} images.`);
  console.log(`Starting downloads with concurrency of ${CONCURRENCY}...`);

  let active = 0;
  let index = 0;
  let completed = 0;
  let skipped = 0;
  let failed = 0;

  await new Promise((resolve) => {
    function next() {
      if (index >= queue.length && active === 0) {
        resolve();
        return;
      }
      while (active < CONCURRENCY && index < queue.length) {
        const item = queue[index++];
        active++;

        if (fs.existsSync(item.dest)) {
          skipped++;
          active--;
          next();
          continue;
        }

        downloadImage(item.url, item.dest)
          .then(() => {
            completed++;
            if ((completed + skipped) % 100 === 0) {
              console.log(`Progress: ${completed + skipped} / ${queue.length} (${failed} failed)`);
            }
          })
          .catch((e) => {
            failed++;
            console.error(`Failed ${item.url}: ${e.message}`);
          })
          .finally(() => {
            active--;
            next();
          });
      }
    }
    next();
  });

  console.log(`\nDownload complete!`);
  console.log(`Completed: ${completed}`);
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
