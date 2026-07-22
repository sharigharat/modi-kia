const fs = require('fs');
const https = require('https');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, '..', 'lib', 'countries.ts'), 'utf8');
const countryNames = [...fileContent.matchAll(/name: "([A-Z]{2})"/g)].map(m => m[1].toLowerCase());

const flagsDir = path.join(__dirname, '..', 'public', 'flags');
if (!fs.existsSync(flagsDir)) {
  fs.mkdirSync(flagsDir, { recursive: true });
}

async function downloadFlag(name) {
  const url = `https://flagcdn.com/w20/${name}.png`;
  const dest = path.join(flagsDir, `${name}.png`);
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed to download ${name}: ${res.statusCode}`);
        resolve();
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${name}: ${err.message}`);
      resolve();
    });
  });
}

async function main() {
  console.log(`Downloading ${countryNames.length} flags...`);
  for (const name of countryNames) {
    await downloadFlag(name);
  }
  console.log('Done!');
}

main();
