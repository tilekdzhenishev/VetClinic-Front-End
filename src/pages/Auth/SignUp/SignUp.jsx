import React from "react";
import "./SignUp.css";
import { Route } from "react-router";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <div className="signup__page">
        <div className="left_container">
          <div className="form">
            <h1>Get Started Now</h1>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Enter your name" />
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" placeholder="Enter your email" />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
            <div className="checkbox">
              <input type="checkbox" name="" id="" />
              <p>I agree to the terms & policy</p>
            </div>
            <button type="submit" className="btn">
              Sign up
            </button>

            <div className="login__block">
              <p>Have an account?</p>
              <Link className="sign-in-link" to="/login">Login</Link>
            </div>
          </div>
        </div>
        <div className="right_container"> </div>
      </div>
    </div>
  );
}

export default SignUp;
