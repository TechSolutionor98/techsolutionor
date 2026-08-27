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

function testFallbackLogic() {
  console.log('=== TESTING DYNAMIC CMS → STATIC FALLBACK SYSTEM ===\n');

  const staticFallbackImage = '/images/default-banner.png';
  const cloudinaryImage = 'https://res.cloudinary.com/mrocxxeh/image/upload/v12345/test.png';

  // Case 1: CMS content has active Cloudinary image
  const contentWithCloudinary = {
    sections: [
      {
        sectionId: 'hero_section',
        sectionName: 'Hero Section',
        fields: {
          image_banner: {
            type: 'image',
            value: cloudinaryImage,
            originalValue: staticFallbackImage
          }
        }
      }
    ]
  };

  const res1 = getCmsVal(contentWithCloudinary, staticFallbackImage, 'hero_section');
  console.log(`Test 1 (Active Cloudinary Image): ${res1 === cloudinaryImage ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`   Output: ${res1}`);

  // Case 2: CMS content has empty value ""
  const contentWithEmptyVal = {
    sections: [
      {
        sectionId: 'hero_section',
        sectionName: 'Hero Section',
        fields: {
          image_banner: {
            type: 'image',
            value: '',
            originalValue: staticFallbackImage
          }
        }
      }
    ]
  };

  const res2 = getCmsVal(contentWithEmptyVal, staticFallbackImage, 'hero_section');
  console.log(`Test 2 (Empty CMS value -> Fallback to Static): ${res2 === staticFallbackImage ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`   Output: ${res2}`);

  // Case 3: No CMS content configured (null content)
  const res3 = getCmsVal(null, staticFallbackImage, 'hero_section');
  console.log(`Test 3 (Null CMS content -> Fallback to Static): ${res3 === staticFallbackImage ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`   Output: ${res3}`);

  if (res1 === cloudinaryImage && res2 === staticFallbackImage && res3 === staticFallbackImage) {
    console.log('\n🎉 --- DYNAMIC-IMAGE FALLBACK SYSTEM VERIFIED PERFECTLY --- 🎉');
  } else {
    console.error('\n❌ Fallback test failed!');
  }
}

testFallbackLogic();
