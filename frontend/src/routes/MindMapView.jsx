import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import { auth } from "../Firebase";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import "../styles/MindMapView.css";

function MindMapView() {
  const { id } = useParams();
  const [mindMap, setMindMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ReactFlow States
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
        console.log("Fetching mind map for user:", user.uid);
        const response = await fetch(
          `http://localhost:5001/api/mindmaps/${id}?userId=${user.uid}`
        );

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.message || "Failed to fetch mind map.");
        }

        const data = await response.json();
        console.log("Received mind map data:", data);

        // Convert nodes into React Flow format (making them draggable)
        const formattedNodes = data.nodes.map((node, index) => ({
          id: String(node.id),
          data: { label: node.label },
          position: { x: index * 150, y: 100 }, // Initial positioning
          draggable: true,
        }));

        const formattedEdges = data.edges.map((edge) => ({
          id: `e-${edge.source}-${edge.target}`,
          source: String(edge.source),
          target: String(edge.target),
        }));

        setNodes(formattedNodes);
        setEdges(formattedEdges);
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

  // Track changes when user moves nodes
  const onNodesChangeHandler = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChangeHandler = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  if (loading) return <p>Loading mind map...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!mindMap || !mindMap.nodes || mindMap.nodes.length === 0)
    return <p>No mind map found.</p>;

  return (
    <div>
      <TopNav />
      <div className="mindmap-container">
        <h2>{mindMap.title}</h2>
        <div className="mindmap-visual">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChangeHandler} // ✅ Allows moving nodes
            onEdgesChange={onEdgesChangeHandler}
            fitView
          >
            <MiniMap />
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
