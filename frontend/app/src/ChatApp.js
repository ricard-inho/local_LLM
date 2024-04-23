import React, { useState } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (text, sender) => {
    const newMessage = { text, sender };
    setMessages(prevMessages => [...prevMessages, newMessage]);

  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="chat-app">
        <h1>Local LLM</h1>
      <MessageList messages={messages} />
      <SendMessageForm addMessage={addMessage} />
      <button className="clear-button" onClick={clearMessages}>Clear Conversations</button>
    </div>
  );
};

export default ChatApp;
