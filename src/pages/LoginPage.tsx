import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/newvote.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, signInWithPhoneNumber } from "../../src/firebase"; // Import Firebase auth
import { RecaptchaVerifier } from "firebase/auth";

// Declare `window.confirmationResult` globally
declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}

const LoginPage: React.FC = () => {
    const [voterId, setVoterId] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById("voterIdInput")?.focus();
    }, []);

    // 🔹 Setup reCAPTCHA (Firebase Requires It)
    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
                callback: () => {
                    console.log("reCAPTCHA Verified");
                },
                "expired-callback": () => {
                    console.log("reCAPTCHA Expired. Resetting...");
                    window.recaptchaVerifier = null;
                    setupRecaptcha();
                },
            });
        }
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
    
        if (!voterId || !mobile) {
            setError("Please fill in all fields.");
            return;
        }
    
        let formattedPhone = mobile.trim().replace(/\s+/g, "");
        if (!formattedPhone.startsWith("+")) {
            formattedPhone = "+91" + formattedPhone;
        }
    
        try {
            setLoading(true);
            
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                    size: "invisible",
                    callback: () => console.log("✅ reCAPTCHA Verified"),
                    "expired-callback": () => {
                        console.log("❌ reCAPTCHA Expired. Resetting...");
                        window.recaptchaVerifier = null;
                        setupRecaptcha();
                    },
                });
            }
    
            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
            window.confirmationResult = confirmationResult;
            toast.success("OTP sent successfully!");
            setOtpSent(true);
        } catch (err) {
            setError("Error sending OTP. Please enter a valid phone number.");
            console.error("Firebase Error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
    
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
    
        try {
            setLoading(true);
    
            if (!window.confirmationResult) {
                setError("OTP expired. Please request a new one.");
                return;
            }
    
            const result = await window.confirmationResult.confirm(otp);
            const idToken = await result.user.getIdToken();
    
            // ✅ Log the token before sending
            console.log("📌 OTP ID Token:", idToken);
    
            // ✅ Log the data being sent to the backend
            console.log("📌 Sending to backend:", { voterId, phone: mobile, otpIdToken: idToken });
    
            const response = await axios.post<{ message: string }>(
                "http://localhost:5000/api/verify-otp",
                { voterId, phone: mobile, otpIdToken: idToken },
                { headers: { "Content-Type": "application/json" } }
            );
    
            console.log("✅ Server Response:", response.data);
            toast.success(response.data?.message || "OTP verified!");
            setTimeout(() => navigate("/vote"), 1500);
        } 
        catch (err: any) {  // 👈 Explicitly define `err` as `any`
            console.error("❌ Error verifying OTP:", err.response?.data || err.message);
            setError("Invalid OTP. Please try again.");
        } 
        finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div 
            className="flex justify-end items-center min-h-screen w-screen bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="bg-blue-100 bg-opacity-95 backdrop-blur-lg p-15 rounded-2xl shadow-xl w-full max-w-lg border border-gray-300 flex flex-col items-center ml-auto mr-10 md:mr-25">
                <h2 className="text-3xl font-bold tracking-wide text-center text-blue-900 mb-6 shadow-lg shadow-blue-300/50" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Your Vote Matters
                </h2>

                {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                
                {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="w-full">
                        <div className="mb-4">
                            <input 
                                type="text"
                                id="voterIdInput"
                                className="w-full p-3 border rounded-lg mt-1 text-gray-700 placeholder-gray-400 outline-none bg-white transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/50 focus:border-transparent border-gray-300"
                                placeholder="Enter Voter ID"
                                value={voterId}
                                onChange={(e) => setVoterId(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <input 
                                type="tel"
                                className="w-full p-3 border rounded-lg mt-1 text-gray-700 placeholder-gray-400 outline-none bg-white transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/50 focus:border-transparent border-gray-300"
                                placeholder="Enter Mobile Number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-blue-800 text-white p-3 rounded-lg font-semibold hover:bg-blue-950 transition-all duration-300 ease-in-out shadow-md flex justify-center items-center"
                            disabled={loading}
                        >
                            {loading ? "Sending OTP..." : "Get OTP"}
                        </button>
                        <div id="recaptcha-container"></div> {/* 🔹 Required for Firebase OTP */}
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="w-full">
                        <div className="mb-4">
                            <input 
                                type="text"
                                className="w-full p-3 border rounded-lg mt-1 text-gray-700 placeholder-gray-400 outline-none bg-white transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/50 focus:border-transparent"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-blue-800 text-white p-3 rounded-lg font-semibold hover:bg-blue-950 transition-all duration-300 ease-in-out shadow-md flex justify-center items-center"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;


