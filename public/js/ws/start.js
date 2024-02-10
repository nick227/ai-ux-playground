function createWebSocketUrl() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const hostname = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : '';
    const path = `${protocol}://${hostname}${port}`;
    console.log(path);
    return path;
}

const ws = new WebSocket(createWebSocketUrl());
let popup = null;

ws.addEventListener('error', (error) => {
    console.error('WebSocket Error:', error);
});

ws.addEventListener('open', () => {
    ws.send('Hello from client');
});