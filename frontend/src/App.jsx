import { useState } from "react";
import "./App.css";
import MindMapForm from "./MindMapForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>MindMapr</h1>
      <MindMapForm />
    </div>
  );
}

export default App;
