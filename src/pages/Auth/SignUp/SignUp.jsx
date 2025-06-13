import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css"
import { useNavigate } from "react-router-dom";


const Spinner = () => (
  <div className="spinner">
    <div className="spinner-circle"></div>
  </div>
);

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://vetclinic-back-end.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful", data);

      localStorage.setItem("token", data.token);


      navigate("/");
    } catch (error) {
      console.error("Sign up error:", error);
      setError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="signup__page">
      <div className="left_container">
        <div className="form">
          <h1 className="form-title">Get Started Now</h1>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>

          <div className="checkbox-component">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to the terms & policy</label>
          </div>

          <button type="button" className="btn" disabled={loading} onClick={handleSignup}>
            {loading ? (
              <div className="button-loading">
                <Spinner />
                <span>Signing up...</span>
              </div>
            ) : (
              'Sign up'
            )}
          </button>

          <div className="login__block">
            <p>Have an account?</p>
            <Link to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="right_container">
        <div className="background-image"></div>
      </div>


    </div>
  );
}

export default SignUp;