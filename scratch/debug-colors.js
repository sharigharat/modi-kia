const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, '../lib/data.ts');
const dataContent = fs.readFileSync(DATA_FILE, 'utf8');
const slugRegex = /slug:\s*"([^"]+)"/g;
let match;
while ((match = slugRegex.exec(dataContent)) !== null) {
  if (match[1] === 'ev9') {
    const afterSlug = dataContent.substring(match.index);
    const cb = afterSlug.match(/colors:\s*kiaColours\([^,]+,\s*\[([\s\S]*?)\]\)/);
    console.log("EV9 color match:");
    console.log(cb[1]);
  }
}
