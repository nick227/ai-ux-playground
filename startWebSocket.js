import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const WebSocket = require('ws');
import { RenderSnapshotCommand } from './src/commands/build/index.js';
import { ClearChatHistoryCommand } from './src/commands/query/index.js';

export default function startWebSocket(httpServer, app, expressSession) {
  const wss = new WebSocket.Server({ server: httpServer });
  const renderSnapshotCommand = new RenderSnapshotCommand();
  app.set('wss', wss);
  wss.on('connection', (ws, req) => {
    expressSession(req, {}, () => {
      ws.id = req.session.id;
      renderSnapshotCommand.execute(req.session.id);
    });

    ws.on('message', (message) => {
      if(message.toString() === 'clearHistory'){
        const clearChatHistoryCommand = new ClearChatHistoryCommand();
        console.log('clearing', req.session.id);
        clearChatHistoryCommand.execute(req.session.id);
        ws.send('Clear chat history');
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
