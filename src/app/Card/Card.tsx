import React from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  file: string | null;
  category: 'all' | 'important' | 'completed' | 'due' | 'incomplete' | "other";
}

interface TaskCardProps {
  task: Task;
  onClick: () => void; // Define the onClick prop to handle task clicks
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div onClick={onClick} className="task-card border p-4 rounded shadow-md cursor-pointer hover:bg-gray-200">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
      {task.file && <p className="text-sm text-blue-500">File Attached</p>}
    </div>
  );
};

export default TaskCard;
