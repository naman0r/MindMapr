import React from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";

/* FOoter does not hve its own syling shet document. THe styling is hosted in App.css*/
const Footer = () => {
  return (
    <div className="footer">
      <Link to="/">
        <p>home</p>
      </Link>
    </div>
  );
};

export default Footer;
