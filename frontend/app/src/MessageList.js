import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages }) => {
  const messageListRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message list when messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ul className="message-list" ref={messageListRef}>
      {messages.map((message, index) => (
        <li key={index} className={message.sender === 'bot' ? 'bot-message' : 'user-message'}>
          <span className="message-sender">{message.sender === 'bot' ? 'Bot' : 'You'}:</span> {message.text}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
