const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[trimmed.slice(0, idx).trim()] = val;
      }
    }
  });
}

const { getCmsVal } = require('../lib/api-helper.js');

async function testBannerResolution() {
  console.log('=== TESTING BANNER IMAGE & TEXT RESOLUTION ===\n');

  const cloudinaryBannerUrl = 'https://res.cloudinary.com/dqghun7oj/image/upload/v1700000001/cms/default/analytics_banner_v2.jpg';

  const mockCmsContent = {
    path: '/technologies/analytics',
    sections: [
      {
        sectionId: 'analyticsbanner',
        sectionName: 'Analytics Hero Section',
        fields: {
          t_text_1: {
            type: 'text',
            value: 'Analytics: Data-Driven',
            originalValue: 'Analytics: Data-Driven'
          },
          t_text_2: {
            type: 'text',
            value: 'Technology for Business',
            originalValue: 'Technology for Business'
          },
          t_text_3: {
            type: 'text',
            value: 'Insights',
            originalValue: 'Insights'
          },
          image_analyticbannerbg: {
            type: 'image',
            value: cloudinaryBannerUrl,
            originalValue: '@/components/Images/GoogleAnalytics-BANNER.jpg'
          }
        }
      }
    ]
  };

  const bgImageSrc = { src: '/_next/static/media/GoogleAnalytics-BANNER.12345.jpg' };
  const bgImage = getCmsVal(mockCmsContent, bgImageSrc, 'analyticsbanner');
  const line1 = getCmsVal(mockCmsContent, 'Analytics: Data-Driven', 'analyticsbanner');
  const line2 = getCmsVal(mockCmsContent, 'Technology for Business', 'analyticsbanner');
  const line3 = getCmsVal(mockCmsContent, 'Insights', 'analyticsbanner');

  console.log('Background Image URL:', bgImage);
  console.log('Line 1 Text:', line1);
  console.log('Line 2 Text:', line2);
  console.log('Line 3 Text:', line3);

  if (bgImage !== cloudinaryBannerUrl) {
    throw new Error(`FAILED: Background Image is not Cloudinary URL: ${bgImage}`);
  }
  if (line1 !== 'Analytics: Data-Driven') {
    throw new Error(`FAILED: Line 1 text is corrupted: ${line1}`);
  }
  if (line2 !== 'Technology for Business') {
    throw new Error(`FAILED: Line 2 text is corrupted: ${line2}`);
  }
  if (line3 !== 'Insights') {
    throw new Error(`FAILED: Line 3 text is corrupted: ${line3}`);
  }

  console.log('\n✅ Background banner image correctly resolves to Cloudinary URL!');
  console.log('✅ Text headings correctly resolve to text strings and NEVER output image URLs!');
  console.log('\n🎉 --- BANNER RESOLUTION TEST PASSED PERFECTLY --- 🎉');
  process.exit(0);
}

testBannerResolution().catch(err => {
  console.error('❌ Test Failed:', err);
  process.exit(1);
});
