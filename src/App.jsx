import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginModal from './components/LoginModal/LoginModal';
import Chatbot from './components/Chatbot/Chatbot';
import HomePage from './pages/HomePage';
import Workout from './pages/Workout';
import Store from './pages/Store';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import Diet from './pages/Diet';
import CalorieCheck from './pages/CalorieCheck';
import AICoach from './pages/AICoach';
import { logOut } from "./firebase";
import "./App.css";

// Protected Route Component - NAYA ADD KIYA
const ProtectedRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

// NAYA COMPONENT: Chatbot wrapper jo current location check karega
const ConditionalChatbot = ({ isLoggedIn }) => {
  const location = useLocation();
  
  // Chatbot ko sirf tabhi show karo jab:
  // 1. User logged in ho, AUR
  // 2. Current page diet page na ho
  if (isLoggedIn && location.pathname !== '/diet') {
    return <Chatbot />;
  }
  
  return null;
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true); // Pehle se true - login modal show hoga
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');

  // Component load pe check karo agar user already logged in hai
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUserName(userData.name);
      setUserPicture(userData.photo);
      setIsModalOpen(false); // Agar already logged in hai toh modal band karo
    }
  }, []);

  const openModal = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    // Agar user logged in nahi hai toh modal band hone nahi dena
    if (!isLoggedIn) {
      return;
    }
    setIsModalOpen(false);
  };

  const handleLogin = (name, picture) => {
    const userData = {
      name: name,
      photo: picture,
      isGuest: false
    };
    setIsLoggedIn(true);
    setUserName(name);
    setUserPicture(picture);
    setIsModalOpen(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // NAYA FUNCTION: Guest login ke liye
  const handleGuestLogin = () => {
    const guestUser = {
      name: 'Guest User',
      photo: null,
      isGuest: true
    };
    setIsLoggedIn(true);
    setUserName('Guest User');
    setUserPicture(null);
    setIsModalOpen(false);
    localStorage.setItem('user', JSON.stringify(guestUser));
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggedIn(false);
      setUserName('');
      setUserPicture('');
      localStorage.removeItem('user');
      setIsModalOpen(true); // Logout pe fir se login modal show karo
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar sirf tabhi show karo jab user logged in ho */}
        {isLoggedIn && (
          <Navbar 
            isLoggedIn={isLoggedIn} 
            userName={userName}
            userPicture={userPicture}
            onProfileClick={openModal} 
            onLogout={handleLogout}
          />
        )}
        
        <main>
          <Routes>
            {/* Home page accessible without login (par login modal show hoga) */}
            <Route path="/" element={
              <HomePage isLoggedIn={isLoggedIn} />
            } />
            
            {/* Protected Routes - sirf logged in users hi access kar sakte hain */}
            <Route path="/workout" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Workout />
              </ProtectedRoute>
            } />
            <Route path="/diet" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Diet />
              </ProtectedRoute>
            } />
            <Route path="/calorie-check" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CalorieCheck />
              </ProtectedRoute>
            } />
            <Route path="/ai-coach" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AICoach />
              </ProtectedRoute>
            } />
            <Route path="/store" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Store />
              </ProtectedRoute>
            } />
            <Route path="/workouts/:level" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <WorkoutDetailPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        
        {/* NAYA: Conditional Chatbot - diet page par nahi dikhega */}
        <ConditionalChatbot isLoggedIn={isLoggedIn} />
        
        {/* Footer sirf tabhi show karo jab user logged in ho */}
        {isLoggedIn && <Footer />}
        
        {/* Login Modal - IMPORTANT CHANGES */}
        {isModalOpen && (
          <LoginModal 
            onClose={closeModal} 
            onLogin={handleLogin}
            onGuestLogin={handleGuestLogin} // NAYA PROP ADD KIYA
            isLoggedIn={isLoggedIn} // NAYA PROP - modal control ke liye
          />
        )}
      </div>
    </Router>
  );
}

export default App;