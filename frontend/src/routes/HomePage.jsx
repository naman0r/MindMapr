import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { auth } from "../Firebase"; // ✅ Import Firebase auth
import { Button } from "primereact/button"; // PrimeReact Button
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme

function HomePage() {
  const [mindMaps, setMindMaps] = useState([]);
  const [user, setUser] = useState(null); // ✅ Store logged-in user

  // ✅ Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
        setMindMaps([]); // ✅ Clear mind maps if user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch only the logged-in user's mind maps
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5001/api/mindmaps?userId=${user.uid}`)
      .then((res) => res.json())
      .then((data) => setMindMaps(data))
      .catch((err) => console.error("Error fetching mind maps:", err));
  }, [user]);

  // ✅ Delete a mind map (Only if the user is the owner)
  const handleDelete = async (id) => {
    if (!user) {
      alert("You must be logged in to delete a mind map.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mind map?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5001/api/mindmaps/${id}?userId=${user.uid}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        // ✅ Remove the deleted mind map from state
        setMindMaps(mindMaps.filter((map) => map._id !== id));
      } else {
        console.error("Failed to delete mind map");
      }
    } catch (error) {
      console.error("Error deleting mind map:", error);
    }
  };

  return (
    <>
      <TopNav />
      <div className="homepage-container">
        <main>
          {user ? (
            <>
              <h1>Welcome Back, {user.displayName}!</h1>
              <p>Ready to create your next Mind Map?</p>
            </>
          ) : (
            // if user not logged in, then prompt them to login.
            <>
              <h1>Welcome to MindMapr</h1>
              <p>Please log in to view your mind maps.</p>
            </>
          )}

          <div className="mindmap-grid">
            {/* "Create New" Card (Only show if logged in) */}
            {user && (
              <Link to="/new" className="mindmap-card create-new">
                <span>+</span>
                <p>Create New</p>
              </Link>
            )}

            {/* Render Existing Mind Maps */}
            {mindMaps.length > 0 ? (
              mindMaps.map((map) => (
                <div key={map._id} className="mindmap-card">
                  <h3>{map.title}</h3>
                  <p>{map.nodes.length} nodes</p>

                  <div className="button-container">
                    <Link to={`/mindmap/${map._id}`} className="view-button">
                      View Mind Map
                    </Link>

                    {/* ✅ Delete Icon Button */}
                    <Button
                      icon="pi pi-trash"
                      className="p-button-rounded p-button-danger p-button-text delete-button"
                      onClick={() => handleDelete(map._id)}
                      tooltip="Delete Mind Map"
                    />
                  </div>
                </div>
              ))
            ) : user ? (
              <p>No mind maps found. Create a new one!</p>
            ) : null}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
