import { useState } from 'react'
import { Plus, X } from 'lucide-react'

export default function AddTaskModal({ onAddTask }) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim()) return

        const newTask = {
            id: Date.now(),
            title,
            description,
            date: new Date().toISOString().split('T')[0],
            completed: false,
        }

        onAddTask(newTask)
        setTitle('')
        setDescription('')
        setOpen(false)
    }

    return (
        <>
            {/* Botón flotante */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 rounded-full bg-indigo-500 p-4 shadow-lg hover:bg-indigo-400 transition"
            >
                <Plus className="size-6 text-white" />
            </button>

            {/* Modal manual */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-6 animate-fadeIn">
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                        >
                            <X className="size-5" />
                        </button>

                        <h2 className="text-lg font-semibold text-white mb-4">Nueva Tarea</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Título</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-md bg-gray-700 text-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Ej. Crear componente de login"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    className="w-full rounded-md bg-gray-700 text-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                    placeholder="Detalles de la tarea..."
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 transition"
                                >
                                    Agregar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
