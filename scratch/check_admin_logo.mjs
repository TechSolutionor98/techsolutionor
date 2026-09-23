const res = await fetch('https://techsolutionor.com/admin');
const html = await res.text();

const regex = /src=["']([^"']*(?:blacklogo|logo|Logo)[^"']*)["']/gi;
let match;
const logos = [];
while ((match = regex.exec(html)) !== null) {
  logos.push(match[1]);
}
console.log('Admin page logo paths:', logos);
