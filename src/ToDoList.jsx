import React, { useState, useEffect } from "react";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("todolist-data");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
      return []; // Fallback to an empty array
    }
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todolist-data", JSON.stringify(tasks));
    console.log(JSON.stringify(tasks)); //for debug
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }
  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  function clearTasks() {
    setTasks([]);
  }

  return (
    <div className="todo-container">
      <h1>To-Do-List</h1>
      <ol className="todo-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <div>
              <button
                className="delete-button task-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button
                className="move-button task-button"
                onClick={() => moveTaskUp(index)}
              >
                ^
              </button>
              <button
                className="move-button task-button"
                onClick={() => moveTaskDown(index)}
              >
                v
              </button>
            </div>
          </li>
        ))}
      </ol>

      <div className="input-card">
        <input
          type="text"
          placeholder="Input a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
        <button className="clear-button" onClick={clearTasks}>
          Clear All
        </button>
      </div>
    </div>
  );
}
export default ToDoList;
