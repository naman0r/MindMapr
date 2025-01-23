import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ Correct import

import App from "./routes/App.jsx";
import HomePage from "./routes/HomePage.jsx";
import MindMapForm from "./routes/MindMapForm.jsx";
import BlankTemplate from "./routes/BlankTemplate.jsx";
import NewMM from "./routes/NewMM.jsx";
import MindMapView from "./routes/MindMapView.jsx"; // New component
import Login from "./routes/Login.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/profile", element: <Login /> },
  { path: "/app", element: <App /> },
  { path: "/form", element: <MindMapForm /> },
  { path: "/new", element: <NewMM /> },
  { path: "/mindmap/:id", element: <MindMapView /> }, // WOHOOOO NEW ROUTE
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
