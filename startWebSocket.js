import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const WebSocket = require('ws');
import { RenderSnapshotCommand } from './src/commands/build/index.js';

export default function startWebSocket(httpServer, app, expressSession) {
  const wss = new WebSocket.Server({ server: httpServer });
  const renderSnapshotCommand = new RenderSnapshotCommand();
  app.set('wss', wss);
  wss.on('connection', (ws, req) => {
    expressSession(req, {}, () => {
      ws.id = req.session.id;
      renderSnapshotCommand.execute(req.session.id);
      console.log('ol')
    });

    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
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
