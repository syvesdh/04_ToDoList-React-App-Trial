import { useState } from "react";
import "./App.css";
import ColorPicker from "./ColorPicker/ColorPicker";
import ToDoList from "./ToDoList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToDoList />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <ColorPicker></ColorPicker>
    </>
  );
}

export default App;
