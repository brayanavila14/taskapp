import { create } from "zustand";
import api from "../api/api";

const useTaskStore = create((set) => ({
    tasks: [],

    fetchTasks: async () => {
        try {
            const { data } = await api.get("/tasks");
            set({ tasks: data });
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    },

    addTask: async (task) => {
        try {
            const { data } = await api.post("/tasks", task);
            set((state) => ({ tasks: [...state.tasks, data] }));
        } catch (err) {
            console.error("Error adding task:", err);
        }
    },

    toggleComplete: async (id, completed) => {
        try {
            const { data } = await api.patch(`/tasks/${id}`, { completed });
            set((state) => ({
                tasks: state.tasks.map((t) => (t._id === id ? data : t)),
            }));
        } catch (err) {
            console.error("Error updating task:", err);
        }
    },

    deleteTask: async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            set((state) => ({
                tasks: state.tasks.filter((t) => t._id !== id),
            }));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    },
}));

export default useTaskStore;
