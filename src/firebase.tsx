// import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// // 🔥 Firebase Config (Replace with your Firebase project credentials)
// const firebaseConfig = {
//   apiKey: "AIzaSyAMsYujHqeG8yTMsTQKKZq5l8u7dzABJIA",
//   authDomain: "voting-system-c80e9.firebaseapp.com",
//   projectId: "voting-system-c80e9",
//   storageBucket: "voting-system-c80e9.appspot.com",
//   messagingSenderId: "143774459644",
//   appId: "1:143774459644:web:ff5cfeeed2506b9a05d979"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Function to set up ReCAPTCHA
// const setupRecaptcha = (phoneNumber) => {
//   window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//     size: "invisible",
//     callback: () => {
//       sendOTP(phoneNumber);
//     },
//   });
// };

// // Function to send OTP
// const sendOTP = async (phoneNumber) => {
//   setupRecaptcha(phoneNumber);
//   try {
//     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
//     window.confirmationResult = confirmationResult;
//     alert("OTP sent successfully!");
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     alert("Error sending OTP. Please try again.");
//   }
// };

// // Function to verify OTP
// const verifyOTP = async (otp) => {
//   try {
//     const result = await window.confirmationResult.confirm(otp);
//     return result.user;
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     alert("Invalid OTP. Please try again.");
//     return null;
//   }
// };

// export { sendOTP, verifyOTP, auth };

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMsYujHqeG8yTMsTQKKZq5l8u7dzABJIA",
    authDomain: "voting-system-c80e9.web.app",
    projectId: "voting-system-c80e9",
    storageBucket: "voting-system-c80e9.appspot.com",
    messagingSenderId: "143774459644",
    appId: "1:143774459644:web:ff5cfeeed2506b9a05d979"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithPhoneNumber, RecaptchaVerifier };
