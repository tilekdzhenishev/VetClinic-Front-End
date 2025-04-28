import React, { useState } from "react";
import "./ForgotPassword.css";
import { FaCheckCircle } from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://vetclinic-back-end.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSubmitted(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <form className="forgot-form" onSubmit={handleForgotPassword}>
        <h2>Forgot Password</h2>
        <p>Enter your email to reset your password</p>

        {submitted ? (
          <div className="success-message">
            <FaCheckCircle size={28} color="green" />
            <span>Check your email for the reset link.</span>
          </div>
        ) : (
          <>
            {error && <p className="error">{error}</p>}
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
