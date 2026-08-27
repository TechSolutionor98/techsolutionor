const fs = require('fs');
const path = require('path');

function fixFileImports(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  for (const [varName, importPath] of Object.entries(replacements)) {
    const regex = new RegExp(`import\\s+${varName}\\s+from\\s+['"]https?:\/\/[^'"]+['"];?`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `import ${varName} from "${importPath}";`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed imports in ${path.relative(process.cwd(), filePath)}`);
  }
}

// 1. Technology.js
fixFileImports(path.join(process.cwd(), 'app/_components/Home/Technology/Technology.js'), {
  Swift: '../../../../components/Images/swift.png',
  Reactjs: '../../../../components/Images/reactjs.png',
  JavaScript: '../../../../components/Images/javascript.png',
  PHP: '../../../../components/Images/php.png',
  Laravel: '../../../../components/Images/laravel.png',
  Python: '../../../../components/Images/python.png',
  Techbg: '../../../../components/Images/techbg.png',
  RectBg1: '../../../../components/Images/rectbg1.png',
  RectBg2: '../../../../components/Images/rectbg2.png',
  RectBg3: '../../../../components/Images/rectbg3.png',
  RectBg4: '../../../../components/Images/rectbg4.png',
  RectBg5: '../../../../components/Images/rectbg5.png',
  RectBg6: '../../../../components/Images/rectbg6.png',
  Techcard: '../../../../components/Images/techcard.png',
});

// 2. WhatWeDo.js
fixFileImports(path.join(process.cwd(), 'app/_components/Home/WhatWeDo/WhatWeDo.js'), {
  coorprate: '../../../../components/Images/coorporative.png',
  goal: '../../../../components/Images/goals.png',
  rocket: '../../../../components/Images/rocket.png',
});

// 3. ServicesWeOffer.js
fixFileImports(path.join(process.cwd(), 'app/_components/Home/ServicesWeOffer/ServicesWeOffer.js'), {
  social: '../../../../components/Images/social.png',
  content: '../../../../components/Images/content.png',
  app: '../../../../components/Images/app.png',
  graphics: '../../../../components/Images/graphics.png',
  web: '../../../../components/Images/web.png',
  ServiceBg: '../../../../components/Images/servicebg.png',
  seo: '../../../../components/Images/seo.png',
});

// 4. Projects.js
fixFileImports(path.join(process.cwd(), 'app/_components/Home/Projects/Projects.js'), {
  grab: '../../../../components/Images/grab.png',
  protein: '../../../../components/Images/protein.png',
  clickpos: '../../../../components/Images/clickpos.png',
  almatoh: '../../../../components/Images/almatoh.png',
  traders: '../../../../components/Images/traders.png',
  super: '../../../../components/Images/super.png',
  craters: '../../../../components/Images/craters.png',
  amer: '../../../../components/Images/amer.png',
  saloon: '../../../../components/Images/saloon.png',
  exports: '../../../../components/Images/exports.png',
  albasit: '../../../../components/Images/albasit.png',
  crown: '../../../../components/Images/crown.png',
  clickslice: '../../../../components/Images/clickslice.png',
  muzammil: '../../../../components/Images/muzammil.png',
  appliances: '../../../../components/Images/appliances.png',
  smart: '../../../../components/Images/smart.png',
  mubayya: '../../../../components/Images/mubayya.png',
  aljannah: '../../../../components/Images/aljannah.png',
  eclipse: '../../../../components/Images/eclipse.png',
});

// 5. ChallengeAccepted.js
fixFileImports(path.join(process.cwd(), 'app/_components/Home/ChallengeAccepted/ChallengeAccepted.js'), {
  cardsbg: '../../../../components/Images/cardsbg.png',
  eclipse: '../../../../components/Images/eclipse.png',
});

// 6. GoodServices.js
fixFileImports(path.join(process.cwd(), 'app/_components/Home/GoodServices/GoodServices.js'), {
  goodservicess: '../../../../components/Images/goodservicess.png',
  value: '../../../../components/Images/value.png',
  mission: '../../../../components/Images/mission.png',
  goal: '../../../../components/Images/goal.png',
  comma: '../../../../components/Images/comma.png',
  eclipse: '../../../../components/Images/eclipse.png',
});

// 7. Testimonials.js
fixFileImports(path.join(process.cwd(), 'app/_components/Home/Testimonials/Testimonials.js'), {
  Logo: '../../../../components/Images/Logo.png',
});

// 8. HomeBanner.js
fixFileImports(path.join(process.cwd(), 'app/_components/Home/Banner/HomeBanner.js'), {
  banner: '../../../../components/Images/banner.png',
  bannerbg: '../../../../components/Images/bannerbg.png',
});

console.log('All Home component ES6 import paths restored!');
