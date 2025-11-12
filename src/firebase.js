// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Yahan Step 1 se copy kiya hua config object paste karein
const firebaseConfig = {
  apiKey: "AIzaSyC3lfDk270x2cY8DrHprn61VfN3YpvLgQA",
  authDomain: "myreactfitnessapp.firebaseapp.com",
  projectId: "myreactfitnessapp",
  storageBucket: "myreactfitnessapp.firebasestorage.app",
  messagingSenderId: "262706661693",
  appId: "1:262706661693:web:f885415b57df5c24179d54",
  measurementId: "G-099VXDSQDB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const logOut = () => {
  return signOut(auth);
};