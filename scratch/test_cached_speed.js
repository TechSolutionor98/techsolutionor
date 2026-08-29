const routes = [
  '/',
  '/about-us',
  '/services',
  '/services/web-development',
  '/services/app-development',
  '/admin/login',
];

async function checkSpeed() {
  console.log('Testing speed of compiled pages...');
  for (const r of routes) {
    const url = `http://localhost:3002${r}`;
    const start = Date.now();
    const res = await fetch(url);
    const elapsed = Date.now() - start;
    console.log(`[${res.status}] ${r} responded in ${elapsed}ms`);
  }
}

checkSpeed();
