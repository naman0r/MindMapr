import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../components/TopNav";

function MindMapView() {
  const { id } = useParams();
  const [mindMap, setMindMap] = useState(null);

  // Fetch mind map by ID
  useEffect(() => {
    fetch(`http://localhost:5001/api/mindmaps/${id}`)
      .then((res) => res.json())
      .then((data) => setMindMap(data))
      .catch((err) => console.error("Error fetching mind map:", err));
  }, [id]);

  if (!mindMap) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <TopNav />
      <h2>{mindMap.title}</h2>

      <div className="mindmap-view">
        {mindMap.nodes && mindMap.nodes.length > 0 ? (
          <ul>
            {mindMap.nodes.map((node, index) => (
              <li key={index}>{node}</li>
            ))}
          </ul>
        ) : (
          <p>No nodes available.</p>
        )}
      </div>
    </div>
  );
}

export default MindMapView;
