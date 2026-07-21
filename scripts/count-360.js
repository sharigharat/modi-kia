const fs = require('fs');
const path = require('path');

// A crude way to extract colors per model from data.ts
const content = fs.readFileSync(path.join(__dirname, '../lib/data.ts'), 'utf8');

// Find blocks like slug: "seltos", followed by colors: [...]
const cars = [];
const slugRegex = /slug:\s*"([^"]+)"/g;
let match;
while ((match = slugRegex.exec(content)) !== null) {
  const slug = match[1];
  
  // find colors array after this slug
  const afterSlug = content.substring(match.index);
  const colorsMatch = afterSlug.match(/colors:\s*\[([\s\S]*?)\]/);
  let colorCount = 0;
  if (colorsMatch) {
    // count objects in colors array roughly by counting "code:"
    const codes = colorsMatch[1].match(/code:/g);
    colorCount = codes ? codes.length : 0;
  }
  cars.push({ slug, colorCount });
}

let totalImages = 0;
let totalColors = 0;
cars.forEach(car => {
  if (car.colorCount === 0) return; // maybe not a car block
  totalColors += car.colorCount;
  // 72 exterior frames per color
  const exteriorFrames = car.colorCount * 72;
  // 1 interior panorama
  const interiorFrames = 1;
  totalImages += exteriorFrames + interiorFrames;
  console.log(`${car.slug}: ${car.colorCount} colors -> ${exteriorFrames} exterior + 1 interior = ${exteriorFrames + 1} images`);
});

console.log(`\nTotal Colors: ${totalColors}`);
console.log(`Total 360 Images to Download: ${totalImages}`);
