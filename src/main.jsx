import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {store} from './store/store.js'
import Login from "./pages/Auth/Login/Login.jsx";
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <Router>
      <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </Router>
    </Provider>
  </StrictMode>
);
