import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PostureCorrection from '../components/PostureCorrection/PostureCorrection';
import './AICoach.css';

function AICoach() {
  const [showPostureCorrection, setShowPostureCorrection] = useState(false);

  if (showPostureCorrection) {
    return (
      <>
        <motion.button
          className="back-button"
          onClick={() => setShowPostureCorrection(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ← Back to AI Coach
        </motion.button>
        <PostureCorrection />
      </>
    );
  }

  return (
    <div className="ai-coach-page">
      {/* Hero Section */}
      <section className="ai-coach-hero">
        <motion.div 
          className="ai-coach-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="hero-icon"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🤖
          </motion.div>
          
          <h1>AI Fitness Coach</h1>
          
          <p>Real-time form correction and personalized workout guidance</p>

          <motion.button
            className="try-now-button"
            onClick={() => setShowPostureCorrection(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Start Coaching
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="ai-coach-features">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="feature-icon">🎯</div>
              <h3>Select Exercise</h3>
              <p>Choose from bicep curls, squats, or shoulder press</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="feature-icon">📱</div>
              <h3>Enable Camera</h3>
              <p>Allow camera access for real-time analysis</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="feature-icon">💡</div>
              <h3>Get Feedback</h3>
              <p>Receive instant form corrections and rep counting</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AICoach;