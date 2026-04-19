import { useState } from "react";
import type { TaskList } from "./types/Task";

function App() {
  const [tasks, setTasks] = useState<TaskList>([
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: true },
  ]);

  return (
    <div>
      <h1>To Do App</h1>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <input type="checkbox" checked={task.completed}/>
            <span>{task.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
