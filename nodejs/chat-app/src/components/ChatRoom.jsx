import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to backend

function ChatRoom() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Clean up on component unmount
    return () => socket.off('chat message');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (username.trim() && message.trim()) {
      socket.emit('chat message', {
        username,
        message,
      });
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
              <strong>{msg.username}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatRoom;
