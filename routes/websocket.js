// websocket.js

const expressWs = require('express-ws');
const { Event } = require('../models/event'); // Adjust the path based on your project structure

const setupWebSocket = (app) => {
    expressWs(app);

    app.ws('/websocket', (ws, req) => {
        // WebSocket connection established
        console.log('WebSocket connection established');

        // Handle incoming WebSocket messages
        ws.on('message', (message) => {
            console.log('Received message:', message);

            // Example: Notify clients about new events
            Event.findAll().then((events) => {
                const eventData = events.map((event) => ({
                    event_id: event.event_id,
                    event_name: event.event_name,
                    // Add other event properties as needed
                }));

                // Send event data to connected clients
                ws.send(JSON.stringify(eventData));
            });
        });

        // Handle WebSocket closure
        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });
};

module.exports = setupWebSocket;
