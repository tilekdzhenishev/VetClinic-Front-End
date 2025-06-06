import React, { useState } from "react";
import "./Login.css";
import { Route, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinnner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://vetclinic-back-end.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid credentials. Please try again.");
        }
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left_container_login">
        <div className="form-wrapper">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-header">
              <h1>Welcome back!</h1>
              <span>Enter your Credentials to access your account</span>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <div className="login_forgot_password">
                <label htmlFor="password">Password</label>
                <Link className="forgot_pass" to="/forgot-password">
                  forgot password
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="checkbox-login">
              <input type="checkbox" id="terms" disabled={loading} />
              <label htmlFor="terms">I agree to the terms & policy</label>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <div className="button-loading">
                  Logging in... <Spinner size="20px" color="#FFF" />
                </div>
              ) : (
                "Login"
              )}
            </button>

            <div className="login-footer">
              <p>Don't have an account?</p>
              <Link className="signup-link" to="/signup">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <div className="right_container_login"></div>
      
      {loading && <Spinner asOverlay color="#FFD700" />}
    </div>
  );
}

export default Login;