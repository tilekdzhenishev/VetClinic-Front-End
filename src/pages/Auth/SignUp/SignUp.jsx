import React, { useState } from "react";
import "./SignUp.css";
import { Route, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    try {
      const res = await fetch(
        "https://vetclinic-back-end.onrender.com/api/users/register",
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
        throw new Error(data.message || "SignUp failed");
      } else {
        console.log(data);
      }

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
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
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
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
            <div className="checkbox-component">
              <input type="checkbox" />
              <p>I agree to the terms & policy</p>
            </div>
            <button type="submit" className="btn">
              Sign up
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
    </div>
  );
}

export default SignUp;
