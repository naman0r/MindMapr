import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { auth } from "../Firebase.js";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import "../styles/MindMapView.css";

function MindMapView() {
  const { id } = useParams(); // this is the get the current url so we can send the correct api call.
  const [mindMap, setMindMap] = useState(null); // set initial state to null.
  const [loading, setLoading] = useState(true); // I can use this to make a loading screen.
  const [error, setError] = useState(null); // error setting, which will be returned, neef it foe debigging

  useEffect(() => {
    const fetchMindMap = async () => {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching mind map for user:", user.uid); // ✅ Debug log
        const response = await fetch(
          `http://localhost:5001/api/mindmaps/${id}?userId=${user.uid}`
        );

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.message || "Failed to fetch mind map.");
        }

        const data = await response.json();
        console.log("Received mind map data:", data); // ✅ Debug log

        setMindMap(data);
      } catch (err) {
        console.error("Error fetching mind map:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMindMap();
  }, [id]);

  if (loading) return <p>Loading mind map...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!mindMap || !mindMap.nodes || mindMap.nodes.length === 0)
    return <p>No mind map found.</p>;

  // 🟢 Convert nodes and edges into React Flow format
  const nodes = mindMap.nodes.map((node) => ({
    id: String(node.id), // Ensure ID is a string
    data: { label: node.label },
    position: { x: Math.random() * 400, y: Math.random() * 300 }, // Random positioning
  }));

  const edges = mindMap.edges.map((edge) => ({
    id: `e-${edge.source}-${edge.target}`,
    source: String(edge.source),
    target: String(edge.target),
  }));

  console.log("Generated nodes:", nodes); // ✅ Debug log
  console.log("Generated edges:", edges); // ✅ Debug log

  return (
    <div>
      <TopNav />
      <div className="mindmap-container">
        <h2>{mindMap.title}</h2>
        <div className="mindmap-visual">
          <ReactFlow nodes={nodes} edges={edges}>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MindMapView;
