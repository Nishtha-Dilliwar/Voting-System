// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Corrected Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAMsYujHqeG8yTMsTQKKZq5l8u7dzABJIA",
  authDomain: "voting-system-c80e9.firebaseapp.com",
  projectId: "voting-system-c80e9",
  storageBucket: "voting-system-c80e9.firebasestorage.app",
  messagingSenderId: "143774459644",
  appId: "1:143774459644:web:ff5cfeeed2506b9a05d979"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🚫 Remove this in production (was causing your error before)
// auth.settings.appVerificationDisabledForTesting = true;

export { auth };