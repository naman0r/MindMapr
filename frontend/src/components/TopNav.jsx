import React from "react";
import "../styles/TopNav.css";

function TopNav() {
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
            <img src="../../public/guesticon.svg" alt="" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
