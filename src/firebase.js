// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc5BiexE_4bkNH7iabVxCugUubOl-wRSk",
  authDomain: "artify-d5f89.firebaseapp.com",
  projectId: "artify-d5f89",
  storageBucket: "artify-d5f89.firebasestorage.app",
  messagingSenderId: "625269707472",
  appId: "1:625269707472:web:e71c5d02878faa8b1684d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export the Auth instance
export const auth = getAuth(app);
