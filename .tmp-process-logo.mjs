import sharp from "sharp";

const src = "KIA logo/Kia Logo PNG.jpg";

// Trim white padding to isolate the wordmark.
const trimmed = await sharp(src).trim({ threshold: 240 }).toBuffer();
const t = await sharp(trimmed).metadata();
console.log("trimmed:", t.width + "x" + t.height);

// Negated grayscale => alpha channel: white -> 0 (transparent), dark -> 255 (opaque)
const alpha = await sharp(trimmed).greyscale().negate().toBuffer();

// 1. Dark version: near-black logo on transparent bg (for light navbar).
await sharp({
  create: { width: t.width, height: t.height, channels: 3, background: { r: 12, g: 20, b: 31 } },
})
  .joinChannel(alpha)
  .png()
  .toFile("public/brand/kia-logo-dark.png");

// 2. Light version: white logo on transparent bg (for dark footer).
await sharp({
  create: { width: t.width, height: t.height, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .joinChannel(alpha)
  .png()
  .toFile("public/brand/kia-logo-light.png");

console.log("OK both versions written");
