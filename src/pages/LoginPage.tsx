import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/newvote.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  auth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "./firebase";

const LoginPage: React.FC = () => {
  const [voterId, setVoterId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("voterIdInput")?.focus();

    // Auto-login if redirected back with email link
    const tryAutoLogin = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let storedEmail = window.localStorage.getItem("emailForSignIn");
        if (!storedEmail) {
          storedEmail = window.prompt("Please enter your email for confirmation");
        }

        if (!storedEmail) return;

        try {
          setLoading(true);
          const result = await signInWithEmailLink(auth, storedEmail, window.location.href);
          window.localStorage.removeItem("emailForSignIn");

          const token = await result.user.getIdToken();
          console.log("✅ Signed in with email link:", result.user.email);
          console.log("📌 Firebase token:", token);

          toast.success("Email verified successfully!");
          setTimeout(() => navigate("/vote"), 1500);
        } catch (err) {
          console.error("❌ Error during email link sign-in:", err);
          toast.error("Invalid or expired link. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    tryAutoLogin();
  }, [navigate]);

  const handleSendEmailLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!voterId || !email) {
      setError("Please enter Voter ID and Email.");
      return;
    }

    const actionCodeSettings = {
      url: "http://localhost:5173/vote",
      handleCodeInApp: true,
    };

    try {
      setLoading(true);
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      toast.success("Verification link sent to your email!");
      setEmailSent(true);
    } catch (err) {
      console.error("❌ Email link error:", err);
      setError("Failed to send email link. Please check the email address.");
    } finally {
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

        {!emailSent ? (
          <form onSubmit={handleSendEmailLink} className="w-full">
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
                type="email"
                className="w-full p-3 border rounded-lg mt-1 text-gray-700 placeholder-gray-400 outline-none bg-white transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:shadow-lg focus:shadow-blue-500/50 focus:border-transparent border-gray-300"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-black p-3 rounded-lg font-semibold hover:bg-blue-950 transition-all duration-300 ease-in-out shadow-md flex justify-center items-center"
              disabled={loading}
            >
              {loading ? "Sending Link..." : "Get Magic Link"}
            </button>
          </form>
        ) : (
          <p className="text-green-700 text-center font-medium">
            ✅ Verification link sent to <span className="font-bold">{email}</span>. <br />
            Please check your inbox and follow the link to continue.
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
