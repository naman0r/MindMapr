import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        &copy; {new Date().getFullYear()} MindMapr, by Naman Rusia All rights
        Reserved.
      </p>
    </div>
  );
};

export default Footer;
