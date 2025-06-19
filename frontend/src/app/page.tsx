import CreateTaskForm from "../components/CreateTaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Task Manager</h1>
        <CreateTaskForm />
        <TaskList />
      </div>
    </main>
  );
}
