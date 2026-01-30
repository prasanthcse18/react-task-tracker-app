import { useState, useEffect } from 'react';
import { TaskInput } from './components/TaskInput';
import { TaskItem, type Task } from './components/TaskItem';
import { CoffeeTracker } from './components/CoffeeTracker';

function App() {
  // ----------------------------------------------------
  // BUCKET 1: TASKS STATE (Top Level)
  // ----------------------------------------------------
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("staff-engineer-tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      { id: 1, title: "Refactor Component Structure", isCompleted: true },
      { id: 2, title: "Master React Props", isCompleted: false },
    ];
  });

  // ----------------------------------------------------
  // BUCKET 2: DARK MODE STATE (Top Level - SEPARATE!)
  // ----------------------------------------------------
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme === "dark";
  });

  // ----------------------------------------------------
  // SIDE EFFECTS (The "Auto-Save" Robots)
  // ----------------------------------------------------

  // Robot 1: Save Tasks when they change
  useEffect(() => {
    localStorage.setItem("staff-engineer-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Robot 2: Save Theme when it changes
  useEffect(() => {
    localStorage.setItem("app-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // ----------------------------------------------------
  // HANDLERS (The Actions)
  // ----------------------------------------------------

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (idToDelete: number) => {
    setTasks(tasks.filter(task => task.id !== idToDelete));
  };

  // ----------------------------------------------------
  // THE UI
  // ----------------------------------------------------
  return (
    <main style={{
      backgroundColor: isDarkMode ? '#222' : '#fff', // <--- DYNAMIC COLOR
      color: isDarkMode ? '#fff' : '#000',           // <--- DYNAMIC TEXT
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'system-ui',
      transition: 'all 0.3s ease'
    }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Staff Engineer Task Tracker</h1>

        {/* The Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: isDarkMode ? '#444' : '#eee',
            color: isDarkMode ? '#fff' : '#000'
          }}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <TaskInput onAddTask={handleAddTask} />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </ul>

      <CoffeeTracker />
    </main>
  );
}

export default App;