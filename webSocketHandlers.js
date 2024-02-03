import { ClearChatHistoryCommand } from './src/commands/query/index.js';
import { RenderSnapshotCommand } from './src/commands/build/index.js';

const webSocketHandlers = {
    clearHistory: function (ws) {
        const clearChatHistoryCommand = new ClearChatHistoryCommand();
        clearChatHistoryCommand.execute(ws.sessionId);
        ws.send('Cleared chat history');
    },
    saveSnapShot: async function (ws, html=null) {
        const renderSnapshotCommand = new RenderSnapshotCommand();
        await renderSnapshotCommand.execute(ws.sessionId, html);
        ws.send('Saved snapshot');
    }
};

export default webSocketHandlers;