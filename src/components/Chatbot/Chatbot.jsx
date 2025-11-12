import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Namaste! 👋 I'm your FitIndia AI assistant. I'll provide workout plans and diet charts in clean, easy-to-read tables!", 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Naya useEffect - Auto message handle karne ke liye
  useEffect(() => {
    // Jab chat open ho tab auto message check karo
    if (isOpen) {
      const autoMessage = localStorage.getItem('autoChatbotMessage');
      if (autoMessage && autoMessage.trim() !== '') {
        console.log('Auto message received:', autoMessage);
        
        // Input field mein message set karo
        setInputValue(autoMessage);
        
        // Storage clear karo
        localStorage.removeItem('autoChatbotMessage');
        localStorage.removeItem('pendingChatbotMessage');
      }
    }
  }, [isOpen]);

  // Event listener for custom events
  useEffect(() => {
    const handleOpenChatbot = (event) => {
      if (event.detail && event.detail.message) {
        console.log('Custom event received:', event.detail.message);
        setIsOpen(true);
        setTimeout(() => {
          setInputValue(event.detail.message);
        }, 300);
      }
    };

    window.addEventListener('openChatbot', handleOpenChatbot);
    
    return () => {
      window.removeEventListener('openChatbot', handleOpenChatbot);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const formatMessage = (text) => {
    if (!text) return text;
    let formattedText = text;
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '$1');
    formattedText = formattedText.replace(/\*(.*?)\*/g, '$1');
    
    const tableRegex = /\|([^\n]+)\|\n\|([-:| ]+)\|\n((?:\|[^\n]+\|\n?)+)/g;
    
    formattedText = formattedText.replace(tableRegex, (match, headers, separator, rows) => {
      const headerCells = headers.split('|')
        .filter(cell => cell.trim())
        .map(cell => `<th>${cell.trim()}</th>`)
        .join('');
      
      const rowLines = rows.split('\n').filter(line => line.trim());
      const tableRows = rowLines.map(row => {
        const cells = row.split('|')
          .filter(cell => cell.trim())
          .map(cell => `<td>${cell.trim()}</td>`)
          .join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      
      return `<div class="table-container"><table class="message-table"><thead><tr>${headerCells}</tr></thead><tbody>${tableRows}</tbody></table></div>`;
    });

    formattedText = formattedText.replace(/\n/g, '<br />');
    formattedText = formattedText.replace(/\*/g, '');

    return { __html: formattedText };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);

    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickSuggestions = [
    "Create a weekly workout plan in table format",
    "Show beginner diet chart for weight loss", 
    "List chest exercises with sets and reps table",
    "7-day yoga plan with benefits table"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleOverlayClick = (e) => {
    handleCloseChat();
  };

  return (
    <div className="chatbot-container">
      {/* Floating Chat Button - Show on all pages */}
      {!isOpen && (
        <motion.button 
          className="chat-opener"
          onClick={toggleChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          💬
          <span className="pulse-dot"></span>
        </motion.button>
      )}

      {/* Centered Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-modal-overlay"
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="chat-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="chat-window">
                <div className="chat-header">
                  <div className="chat-title">
                    <div className="bot-avatar">🤖</div>
                    <div>
                      <h3>FitIndia AI Assistant</h3>
                      <span className="status">Ready to help with your fitness journey!</span>
                    </div>
                  </div>
                  <button className="chat-closer" onClick={handleCloseChat}>&times;</button>
                </div>

                <div className="chat-body">
                  {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                      {msg.sender === 'bot' ? (
                        <div dangerouslySetInnerHTML={formatMessage(msg.text)} />
                      ) : (
                        msg.text
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="message bot">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}

                  {/* Quick Suggestions */}
                  {messages.length === 1 && (
                    <div className="quick-suggestions">
                      <p>Try asking for:</p>
                      {quickSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="suggestion-chip"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <form className="chat-footer" onSubmit={handleSendMessage}>
                  <div className="input-container">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about workouts, diet plans, exercises..."
                      disabled={isLoading}
                    />
                    <button 
                      type="submit" 
                      disabled={isLoading || !inputValue.trim()}
                      className="send-button"
                    >
                      {isLoading ? '⏳' : 'Send'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chatbot;