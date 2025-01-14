import React from "react";
import "../styles/App.css";
import TopNav from "../components/TopNav";
import "../styles/HomePage.css";
import Footer from "../components/Footer.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ Correct import
import { Link } from "react-router-dom"; // ✅ Add Link for navigation

function HomePage() {
  return (
    <div className="homepage-container">
      <TopNav />

      <main>
        <h2>Welcome Back, User!</h2>
        <p>ready to create your next Mind Map? </p>

        <div className="mindmap-grid">
          <div className="mindmap-card create-new">
            <span>+</span>
            <p>create new</p>
          </div>
          <div className="mindmap-card">old 1</div>
          <div className="mindmap-card">old 2</div>
          <div className="mindmap-card">old 3</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
