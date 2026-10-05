const http = require('http');
const net = require('net');

const TARGET_PORT = 3000;
const PROXY_PORT = 3001;

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: `localhost:${TARGET_PORT}`,
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end(`Proxy error to port ${TARGET_PORT}: ${err.message}`);
    }
  });

  req.pipe(proxyReq, { end: true });
});

// Forward WebSocket / HMR connections
server.on('upgrade', (req, clientSocket, head) => {
  const proxySocket = net.connect(TARGET_PORT, '127.0.0.1', () => {
    proxySocket.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
    for (const [key, value] of Object.entries(req.headers)) {
      if (key.toLowerCase() === 'host') {
        proxySocket.write(`host: localhost:${TARGET_PORT}\r\n`);
      } else {
        proxySocket.write(`${key}: ${value}\r\n`);
      }
    }
    proxySocket.write('\r\n');
    if (head && head.length) {
      proxySocket.write(head);
    }
    proxySocket.pipe(clientSocket);
    clientSocket.pipe(proxySocket);
  });

  proxySocket.on('error', () => {
    try { clientSocket.destroy(); } catch (_) {}
  });

  clientSocket.on('error', () => {
    try { proxySocket.destroy(); } catch (_) {}
  });
});

server.listen(PROXY_PORT, () => {
  console.log(`Port ${PROXY_PORT} proxy -> http://localhost:${TARGET_PORT} running`);
});
