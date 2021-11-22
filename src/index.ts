import express from 'express';
import http from 'http';
import WebSocket from 'ws';
const app = express();

const server = http.createServer(app);

const wsServer = new WebSocket.Server({ server });

const port = process.env.PORT || 3000;

wsServer.on('connection', (ws: WebSocket) => {

    ws.on('message', (message: string) => {
        wsServer.clients.forEach(client => client.send(message));
    });

});

server.listen(port, () => {
    console.log(`Server started :${port}`);
});