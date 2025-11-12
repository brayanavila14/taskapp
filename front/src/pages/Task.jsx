import { useState } from "react";
import { Trash2, CheckCircle2, Circle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AddTaskModal from "../components/AddTaskModal";

export default function Task() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Diseñar el nuevo dashboard",
            description: "Definir colores y componentes principales del panel",
            date: "2025-11-11",
            completed: false,
        },
    ]);

    const toggleComplete = (id) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const addTask = (newTask) => {
        setTasks((prev) => [...prev, newTask]);
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6">Mis Tareas</h1>

                <ul role="list" className="divide-y divide-white/10">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between py-5 px-4 hover:bg-gray-800/50 rounded-xl transition"
                        >
                            <div className="flex items-start gap-x-4">
                                <button
                                    onClick={() => toggleComplete(task.id)}
                                    className="mt-1 text-gray-400 hover:text-emerald-400 transition"
                                >
                                    {task.completed ? (
                                        <CheckCircle2 className="size-5 text-emerald-400" />
                                    ) : (
                                        <Circle className="size-5" />
                                    )}
                                </button>

                                <div>
                                    <p
                                        className={`text-sm font-semibold ${task.completed
                                                ? "line-through text-gray-500"
                                                : "text-white"
                                            }`}
                                    >
                                        {task.title}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        {task.description}
                                    </p>
                                    <p className="mt-2 text-xs text-gray-500">📅 {task.date}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-gray-400 hover:text-red-500 transition"
                                title="Eliminar tarea"
                            >
                                <Trash2 className="size-5" />
                            </button>
                        </li>
                    ))}
                </ul>

                {tasks.length === 0 && (
                    <p className="text-gray-500 mt-10 text-center">
                        No tienes tareas pendientes 🎉
                    </p>
                )}

                {/* Botón flotante + modal */}
                <AddTaskModal onAddTask={addTask} />
            </main>
        </div>
    );
}
