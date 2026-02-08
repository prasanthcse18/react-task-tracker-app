import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './context/ThemeContext'; // <--- The new magic hook
import { TaskInput } from './components/TaskInput';
import { TaskItem, type Task } from './components/TaskItem';
import { Quote } from './components/Quote'; // Don't forget your quote!

function App() {
  // 1. Get Theme from Context (No useState here!)
  const { isDarkMode, toggleTheme } = useTheme();

  // 2. Tasks still live here (for now)
  const [tasks, setTasks] = useLocalStorage<Task[]>("staff-engineer-tasks", [
    { id: 1, title: "Master React Context", isCompleted: false },
  ]);

  const handleAddTask = (title: string) => {
    const newTask: Task = { id: Date.now(), title, isCompleted: false };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <main style={{
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Inter, system-ui, sans-serif',
      transition: 'background-color 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Staff Engineer Task Tracker</h1>

        {/* The Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: isDarkMode ? '#333' : '#e5e7eb',
            color: isDarkMode ? '#fff' : '#000',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <Quote />
      <TaskInput onAddTask={handleAddTask} />

      <div style={{ marginTop: '20px' }}>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </div>
    </main>
  );
}

export default App;