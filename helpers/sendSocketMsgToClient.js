function sendSocketMsgToClient(message, req) {
    const wss = req.app.get('wss');
    const sessionId = req.session.id;
    let clientSocket;
    wss.clients.forEach((ws) => {
        if (ws.id === sessionId) {
            clientSocket = ws;
        }
    });

    if (clientSocket) {
        clientSocket.send(`Socket message: ${message}`);
    }
}

module.exports = sendSocketMsgToClient;