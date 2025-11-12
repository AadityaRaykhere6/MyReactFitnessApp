// src/components/LoginModal/LoginModal.jsx - UPDATED
import React from 'react';
import { signInWithGoogle } from '../../firebase';
import './LoginModal.css';

function LoginModal({ onClose, onLogin, onGuestLogin, isLoggedIn }) {

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log(result.user);
      onLogin(result.user.displayName, result.user.photoURL);
    } catch (error) {
      console.error("Firebase login error: ", error);
      alert("Google sign-in failed.");
    }
  };

  const handleGuestLogin = () => {
    onGuestLogin();
  };

  // Agar user already logged in hai toh modal band karo
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="context">
        <div className="modal-overlay">
            {/* onClose hata diya - user ko force karo login karne ke liye */}
            <div className="modal-content">
                {/* Close button hata diya - user ko login karna hi hoga */}
                <h2>Welcome to Fitness App</h2>
                <p>Please login to continue your fitness journey</p>
                
                {/* Google Login Button */}
                <button className="google-login-button" onClick={handleGoogleSignIn}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo" />
                  Sign in with Google
                </button>

                {/* Guest Login Button - NAYA ADD KIYA */}
                <button className="guest-login-button" onClick={handleGuestLogin}>
                  Continue as Guest
                </button>

                <p style={{marginTop: '20px', fontSize: '14px', opacity: '0.7'}}>
                  You must login to access all features
                </p>
            </div>
        </div>

        {/* Background Animation */}
        <div className="area">
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
        </div>
    </div>
  );
}

export default LoginModal;