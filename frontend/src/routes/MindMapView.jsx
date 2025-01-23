import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../components/TopNav";

function MindMapView() {
  const { id } = useParams(); // Get the mind map ID from the URL
  const [mindMap, setMindMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the mind map from the backend
  useEffect(() => {
    const fetchMindMap = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/mindmaps/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch mind map.");
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

  if (loading) {
    return <p>Loading mind map...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!mindMap || mindMap.nodes.length === 0) {
    return <p>No nodes available.</p>;
  }

  return (
    <div>
      <TopNav />
      <div className="mindmap-view-container">
        <h2>{mindMap.title}</h2>

        <h3>Nodes:</h3>
        <ul>
          {mindMap.nodes.map((node, index) => (
            <li key={index}>
              <strong>ID:</strong> {node.id} <br />
              <strong>Label:</strong> {node.label}
            </li>
          ))}
        </ul>

        <h3>Edges:</h3>
        <ul>
          {mindMap.edges.map((edge, index) => (
            <li key={index}>
              <strong>From:</strong> {edge.source} <br />
              <strong>To:</strong> {edge.target}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MindMapView;
