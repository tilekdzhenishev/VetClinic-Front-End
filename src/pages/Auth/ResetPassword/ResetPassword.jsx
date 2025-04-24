import React, { useState } from "react";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://vetclinic-back-end.onrender.com/api/users/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );
      const data = res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setMessage("Password reset successfully. Redirecting to login...");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.message);
      setMessage("");
    }
  };

  return (
    <div className="reset-page">
      <form onSubmit={handleReset} className="reset-form">
        <h2>Reset Your Password</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
