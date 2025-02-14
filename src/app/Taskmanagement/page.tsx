"use client";
import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../firebaseConfig/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Sidebar from "../Sidebar/Sidebar";
import TaskCard from "../Card/Card";

type TaskCategory = "all" | "important" | "completed" | "due" | "incomplete";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  file: string | null;
  category: TaskCategory;
}

const TaskList = () => {
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility

  const fetchTasks = async () => {
    const taskSnapshot = await getDocs(collection(db, "tasks"));
    const taskList = taskSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
    setTasks(taskList);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName || user.email);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleCategorySelect = (category: TaskCategory) => {
    setSelectedCategory(category);
    setSelectedTask(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true); // Open the modal when a task is clicked
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Task) => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, [field]: e.target.value });
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, description: e.target.value });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, dueDate: e.target.value });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && selectedTask) {
      try {
        const file = e.target.files[0];
        const fileURL = await uploadFile(file);
        const updatedTask = { ...selectedTask, file: fileURL };
        setSelectedTask(updatedTask);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };

  const uploadFile = async (file: File) => {
    const storageRef = ref(storage, "tasks/" + file.name);
    await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);
    return fileURL;
  };

  const handleSaveChanges = async () => {
    if (selectedTask) {
      const taskRef = doc(db, "tasks", selectedTask.id);
      await updateDoc(taskRef, {
        title: selectedTask.title,
        description: selectedTask.description,
        dueDate: selectedTask.dueDate,
        file: selectedTask.file,
      });
      fetchTasks();
      setIsModalOpen(false); // Close the modal after saving
      setSelectedTask(null);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const handleBatchDelete = async () => {
    for (let taskId of selectedTasks) {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);
    }
    fetchTasks();
    setSelectedTasks(new Set());
  };

  const handleTaskSelect = (taskId: string) => {
    const newSelectedTasks = new Set(selectedTasks);
    if (newSelectedTasks.has(taskId)) {
      newSelectedTasks.delete(taskId);
    } else {
      newSelectedTasks.add(taskId);
    }
    setSelectedTasks(newSelectedTasks);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        (selectedCategory === "all" || task.category === selectedCategory) &&
        task.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  return (
    <div className="flex min-h-screen text-black">
      <Sidebar onCategorySelect={handleCategorySelect} />
      <div className="flex-1 p-6 bg-slate-600">
        
        {/* Task Management Heading */}
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Task Management
        </h1>

        {/* Check if user is logged in */}
        {user && (
          <div className="mb-4 text-white">
            <p>Logged in as: {user}</p>
            <button
              onClick={handleLogout}
              className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tasks by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 mb-4 rounded border border-gray-300"
        />

        {/* Sort Button */}
        <button
          onClick={toggleSortOrder}
          className="p-2 mb-4 bg-yellow-500 text-white rounded"
        >
          Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>

        <div className="mt-4 mb-4">
          <button
            onClick={handleBatchDelete}
            disabled={selectedTasks.size === 0}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Delete Selected Tasks
          </button>
        </div>

        {/* Task List in Flex Layout */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-orange-950">{selectedCategory} Tasks</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="flex-none w-1/3">
                <div onClick={() => handleTaskClick(task)}>
                  <TaskCard
                    task={task}
                    onClick={() => handleTaskSelect(task.id)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal (Popup) for Editing Task */}
        {isModalOpen && selectedTask && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
              <h3 className="text-2xl font-semibold mb-4">Edit Task</h3>

              {/* Task Form Elements */}
              <div>
                <label className="block font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={selectedTask.title}
                  onChange={(e) => handleInputChange(e, "title")}
                  className="p-2 mb-4 w-full border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  value={selectedTask.description}
                  onChange={handleDescriptionChange}
                  className="p-2 mb-4 w-full border border-gray-300 rounded"
                  rows={4}
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  value={selectedTask.dueDate}
                  onChange={handleDateChange}
                  className="p-2 mb-4 w-full border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Upload File</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="p-2 mb-4 w-full border border-gray-300 rounded"
                />
              </div>

              <button
                onClick={handleSaveChanges}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Save Changes
              </button>

              {/* Close Modal Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
