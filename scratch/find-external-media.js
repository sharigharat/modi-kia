const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (let file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = [...walk('app'), ...walk('components'), ...walk('lib')];
const urls = new Set();
const imgRegex = /https?:\/\/[a-zA-Z0-9.\-_\/]+\.(png|jpe?g|webp|gif|svg|mp4|webm)/gi;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // find all absolute urls pointing to media
  const matches = content.match(imgRegex);
  if (matches) {
    for (const m of matches) {
      urls.add(m);
    }
  }
}

// Check other explicit external domains from data.ts
const dataContent = fs.readFileSync('lib/data.ts', 'utf8');
const allUrls = dataContent.match(/https?:\/\/[^\s"'`)]+/g);
if (allUrls) {
  for (const m of allUrls) {
     if (m.includes('unsplash.com') || m.includes('bunny') || m.includes('kia.com')) {
       urls.add(m);
     }
  }
}

console.log("External media URLs found in source code:");
if (urls.size === 0) {
  console.log("None!");
} else {
  Array.from(urls).forEach(u => console.log(u));
}
