import { useMemo, useState } from "react";
import type { TaskList } from "./types/Task";

function App() {
  const [tasks, setTasks] = useState<TaskList>([
    { id: 1, text: "Learning React Hooks", completed: false },
    { id: 2, text: "Mastering Tailwind CSS", completed: false },
    { id: 3, text: "Building a Portfolio", completed: false },
  ]);

  const remainingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-200">
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
                  className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className={`text-slate-700 font-medium ${task.completed ? 'line-through text-slate-400' : ''}`}>
                  {task.text}
                </span>
              </div>
              <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Status19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        {tasks.length === 0 && (
          <div className="p-8 text-center text-slate-400 italic text-sm">
            Your task list is empty. Take a break!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;