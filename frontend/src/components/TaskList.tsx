
"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  createdDate:string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

const fetchTasks = async () => {
  setLoading(true);
  const res = await fetch(
    `${API_URL}/tasks?page=${page}&limit=5&search=${encodeURIComponent(search)}`
  );
  const data = await res.json();

  setTasks(data.tasks);
  setTotalPages(data.lastPage);
  setLoading(false);
};


useEffect(() => {
  const timeout = setTimeout(() => {
    setQuery(search); 
  }, 1000); 

  return () => clearTimeout(timeout);
}, [search]);

useEffect(() => {
  fetchTasks();
}, [page,query]);


  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTask) return;

    await fetch(`${API_URL}/tasks/${editingTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingTask),
    });

    setEditingTask(null);
    fetchTasks();
  };

  
  const deleteTask = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE" 
    });
    fetchTasks(); 
  };

    const filteredTasks = tasks.filter((task) =>
        filter === "all" ? true: task.status === filter
    );

  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0) return <p>No tasks available.</p>;

  return(
    <div className="space-y-4">

        <div className="space-y-4">
            <h1 className="text-lg text-black-600">Filter</h1>
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-semi max-w-sm px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-700"
            >
                <option value="all">All</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>
        </div>
        <div className="flex items-center gap-2 mb-4">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
            <button
                 onClick={() => {
                    setPage(1);
                    fetchTasks();
                }}

                className="bg-blue-500 text-white px-3 py-2  rounded cursor-pointer"
            >
                Search
            </button>
        </div>

        <div>
          
        {
            
            filteredTasks.map(task =>(
                editingTask?.id === task.id ?
                (
                    <form
                        key={task.id}
                        onSubmit={handleEditSubmit}
                        className="bg-white p-4 rounded shadow space-y-2"
                    >
                        <input 
                            type="text"
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            className="w-full border rounded px-2 py-1"
                            required
                        />
                        <textarea
                            value={editingTask.description || ""}
                            onChange={(e) =>
                                setEditingTask({ ...editingTask, description: e.target.value })
                            }
                            className="w-full border rounded px-2 py-1"
                        />
                        
                        <select
                            value={editingTask.status}
                            onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                            className="w-full border rounded px-2 py-1"
                            >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>

                        <input
                        type="date"
                        value={editingTask.dueDate?.split("T")[0] || ""}
                        onChange={(e) =>
                            setEditingTask({ ...editingTask, dueDate: e.target.value })
                        }
                        className="w-full border rounded px-2 py-1"
                        />                        
                        <div className="flex gap-2">
                            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingTask(null)}
                                className="bg-gray-400 text-white px-3 py-1 rounded cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                ):(
                    <div
                    key={task.id}
                    className="bg-white p-4 rounded shadow flex justify-between items-start mb-2 "
                >
                    <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-sm text-blue-500 mt-1">Status: {task.status}</p>
                    {task.dueDate && <p className="text-sm text-red-500">Due: {task.dueDate}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setEditingTask(task)}
                        className="bg-sky-500 hover:bg-sky-700 text-white px-3 py-1 rounded cursor-pointer"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
                    >
                        Delete
                    </button>
                    </div>
                     </div>

                )
            ))
        }
          
        </div>
        <div className="flex justify-center mt-4 gap-2">
            <button
                disabled={page <= 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
            >
                Previous
            </button>
            <span className="self-center">Page {page} of {totalPages}</span>
            <button
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
            >
                Next
            </button>
        </div>
    </div>

  )
  
}


    