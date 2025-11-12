import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

function Navbar({ isLoggedIn, userName, userPicture, onProfileClick, onLogout }) {
  const location = useLocation();

  // Updated routes - Calorie Check add kiya
  const navRoutes = [
    { path: "/workout", label: "WORKOUT" },
    { path: "/diet", label: "DIET" },
    { path: "/calorie-check", label: "CALORIE CHECK" },
    { path: "/ai-coach", label: "AI COACH" }
  ];

  return (
    <motion.div 
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Left Section (Logo) */}
      <div className="nav-left">
        <Link to="/" className="logo-text">
            <motion.span 
              className="logo-fit"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Fit
            </motion.span>
            <span className="logo-india">India</span>
        </Link>
      </div>

      {/* Center Links */}
      <div className="nav-center">
        {navRoutes.map((route, index) => {
          const isActive = location.pathname === route.path;

          return (
            <motion.div 
              key={index}
              className={`nav-item ${isActive ? "active" : ""}`}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to={route.path}>{route.label}</Link>
              {isActive && <motion.div layoutId="activeLink" className="active-underline" />}
            </motion.div>
          );
        })}
      </div>

      {/* Right Section (Profile/Login) */}
      <div className="nav-right">
        {isLoggedIn ? (
          <motion.div 
            className="user-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {userPicture ? (
              <img src={userPicture} alt={userName} className="profile-picture" />
            ) : (
              <div className="profile-initial">
                {userName ? userName.charAt(0) : ''}
              </div>
            )}
            <span>Hi, {userName.split(' ')[0]}</span>
            <motion.button 
              onClick={onLogout} 
              className="logout-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </motion.div>
        ) : (
          <motion.img 
            src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_26,q_auto:good,f_auto,dpr_2,fl_progressive/image/test/header/Profile.png" 
            alt="profile" 
            className="profile-icon"
            onClick={onProfileClick} 
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          />
        )}
      </div>
    </motion.div>
  );
}

export default Navbar;