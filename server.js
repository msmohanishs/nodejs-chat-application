const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize Express and create HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server);

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Set up Socket.IO connection
// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining
    socket.on('join', (name) => {
        socket.username = name;
        io.emit('message', `${name} has joined the chat`);
    });

    // Handle incoming messages
    socket.on('message', (msg) => {
        io.emit('message', `${socket.username}: ${msg}`);
    });

    // Handle user leaving
    socket.on('disconnect', () => {
        if (socket.username) {
            io.emit('message', `${socket.username} has left the chat`);
        }
    });
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
