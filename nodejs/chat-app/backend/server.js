require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

// Routes
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');

const Message = require('./models/Message');
const User = require('./models/User');

// Initialize app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// REST API routes
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Socket.IO
io.on('connection', (socket) => {
  console.log('🔌 A user connected');

  socket.on('chat message', async (msg) => {
    try {
      const messageData = {
        username: msg.username,
        message: msg.message,
        timestamp: new Date()
      };

      const savedMessage = await Message.create(messageData);

      io.emit('chat message', savedMessage); // Broadcast the saved message
    } catch (error) {
      console.error('Error handling chat message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔌 A user disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
