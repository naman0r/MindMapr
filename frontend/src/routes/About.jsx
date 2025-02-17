import React from "react";
import { motion } from "framer-motion";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import "../styles/About.css";

import { Button } from "primereact/button";

const About = () => {
  return (
    <>
      <TopNav />
      <div className="about-container">
        {/* Animated Heading */}
        <motion.h1
          className="about-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About <span>MindMapr</span>
        </motion.h1>

        {/* Introduction Section */}
        <motion.p
          className="about-subtitle"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          Transform the way you think, brainstorm, and organize ideas with
          <span className="highlight"> MindMapr</span>.
        </motion.p>

        {/* Image Section */}
        <motion.div
          className="about-image-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>

        {/* Features Section */}
        <motion.div
          className="about-features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2>Why Choose MindMapr?</h2>
          <ul>
            <li>
              ⚡ **AI-Powered** – Generate structured mind maps from your notes
              instantly.
            </li>
            <li>
              🖥️ **Visual Clarity** – Intuitive design makes complex ideas
              easier to understand.
            </li>
            <li>
              📂 **Cloud Storage** – Access your mind maps anytime, anywhere.
            </li>
            <li>🔒 **Secure & Private** – Your data is safe with us.</li>
            <li>
              🚀 **Collaboration Ready** – Work together with teammates
              effortlessly (Feauture coming soon!)
            </li>
            <li>
              💳 **CHEAP, free to get started** - Use for your first 5 MindMaps
              for free!
            </li>
          </ul>
        </motion.div>

        {/* Call-to-Action */}
        <motion.div
          className="about-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Button
            label="Try MindMapr Now"
            className="p-button-rounded p-button-primary p-button-lg"
            onClick={() => (window.location.href = "/new")}
          />
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default About;
