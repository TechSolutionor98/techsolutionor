import http from 'http';

function testScanSpeed() {
  const startTime = Date.now();
  console.log('Sending POST /api/cms/scan-routes request...');

  const req = http.request('http://localhost:3000/api/cms/scan-routes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const duration = Date.now() - startTime;
      console.log(`Scan completed in ${duration}ms with status ${res.statusCode}`);
      try {
        const json = JSON.parse(data);
        console.log('Summary:', json.summary);
      } catch (e) {
        console.log('Response:', data.substring(0, 200));
      }
      process.exit(0);
    });
  });

  req.on('error', err => {
    console.error('Request error:', err);
    process.exit(1);
  });

  req.write(JSON.stringify({ websiteId: 'default' }));
  req.end();
}

testScanSpeed();
