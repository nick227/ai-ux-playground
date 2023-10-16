export default function sendSocketMsgToClient(message, req) {
    if(!req.app || !message){
        return;
    }
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