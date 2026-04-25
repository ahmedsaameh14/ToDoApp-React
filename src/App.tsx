import { useEffect, useMemo, useState } from "react";
import type { TaskList } from "./types/Task";

function App() {
  const [tasks, setTasks] = useState<TaskList>(() => {
    const savedTasks = localStorage.getItem("my-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const remainingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // --- Handlers ---

  const addTask = (text: string) => {
    const newTask: TaskList[number] = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        
        {/* Header Section */}
        <div className="bg-slate-900 p-8 text-white">
          <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">
            You have <span className="text-blue-400">{remainingTasks}</span> tasks left for today
          </p>
        </div>

        {/* Input Section */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
            />
            <button onClick={(e) => {
              e.preventDefault();
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              if (input.value.trim()) {
                addTask(input.value.trim());
                input.value = '';
              }
            }} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-200">
              Add
            </button>
          </div>
        </div>

        {/* List Section */}
        <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-4">
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)} // Added Toggle
                  className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className={`text-slate-700 font-medium transition-all ${task.completed ? 'line-through text-slate-400' : ''}`}>
                  {task.text}
                </span>
              </div>
              
              {/* Delete Button */}
              <button 
                onClick={() => deleteTask(task.id)} // Added Delete Click
                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                title="Delete task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium">All caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;