import { useState } from 'react';
import { TaskInput } from './components/TaskInput';
import { TaskItem } from './components/TaskItem';
import { CoffeeTracker } from './components/CoffeeTracker';

// We export this so other files can use it if needed
export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Refactor Component Structure", isCompleted: true },
    { id: 2, title: "Master React Props", isCompleted: false },
  ]);

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

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1>Staff Engineer Task Tracker</h1>

      {/* The Input Component */}
      <TaskInput onAddTask={handleAddTask} />

      {/* The List Logic */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          // We pass the "task" object AND the "delete" function down
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>

      {tasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888' }}>
          All clear! Time to relax. ☕
        </p>
      )}
      <CoffeeTracker />
    </main>
  );
}

export default App;