import { useEffect } from "react";
import { Trash2, CheckCircle2, Circle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AddTaskModal from "../components/AddTaskModal";
import useTaskStore from "../store/useTask";
import { formatDate } from "../utils/formatDate";
import { capitalize } from "../utils/capitalize";
import { truncateText } from "../utils/truncate";

export default function Task() {
    const { tasks, fetchTasks, addTask, toggleComplete, deleteTask } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, []);

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
                            <div className="flex items-center gap-x-4 w-full">
                                <button
                                    onClick={() => toggleComplete(task.id, !task.completed)}
                                    className="text-gray-400 hover:text-emerald-400 transition"
                                >
                                    {task.completed ? (
                                        <CheckCircle2 className="size-5 text-emerald-400" />
                                    ) : (
                                        <Circle className="size-5" />
                                    )}
                                </button>
                                <div className="flex flex-col min-w-full">
                                    <p
                                        className={`text-2xl font-semibold ${task.completed
                                            ? "line-through text-gray-500"
                                            : "text-white"
                                            }`}
                                    >
                                        {truncateText(capitalize(task.title))}
                                    </p>
                                    <p
                                        className={`text-sm font-semibold text-gray-500 ${task.completed ? "line-through" : ""}`}
                                    >
                                        {truncateText(capitalize(task.description), 60)}
                                    </p>
                                    <p className="mr-12 text-xs text-right text-gray-400">{formatDate(task.date)}</p>
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
                        No tienes tareas pendientes
                    </p>
                )}

                <AddTaskModal onAddTask={addTask} />
                <p className="absolute bottom-1 right-3 text-center text-xs text-gray-600 select-none opacity-90 tracking-wide pointer-events-none">
                    by BrayDev 2025
                </p>
            </main>
        </div>
    );
}
