import React, { useState, useRef, useEffect } from 'react';

const SendMessageForm = ({ addMessage }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null); // Create a ref for the input element

  useEffect(() => {
    // Focus on the input field when the component mounts
    inputRef.current.focus();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent sending messages while loading
    
    // Check if the text is blank or contains only spaces
    if (!text.trim()) {
      return;
    }

    setLoading(true);
    addMessage(text.trim(), 'user');
    setText('');

    try {
      const response = await fetch(`http://0.0.0.0:8000/bot-response/${encodeURIComponent(text.trim())}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bot response');
      }
      const { bot_response } = await response.json();
      addMessage(bot_response, 'bot');
    } catch (error) {
      console.error('Error fetching bot response:', error);
      // Handle error
    } finally {
      setLoading(false);
      // Focus on the input field after a short delay
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  };

  return (
    <form className="send-message-form" onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          ref={inputRef} // Assign the ref to the input element
          type="text"
          placeholder="Type your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading} // Disable input while loading
          style={{ width: 'calc(100% - 80px)' }} // Set the width of the input field
        />
        {loading && (
          <div className="loading-spinner"></div>
        )}
      </div>
      <button type="submit" disabled={loading}>Send</button>
    </form>
  );
};

export default SendMessageForm;
