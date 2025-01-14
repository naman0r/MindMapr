/* this is a file template for any blank page I will need for this project in the future*/

import React from "react";
import "../styles/App.css"; /* or whatveer styling you want*/
import TopNav from "../components/TopNav";
import "../styles/HomePage.css"; /*CHANGE*/
import Footer from "../components/Footer.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ Correct import
import { Link } from "react-router-dom"; // ✅ Add Link for navigation

function BlankTemplate() {
  return (
    <div>
      <p>this is a blank template</p>
    </div>
  );
}

export default BlankTemplate;
