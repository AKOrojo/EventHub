const express = require('express');
const expressWs = require('express-ws');
const app = express();
const sequelize = require('./config/db');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const eventsRouter = require('./routes/events');
const apiRouter = require('./routes/api');
const websocketRouter = require('./routes/websocket');

// Initialize express-ws with the app instance
expressWs(app);

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/events', eventsRouter);
app.use('/api', apiRouter);

// Use WebSocket middleware for the '/websocket' route
app.use('routes/websocket', (req, res, next) => {
    req.testing = 'testing';
    return next();
}, websocketRouter);

sequelize.sync().then(() => {
    const server = app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

    // Attach WebSocket server to the Express server
    const { wss, handleUpgrade } = require('./routes/websocket');
    
    // Handle WebSocket upgrade requests
    server.on('upgrade', (request, socket, head) => {
        handleUpgrade(request, socket, head, ws => {
            wss.emit('connection', ws, request);
        });
    });

    // ... (any other server logic or cleanup)
});
