import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

// Global variable to store auto message
let pendingAutoMessage = '';

// Global function to open chatbot with message
const openChatbotWithMessage = (message) => {
  pendingAutoMessage = message;
  
  // Multiple methods try karte hain
  const chatbotButton = document.querySelector('.chat-opener');
  if (chatbotButton) {
    chatbotButton.click();
    console.log('Auto message set:', message);
  } else {
    // Alternative methods
    console.log('Chatbot button not found, trying alternatives...');
    
    // Method 1: LocalStorage use karo
    localStorage.setItem('autoChatbotMessage', message);
    
    // Method 2: Custom event trigger karo
    const event = new CustomEvent('openChatbot', { 
      detail: { message: message } 
    });
    window.dispatchEvent(event);
    
    // Method 3: Direct URL navigation (agar chatbot separate route pe hai)
    // navigate('/chatbot');
  }
};

// BMI Calculator Component - ENHANCED WITH ICONS AND RESET BUTTON
const BmiCalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('');

    const calculateBmi = (e) => {
        e.preventDefault();
        if (height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);

            let categoryMsg = '';
            let categoryType = '';
            
            if (bmiValue < 18.5) {
                categoryMsg = 'Underweight';
                categoryType = 'underweight';
            } else if (bmiValue >= 18.5 && bmiValue < 25) {
                categoryMsg = 'Normal weight';
                categoryType = 'normal';
            } else if (bmiValue >= 25 && bmiValue < 30) {
                categoryMsg = 'Overweight';
                categoryType = 'overweight';
            } else {
                categoryMsg = 'Obesity';
                categoryType = 'obesity';
            }
            
            setMessage(categoryMsg);
            setCategory(categoryType);
        } else {
            setBmi(null);
            setMessage('Please enter valid height and weight.');
            setCategory('');
        }
    };

    // Reset function - NAYA ADD KIYA
    const resetCalculator = () => {
        setHeight('');
        setWeight('');
        setBmi(null);
        setMessage('');
        setCategory('');
    };

    // Category icons and colors
    const categoryData = {
        underweight: { icon: '📊', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.1)' },
        normal: { icon: '✅', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)' },
        overweight: { icon: '⚠️', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.1)' },
        obesity: { icon: '🚨', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.1)' }
    };

    const currentCategory = categoryData[category] || { icon: '📈', color: '#6B7280', bgColor: 'rgba(107, 114, 128, 0.1)' };

    return (
        <form className="bmi-calculator" onSubmit={calculateBmi}>
            {/* Header with Icon */}
            <div className="bmi-header">
                <div className="bmi-icon">⚖️</div>
                <h3>BMI Calculator</h3>
            </div>
            
            <div className="bmi-inputs">
                <div className="input-group">
                    <label htmlFor="height">
                        <span className="input-icon">📏</span>
                        Height (cm)
                    </label>
                    <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g., 175"
                        min="100"
                        max="250"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="weight">
                        <span className="input-icon">⚖️</span>
                        Weight (kg)
                    </label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g., 70"
                        min="30"
                        max="200"
                    />
                </div>
            </div>
            
            {/* Button Group - NAYA ADD KIYA */}
            <div className="bmi-button-group">
                <button type="submit" className="btn-primary bmi-button calculate-btn">
                    <span className="button-icon">🧮</span>
                    Calculate BMI
                </button>
                
                {/* Reset Button - NAYA ADD KIYA */}
                {(height || weight || bmi) && (
                    <button 
                        type="button" 
                        className="btn-secondary bmi-button reset-btn"
                        onClick={resetCalculator}
                    >
                        <span className="button-icon">🔄</span>
                        Reset
                    </button>
                )}
            </div>
            
            {bmi && (
                <div 
                    className="bmi-result" 
                    style={{ 
                        borderLeft: `4px solid ${currentCategory.color}`,
                        backgroundColor: currentCategory.bgColor
                    }}
                >
                    <div className="bmi-result-header">
                        <span className="category-icon">{currentCategory.icon}</span>
                        <div className="bmi-value">
                            <span className="bmi-number">{bmi}</span>
                            <span className="bmi-label">BMI</span>
                        </div>
                    </div>
                    <div className="bmi-category">
                        <p style={{ color: currentCategory.color }}>
                            <strong>{message}</strong>
                        </p>
                    </div>
                    
                    {/* BMI Scale Indicator */}
                    <div className="bmi-scale">
                        <div className="scale-labels">
                            <span>Underweight</span>
                            <span>Normal</span>
                            <span>Overweight</span>
                            <span>Obesity</span>
                        </div>
                        <div className="scale-bar">
                            <div 
                                className="scale-indicator" 
                                style={{ 
                                    left: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%`,
                                    backgroundColor: currentCategory.color
                                }}
                            ></div>
                        </div>
                        <div className="scale-markers">
                            <span>18.5</span>
                            <span>25</span>
                            <span>30</span>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Quick Tips */}
            {!bmi && (
                <div className="bmi-tips">
                    <div className="tip-item">
                        <span className="tip-icon">💡</span>
                        <span>BMI helps assess health risks</span>
                    </div>
                    <div className="tip-item">
                        <span className="tip-icon">🎯</span>
                        <span>Normal range: 18.5 - 24.9</span>
                    </div>
                </div>
            )}
        </form>
    );
};

// Slide Component
const Slide = ({ slide, isActive, onButtonClick }) => {
  const handleButtonClick = () => {
    if (slide.onButtonClick) {
      slide.onButtonClick();
    } else if (onButtonClick) {
      onButtonClick(slide.buttonText);
    }
  };

  return (
    <div className={`slide-container ${isActive ? 'active' : ''}`}>
      <div className="slide-content">
        <div className="text-content">
          <h1 className="title-text">{slide.title}</h1>
          <p className="description-text">{slide.description}</p>
          {slide.buttonText && (
            <button className="btn-primary" onClick={handleButtonClick}>
              {slide.buttonText}
            </button>
          )}
        </div>
        {slide.component ? (
            <div className="component-wrapper">{slide.component}</div>
        ) : (
            <div className="slide-image-wrapper">
                <img src={slide.imageUrl} alt={slide.title} className="slide-image" />
            </div>
        )}
      </div>
    </div>
  );
}

function HeroSection() {
    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();

    const goToNext = () => {
        setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const goToPrev = () => {
        setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    // Scroll to workout cards function
    const scrollToWorkoutCards = () => {
        const workoutCardsSection = document.querySelector('.workout-cards-section');
        if (workoutCardsSection) {
            workoutCardsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            workoutCardsSection.style.transform = 'scale(1.05)';
            setTimeout(() => {
                workoutCardsSection.style.transform = 'scale(1)';
            }, 300);
        }
    };
    
    // Naya function Posture Correction section tak scroll karne ke liye
    const scrollToPostureCorrection = () => {
        const postureSection = document.querySelector('.how-it-works-section');
        if (postureSection) {
            postureSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Improved chatbot trigger function
    const triggerChatbot = (message) => {
        console.log("Triggering chatbot with message:", message);
        
        // Multiple methods try karte hain
        pendingAutoMessage = message;
        
        // Method 1: LocalStorage (most reliable)
        localStorage.setItem('autoChatbotMessage', message);
        localStorage.setItem('pendingChatbotMessage', message);
        
        // Method 2: Custom event
        const event = new CustomEvent('openChatbot', { 
            detail: { message: message } 
        });
        window.dispatchEvent(event);
        
        // Method 3: Direct button click
        setTimeout(() => {
            const chatbotButtons = document.querySelectorAll('.chat-opener, .chatbot-button, [class*="chat"], [id*="chat"]');
            if (chatbotButtons.length > 0) {
                chatbotButtons[0].click();
                console.log('Chatbot button clicked');
            } else {
                console.log('No chatbot button found');
                // Fallback: alert user
                alert('Chatbot will open with your diet plan request. Please check the chatbot icon.');
            }
        }, 100);
    };

    // Button click handler
    const handleButtonClick = (buttonText) => {
        switch(buttonText) {
            case "EXPLORE PLANS":
                scrollToWorkoutCards();
                break;
            case "CREATE MY PLAN":
                triggerChatbot("Create a personalized diet plan for me based on my fitness goals");
                break;
            case "CHECK POSTURE":
                scrollToPostureCorrection();
                break;
            default:
                console.log(`Button "${buttonText}" clicked`);
        }
    };

    // Slide Data with Different Functionalities
    const slides = [
      {
        title: "WE ARE FIT",
        description: "A fitness movement that is worth breaking a sweat for. Join us and discover your true potential.",
        buttonText: "EXPLORE PLANS",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1170&q=80",
        gradient: 'linear-gradient(-45deg, #0b101b, #111729, #182030, #7f51e1)'
      },
      {
        title: "Personalized Diets",
        description: "Unlock your potential with personalized diet plans. Our experts craft delicious, easy-to-follow meal guides tailored to your unique goals.",
        buttonText: "CREATE MY PLAN",
        imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1170&q=80",
        gradient: 'linear-gradient(-45deg, #047857, #065f46, #059669, #15803d)'
      },
      {
        title: "Posture Check",
        description: "Use our AI-powered tool to analyze and correct your posture for a healthier, pain-free life.",
        buttonText: "CHECK POSTURE",
        imageUrl: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1170&q=80",
        gradient: 'linear-gradient(-45deg, #1d4ed8, #1e3a8a, #1e40af, #2563eb)'
      },
      {
        title: "Calculate Your BMI",
        description: "A healthy lifestyle starts with knowing your numbers. Calculate your Body Mass Index to understand your fitness level.",
        buttonText: "",
        component: <BmiCalculator />,
        gradient: 'linear-gradient(-45deg, #4a044e, #701a75, #a21caf, #c026d3)'
      }
    ];

    return (
        <section 
            className="hero-section"
            style={{ '--bg-gradient': slides[activeSlide].gradient }}
        >
            <div className="slider-viewport">
                <div 
                    className="slides-wrapper"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <Slide 
                            key={index} 
                            slide={slide} 
                            isActive={index === activeSlide}
                            onButtonClick={handleButtonClick}
                        />
                    ))}
                </div>
            </div>

            <button onClick={goToPrev} className="nav-arrow left-arrow">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={goToNext} className="nav-arrow right-arrow">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="nav-dots">
                {slides.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setActiveSlide(index)} 
                        className={`nav-dot ${activeSlide === index ? 'active' : ''}`} 
                    />
                ))}
            </div>
        </section>
    );
}

// Export global variable for chatbot to access
export { pendingAutoMessage };

export default HeroSection;