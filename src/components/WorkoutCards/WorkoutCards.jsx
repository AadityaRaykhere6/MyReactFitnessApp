import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WorkoutCards.css';
import { workoutData } from '../../data';

function WorkoutCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // 🎯 Perfect stagger timing
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, // 🎯 Longer for smoothness
        ease: [0.25, 0.46, 0.45, 0.94], // 🎯 Smooth easing
        type: "spring",
        stiffness: 60, // 🎯 Softer spring
        damping: 15 // 🎯 Balanced damping
      } 
    },
  };
  
  // 🎯 SMOOTH CARD TRANSITION
  const cardTransition = {
    type: "spring",
    stiffness: 200, // 🎯 Softer for smoothness
    damping: 25, // 🎯 More damping for smooth stop
    duration: 0.6 // 🎯 Balanced duration
  };

  // Enhanced Gradients with Glass Morphism
  const cardGradients = [
    'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)',
    'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%)',
    'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%)',
  ];

  const cardBorderColors = [
    'rgba(16, 185, 129, 0.3)',
    'rgba(245, 158, 11, 0.3)', 
    'rgba(239, 68, 68, 0.3)',
  ];

  const iconColors = [
    '#10B981',
    '#F59E0B',
    '#EF4444',
  ];

  return (
    <motion.section 
      ref={ref}
      className="workout-cards-section"
      variants={containerVariants}
      initial="hidden"
      animate={mainControls}
    >
      {workoutData.map((card, index) => (
        <motion.div 
          className="card" 
          key={card.id} 
          variants={cardVariants}
          onHoverStart={() => setHoveredId(card.id)}
          onHoverEnd={() => setHoveredId(null)}
          animate={{
            scale: hoveredId === card.id ? 1.08 : 1,
            y: hoveredId === card.id ? -15 : 0,
            filter: hoveredId && hoveredId !== card.id ? 'blur(3px)' : 'blur(0px)',
            opacity: hoveredId && hoveredId !== card.id ? 0.7 : 1,
            zIndex: hoveredId === card.id ? 20 : 1,
            borderColor: hoveredId === card.id ? cardBorderColors[index] : 'rgba(255,255,255,0.1)',
            background: cardGradients[index],
          }}
          transition={cardTransition}
          style={{
            border: `1px solid ${cardBorderColors[index]}`,
          }}
        >
          {/* Floating Particles */}
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>

          <Link to={`/workouts/${card.level.toLowerCase()}`} className="card-link-wrapper">
            {card.icon && (
              <motion.i 
                className={`card-icon ${card.icon}`} 
                animate={{
                  scale: hoveredId === card.id ? 1.2 : 1,
                  y: hoveredId === card.id ? -10 : 0,
                  color: hoveredId === card.id ? 'white' : iconColors[index],
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, // 🎯 Softer spring
                  damping: 15,
                  duration: 0.6 // 🎯 Smooth duration
                }}
              />
            )}
            
            <motion.div 
              className="card-level-text"
              animate={{
                y: hoveredId === card.id ? -8 : 0,
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut" 
              }}
            >
              {card.level}
            </motion.div>
            
            <motion.div 
              className="card-title-text"
              animate={{
                y: hoveredId === card.id ? -8 : 0,
                scale: hoveredId === card.id ? 1.05 : 1,
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut" 
              }}
            >
              {card.title}
            </motion.div>
            
            <motion.p 
              className="card-description"
              animate={{
                y: hoveredId === card.id ? -8 : 0,
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut" 
              }}
            >
              {card.description}
            </motion.p>

            {/* 🎯 Smooth Hover Arrow Indicator */}
            <div className="hover-arrow">
              →
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.section>
  );
}

export default WorkoutCards;