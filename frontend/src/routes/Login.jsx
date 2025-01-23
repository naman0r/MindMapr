import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider(); 
import TopNav from "../components/TopNav.jsx"
import Footer from "../components/Footer.jsx"
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Login(){

    return(

        <div>
            <TopNav/>
            <div className = "login-container">
                <p>to implement</p>
            </div>
            <Footer/>
        </div>
    );

}


export default Login; 


