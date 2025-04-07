import { useState } from "react";
import { Route, Routes, useNavigate,  } from "react-router";
import "./App.css";
import SignUp from "./pages/Auth/SignUp/SignUp";

function App() {
  return (
    <>
      <SignUp/>
    </>
  );
}

export default App;
