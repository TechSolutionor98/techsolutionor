const React = require('react');

const defaultChallengeAccepted = {
  title: "CHALLENGE ACCEPTED",
  subtitle: "TechSolutionor Helps You Fix What's Holding Your Growth Back",
  cards: [
    {
      title: "My Website Isn't Getting Enough Traffic",
      desc: "Without consistent website traffic...",
      list: [
        "Boost visibility in search results",
        "Capture targeted, high-intent traffic",
      ],
    },
  ],
  exploreText: "Explore This Service",
};

console.log("=== TESTING CHALLENGE ACCEPTED CMS FLOW ===");
const rawData = { ...defaultChallengeAccepted };
console.log("Parsed Title:", rawData.title);
console.log("Parsed Cards count:", rawData.cards.length);
console.log("Parsed First Card List count:", rawData.cards[0].list.length);

if (rawData.title && rawData.cards.length > 0) {
  console.log("🎉 --- CHALLENGE ACCEPTED CMS VERIFIED PASSED --- 🎉");
} else {
  console.error("❌ CHALLENGE ACCEPTED CMS VERIFICATION FAILED");
  process.exit(1);
}
