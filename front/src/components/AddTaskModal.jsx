import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function AddTaskModal({ onAddTask }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask = {
            id: Date.now(),
            title,
            description,
            date: new Date().toISOString().split("T")[0],
            completed: false,
        };

        onAddTask(newTask);

        setTitle("");
        setDescription("");
        setOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 rounded-full bg-indigo-500 p-4 shadow-lg hover:bg-indigo-400 transition"
            >
                <Plus className="size-6 text-white" />
            </button>

            <Modal open={open} onClose={() => setOpen(false)} title="Nueva Tarea">
                <form onSubmit={handleSubmit} className="space-y-4">

                    <InputField
                        label="Título"
                        value={title}
                        onChange={setTitle}
                        placeholder="Ej. Crear componente de login"
                    />

                    <InputField
                        label="Descripción"
                        value={description}
                        onChange={setDescription}
                        placeholder="Detalles de la tarea..."
                        textarea
                        rows={3}
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="secondary"
                            type="button"
                            className="w-auto px-4"
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-auto px-4"
                        >
                            Agregar
                        </Button>
                    </div>

                </form>
            </Modal>
        </>
    );
}
