const WebSocket = require('ws');

function startWebSocket(app, expressSession) {
    const server = require('http').createServer(app);
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        expressSession(req, {}, () => {
            ws.id = req.session.id;
        });
        ws.on('message', (message) => {
            console.log(`Received: ${message}`);
        });
        ws.send('Hello from server');
    });

    wss.on('error', (error) => {
        console.error('WebSocket Server Error:', error);
      });

    server.listen(8080, () => {
        console.log('*  WebSocket Server started on http://localhost:8080/');
    });

    app.set('wss', wss);
}

module.exports = startWebSocket;
