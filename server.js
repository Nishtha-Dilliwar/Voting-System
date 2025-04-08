// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import admin from "firebase-admin";

// // Initialize dotenv
// dotenv.config();

// // Initialize Firebase Admin SDK
// import { readFileSync } from "fs";
// const serviceAccount = JSON.parse(readFileSync("./config/firebase-service-key.json", "utf8"));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// const users = [
//   { voterId: "VOTER123", phone: "8959928588" },
//   { voterId: "VOTER456", phone: "+919876543210" },
//   { voterId: "VOTER789", phone: "+918765432109" },
// ];

// // 📌 API: Verify OTP using Firebase ID Token
// app.post("/api/verify-otp", async (req, res) => {
//   console.log("Received OTP Verification Request:", req.body);

//   const { voterId, phone, otpIdToken } = req.body;

//   if (!voterId || !phone || !otpIdToken) {
//     console.log("❌ Missing required fields:", { voterId, phone, otpIdToken });
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   const user = users.find((u) => u.voterId === voterId && u.phone === phone);
//   if (!user) {
//     console.log("❌ Invalid voter ID or phone number");
//     return res.status(401).json({ message: "Invalid Voter ID or Phone Number" });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(otpIdToken);
//     console.log("✅ Firebase Decoded Token:", decodedToken);

//     if (decodedToken.phone_number !== phone) {
//       console.log("❌ OTP verification failed. Token does not match phone number.");
//       return res.status(400).json({ message: "OTP verification failed" });
//     }

//     res.json({ message: "OTP verified successfully!" });
//   } catch (error) {
//     console.error("❌ OTP Verification Error:", error);
//     res.status(400).json({ message: "Invalid OTP", error: error.message });
//   }
// });

// // Start Server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import admin from "firebase-admin";
// import { readFileSync } from "fs";

// // Initialize dotenv for environment variables
// dotenv.config();

// // Initialize Firebase Admin SDK with the service account
// const serviceAccount = JSON.parse(readFileSync("./config/firebase-service-key.json", "utf8"));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // Sample Users Data (Replace with actual DB in a real-world app)
// const users = [
//   { voterId: "VOTER123", phone: "+918959928588" },
//   { voterId: "VOTER456", phone: "+919876543210" },
//   { voterId: "VOTER789", phone: "+918765432109" },
// ];

// // 📌 API: Verify OTP using Firebase ID Token
// app.post("/api/verify-otp", async (req, res) => {
//   const { voterId, phone, otpIdToken } = req.body;

//   // Input validation
//   if (!voterId || !phone || !otpIdToken) {
//     return res.status(400).json({ message: "Missing required fields: voterId, phone, otpIdToken" });
//   }
//   console.log("📥 Received:", { voterId, phone, otpIdToken });

//   // Check if the user exists
//   const user = users.find((u) => u.voterId === voterId && u.phone === phone);
//   if (!user) {
//     return res.status(401).json({ message: "Invalid Voter ID or Phone Number" });
//   }

//   try {
//     // Verify the Firebase OTP ID Token
//     const decodedToken = await admin.auth().verifyIdToken(otpIdToken);
//     console.log("✅ Firebase Decoded Token:", decodedToken);

//     console.log("📞 Expected phone:", phone);
//     console.log("📲 Firebase returned phone:", decodedToken.phone_number);


//     // Check if the phone number from Firebase token matches the provided phone number
//     // Normalize phone numbers by removing the "+91" country code before comparing
// if (decodedToken.phone_number.replace("+91", "") !== phone.replace("+91", "")) {
//   console.log("❌ Phone number mismatch!");
//   console.log("📞 Expected phone (user input):", phone);
//   console.log("📲 Firebase returned phone:", decodedToken.phone_number);
  
//   return res.status(400).json({ message: "OTP verification failed. Phone numbers do not match." });
// }


//     // OTP verified successfully
//     res.json({ message: "OTP verified successfully!" });
//   } catch (error) {
//     console.error("❌ OTP Verification Error:", error);
//     res.status(400).json({ message: "Invalid OTP", error: error.message });
//   }
// });


// // Start Server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { readFileSync } from "fs";

dotenv.config();
const serviceAccount = JSON.parse(readFileSync("./config/firebase-service-key.json", "utf8"));

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const users = [
  { voterId: "VOTER123", phone: "+918959928588" },
  { voterId: "VOTER456", phone: "+919876543210" },
  { voterId: "VOTER789", phone: "+918765432109" },
];

app.post("/api/verify-otp", async (req, res) => {
  const { voterId, phone, otpIdToken } = req.body;

  if (!voterId || !phone || !otpIdToken) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = users.find((u) => u.voterId === voterId && u.phone === phone);
  if (!user) return res.status(401).json({ message: "Invalid Voter ID or Phone Number" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(otpIdToken);
    if (decodedToken.phone_number !== phone) {
      return res.status(400).json({ message: "Phone number mismatch" });
    }
    res.json({ message: "OTP verified successfully!" });
  } catch (error) {
    console.error("❌ OTP Verification Error:", error);
    res.status(400).json({ message: "Invalid OTP", error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// function verifyOTP() {
//   let otp = document.getElementById('otp').value;

//   window.confirmationResult.confirm(otp)
//       .then(function (result) {
//           let user = result.user;
//           document.getElementById('message').innerText = "Login successful! Welcome " + user.phoneNumber;
//       })
//       .catch(function (error) {
//           console.error("Error verifying OTP", error);
//           document.getElementById('message').innerText = "Invalid OTP. Please try again.";
//       });
// }
