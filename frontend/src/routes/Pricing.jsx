import React from "react";
import { motion } from "framer-motion";
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";
import background from "../assets/mindmapr-background-v1.jpg";
import "../styles/Home.css";
import "../styles/Pricing.css";
import { useState } from "react";

import { SpeedDial } from "primereact/speeddial";

import { Rating } from "primereact/rating";

const Pricing = () => {
  const [value, setValue] = useState(0);
  return (
    <>
      <TopNav />
      <div className="pricing-container">
        <p>what is going on </p>
        <Rating
          value={value}
          onChange={(e) => setValue(e.value)}
          cancel={false}
        />
      </div>

      <motion.div
        className="container"
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
      />
      <Footer />
    </>
  );
};

export default Pricing;
