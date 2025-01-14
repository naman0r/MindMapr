import React from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <Link to="/">Home</Link> | <Link to="/new">New Mind Map</Link>
    </div>
  );
};

export default Footer;
