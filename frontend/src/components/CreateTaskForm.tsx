"use client";
import { useState } from "react";
import Spinner from "./Spinner";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

 const CreateTaskForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        status: "todo",
    });
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try{

            const res = await fetch(`${API_URL}/tasks`,{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            if (!res.ok) throw new Error("Failed to create task");
            setFormData({ title: "", description: "", dueDate: "", status: "todo" });
            setMessage("Task created successfully");   
        }catch(_){
            setMessage("Error while creating task");
        }finally{
            setLoading(false);
        }
    };   


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {
                loading ? <Spinner/> :(
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold mb-4 ">Create New Task</h2>
            <div className="mb-4">
                <label className="block font-medium mb-1">Title</label>
                <input
                 name = "title"
                 value={formData.title}
                 onChange={handleChange}
                 required
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-1">
                    Description
                </label>
                <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-1">
                    Due Date
                </label>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-700"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">
                    Status
                </label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-700"
                >
                    <option value = "todo">To Do</option>
                    <option value= "in_progress">In Progress</option>
                    <option value = "done">Done</option>
                </select>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-base text-white font-bold px-3 py-1 rounded cursor-pointer">
              
                Create Task
            </button>
            {
                message  && <p className="mt-4 text-sm text-green-500 font-bold">{message}</p>
            }
        </form>
                )
            }

        </div>
        
    )

 }

 export default CreateTaskForm;