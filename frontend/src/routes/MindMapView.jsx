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
import dagre from "dagre"; // Import Dagre for layout calculations
import "reactflow/dist/style.css";
import "../styles/MindMapView.css";

// Create a new Dagre graph instance
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

/**
 * Function to generate a hierarchical layout for the nodes using Dagre.
 * @param {Array} nodes - The list of nodes in the mind map.
 * @param {Array} edges - The list of edges connecting the nodes.
 * @returns {Array} - The formatted nodes with updated positions.
 */
const getLayoutedNodes = (nodes, edges) => {
  dagreGraph.setGraph({ rankdir: "TB", nodesep: 50, ranksep: 100 }); // Top to Bottom layout

  // Add nodes to Dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 180, height: 60 }); // Define node size
  });

  // Add edges to Dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Compute the layout
  dagre.layout(dagreGraph);

  // Update node positions
  return nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
    };
  });
};

function MindMapView() {
  const { id } = useParams();
  const [mindMap, setMindMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // React Flow state for nodes and edges
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

        // Fetch the mind map data from the backend
        const response = await fetch(
          `http://localhost:5001/api/mindmaps/${id}?userId=${user.uid}`
        );

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.message || "Failed to fetch mind map.");
        }

        const data = await response.json();
        console.log("Received mind map data:", data);

        // Convert nodes into React Flow format
        let formattedNodes = data.nodes.map((node) => ({
          id: String(node.id),
          data: { label: node.label },
          position: { x: 0, y: 0 }, // Temporary position, will be updated by Dagre
          draggable: true,
        }));

        // Convert edges into React Flow format
        let formattedEdges = data.edges.map((edge) => ({
          id: `e-${edge.source}-${edge.target}`,
          source: String(edge.source),
          target: String(edge.target),
        }));

        // Apply Dagre layout to spread out nodes
        formattedNodes = getLayoutedNodes(formattedNodes, formattedEdges);

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

  // Handle node movements
  const onNodesChangeHandler = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // Handle edge changes
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
            onNodesChange={onNodesChangeHandler}
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
