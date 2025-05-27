const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { connectToDatabase, getDb } = require('./db'); // Adjust the path if needed
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', async (msg) => {
    const db = getDb();
    const collection = db.collection('messages');
    await collection.insertOne({ text: msg, time: new Date() });
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

connectToDatabase().then(() => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
