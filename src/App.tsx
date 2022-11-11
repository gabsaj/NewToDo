import { useEffect, useState } from "react";
import "./App.scss";
import { v4 as id } from "uuid";

interface Task {
  task: string;
  taskId: string;
  complete: false;
}

function App() {
  const [toDoList, setToDoList] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSubmit = () => {
    if (taskName !== "") {
      setToDoList([
        ...toDoList,
        { task: taskName, taskId: id(), complete: false },
      ]);
      setTaskName("");
    }
  };

  const handleDelete = (id: string) => {
    setToDoList(toDoList.filter((task: Task) => task.taskId !== id));
  };

  const handleFilter = (value: Task) => {
    if (value.task == "") {
      return value;
    } else if (
      value.task.includes(searchValue) ||
      value.task.toLowerCase().includes(searchValue) ||
      value.task.toUpperCase().includes(searchValue)
    )
      return value;
  };

  return (
    <>
      <div className="bg"></div>
      <div className="todo">
        <div className="todo--search">
          <input
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
          />
        </div>
        <div className="todo--add">
          <input
            maxLength={28}
            placeholder="Add new task"
            onChange={(e) => setTaskName(e.target.value)}
            type="text"
            value={taskName}
            id="newTask"
          />
          <button onClick={handleSubmit}>Add task</button>
        </div>
        <div className="todo--list">
          <ul>
            {toDoList.length > 0 ? (
              toDoList.filter(handleFilter).map((item) => (
                <li key={item.taskId}>
                  <input
                    className="checker"
                    id={`taskCheck${item.taskId}`}
                    type="checkbox"
                  />
                  <label htmlFor={`taskCheck${item.taskId}`}>{item.task}</label>
                  <button onClick={() => handleDelete(item.taskId)}>
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <li className="todo--empty">
                <label htmlFor="newTask">No tasks to show</label>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
