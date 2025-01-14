import { useState } from "react";
import "../styles/App.css";
import TopNav from "../components/TopNav";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ Correct import
import { Link } from "react-router-dom"; // ✅ Add Link for navigation

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>MindMapr</h1>
      <TopNav />
    </div>
  );
}

export default App;
