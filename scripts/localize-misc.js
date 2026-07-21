const fs = require('fs');
const path = require('path');
const https = require('https');

const downloads = [
  {
    url: 'https://bunny-wp-pullzone-cghvklkcns.b-cdn.net/wp-content/uploads/2026/05/GNP01423.JPG-1024x683.jpeg',
    dest: 'public/about/culture.jpg'
  },
  { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', dest: 'public/testimonials/avatar-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', dest: 'public/testimonials/avatar-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', dest: 'public/testimonials/avatar-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80', dest: 'public/testimonials/avatar-4.jpg' },
  { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', dest: 'public/testimonials/avatar-5.jpg' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', dest: 'public/testimonials/avatar-6.jpg' },
  { url: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80', dest: 'public/testimonials/avatar-7.jpg' },
  { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', dest: 'public/testimonials/avatar-8.jpg' }
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    function req(u) {
      https.get(u, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          let redirectUrl = res.headers.location;
          if (!redirectUrl.startsWith('http')) {
            redirectUrl = new URL(redirectUrl, u).toString();
          }
          res.resume();
          return req(redirectUrl);
        }
        if (res.statusCode === 200) {
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on('finish', () => file.close(resolve));
        } else {
          res.resume();
          reject(new Error(`Status ${res.statusCode}`));
        }
      }).on('error', reject);
    }
    req(url);
  });
}

async function main() {
  for (const item of downloads) {
    console.log(`Downloading ${item.dest}...`);
    try {
      await download(item.url, item.dest);
    } catch (e) {
      console.error(`Failed to download ${item.url}:`, e);
    }
  }
  console.log("Done!");
}

main();
