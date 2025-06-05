import React from "react";
import "./Error404.css";
import plugImage from "../assets/plugs.png";
import verifiedIcon from "../assets/verified.png"

const Error404 = () => {
  return (
    <div className="error-container">
      <button className="close-btn" onClick={() => window.history.back()}>
        &times;
      </button>
      <h1>404 ERROR !</h1>
      <img src={errorImage} alt="Error" className="error-image" />
      <p>Sorry. Something went wrong.</p>
    </div>
  );
};

export default Error404;