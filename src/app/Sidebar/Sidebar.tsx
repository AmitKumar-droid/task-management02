import { FolderIcon, StarIcon, CheckCircleIcon, CalendarIcon, XCircleIcon } from "@heroicons/react/outline";

// Define TaskCategory type here
type TaskCategory = 'all' | 'important' | 'completed' | 'due' | 'incomplete';

interface SidebarProps {
  onCategorySelect: (category: TaskCategory) => void;
}

const Sidebar = ({ onCategorySelect }: SidebarProps) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="bg-zinc-400 shadow-lg rounded-lg w-64 p-6 space-y-6 h-full">
        <h2 className="text-2xl font-semibold text-center">Task Categories</h2>
        <ul className="space-y-4">
          <li
            onClick={() => onCategorySelect('all')}
            className="flex items-center space-x-3 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
          >
            <FolderIcon className="h-6 w-6 text-blue-500" />
            <span className="text-lg">All Tasks</span>
          </li>
          <li
            onClick={() => onCategorySelect('important')}
            className="flex items-center space-x-3 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
          >
            <StarIcon className="h-6 w-6 text-yellow-500" />
            <span className="text-lg">Important Tasks</span>
          </li>
          <li
            onClick={() => onCategorySelect('completed')}
            className="flex items-center space-x-3 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
          >
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
            <span className="text-lg">Completed Tasks</span>
          </li>
          <li
            onClick={() => onCategorySelect('due')}
            className="flex items-center space-x-3 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
          >
            <CalendarIcon className="h-6 w-6 text-red-500" />
            <span className="text-lg">Due Date Tasks</span>
          </li>
          <li
            onClick={() => onCategorySelect('incomplete')}
            className="flex items-center space-x-3 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
          >
            <XCircleIcon className="h-6 w-6 text-gray-500" />
            <span className="text-lg">Incomplete Tasks</span>
          </li>
        </ul>
      </div>
      {/* Sidebar ends */}

      {/* Main Content Section */}
      <div className="flex-1 p-6 bg-slate-600">
        {/* Your content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
