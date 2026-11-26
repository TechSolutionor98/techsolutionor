const sharp = require('sharp');
const fs = require('fs');

async function testThemeOg() {
  const width = 1200;
  const height = 630;

  // Trim techsolutionor-logo.png
  let logoBase64 = '';
  if (fs.existsSync('public/techsolutionor-logo.png')) {
    const trimmedLogo = await sharp('public/techsolutionor-logo.png')
      .trim()
      .resize({ height: 75, fit: 'inside' })
      .png()
      .toBuffer();
    logoBase64 = `data:image/png;base64,${trimmedLogo.toString('base64')}`;
  }

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Website Hero Exact Signature Gradient -->
      <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EAF8ED" />
        <stop offset="35%" stop-color="#F4FCF6" />
        <stop offset="70%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#F9FDFB" />
      </linearGradient>

      <!-- Vibrant TechSolutionor Green Glow -->
      <radialGradient id="greenGlowTopRight" cx="90%" cy="10%" r="60%">
        <stop offset="0%" stop-color="#41B349" stop-opacity="0.18" />
        <stop offset="50%" stop-color="#41B349" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
      </radialGradient>

      <!-- Warm Gold Glow (matching website #FFE7A8 / #C5A059) -->
      <radialGradient id="goldGlowBottomLeft" cx="10%" cy="90%" r="55%">
        <stop offset="0%" stop-color="#FFE7A8" stop-opacity="0.35" />
        <stop offset="45%" stop-color="#FFE7A8" stop-opacity="0.10" />
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
      </radialGradient>

      <!-- Top-left Green Accent Orb -->
      <radialGradient id="greenGlowTopLeft" cx="5%" cy="5%" r="45%">
        <stop offset="0%" stop-color="#41B349" stop-opacity="0.22" />
        <stop offset="60%" stop-color="#41B349" stop-opacity="0.03" />
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
      </radialGradient>

      <!-- Tech Constellation Grid Pattern -->
      <pattern id="dotGrid" width="36" height="36" patternUnits="userSpaceOnUse">
        <circle cx="18" cy="18" r="1.2" fill="#41B349" fill-opacity="0.22" />
        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#41B349" stroke-width="0.75" stroke-opacity="0.05" />
      </pattern>

      <!-- Card Shadow Filter -->
      <filter id="cardShadow" x="-10%" y="-10%" width="125%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#41B349" flood-opacity="0.08" />
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.04" />
      </filter>

      <!-- Button/Badge Shadow -->
      <filter id="pillShadow" x="-15%" y="-20%" width="130%" height="150%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#41B349" flood-opacity="0.32" />
      </filter>

      <!-- Linear Gradient for Green Text / Badges -->
      <linearGradient id="primaryGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#41B349" />
        <stop offset="100%" stop-color="#2E9E36" />
      </linearGradient>
    </defs>

    <!-- Background Canvas -->
    <rect width="${width}" height="${height}" fill="url(#heroBg)" />
    <rect width="${width}" height="${height}" fill="url(#dotGrid)" />

    <!-- Ambient Glows -->
    <rect width="${width}" height="${height}" fill="url(#greenGlowTopRight)" />
    <rect width="${width}" height="${height}" fill="url(#goldGlowBottomLeft)" />
    <rect width="${width}" height="${height}" fill="url(#greenGlowTopLeft)" />

    <!-- Card Outer Border -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="28" fill="none" stroke="#41B349" stroke-opacity="0.25" stroke-width="2" />
    <rect x="28" y="28" width="${width - 56}" height="${height - 56}" rx="24" fill="none" stroke="#FFE7A8" stroke-opacity="0.4" stroke-width="1" />

    <!-- Corner Accents -->
    <path d="M 24 100 L 24 52 Q 24 24 52 24 L 100 24" fill="none" stroke="#41B349" stroke-width="4" stroke-linecap="round" />
    <path d="M ${width - 100} 24 L ${width - 52} 24 Q ${width - 24} 24 ${width - 24} 52 L ${width - 24} 100" fill="none" stroke="#41B349" stroke-width="4" stroke-linecap="round" />
    <path d="M 24 ${height - 100} L 24 ${height - 52} Q 24 ${height - 24} 52 ${height - 24} L 100 ${height - 24}" fill="none" stroke="#41B349" stroke-width="4" stroke-linecap="round" />
    <path d="M ${width - 100} ${height - 24} L ${width - 52} ${height - 24} Q ${width - 24} ${height - 24} ${width - 24} ${height - 52} L ${width - 24} ${height - 100}" fill="none" stroke="#41B349" stroke-width="4" stroke-linecap="round" />

    <!-- TOP HEADER -->
    <!-- Logo -->
    <g transform="translate(68, 52)">
      ${logoBase64 ? `<image href="${logoBase64}" x="0" y="0" height="66" />` : ''}
    </g>

    <!-- Top Right Status Badge (Theme matching) -->
    <g transform="translate(840, 62)">
      <rect x="0" y="0" width="292" height="44" rx="22" fill="#FFFFFF" stroke="#41B349" stroke-width="1.8" filter="url(#cardShadow)" />
      <circle cx="24" cy="22" r="6" fill="#41B349" />
      <circle cx="24" cy="22" r="10" fill="none" stroke="#41B349" stroke-opacity="0.35" stroke-width="2" />
      <text x="44" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#0D0F12" letter-spacing="0.5">
        GLOBAL TECH AGENCY
      </text>
    </g>

    <!-- HERO CONTENT -->
    <!-- Eyebrow Pill (Matching Website Hero Style) -->
    <g transform="translate(68, 156)">
      <rect x="0" y="0" width="450" height="34" rx="17" fill="#EAF8ED" stroke="#41B349" stroke-width="1.5" />
      <circle cx="18" cy="17" r="4.5" fill="#41B349" />
      <text x="32" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" fill="#41B349" letter-spacing="0.8">
        WEB &amp; APPS &#8226; CLOUD POS &#8226; WA TOOL &#8226; SEO
      </text>
    </g>

    <!-- Main Headline - Line 1 -->
    <text x="68" y="246" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif" font-size="50" font-weight="900" fill="#0D0F12" letter-spacing="-1.2">
      DIGITAL MARKETING &amp;
    </text>

    <!-- Main Headline - Line 2 (The signature website Green Pill Badge!) -->
    <g transform="translate(68, 266)">
      <!-- Pill Shadow & Body -->
      <rect x="0" y="0" width="810" height="66" rx="33" fill="#41B349" stroke="#FFE7A8" stroke-width="3" filter="url(#pillShadow)" />
      <text x="405" y="45" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">
        WEB DEVELOPMENT &amp; SEO SERVICES
      </text>
    </g>

    <!-- Headline Line 3: "FOR BUSINESS GROWTH" (with gold quotes like the website) -->
    <g transform="translate(68, 382)">
      <!-- Quote Left -->
      <text x="0" y="0" font-family="Georgia, serif" font-size="44" font-weight="900" fill="#C5A059">&#8220;</text>
      <!-- "FOR" in dark text -->
      <text x="36" y="-6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif" font-size="36" font-weight="900" fill="#0D0F12" letter-spacing="-0.5">
        FOR
      </text>
      <!-- "BUSINESS GROWTH" in green italic -->
      <text x="124" y="-6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif" font-style="italic" font-size="38" font-weight="900" fill="#41B349" letter-spacing="-0.5">
        BUSINESS GROWTH
      </text>
      <!-- Quote Right -->
      <text x="498" y="0" font-family="Georgia, serif" font-size="44" font-weight="900" fill="#C5A059">&#8221;</text>
      
      <!-- Subtitle -->
      <text x="560" y="-8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#64748B">
        &#8212; Engineered to Scale Your Business Worldwide
      </text>
    </g>

    <!-- 4 FEATURE CARDS (Website Card Style: White card + #41B349 accent) -->
    <g transform="translate(68, 432)">
      <!-- Card 1: Web & App Dev -->
      <g transform="translate(0, 0)">
        <rect width="250" height="90" rx="16" fill="#FFFFFF" stroke="#41B349" stroke-width="1.8" filter="url(#cardShadow)" />
        <rect x="0" y="0" width="6" height="90" rx="3" fill="#41B349" />
        <text x="22" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#0D0F12">
          Web &amp; App Dev
        </text>
        <text x="22" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#41B349">
          Next.js &#8226; React &#8226; Mobile Apps
        </text>
      </g>

      <!-- Card 2: Get POS & ERP -->
      <g transform="translate(272, 0)">
        <rect width="250" height="90" rx="16" fill="#FFFFFF" stroke="#16A34A" stroke-width="1.8" filter="url(#cardShadow)" />
        <rect x="0" y="0" width="6" height="90" rx="3" fill="#16A34A" />
        <text x="22" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#0D0F12">
          Get POS &amp; ERP
        </text>
        <text x="22" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#15803D">
          Retail POS &#8226; Billing &#8226; Stock
        </text>
      </g>

      <!-- Card 3: WA Marketing Tool -->
      <g transform="translate(544, 0)">
        <rect width="250" height="90" rx="16" fill="#FFFFFF" stroke="#25D366" stroke-width="1.8" filter="url(#cardShadow)" />
        <rect x="0" y="0" width="6" height="90" rx="3" fill="#25D366" />
        <text x="22" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#0D0F12">
          WA Tool &amp; AI
        </text>
        <text x="22" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#16A34A">
          Campaigns &#8226; AI Bot &#8226; Leads
        </text>
      </g>

      <!-- Card 4: SEO & Digital Growth -->
      <g transform="translate(816, 0)">
        <rect width="250" height="90" rx="16" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.8" filter="url(#cardShadow)" />
        <rect x="0" y="0" width="6" height="90" rx="3" fill="#F59E0B" />
        <text x="22" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#0D0F12">
          SEO &amp; Growth
        </text>
        <text x="22" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#D97706">
          Rank #1 &#8226; Google &amp; Meta Ads
        </text>
      </g>
    </g>

    <!-- BOTTOM BAR -->
    <g transform="translate(68, 558)">
      <!-- CTA Pill (Matching Website Button Style: #41B349 with #FFE7A8 border) -->
      <rect x="0" y="0" width="240" height="38" rx="19" fill="#41B349" stroke="#FFE7A8" stroke-width="2" filter="url(#cardShadow)" />
      <text x="120" y="24" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF">
        🌐 techsolutionor.com
      </text>

      <!-- Right Tagline -->
      <text x="1064" y="24" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#64748B">
        Serving Clients Across Dubai, USA, UK &amp; Worldwide ✦
      </text>
    </g>
  </svg>
  `;

  const svgBuffer = Buffer.from(svg.trim());
  const outputPng = await sharp(svgBuffer)
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  console.log(`Generated Theme-matched OG Image: ${outputPng.length} bytes (~${Math.round(outputPng.length / 1024)} KB)`);

  // Update image files
  fs.writeFileSync('public/og-image.png', outputPng);
  fs.writeFileSync('public/images/og-image.png', outputPng);
  fs.writeFileSync('app/opengraph-image.png', outputPng);
  fs.writeFileSync('app/twitter-image.png', outputPng);
  console.log('Successfully written to public/og-image.png, app/opengraph-image.png, etc.');
}

testThemeOg().catch(console.error);
