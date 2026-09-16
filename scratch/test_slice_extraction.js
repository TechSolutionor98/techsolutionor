import fs from 'fs';

function getKeys(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = [...content.matchAll(/['"]([a-z0-9\-]+)['"]\s*:\s*\{/g)];
  return matches.map(m => m[1]);
}

console.log('WhyChoose keys:', getKeys('./app/_data/servicesWhyChooseData.js'));
console.log('KeyFeatures keys:', getKeys('./app/_data/servicesKeyFeaturesData.js'));
console.log('Struggling keys:', getKeys('./app/_data/servicesStrugglingData.js'));
console.log('Offerings keys:', getKeys('./app/_data/servicesOfferingsData.js'));
console.log('TechBook keys:', getKeys('./app/_data/servicesTechnologiesData.js'));
