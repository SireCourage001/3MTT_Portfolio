const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Mongoose config to avoid strict query warning (Mongoose 7+)
mongoose.set('strictQuery', false);

// MongoDB Connection using async function
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat_app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // exit if cannot connect to DB
  }
}

// Connect to MongoDB before starting the server
connectDB();

// Define message schema and model
const messageSchema = new mongoose.Schema({
  username: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", messageSchema);

// Socket.io events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", async (data) => {
    try {
      // Save message to MongoDB
      const newMessage = new Message(data);
      await newMessage.save();

      // Broadcast message to clients
      io.emit("receive_message", data);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// HTTP root route
app.get("/", (req, res) => {
  res.send("Chat server is running...");
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
