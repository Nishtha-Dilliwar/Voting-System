import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  linkWithCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-V_inMwHhMPHbPi4151fKzhCZcdtXNjw",
  authDomain: "otpverify2001.firebaseapp.com",
  projectId: "otpverify2001",
  storageBucket: "otpverify2001.appspot.com",
  messagingSenderId: "1091132918208",
  appId: "1:1091132918208:web:1b45df528967eb3b6da025",
  measurementId: "G-2W4HTY832Y",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
};





