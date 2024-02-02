import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const WebSocket = require('ws');
import webSocketHandlers from './webSocketHandlers.js';

export default function startWebSocket(httpServer, app, expressSession) {
  const wss = new WebSocket.Server({ server: httpServer });

  app.set('wss', wss);

  wss.on('connection', (ws, req) => {
    expressSession(req, {}, () => {
      ws.sessionId = req.session.id;
      webSocketHandlers.saveSnapShot(ws);
    });

    ws.on('message', (message) => {
      if (message.toString() === 'clearHistory') {
        webSocketHandlers.clearHistory(ws);
        return;
      }
      try {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.html) {
          webSocketHandlers.saveSnapShot(ws, parsedMessage.html);
        }
      } catch (error) {
        ws.send('Error parsing message');
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket Error:', error);
    });

    setTimeout(() => {
      ws.send('Hello from server');
    }, 1000);
  });

  console.log('* WebSocket Server started');
}
