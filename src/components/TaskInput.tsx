import { useState } from 'react';

// Define what this component needs from its parent (App)
interface TaskInputProps {
    onAddTask: (title: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
    const [title, setTitle] = useState("");

    const handleSubmit = () => {
        if (!title.trim()) return;
        onAddTask(title); // Call the function passed down from App
        setTitle("");     // Clear local input
    };

    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
            <input
                type="text"
                placeholder="What is your next sprint task?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                style={{ padding: '10px', flexGrow: 1, fontSize: '1rem' }}
                aria-label="New Task Title"
            />
            <button
                onClick={handleSubmit}
                style={{
                    padding: '10px 20px',
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Add Task
            </button>
        </div>
    );
}