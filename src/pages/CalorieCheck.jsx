import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CalorieCheck.css';

function CalorieCheck() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activityLevel: 'sedentary',
    goal: 'maintain'
  });

  const [result, setResult] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);

  const activityLevels = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const goalMultipliers = {
    lose: 0.85,
    maintain: 1,
    gain: 1.15
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateCalories = async (e) => {
    e.preventDefault();
    
    const { age, gender, weight, height, activityLevel, goal } = formData;
    
    if (!age || !weight || !height) {
      alert('Please fill all required fields');
      return;
    }

    setIsCalculating(true);

    // Animation delay ke liye
    await new Promise(resolve => setTimeout(resolve, 1500));

    const ageNum = parseInt(age);
    const weightNum = parseInt(weight);
    const heightNum = parseInt(height);

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const tdee = bmr * activityLevels[activityLevel];
    const goalCalories = Math.round(tdee * goalMultipliers[goal]);
    const protein = Math.round((goalCalories * 0.3) / 4);
    const carbs = Math.round((goalCalories * 0.45) / 4);
    const fats = Math.round((goalCalories * 0.25) / 9);

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories,
      protein,
      carbs,
      fats,
      goal
    });
    
    // Form hide karo aur result show karo
    setShowForm(false);
    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setFormData({
      age: '',
      gender: 'male',
      weight: '',
      height: '',
      activityLevel: 'sedentary',
      goal: 'maintain'
    });
    setResult(null);
    setShowForm(true);
  };

  const getGoalText = (goal) => {
    switch(goal) {
      case 'lose': return 'Weight Loss';
      case 'maintain': return 'Weight Maintenance';
      case 'gain': return 'Weight Gain';
      default: return '';
    }
  };

  // Floating animation elements
  const floatingElements = [
    { emoji: '🔥', style: { top: '10%', left: '5%', animationDelay: '0s' } },
    { emoji: '⚡', style: { top: '20%', right: '10%', animationDelay: '1s' } },
    { emoji: '💪', style: { bottom: '30%', left: '8%', animationDelay: '2s' } },
    { emoji: '🏃‍♂️', style: { bottom: '15%', right: '7%', animationDelay: '1.5s' } },
    { emoji: '🥗', style: { top: '40%', left: '12%', animationDelay: '0.5s' } }
  ];

  return (
    <div className="calorie-check-page">
      {/* Floating Background Elements */}
      <div className="floating-background">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="floating-emoji"
            style={element.style}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 4,
              delay: index * 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {element.emoji}
          </motion.div>
        ))}
      </div>

      <div className="container">
        {/* Header Section */}
        <motion.div 
          className="calorie-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <h1>Calorie Calculator</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {showForm ? 'Calculate your daily calorie needs and macronutrient requirements' : 'Your Personalized Calorie Results'}
          </motion.p>
          
          {/* Animated Progress Bar */}
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ delay: 0.6, duration: 1 }}
          />
        </motion.div>

        {/* Centered Content with Slide Transition */}
        <div className="calorie-centered-content">
          <AnimatePresence mode="wait">
            {showForm ? (
              // Form Section
              <motion.div 
                key="form"
                className="calculator-form-centered"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100, scale: 0.8 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Enter Your Details
                </motion.h2>

                <form onSubmit={calculateCalories}>
                  <div className="form-grid-centered">
                    {/* Age Input */}
                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label>
                        <span className="input-icon">🎂</span>
                        Age *
                      </label>
                      <motion.input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        min="15"
                        max="100"
                        required
                        whileFocus={{ borderColor: "#7f51e1" }}
                      />
                    </motion.div>

                    {/* Gender Select */}
                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label>
                        <span className="input-icon">🚻</span>
                        Gender *
                      </label>
                      <motion.select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange}
                        whileFocus={{ borderColor: "#7f51e1" }}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </motion.select>
                    </motion.div>

                    {/* Weight Input */}
                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label>
                        <span className="input-icon">⚖️</span>
                        Weight (kg) *
                      </label>
                      <motion.input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Enter weight in kg"
                        min="30"
                        max="200"
                        required
                        whileFocus={{ borderColor: "#7f51e1" }}
                      />
                    </motion.div>

                    {/* Height Input */}
                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label>
                        <span className="input-icon">📏</span>
                        Height (cm) *
                      </label>
                      <motion.input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="Enter height in cm"
                        min="100"
                        max="250"
                        required
                        whileFocus={{ borderColor: "#7f51e1" }}
                      />
                    </motion.div>

                    {/* Activity Level */}
                    <motion.div 
                      className="form-group full-width"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <label>
                        <span className="input-icon">🏃‍♂️</span>
                        Activity Level *
                      </label>
                      <motion.select 
                        name="activityLevel" 
                        value={formData.activityLevel} 
                        onChange={handleChange}
                        whileFocus={{ borderColor: "#7f51e1" }}
                      >
                        <option value="sedentary">💺 Sedentary (Little to no exercise)</option>
                        <option value="light">🚶‍♂️ Light (Exercise 1-3 days/week)</option>
                        <option value="moderate">🏃‍♂️ Moderate (Exercise 3-5 days/week)</option>
                        <option value="active">💪 Active (Exercise 6-7 days/week)</option>
                        <option value="veryActive">🔥 Very Active (Hard daily exercise)</option>
                      </motion.select>
                    </motion.div>

                    {/* Goal */}
                    <motion.div 
                      className="form-group full-width"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <label>
                        <span className="input-icon">🎯</span>
                        Your Goal *
                      </label>
                      <motion.select 
                        name="goal" 
                        value={formData.goal} 
                        onChange={handleChange}
                        whileFocus={{ borderColor: "#7f51e1" }}
                      >
                        <option value="lose">⬇️ Lose Weight</option>
                        <option value="maintain">⚖️ Maintain Weight</option>
                        <option value="gain">⬆️ Gain Weight</option>
                      </motion.select>
                    </motion.div>
                  </div>

                  {/* Buttons */}
                  <motion.div 
                    className="form-actions-centered"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.button 
                      type="submit" 
                      className="calculate-btn"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 15px 30px rgba(127, 81, 225, 0.6)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isCalculating}
                    >
                      {isCalculating ? (
                        <div className="loading-animation">
                          <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <span className="loading-text">Calculating Your Calories</span>
                        </div>
                      ) : (
                        'Calculate Calories'
                      )}
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            ) : (
              // Results Section
              <motion.div 
                key="results"
                className="results-section-centered"
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
              >
                {/* Back Button */}
                <motion.button 
                  onClick={resetCalculator}
                  className="back-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  ← Back to Calculator
                </motion.button>

                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Your Calorie Results
                </motion.h2>
                
                <div className="results-grid-centered">
                  {/* Main Result Card */}
                  <motion.div 
                    className="result-card main-result"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <h3>🎯 Daily Calorie Target</h3>
                    <motion.div 
                      className="calorie-number"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      {result.goalCalories}
                    </motion.div>
                    <p>calories per day for {getGoalText(result.goal)}</p>
                  </motion.div>

                  {/* BMR Card */}
                  <motion.div 
                    className="result-card"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <h3>⚡ BMR</h3>
                    <div className="number">{result.bmr}</div>
                    <p>Basal Metabolic Rate</p>
                  </motion.div>

                  {/* TDEE Card */}
                  <motion.div 
                    className="result-card"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <h3>🔥 TDEE</h3>
                    <div className="number">{result.tdee}</div>
                    <p>Total Daily Energy Expenditure</p>
                  </motion.div>
                </div>

                {/* Macronutrients Section */}
                <motion.div 
                  className="macronutrients"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3>🍽️ Recommended Macronutrients</h3>
                  <div className="macro-grid-centered">
                    <motion.div 
                      className="macro-card protein"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <h4>🥩 Protein</h4>
                      <div className="macro-amount">{result.protein}g</div>
                      <p>30% of calories</p>
                    </motion.div>
                    
                    <motion.div 
                      className="macro-card carbs"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <h4>🍚 Carbs</h4>
                      <div className="macro-amount">{result.carbs}g</div>
                      <p>45% of calories</p>
                    </motion.div>
                    
                    <motion.div 
                      className="macro-card fats"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <h4>🥑 Fats</h4>
                      <div className="macro-amount">{result.fats}g</div>
                      <p>25% of calories</p>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="results-note"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <p>💡 <strong>Note:</strong> These are estimates. Adjust based on your progress and consult a nutritionist for personalized advice.</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default CalorieCheck;