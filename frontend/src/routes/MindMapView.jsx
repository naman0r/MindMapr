import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../components/TopNav";
import { auth } from "../Firebase"; // Import Firebase auth
import Footer from "../components/Footer.jsx";
import "../styles/MindMapView.css";

function MindMapView() {
  const { id } = useParams(); // Get mind map ID from the URL
  const [mindMap, setMindMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMindMap = async () => {
      setLoading(true); // ✅ Ensure loading state is reset

      const user = auth.currentUser;
      if (!user) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const userId = user.uid; // ✅ Get user ID from Firebase auth
        const response = await fetch(
          `http://localhost:5001/api/mindmaps/${id}?userId=${userId}`
        );

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.message || "Failed to fetch mind map.");
        }

        const data = await response.json();
        setMindMap(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMindMap();
  }, [id]);

  // ✅ Display loading message while fetching data
  if (loading) {
    return (
      <div>
        <TopNav />
        <p>Loading mind map...</p>
        <Footer />
      </div>
    );
  }

  // ✅ Display error if any issue occurs
  if (error) {
    return (
      <div>
        <TopNav />
        <p>Error: {error}</p>
        <Footer />
      </div>
    );
  }

  // ✅ Prevent crashes if mindMap is null
  if (!mindMap) {
    return (
      <div>
        <TopNav />
        <p>No mind map found.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <TopNav />
      <div className="mindmap-view-container">
        <h2>{mindMap.title}</h2>

        <h3>Nodes:</h3>
        {mindMap.nodes.length > 0 ? (
          <ul>
            {mindMap.nodes.map((node, index) => (
              <li key={index}>
                <strong>ID:</strong> {node.id} <br />
                <strong>Label:</strong> {node.label}
              </li>
            ))}
          </ul>
        ) : (
          <p>No nodes available.</p>
        )}

        <h3>Edges:</h3>
        {mindMap.edges.length > 0 ? (
          <ul>
            {mindMap.edges.map((edge, index) => (
              <li key={index}>
                <strong>From:</strong> {edge.source} <br />
                <strong>To:</strong> {edge.target}
              </li>
            ))}
          </ul>
        ) : (
          <p>No edges available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MindMapView;
