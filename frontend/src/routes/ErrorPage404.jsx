/* this is a file template for any blank page I will need for this project in the future*/

import React from "react";
import "../styles/App.css"; /* or whatveer styling you want*/
import TopNav from "../components/TopNav.jsx";
import "../styles/ErrorPage404.css";
import Footer from "../components/Footer.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; //  Correct import
import { Link } from "react-router-dom"; // Add Link for navigation

function BlankTemplate() {
  return (
    <div>
      <TopNav />
      <div className="error-page-container">
        404 ERROR. PLEASE ENTER A VALID URL.
      </div>
      <Footer />
    </div>
  );
}

export default BlankTemplate;
