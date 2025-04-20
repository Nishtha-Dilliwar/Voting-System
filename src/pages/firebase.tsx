import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  linkWithCredential,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAMsYujHqeG8yTMsTQKKZq5l8u7dzABJIA",
  authDomain: "voting-system-c80e9.firebaseapp.com",
  projectId: "voting-system-c80e9",
  storageBucket: "voting-system-c80e9.firebasestorage.app",
  messagingSenderId: "143774459644",
  appId: "1:143774459644:web:ff5cfeeed2506b9a05d979",
  measurementId: "G-K8VNFCY1BD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
};





