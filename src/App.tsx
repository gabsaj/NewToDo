import React, { useState } from "react";
import "./App.scss";

function App() {
  const [toDoList, setToDoList] = useState<string[]>(["task1", "task2"]);
  const [toDoTask, setToDoTask] = useState<string>("");

  const handleSubmit = () => {};
  const handleEdit = () => {};

  return (
    <>
      <div className="todo">
        <div className="todo--add">
          <input onChange={(e) => setToDoTask(e.target.value)} type="text" />
          <button>Add task</button>
          <button>Edit</button>
        </div>
        <ul className="todo--list">
          {toDoList.map((item) => (
            <li>
              {item}
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
