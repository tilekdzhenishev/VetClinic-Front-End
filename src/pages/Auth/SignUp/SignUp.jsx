import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom"; 
import Spinner from '../../../components/Spinner/Spinnner'; 

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <-- 2. Add loading state

  const navigate = useNavigate();

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

    setLoading(true); // <-- Set loading to true before the request
    setError(""); // Clear previous errors

    try {
      const res = await fetch(
        "https://vetclinic-back-end.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        // Improved error handling for more informative messages
        if (res.status === 409) { // Example: Conflict if user already exists
            throw new Error("User with this email already exists.");
        }
        throw new Error(data.message || "Sign up failed");
      } else {
        console.log(data); // Log success data
      }

      localStorage.setItem("token", data.token); 
      navigate("/home");
    } catch (error) {
      console.error("Sign up error:", error); 
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <div className="signup__page">
        <div className="left_container">
          <form className="form" onSubmit={handleSignup}>
            <h1>Get Started Now</h1>
            {error && <p style={{ color: "red" }}>{error}</p>} 
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              disabled={loading} 
            />
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} 
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading} 
            />
            <div className="checkbox-component">
              <input type="checkbox" disabled={loading} />
              <p>I agree to the terms & policy</p>
            </div>
            <button type="submit" className="btn" disabled={loading}> 
              {loading ? (
           
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Signing up... <Spinner size="20px" color="#FFF" />
                </div>
              ) : (
                'Sign up'
              )}
            </button>

            <div className="login__block">
              <p>Have an account?</p>
              <Link className="sign-in-link" to="/login">
                Login
              </Link>
            </div>
          </form>
        </div>
        <div className="right_container"> </div>
      </div>
      
      {loading && <Spinner asOverlay color="#FFD700" />} 
    </div>
  );
}

export default SignUp;