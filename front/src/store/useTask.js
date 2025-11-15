import { create } from "zustand";
import api from "../api/config";
import useUserStore from "./userStore";

const useTaskStore = create((set) => ({
    tasks: [],
    fetchTasks: async () => {
        const { token } = useUserStore.getState();
        try {
            const { data } = await api.get("/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ tasks: data });
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    },
    addTask: async (task) => {
        const { token } = useUserStore.getState();
        try {
            const { data } = await api.post("/tasks", task, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set((state) => ({ tasks: [...state.tasks, data] }));
        } catch (err) {
            console.error("Error adding task:", err);
        }
    },
    toggleComplete: async (id, completed) => {
        const { token } = useUserStore.getState();
        try {
            const { data } = await api.patch(`/tasks/${id}`, { completed }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set((state) => ({
                tasks: state.tasks.map((t) => (t._id === id ? data : t)),
            }));
        } catch (err) {
            console.error("Error updating task:", err);
        }
    },
    deleteTask: async (id) => {
        const { token } = useUserStore.getState();
        try {
            await api.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set((state) => ({
                tasks: state.tasks.filter((t) => t._id !== id),
            }));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    },
}));

export default useTaskStore;
