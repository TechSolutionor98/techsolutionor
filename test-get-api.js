const http = require('http');

http.get('http://localhost:3000/api/cms/content?routeId=6a2b9f0db209cb811a569933&websiteId=default', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data);
    process.exit(0);
  });
}).on('error', (err) => {
  console.error(err);
  process.exit(1);
});
