import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";

import App from "./routes/App.jsx";
import HomePage from "./routes/HomePage.jsx";
import MindMapForm from "./routes/MindMapForm.jsx";
import BlankTemplate from "./routes/BlankTemplate.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/app", element: <App /> },
  { path: "/form", element: <MindMapForm /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
