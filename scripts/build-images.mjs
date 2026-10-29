// Builds every derived portrait asset from public/images/naresh.jpg.
// Only crop, mask and colour-grade happen here; the face is never retouched or regenerated.
import sharp from 'sharp';

const SRC = 'public/images/naresh.jpg';
const OUT = 'public/images';
const WIDTHS = [480, 720, 960];

// Gentle warm grade so the portrait sits with the amber palette.
const graded = await sharp(SRC)
  .modulate({ brightness: 0.96, saturation: 0.95 })
  .linear([1.03, 1.0, 0.95], [2, 0, -3])
  .jpeg({ quality: 95 })
  .toBuffer();

for (const w of WIDTHS) {
  const img = sharp(graded).resize({ width: w });
  await img.clone().avif({ quality: 60, effort: 6 }).toFile(`${OUT}/portrait-${w}.avif`);
  await img.clone().webp({ quality: 82 }).toFile(`${OUT}/portrait-${w}.webp`);
}

// Circular avatar / favicons from a square crop around the face.
const FACE = { left: 300, top: 180, width: 600, height: 600 };
const circle = (s) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="#fff"/></svg>`);
const avatar = async (size) =>
  sharp(graded)
    .extract(FACE)
    .resize(size, size)
    .composite([{ input: circle(size), blend: 'dest-in' }])
    .png()
    .toBuffer();

for (const s of [64, 96, 192]) {
  await sharp(await avatar(s)).webp({ quality: 90 }).toFile(`${OUT}/avatar-${s}.webp`);
}
await sharp(await avatar(32)).toFile('public/favicon-32.png');
await sharp(await avatar(64)).toFile('public/favicon-64.png');
await sharp(await avatar(180)).toFile('public/apple-touch-icon.png');

// Open Graph 1200x630: full portrait on the right, edges dissolving into the dark page, name on the left.
const W = 1200, H = 630;
const pw = Math.round((H * 1200) / 1600);
const edgeMask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${H}">
  <defs>
    <linearGradient id="h" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".35" stop-color="#fff"/><stop offset=".8" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset=".8" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="m"><rect width="100%" height="100%" fill="url(#h)"/></mask>
  </defs>
  <rect width="100%" height="100%" fill="url(#h)"/>
</svg>`);
const portrait = await sharp(graded)
  .resize({ height: H })
  .composite([{ input: edgeMask, blend: 'dest-in' }])
  .png()
  .toBuffer();
const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="bloom" cx=".5" cy="0" r=".7"><stop stop-color="#E8A24A" stop-opacity=".3"/><stop offset="1" stop-color="#E8A24A" stop-opacity="0"/></radialGradient>
    <linearGradient id="strip" x1="0" x2="1"><stop stop-color="#B8741A" stop-opacity="0"/><stop offset=".5" stop-color="#F5C77E"/><stop offset="1" stop-color="#B8741A" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0B0B0C"/>
  <rect width="100%" height="240" fill="url(#bloom)"/>
  <rect y="34" width="100%" height="3" fill="url(#strip)"/>
  <text x="80" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="104" fill="#F5F1EA" letter-spacing="-2">Naresh</text>
  <text x="80" y="408" font-family="Georgia, 'Times New Roman', serif" font-size="104" font-style="italic" fill="#E8A24A" letter-spacing="-2">B A</text>
  <text x="84" y="470" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#E8A24A" letter-spacing="6">AI &amp; DATA SCIENCE DEVELOPER</text>
  <text x="84" y="510" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#8C8C8C" letter-spacing="2">Full-Stack · Erode, Tamil Nadu</text>
</svg>`);
await sharp(bg)
  .composite([{ input: portrait, left: W - pw - 40, top: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(`${OUT}/og.jpg`);

console.log('done');
