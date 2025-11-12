import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Diet.css';

function Diet() {
  const [showChatbot, setShowChatbot] = useState(false);

  const features = [
    {
      icon: "🎯",
      title: "Personalized Plans",
      description: "AI-powered diet plans tailored to your body type and goals"
    },
    {
      icon: "📊", 
      title: "Smart Tracking",
      description: "Track calories, macros, and progress with intuitive tools"
    },
    {
      icon: "👨‍⚕️",
      title: "Expert Guidance", 
      description: "Get advice from certified nutritionists and fitness experts"
    },
    {
      icon: "🔄",
      title: "Flexible Adjustments",
      description: "Easily modify plans based on your preferences and results"
    }
  ];

  const ChatbotButton = () => (
    <motion.div 
      className="floating-chatbot-trigger"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setShowChatbot(true)}
    >
      <div className="chatbot-orb">
        <span className="chat-icon">💬</span>
        <div className="pulse-ring"></div>
        <div className="pulse-ring delay-1"></div>
      </div>
      <motion.div 
        className="chatbot-tooltip"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        Need help choosing? Ask AI Assistant
      </motion.div>
    </motion.div>
  );

  const ChatbotModal = () => {
  const [chatMessages, setChatMessages] = useState([
    { text: "Namaste🙏 I'm your Fit India Nutritionist. How can I help you with your diet today?", sender: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');

  const handleQuickAction = (action) => {
    // User message add karo
    const userMessage = { text: action, sender: 'user' };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Bot response based on action
    let botResponse = '';
    
    switch(action) {
      case '💪 Weight Loss Plan':
        botResponse = `Perfect! Here's a **Weight Loss Plan** for you:

**Daily Target:** 1500-1800 calories
**Macros:** 40% Protein, 30% Carbs, 30% Fats

**Sample Meal Plan:**
| Meal Time | Food Items | Calories |
|-----------|------------|----------|
| Breakfast | Oats + Fruits + Protein Shake | 400 cal |
| Lunch | Grilled Chicken + Salad | 450 cal |
| Snack | Greek Yogurt + Nuts | 200 cal |
| Dinner | Fish + Vegetables | 350 cal |

**Tips:** 
• Drink 3-4L water daily
• Include protein in every meal
• Avoid sugary drinks
• 30 mins walk daily`;
        break;
        
      case '🏃‍♂️ Muscle Gain Plan':
        botResponse = `Great choice! **Muscle Gain Plan**:

**Daily Target:** 2500-3000 calories  
**Macros:** 35% Protein, 45% Carbs, 20% Fats

**Sample Meal Plan:**
| Meal Time | Food Items | Calories |
|-----------|------------|----------|
| Breakfast | Eggs + Avocado + Toast | 500 cal |
| Pre-Workout | Banana + Protein Shake | 300 cal |
| Post-Workout | Chicken + Rice + Veggies | 600 cal |
| Dinner | Salmon + Sweet Potato | 450 cal |

**Key Focus:**
• Calorie surplus for growth
• Protein intake: 1.6-2.2g per kg body weight
• Carbs around workouts
• Proper recovery meals`;
        break;
        
      case '📊 Calculate My Calories':
        botResponse = `To calculate your daily calories:

**Step 1 - Basal Metabolic Rate (BMR):**
Men: BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)
Women: BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)

**Step 2 - Activity Multiplier:**
• Sedentary: BMR × 1.2
• Light exercise: BMR × 1.375  
• Moderate exercise: BMR × 1.55
• Heavy exercise: BMR × 1.725

**Step 3 - Goal Adjustment:**
• Weight Loss: Subtract 500 calories
• Muscle Gain: Add 500 calories

Tell me your age, weight, height, gender and activity level for precise calculation!`;
        break;
        
      case '🍽️ Custom Meal Plan':
        botResponse = `I'd love to create a **Custom Meal Plan** for you! 

To get started, please tell me:
1. Your primary goal (weight loss/muscle gain/maintenance)
2. Current weight and height
3. Dietary preferences (veg/non-veg/vegan)
4. Any food allergies or restrictions
5. Your daily activity level

Based on this, I'll create a personalized plan just for you! 💪`;
        break;
        
      default:
        botResponse = "I understand you're interested in " + action + ". How can I assist you with this?";
    }
    
    // Thoda delay dekar bot response add karo (typing effect ke liye)
    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // User message add karo
    const userMessage = { text: userInput, sender: 'user' };
    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    
    // Simple bot response (tum backend connect kar sakte ho baad mein)
    setTimeout(() => {
      const botResponse = "Thanks for your message! I can help you with diet plans, calorie calculations, and nutrition advice. What specific help do you need?";
      setChatMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const formatMessage = (text) => {
    if (!text) return text;
    
    // Table formatting
    let formattedText = text;
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

    // Bold text formatting
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Line breaks
    formattedText = formattedText.replace(/\n/g, '<br />');
    
    return { __html: formattedText };
  };

  return (
    <AnimatePresence>
      {showChatbot && (
        <motion.div 
          className="chatbot-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowChatbot(false)}
        >
          <motion.div 
            className="chatbot-modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="chatbot-header">
              <div className="bot-avatar">
                <span>🤖</span>
                <div className="online-dot"></div>
              </div>
              <div className="bot-info">
                <h3>Fit India Nutritionist</h3>
                <p>Ready to create your perfect diet plan!</p>
              </div>
              <button className="close-btn" onClick={() => setShowChatbot(false)}>
                ×
              </button>
            </div>

            <div className="chatbot-body">
              {/* Chat Messages Display */}
              <div className="chat-messages">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.sender}`}>
                    {msg.sender === 'bot' ? (
                      <div dangerouslySetInnerHTML={formatMessage(msg.text)} />
                    ) : (
                      msg.text
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Actions - Sirf first message ke baad dikhao */}
              {chatMessages.length === 1 && (
                <div className="quick-actions-section">
                  <div className="welcome-message">
                    <p>Quickly get started with:</p>
                  </div>
                  
                  <div className="quick-actions">
                    <button 
                      className="action-btn" 
                      onClick={() => handleQuickAction('💪 Weight Loss Plan')}
                    >
                      💪 Weight Loss Plan
                    </button>
                    <button 
                      className="action-btn" 
                      onClick={() => handleQuickAction('🏃‍♂️ Muscle Gain Plan')}
                    >
                      🏃‍♂️ Muscle Gain Plan  
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleQuickAction('📊 Calculate My Calories')}
                    >
                      📊 Calculate My Calories
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleQuickAction('🍽️ Custom Meal Plan')}
                    >
                      🍽️ Custom Meal Plan
                    </button>
                  </div>
                </div>
              )}

              {/* Diet Tips - Sirf first message ke baad */}
              {chatMessages.length === 1 && (
                <div className="diet-tips">
                  <h4>💡 Pro Nutrition Tips</h4>
                  <ul>
                    <li>Drink 3-4L water daily for optimal metabolism</li>
                    <li>Include 20-30g protein in every meal</li>
                    <li>Don't skip healthy fats (avocado, nuts, olive oil)</li>
                    <li>Time your carbs around workouts for energy</li>
                    <li>Eat colorful vegetables for micronutrients</li>
                  </ul>
                </div>
              )}
            </div>

            <form className="chatbot-footer" onSubmit={handleSendMessage}>
              <div className="input-container">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask about nutrition, diets, or meal plans..."
                />
                <button type="submit" className="send-btn">Send</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

  return (
    <div className="diet-page">
      {/* Hero Section */}
      <section className="diet-hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Transform Your Body With Smart Nutrition</h1>
          <p>AI-powered diet plans that adapt to your goals, lifestyle, and preferences</p>
          <motion.button 
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChatbot(true)} // Yahan chatbot open hoga
          >
            Start Your Journey
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="floating-elements">
            <div className="floating-item protein">🥩</div>
            <div className="floating-item veggie">🥦</div>
            <div className="floating-item fruit">🍎</div>
            <div className="floating-item grain">🌾</div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Why Our Diet Plans Work
          </motion.h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Chatbot Trigger */}
      <ChatbotButton />
      
      {/* Chatbot Modal */}
      <ChatbotModal />
    </div>
  );
}

export default Diet;