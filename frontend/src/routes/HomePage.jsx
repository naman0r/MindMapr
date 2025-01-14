import React from "react";
import "../styles/HomePage.css";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage-container">
      <TopNav />

      <main className="main-content">
        <h2>Welcome Back, User!</h2>
        <p>Ready to create your next Mind Map?</p>

        <div className="mindmap-grid">
          <Link to="/new" className="mindmap-card create-new">
            <span>+</span>
            <p>Create new</p>
          </Link>
          <div className="mindmap-card">Old 1</div>
          <div className="mindmap-card">Old 2</div>
          <div className="mindmap-card">Old 3</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
