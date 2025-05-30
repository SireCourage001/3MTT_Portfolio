import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Connect to backend

function ChatRoom() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Fetch messages from backend API
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/messages');
        setChat(res.data); // Load message history
      } catch (err) {
        console.error('Error loading messages:', err);
      }
    };

    fetchMessages();

    // Socket listener
    socket.on('chat message', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    return () => socket.off('chat message');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (username.trim() && message.trim()) {
      const msgObj = {
        username,
        message,
        timestamp: new Date(),
      };
      socket.emit('chat message', msgObj);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
      <h2>Chat-App</h2>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={username}
          placeholder="Your name"
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 10, width: '100%', padding: 8 }}
        />
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginBottom: 10, width: '100%', padding: 8 }}
        />
        <button type="submit" style={{ padding: 10, width: '100%' }}>
          Send
        </button>
      </form>

      <div style={{ marginTop: 20 }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {chat.map((msg, idx) => (
            <li key={idx} style={{ padding: 5 }}>
              <strong>{msg.username}:</strong> {msg.message} <br />
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatRoom;
