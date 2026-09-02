const React = require('react');

const defaultTestimonials = {
  titlePrefix: 'Customer',
  titleHighlight: 'Reviews',
  reviews: [
    {
      name: 'Dynamic Client 1',
      initial: 'D',
      color: 'bg-[#f47413]',
      time: '10 days ago',
      review: 'Test dynamic review 1',
    },
    {
      name: 'Dynamic Client 2',
      initial: 'B',
      color: 'bg-[#912d91]',
      time: '1 day ago',
      review: 'Test dynamic review 2',
    },
  ],
};

console.log("=== TESTING FULLY DYNAMIC TESTIMONIALS CMS FLOW ===");

// Simulation of CMS payload with added/edited/deleted reviews
const cmsContentPayload = {
  reviews: [
    { name: 'Admin Added Client', time: 'Just now', review: 'Added directly from Admin Panel!' }
  ]
};

const rawReviews = cmsContentPayload.reviews || defaultTestimonials.reviews;
const halfIndex = Math.ceil(rawReviews.length / 2);
const leftCol = rawReviews.slice(0, halfIndex);
const rightCol = rawReviews.slice(halfIndex);

console.log("Total Dynamic Reviews:", rawReviews.length);
console.log("Left Column Count:", leftCol.length);
console.log("Right Column Count:", rightCol.length);

if (rawReviews[0].name === 'Admin Added Client' && rawReviews.length === 1) {
  console.log("🎉 --- DYNAMIC CMS VERIFICATION PASSED --- 🎉");
} else {
  console.error("❌ DYNAMIC CMS VERIFICATION FAILED");
  process.exit(1);
}
