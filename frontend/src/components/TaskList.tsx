
"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: String;
  createdDate:String;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");


  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditSubmit = async (e: any) => {
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

  //======= deletes the task and before deleting it asks the user to make sure to decide with help window========
  const deleteTask = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE" 
    });
    fetchTasks(); 
  };

    //===== it filters the task  according to the status =============
    const filteredTasks = tasks.filter((task) =>
        filter === "all" ? true: task.status === filter
    );

  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0) return <p>No tasks available.</p>;

  return(
    <div className="space-y-4">

        <div className="space-y-4">
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border px-2 py-1 rounded"
            >
                <option value="all">All</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>
        </div>
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
                            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingTask(null)}
                                className="bg-gray-400 text-white px-3 py-1 rounded"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                ):(
                    <div
                    key={task.id}
                    className="bg-white p-4 rounded shadow flex justify-between items-start"
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
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        Delete
                    </button>
                    </div>
                     </div>

                )
            ))
        }
    </div>

  )
  
}


    