import React from "react";
import { motion } from "framer-motion"; // ✅ Animations
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";
import background from "../assets/mindmapr-background-v1.jpg";
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      <TopNav id="tn-home" />

      {/* Background Layer with Blur Effect */}
      <div className="background-blur"></div>

      {/* Foreground Content */}
      <div className="home-container">
        {/* Title Animation */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glowing-text"
        >
          Welcome to <span>MindMapr</span>
        </motion.h1>

        {/* Subtitle Animation */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="subtext"
        >
          Organize your thoughts. Visualize your ideas. Achieve more.
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.a
          href="/new"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #37b5ff" }}
          whileTap={{ scale: 0.95 }}
          className="cta-button"
        >
          Create a Mind Map
        </motion.a>
        <motion.a
          href="/"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #37b5ff" }}
          whileTap={{ scale: 0.95 }}
          className="cta-button"
        >
          View Existing
        </motion.a>
        <motion.a
          href="/"
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #37b5ff" }}
          whileTap={{ scale: 0.95 }}
          className="cta-button"
        >
          View Pricing
        </motion.a>
      </div>

      <Footer />
    </>
  );
};

export default Home;
