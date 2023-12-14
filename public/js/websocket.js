// websocket.js

const WebSocket = require('ws');
const Event = require('../models/event'); // Adjust the path based on your project structure

// Create a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Function to broadcast data to all connected clients
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// WebSocket server upgrade handler
function handleUpgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, request);
    });
}

wss.on('connection', ws => {
    console.log('Client connected');

    // Example: Send a welcome message to the connected client
    ws.send(JSON.stringify({ message: 'Welcome to EventHub WebSocket!' }));
});

// Example: Listen for new events and broadcast to connected clients
Event.on('newEvent', newEvent => {
    const eventData = { type: 'eventUpdate', data: newEvent };
    broadcast(eventData);
});

module.exports = { wss, handleUpgrade };
