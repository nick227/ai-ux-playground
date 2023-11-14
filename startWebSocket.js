import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const WebSocket = require('ws');

export default function startWebSocket(httpServer, app, expressSession) {
  const wss = new WebSocket.Server({ server: httpServer });
  app.set('wss', wss);
  wss.on('connection', (ws, req) => {
    expressSession(req, {}, () => {
      ws.id = req.session.id;
    });

    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
    });

    ws.on('error', (error) => {
      console.error('WebSocket Error:', error);
    });

    // Try sending the message after a delay to ensure the client is ready
    setTimeout(() => {
      ws.send('Hello from server');
    }, 1000);
  });

  console.log('* WebSocket Server started');
}
