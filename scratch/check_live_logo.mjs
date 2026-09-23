const res = await fetch('https://techsolutionor.com');
const html = await res.text();

const regex = /src=["']([^"']*(?:logo|Logo)[^"']*)["']/gi;
let match;
const logos = [];
while ((match = regex.exec(html)) !== null) {
  logos.push(match[1]);
}
console.log('Found logo paths in live website HTML:', logos);

// Also check any next/image paths
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
let imgMatch;
const allImgs = [];
while ((imgMatch = imgRegex.exec(html)) !== null) {
  if (imgMatch[1].includes('logo') || imgMatch[1].includes('Logo') || imgMatch[1].includes('black')) {
    allImgs.push(imgMatch[1]);
  }
}
console.log('All matching img tags:', allImgs);
