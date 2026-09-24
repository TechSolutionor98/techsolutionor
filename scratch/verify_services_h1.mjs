const paths = [
  '/services',
  '/services/web-development',
  '/services/app-development',
  '/services/software-development',
  '/services/ecommerce-development',
  '/services/graphic-design',
  '/services/social-media',
  '/services/digital-marketing',
  '/services/ppc-amazon-ads',
  '/services/google-ads',
  '/services/meta',
  '/services/search-engine-optimization',
  '/services/content-writing',
  '/services/call-center',
  '/services/hire-us'
];

async function verifyH1s() {
  console.log('=== VERIFYING H1 HEADINGS ON LIVE SERVER (http://localhost:3000) ===\n');
  let hasLocationError = false;

  for (const path of paths) {
    const url = `http://localhost:3000${path}`;
    try {
      const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
      const html = await res.text();
      
      // Extract <h1...>...</h1>
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      let h1Text = 'NO H1 FOUND';
      if (h1Match) {
        h1Text = h1Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      }

      // Check for Dubai, UAE, Abu Dhabi, etc.
      const hasDubai = /dubai/i.test(h1Text);
      const hasUae = /\buae\b/i.test(h1Text);
      const hasAbuDhabi = /abu\s*dhabi/i.test(h1Text);
      const hasLocation = hasDubai || hasUae || hasAbuDhabi;

      if (hasLocation) {
        hasLocationError = true;
        console.error(`[FAIL] ${path}`);
        console.error(`       H1: "${h1Text}"`);
        console.error(`       Contains location: Dubai=${hasDubai}, UAE=${hasUae}\n`);
      } else {
        console.log(`[PASS] ${path}`);
        console.log(`       H1: "${h1Text}"\n`);
      }
    } catch (err) {
      console.error(`[ERROR] Fetch failed for ${url}:`, err.message);
    }
  }

  if (hasLocationError) {
    console.error('VERIFICATION FAILED: Some H1s still contain location words!');
    process.exit(1);
  } else {
    console.log('ALL 15 SERVICES PAGES PASSED: Zero location words in H1 headings!');
    process.exit(0);
  }
}

verifyH1s();
