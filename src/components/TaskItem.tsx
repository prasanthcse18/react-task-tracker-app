interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
}

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
}

export function TaskItem({ task, onDelete }: TaskItemProps) {
    return (
        <li
            style={{
                padding: '1rem',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                {task.title}
            </span>

            <button
                onClick={() => onDelete(task.id)}
                style={{
                    color: 'red',
                    border: '1px solid red',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: 'transparent'
                }}
                aria-label={`Delete task: ${task.title}`}
            >
                Delete
            </button>
        </li>
    );
}