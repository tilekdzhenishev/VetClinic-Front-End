import React, { useState } from "react";
import "./Login.css";
import { Route, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

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
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="login-page">
        <div className="left_container_login">
          <form className="form" onSubmit={handleLogin}>
            <h1>Welcome back!</h1>
            <span>Enter your Credentials to access your account</span>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="checkbox-login">
              <input type="checkbox" name="" id="" />
              <p>I agree to the terms & policy</p>
            </div>
            <button type="submit" className="btn">
              Login
            </button>

            <div className="login__block">
              <p>Don't have an account?</p>
              <Link className="sign-in-link" to="/signup">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
        <div className="right_container_login"> </div>
      </div>
    </div>
  );
}

export default Login;
