import React from "react";
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";
import background from "../assets/mindmapr-background-v1.jpg"; // Correct import
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      <TopNav id="tn-home" />
      <div
        className="home-container"
        style={{ backgroundImage: `url(${background})` }}
      >
        <h1>Welcome to MindMapr</h1>
        <p>This is the home page</p>
      </div>
      <Footer />
    </>
  );
};

export default Home;
