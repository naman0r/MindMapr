import React from "react";
import "../styles/TopNav.css";
import { useState, useEffect } from "react";

import { auth } from "../Firebase";

function TopNav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); // ✅ Set user when logged in
      } else {
        setUser(null); // ❌ Set to null when logged out
      }
    });

    return () => unsubscribe(); // ✅ Cleanup listener on unmount
  }, []);
  return (
    <header className="topnav">
      <div className="topnav-left">
        <a href="#">
          <img src="/threelinemenubar.svg" alt="Menu" className="menu-icon" />
        </a>
      </div>
      <div className="topnav-center">
        <a href="/" className="logo-link">
          <img src="/logo.svg" alt="MindMapr Logo" className="logo" />
        </a>
      </div>
      <div className="topnav-right">
        <div className="profile-icon">
          <a href="/profile">
            <img
              src={user ? user.photoURL : "../../public/guesticon.svg"}
              alt=""
              className="profile-image"
            />
          </a>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
