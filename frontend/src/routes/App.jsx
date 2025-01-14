import { useState } from "react";
import "../styles/App.css";
import TopNav from "../components/TopNav";

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
