import React, { useEffect, useState } from "react";
import { auth, googleProvider, signInWithPopup, signOut } from "../Firebase";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/Profile.css";
import { Button } from "primereact/button";

function Profile() {
  const [user, setUser] = useState(null); // initially set to null.
  const navigate = useNavigate(); // to navigate the popup
  // usenavigate hook in react-router: allows to get info from url.

  // Listen for login state changes
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // using local storage and not mongodb for user data storage.
    if (storedUser) {
      // if you can find the user..... update the user with useState setUser(storedUser)
      setUser(storedUser);
    }

    // i dont understand this icl
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        localStorage.setItem("user", JSON.stringify(authUser)); //  Store user persistently
      } else {
        setUser(null); // updating state of user.
        localStorage.removeItem("user"); //  Remove from storage when logged out
      }
    });

    return () => unsubscribe(); //  Cleanup listener when component unmounts
  }, []);

  // Handle Google Sign-In
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider); // popup returns some information.
      const user = result.user; //
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Login failed:", error); // console.log to debug login
    }
  };

  //  Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      navigate("/home"); // Redirect to homepage after logout, where user can go to pricing and about.
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <TopNav />
      <div className="profile-container">
        {user ? ( // ternary operator to show different output based on the state of the user.
          <div className="profile-content">
            <h2>Welcome, {user.displayName}!</h2>
            <img src={user.photoURL} alt="ProfilePic" className="profile-pic" />
            <p>Email: {user.email}</p>
            <Button
              label="Logout"
              icon="pi pi-sign-out"
              className="p-button-danger"
              onClick={handleLogout}
            />
            <p>you are logged in !</p>
          </div>
        ) : (
          <div className="login-container">
            <h2>Login to MindMapr</h2>
            <Button
              label="Sign in with Google"
              icon="pi pi-google"
              className="p-button-rounded p-button-primary"
              onClick={handleLogin} // changing the onclick functionaity for the same function.
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
