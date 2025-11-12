import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import WorkoutCards from '../components/WorkoutCards/WorkoutCards';
import PostureCorrection from '../components/PostureCorrection/PostureCorrection';

function HomePage({ isLoggedIn }) {
  return (
    <div className="homepage-container">
      {/* Agar user logged in nahi hai toh homepage content show mat karo */}
      {!isLoggedIn ? (
        <div style={{ 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}>
          <div>
            <h1>Welcome to Fitness App</h1>
            <p>Please login to access all features</p>
          </div>
        </div>
      ) : (
        // Agar user logged in hai toh normal homepage content show karo
        <>
          <div className="hero-and-cards-container">
            <HeroSection />
            <WorkoutCards />
          </div>
          <div className="main-content">
            <PostureCorrection />
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;