import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login/Login.jsx";
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword.jsx";
import Consultation from "./pages/ConsultationPage/Consultation.jsx";
import BlogPage from "./pages/BlogePage/Blog-Page.jsx";
import Profile from "./pages/Profile/Profile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/blog-page" element={<BlogPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
  </StrictMode>
);
