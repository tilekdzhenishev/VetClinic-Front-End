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

    try {
      const res = await fetch(
        "https://vetclinic-back-end.onrender.com/api/users/login",
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
      <div className="login__page">
        <div className="left_container">
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="checkbox">
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
        <div className="right_container"> </div>
      </div>
    </div>
  );
}

export default Login;
