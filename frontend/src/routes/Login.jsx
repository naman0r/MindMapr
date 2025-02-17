import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  return (
    <div>
      <TopNav />
      <div className="login-container">
        <GoogleLogin
          onSuccess={(credentialResponse) => console.log(credentialResponse)}
          onError={() => console.log("login failed")}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Login;
