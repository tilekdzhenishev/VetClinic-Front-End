import React from "react";
import "./Login.css";
import { Route } from "react-router";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <div className="login__page">
        <div className="left_container">
          <div className="form">
            <h1>Welcome back!</h1>
            <span>Enter your Credentials to access your account</span>
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
              Login
            </button>

            <div className="login__block">
              <p>Don'tave an account?</p>
              <Link className="sign-in-link" to="/signup">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className="right_container"> </div>
      </div>
    </div>
  );
}

export default Login;
