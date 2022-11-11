import { useEffect, useState } from "react";
import "./App.scss";
import { v4 as id } from "uuid";

interface Task {
  task: string;
  taskId: string;
  complete: boolean;
}

function App() {
  const [toDoList, setToDoList] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const LOCAL_STORAGE_KEY = "tasks";

  const handleSubmit = () => {
    if (taskName !== "") {
      setToDoList([
        ...toDoList,
        { task: taskName, taskId: id(), complete: false },
      ]);
      setTaskName("");
      // window.alert("Task created");
    }
  };

  const handleDelete = (id: any) => {
    const tasksCopy: Task[] = [...toDoList];
    tasksCopy.splice(id, 1);
    setToDoList(tasksCopy);
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

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    <>
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
            placeholder="Add new task"
            onChange={(e) => setTaskName(e.target.value)}
            type="text"
            value={taskName}
          />
          <button onClick={handleSubmit}>Add task</button>
        </div>
        <ul className="todo--list">
          {toDoList.filter(handleFilter).map((item) => (
            <li key={item.taskId}>
              <div>{item.task}</div>
              <button onClick={() => handleDelete(item.taskId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
